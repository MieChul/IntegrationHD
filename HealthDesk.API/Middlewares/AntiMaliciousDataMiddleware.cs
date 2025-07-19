using System.Text.RegularExpressions;

namespace HealthDesk.API;

public class AntiMaliciousDataMiddleware
{
    private readonly RequestDelegate _next;
    private static readonly Regex MaliciousRegex = new Regex(@"<script|alert\(|document\.|window\.", RegexOptions.IgnoreCase);

    public AntiMaliciousDataMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if ((context.Request.Method == HttpMethods.Post ||
             context.Request.Method == HttpMethods.Put)
            && context.Request.ContentType?.Contains("application/json") == true
            && (context.Request.ContentLength ?? 0) < 1_000_000) // <1 MB
        {
            context.Request.EnableBuffering();
            using var reader = new StreamReader(
                context.Request.Body, leaveOpen: true
            );
            var body = await reader.ReadToEndAsync();
            context.Request.Body.Position = 0;

            if (MaliciousRegex.IsMatch(body))
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsync("Malicious content detected.");
                return;
            }
        }

        await _next(context);
    }
}