using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HealthDesk.Core;
using HealthDesk.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace HealthDesk.Application;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IUserRepository userRepository, IConfiguration configuration, IRefreshTokenRepository refreshTokenRepository)
    {
        _userRepository = userRepository;
        _configuration = configuration;
        _refreshTokenRepository = refreshTokenRepository;
    }

    public async Task<UserDto> Authenticate(string username, string password)
    {
        var user = await _userRepository.GetByUsernameAsync(username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash) || (user.Roles.FirstOrDefault().Status == "Blocked"))
        {
            return null;
        }

        var userDto = new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Roles = new List<UserRoleDto>(),
            ProfImage = user.ProfImage,
            CanSwitch = user.CanSwitch,
            DependentId = user.DependentId,
            DependentName = user.DependentName,
            HasDependent = user.HasDependent,
            IsMainApproved = user.DependentId == null && user.Roles.Any(r => r.Status == "Approved"),
            DateOfBirth = user.BirthDate,
            Gender = user.Gender
        };

        user.Roles.ForEach(u => userDto.Roles.Add(new UserRoleDto { Role = u.Role, Status = u.Status }));

        return userDto;
    }

    public async Task<string> GenerateRefreshToken(string userId)
    {
        var existingToken = await _refreshTokenRepository.GetByDynamicPropertyAsync("UserId", userId);

        if (existingToken != null)
        {
            existingToken.Token = Guid.NewGuid().ToString();
            existingToken.ExpiryDate = DateTime.UtcNow.AddDays(1);
            existingToken.IsRevoked = false;

            await _refreshTokenRepository.UpdateAsync(existingToken);
            return existingToken.Token;
        }
        else
        {
            var newRefreshToken = new RefreshToken
            {
                UserId = userId,
                Token = Guid.NewGuid().ToString(),
                ExpiryDate = DateTime.UtcNow.AddDays(1)
            };

            await _refreshTokenRepository.AddAsync(newRefreshToken);
            return newRefreshToken.Token;
        }
    }

    public async Task<(string? NewAccessToken, string? NewRefreshToken)> RefreshTokens(string refreshToken)
    {
        var tokenEntry = await _refreshTokenRepository.GetByDynamicPropertyAsync("Token", refreshToken);
        if (tokenEntry == null || tokenEntry.ExpiryDate <= DateTime.UtcNow || tokenEntry.IsRevoked)
        {
            return (null, null);
        }

        tokenEntry.IsRevoked = true;
        await _refreshTokenRepository.UpdateAsync(tokenEntry);

        var user = await _userRepository.GetByIdAsync(tokenEntry.UserId);
        if (user == null) return (null, null);

        var userDto = new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Roles = new List<UserRoleDto>(),
            ProfImage = user.ProfImage
        };
        
        user.Roles.ForEach(u => userDto.Roles.Add(new UserRoleDto { Role = u.Role, Status = u.Status }));

        var newAccessToken = GenerateAccessToken(userDto);
        var newRefreshToken = await GenerateRefreshToken(user.Id);

        return (newAccessToken, newRefreshToken);
    }

    public async Task SetTokenCookies(HttpContext context, UserDto user, bool isDev)
    {
        var accessToken = GenerateAccessToken(user);
        var refreshToken = await GenerateRefreshToken(user.Id);

        // Determine the settings based on the environment
        var isSecure = !isDev;
        var sameSiteMode = isSecure ? SameSiteMode.None : SameSiteMode.Lax;

        // Set the AccessToken cookie
        context.Response.Cookies.Append("AccessToken", accessToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = isSecure,
            SameSite = sameSiteMode,
            Path = "/",
            Expires = DateTime.UtcNow.AddMinutes(_configuration.GetValue<int>("Jwt:ExpirationMinutes"))
        });

        // Set the RefreshToken cookie
        context.Response.Cookies.Append("RefreshToken", refreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = isSecure,
            SameSite = sameSiteMode,
            Path = "/",
            Expires = DateTime.UtcNow.AddDays(1) // Set expiration directly
        });
    }

    private string GenerateAccessToken(UserDto user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.NameIdentifier, user.Id)
        };

        foreach (var userRole in user.Roles)
        {
            string roleName = ((HealthDesk.Core.Enum.Role)userRole.Role).ToString();
            claims.Add(new Claim(ClaimTypes.Role, roleName));

            claims.Add(new Claim("status", userRole.Status));
        }

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(_configuration.GetValue<int>("Jwt:ExpirationMinutes")),
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(
                             new SymmetricSecurityKey(key),
                             SecurityAlgorithms.HmacSha256Signature
                         )
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
