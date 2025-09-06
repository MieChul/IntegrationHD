using HealthDesk.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[AllowAnonymous]
[Route("api/[controller]")]
public class OtpController : ControllerBase
{
    private readonly IOtpService _otpService;
    private readonly IUserService _userService;
    private readonly IMsg91Service _msg91Service;

    public OtpController(IOtpService otpService, IUserService userService, IMsg91Service msg91Service)
    {
        _otpService = otpService;
        _userService = userService;
        _msg91Service = msg91Service;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendOtp([FromBody] SendOtpRequest request)
    {
        if (!ModelState.IsValid || request.IsEmail)
        {
            return BadRequest("Invalid request. OTP can only be sent to a mobile number.");
        }

        if (await _userService.IsTaken("mobile", request.Contact))
        {
            return BadRequest("Mobile is already registered. Please use login.");
        }

        bool isSent = await _msg91Service.SendOtpAsync(request.Contact);

        if (isSent)
        {
            var otpToken = _otpService.GenerateOtpToken(request.Contact);
            return Ok(new { OtpToken = otpToken });
        }

        return BadRequest(new { Message = "Failed to send OTP via the provider." });
    }

    [HttpPost("verify")]
    public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        bool isTokenValid = _otpService.VerifyOtpToken(request.OtpToken, request.Contact);

        if (!isTokenValid)
        {
            return BadRequest(new { Success = false, Message = "Invalid or expired OTP token. Please try again." });
        }

        bool isMsg91Verified = await _msg91Service.VerifyOtpAsync(request.Contact, request.Otp);

        if (isMsg91Verified)
        {
            return Ok(new { Message = "OTP verified successfully", Valid = true });
        }

        return BadRequest(new { Success = false, Message = "Invalid OTP code." });
    }
}