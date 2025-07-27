namespace HealthDesk.API;

public class SecurityHeadersMiddleware
{
    private readonly RequestDelegate _next;

    public SecurityHeadersMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {

        var csp = "default-src 'self'; " +
                  "connect-src 'self' https://www.healthdeskapp.in https://www.google.com; " +
                  "img-src 'self' data:; " +
                  "font-src 'self' https://fonts.gstatic.com; " +
                  "script-src 'self' 'unsafe-inline' www.google.com www.gstatic.com; " +
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                  "object-src 'none'; " +
                  "frame-src 'self' www.google.com;";

        context.Response.Headers.Add("Content-Security-Policy", csp);

        context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
        context.Response.Headers.Add("X-Frame-Options", "DENY");
        context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
        context.Response.Headers.Add("Referrer-Policy", "no-referrer-when-downgrade");
        context.Response.Headers.Add("Permissions-Policy", "microphone=(), camera=(), geolocation=()");

        await _next(context);
    }
}