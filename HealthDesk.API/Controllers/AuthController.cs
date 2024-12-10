using HealthDesk.Application;
using HealthDesk.Core.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers;
[Route("api/[controller]")]
public class AuthController : Controller
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _authService.Authenticate(loginDto.Username, loginDto.Password);
        if (user == null)
        {
            return Unauthorized("Invalid credentials.");
        }

        // Set the access token in an HttpOnly cookie
        await _authService.SetTokenCookies(HttpContext, user);
        // Return the user's role or any additional info, but not the token itself
        return Ok(new { role = user.Roles.FirstOrDefault().ToString().ToLower(), username = loginDto.Username, id = user.Id, profImage = user.ProfImage, status = user.Status });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        // Remove the authentication cookie
        Response.Cookies.Delete("AccessToken");
        Response.Cookies.Delete("RefreshToken");
        return Ok(new { message = "Logged out successfully" });
    }

    [HttpGet("redirect-to-login")]
    public IActionResult RedirectToLogin()
    {
        // Redirect to the frontend login page
       return Unauthorized(new { message = "You need to log in." });
    }
}