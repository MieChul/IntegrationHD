using HealthDesk.Application;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

public class OtpService : IOtpService
{
    private readonly IConfiguration _configuration;
    private const int OtpExpiryMinutes = 5;

    public OtpService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateOtpToken(string contact)
    {
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("contact", contact)
            }),
            Expires = DateTime.UtcNow.AddMinutes(OtpExpiryMinutes),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public bool VerifyOtpToken(string otpToken, string contact)
    {
        try
        {
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenHandler = new JwtSecurityTokenHandler();

            var principal = tokenHandler.ValidateToken(otpToken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var tokenContact = principal.FindFirst("contact")?.Value;

            return tokenContact == contact;
        }
        catch
        {
            return false;
        }
    }
}
