using System.Net.Http.Headers;
using System.Text;

public class PreReleaseAuthMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _config;
    private const string SessionCookieName = "PreReleaseSession";

    public PreReleaseAuthMiddleware(RequestDelegate next, IConfiguration config)
    {
        _next = next;
        _config = config;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // If the cookie exists, the user is already authenticated for this session.
        if (context.Request.Cookies.ContainsKey(SessionCookieName))
        {
            await _next(context);
            return;
        }

        // Check for the Basic Auth header.
        if (!context.Request.Headers.ContainsKey("Authorization"))
        {
            await ChallengeUser(context);
            return;
        }

        var authHeader = AuthenticationHeaderValue.Parse(context.Request.Headers["Authorization"]);
        if (!"Basic".Equals(authHeader.Scheme, StringComparison.OrdinalIgnoreCase) || string.IsNullOrEmpty(authHeader.Parameter))
        {
            await ChallengeUser(context);
            return;
        }

        // Decode and validate credentials.
        var credentials = Encoding.UTF8.GetString(Convert.FromBase64String(authHeader.Parameter)).Split(':', 2);
        var username = credentials[0];
        var password = credentials[1];

        var expectedUser = _config["PreReleaseAuth:Users:healthAppUser"];
        if (username == "healthAppUser" && password == expectedUser)
        {
            // Success! Set the session cookie and proceed.
            // The cookie will be automatically deleted when the browser is closed.
            context.Response.Cookies.Append(SessionCookieName, "authorized", new CookieOptions { HttpOnly = true });
            await _next(context);
        }
        else
        {
            // Invalid credentials.
            await ChallengeUser(context);
        }
    }

    private static async Task ChallengeUser(HttpContext context)
    {
        context.Response.StatusCode = 401;
        context.Response.Headers["WWW-Authenticate"] = "Basic realm=\"PreRelease\"";
        await context.Response.WriteAsync("Access Denied");
    }
}