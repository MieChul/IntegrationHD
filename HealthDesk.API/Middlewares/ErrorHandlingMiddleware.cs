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
        // Resolve ILogRepository within the request scope and log the error
        var logRepository = context.RequestServices.GetService<ILogRepository>();
        if (logRepository != null)
        {
            await logRepository.LogAsync(exception.Message, "Error");
        }

        // Set response status and headers
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        var errorMessage = exception is InvalidOperationException
               ? exception.Message
               : "An unexpected error occurred.";
        // Create the error response
        var errorResponse = new
        {
            Success = false,
            Message = errorMessage
        };

        // Serialize and write the error response
        var errorJson = JsonSerializer.Serialize(errorResponse, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        await context.Response.WriteAsync(errorJson);
    }
}
