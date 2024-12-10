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
                // Validate the access token
                tokenHandler.ValidateToken(accessToken, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:Key"])),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out _);

                // Token is valid, proceed to next middleware
                await _next(context);
                return;
            }
            catch (SecurityTokenExpiredException)
            {
                // Access token expired, refresh it
                var refreshToken = context.Request.Cookies["RefreshToken"];
                if (string.IsNullOrEmpty(refreshToken))
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Unauthorized: Refresh token not found.");
                    return;
                }

                string newAccessToken;
                using (var scope = serviceProvider.CreateScope())
                {
                    var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();
                    newAccessToken = await authService.RefreshAccessToken(refreshToken);
                }

                if (!string.IsNullOrEmpty(newAccessToken))
                {
                    context.Response.Cookies.Append("AccessToken", newAccessToken, new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = false,
                        SameSite = SameSiteMode.None,
                        Path = "/",
                        Expires = DateTime.UtcNow.AddMinutes(15)
                    });

                    await _next(context);
                }
                else
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Unauthorized: Unable to refresh access token.");
                }

                return;
            }
        }

        // Proceed to the next middleware if no token is provided
        await _next(context);
    }
}
