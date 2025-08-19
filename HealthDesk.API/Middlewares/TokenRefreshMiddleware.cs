using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HealthDesk.Application;
using Microsoft.IdentityModel.Tokens;

namespace HealthDesk.API;

public class TokenRefreshMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;

    public TokenRefreshMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _configuration = configuration;
    }

    public async Task InvokeAsync(HttpContext context, IServiceProvider serviceProvider)
    {
        var accessToken = context.Request.Cookies["AccessToken"];
        var tokenHandler = new JwtSecurityTokenHandler();

        if (!string.IsNullOrEmpty(accessToken))
        {
            try
            {
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                                  Encoding.ASCII.GetBytes(_configuration["Jwt:Key"])
                                ),
                    ValidateIssuer = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = _configuration["Jwt:Audience"],
                    ClockSkew = TimeSpan.Zero
                };
                tokenHandler.ValidateToken(accessToken, validationParameters, out _);
                await _next(context);
                return;
            }
            catch (SecurityTokenExpiredException)
            {
                var refreshToken = context.Request.Cookies["RefreshToken"];
                if (string.IsNullOrEmpty(refreshToken))
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Unauthorized: Refresh token not found.");
                    return;
                }

                (string newAccessToken, string newRefreshToken) = (null, null);
                using (var scope = serviceProvider.CreateScope())
                {
                    var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();
                    (newAccessToken, newRefreshToken) = await authService.RefreshTokens(refreshToken);
                }

                if (!string.IsNullOrEmpty(newAccessToken) && !string.IsNullOrEmpty(newRefreshToken))
                {
                    var isSecure = !serviceProvider.GetRequiredService<IWebHostEnvironment>().IsDevelopment();
                    var sameSiteMode = isSecure ? SameSiteMode.None : SameSiteMode.Lax;
                    var expirationMinutes = _configuration.GetValue<int>("Jwt:ExpirationMinutes");

                    context.Response.Cookies.Append("AccessToken", newAccessToken, new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = isSecure,
                        SameSite = sameSiteMode,
                        Path = "/",
                        Expires = DateTime.UtcNow.AddMinutes(expirationMinutes)
                    });
                    context.Response.Cookies.Append("RefreshToken", newRefreshToken, new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = isSecure,
                        SameSite = sameSiteMode,
                        Path = "/",
                        Expires = DateTime.UtcNow.AddDays(1)
                    });

                    context.Request.Headers.Authorization = "Bearer " + newAccessToken;
                    await _next(context);
                }
                else
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Unauthorized: Unable to refresh tokens.");
                }

                return;
            }
        }
        
        await _next(context);
    }
}
