namespace HealthDesk.Application;

public interface IMsg91Service
{
    Task<bool> SendOtpAsync(string mobileNumber);
    Task<bool> VerifyOtpAsync(string mobileNumber, string otp);
}