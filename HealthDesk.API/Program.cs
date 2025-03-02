
using HealthDesk.API;
using HealthDesk.Application.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Server.Kestrel.Core;

var builder = WebApplication.CreateBuilder(args);

// Add CORS configuration to allow specific origins
var allowedOrigins = "_allowedOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowedOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:4200")  // Update with allowed origins
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddCustomValidations();


builder.Services.RegisterServices(builder.Configuration);
// builder.Services.AddHttpsRedirection(options =>
// {
//     options.HttpsPort = 443; // Ensures HTTPS is enforced
// });
// builder.Services.Configure<ForwardedHeadersOptions>(options =>
// {
//     options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
// });

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
    {
        options.Cookie.HttpOnly = true; // Prevent JavaScript access to the cookie
        options.Cookie.SecurePolicy = CookieSecurePolicy.None; // Enforce HTTPS (use 'None' for local testing if needed)
        options.Cookie.Path = "/";
        options.Cookie.SameSite = SameSiteMode.None; // Support cross-origin requests with cookies
        options.LoginPath = "/api/auth/redirect-to-login"; // Redirect to the Angular login page
        options.LogoutPath = "/api/auth/redirect-to-login"; // Optional: Redirect after logout
        options.AccessDeniedPath = "/api/auth/redirect-to-login";
    });

builder.Services.Configure<IISServerOptions>(options =>
{
  options.MaxRequestBodySize = 52428800; // 50 MB
});

builder.Services.Configure<KestrelServerOptions>(options =>
{
    options.Limits.MaxRequestBodySize = 52428800; // 50 MB
});

var app = builder.Build();
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseMiddleware<ErrorHandlingMiddleware>();
// app.UseMiddleware<SecurityHeadersMiddleware>();
app.UseCors(allowedOrigins);
app.UseMiddleware<TokenRefreshMiddleware>();
// app.UseMiddleware<AntiMaliciousDataMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();