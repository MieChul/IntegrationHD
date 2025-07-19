using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

public class BasicAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly IConfiguration _config;

    public BasicAuthHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock,
        IConfiguration config
    ) : base(options, logger, encoder, clock)
    {
        _config = config;
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        // Only challenge if header present; if not, skip to challenge in middleware.
        if (!Request.Headers.ContainsKey("Authorization"))
            return Task.FromResult(AuthenticateResult.NoResult());

        var header = Request.Headers["Authorization"].ToString();
        if (!header.StartsWith("Basic "))
            return Task.FromResult(AuthenticateResult.Fail("Invalid scheme"));

        string encoded = header.Substring("Basic ".Length).Trim();
        string decoded;
        try
        {
            decoded = Encoding.UTF8.GetString(Convert.FromBase64String(encoded));
        }
        catch
        {
            return Task.FromResult(AuthenticateResult.Fail("Invalid Base64"));
        }

        var parts = decoded.Split(':', 2);
        if (parts.Length != 2)
            return Task.FromResult(AuthenticateResult.Fail("Invalid credential format"));

        var user = parts[0];
        var pass = parts[1];

        // Lookup in configuration
        var users = _config.GetSection("PreReleaseAuth:Users").Get<Dictionary<string, string>>();
        if (users == null || !users.TryGetValue(user, out var correctPass) || pass != correctPass)
            return Task.FromResult(AuthenticateResult.Fail("Invalid username or password"));

        // Success: create identity
        var claims = new[] { new Claim(ClaimTypes.Name, user) };
        var identity = new ClaimsIdentity(claims, Scheme.Name);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, Scheme.Name);

        return Task.FromResult(AuthenticateResult.Success(ticket));
    }
}
