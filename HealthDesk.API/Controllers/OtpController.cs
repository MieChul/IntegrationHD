using HealthDesk.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers;
[ApiController]
[AllowAnonymous]
[Route("api/[controller]")]
public class OtpController : ControllerBase
{
    private readonly IOtpService _otpService;
    private readonly IUserService _userService;

    public OtpController(IOtpService otpService, IUserService userService)
    {
        _otpService = otpService;
        _userService = userService;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendOtp([FromBody] SendOtpRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var prop = request.IsEmail ? "email" : "mobile";
        if (await _userService.IsTaken(prop, request.Contact))
        {
            return BadRequest($"{char.ToUpper(prop[0])}{prop[1..]} is already registered. Please use login.");
        }
        var otp = _otpService.GenerateOtp();
        var otpToken = _otpService.GenerateOtpToken(otp, request.Contact);

        // Send OTP via messaging service
        _otpService.SendNotification(request.Contact, $"Your OTP is {otp}. It will expire in 5 minutes.", "Your OTP Code");

        return Ok(new { OtpToken = otpToken });
    }

    [HttpPost("verify")]
    public IActionResult VerifyOtp([FromBody] VerifyOtpRequest request)
    {
        var isValid = _otpService.VerifyOtpToken(request.OtpToken, request.Otp, request.Contact);
        if (isValid)
        {
            return Ok(new { Message = "OTP verified successfully", Valid = true });
        }
        return BadRequest(new { Success = false, Message = "Invalid or expired OTP." });
    }
}