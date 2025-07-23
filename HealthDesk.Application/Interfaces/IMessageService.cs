namespace HealthDesk.Application;

public interface IMessageService
{
    // Task SendSms(string mobileNumber, string message);
    void SendSms(string mobileNumber, string message);
    void SendEmail(string emailAddress, string subject, string body);
}