namespace HealthDesk.Application;

public interface IOtpService
{
    string GenerateOtpToken(string contact);
    bool VerifyOtpToken(string otpToken, string contact);
}
