using System.Diagnostics;
using System.Text.Json;
using HealthDesk.Infrastructure;

namespace HealthDesk.API;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ErrorHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var logRepository = context.RequestServices.GetRequiredService<ILogRepository>();
        var trace = new StackTrace(exception, true);
        var frame = trace.GetFrames()?.FirstOrDefault(f => f.GetMethod()?.DeclaringType?.Namespace?.StartsWith("HealthDesk") == true);
        var method = frame?.GetMethod();
        var className = method?.DeclaringType?.FullName ?? "UnknownClass";
        var methodName = method?.Name ?? "UnknownMethod";
        var message = exception.InnerException != null
         ? $"{exception.Message} → {exception.InnerException.Message}"
         : exception.Message;


        var logMessage = $@"[EXCEPTION] Message: {message} Class: {className} Method: {methodName} StackTrace: {exception.StackTrace}";
        if (logRepository != null)
        {
            await logRepository.LogAsync(logMessage, "Error");
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        var errorMessage = exception is InvalidOperationException
               ? exception.Message
               : "An unexpected error occurred.";

        var errorResponse = new
        {
            Success = false,
            Message = errorMessage
        };

        var errorJson = JsonSerializer.Serialize(errorResponse, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        await context.Response.WriteAsync(errorJson);
    }
}
