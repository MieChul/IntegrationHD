namespace HealthDesk.Application;

public interface IMessageService
{
    void SendEmail(string emailAddress, string subject, string body);
}