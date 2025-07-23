// using Microsoft.Extensions.Configuration;
// using System.Text.Json;
// using System.Text;
// using System.Net.Mail;
// using System.Net;
// using System.Net.Http.Headers;

// // Note: You can remove System.Net and System.Net.Mail if SendEmail is not in this file.

// namespace HealthDesk.Application;

// public class MessageService : IMessageService
// {
//     private readonly IConfiguration _configuration;
//     private readonly IHttpClientFactory _httpClientFactory;

//     public MessageService(IConfiguration configuration, IHttpClientFactory httpClientFactory)
//     {
//         _configuration = configuration;
//         _httpClientFactory = httpClientFactory;
//     }

//     public async Task SendSms(string mobileNumber, string message)
//     {
//         using var client = new HttpClient();
//         client.DefaultRequestHeaders.ExpectContinue = false;
//         client.DefaultRequestHeaders.Clear(); // remove default headers

//         var payload = new
//         {
//             authkey = "460977AeDo7G0S4pf687c604bP1",
//             sender = "TESTIN",
//             route = "4",
//             country = "91",
//             sms = new[]
//             {
//             new
//             {
//                 message = message,
//                 to = new[] { $"91{mobileNumber}" }
//             }
//         }
//         };

//         var json = JsonSerializer.Serialize(payload);

//         // Send raw JSON bytes and set content type manually without charset
//         var content = new ByteArrayContent(Encoding.UTF8.GetBytes(json));
//         content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

//         var response = await client.PostAsync("https://api.msg91.com/api/v2/sendsms", content);
//         var responseString = await response.Content.ReadAsStringAsync();

//         Console.WriteLine("Request JSON:");
//         Console.WriteLine(json);
//         Console.WriteLine("Status:");
//         Console.WriteLine(response.StatusCode);
//         Console.WriteLine("Response:");
//         Console.WriteLine(responseString);
//     }


//     // Send an email message using Gmail SMTP
//     public void SendEmail(string emailAddress, string subject, string body)
//     {
//         var smtpClient = new SmtpClient(_configuration["Gmail:SmtpServer"], int.Parse(_configuration["Gmail:SmtpPort"]))
//         {
//             Credentials = new NetworkCredential(_configuration["Gmail:Email"], _configuration["Gmail:Password"]),
//             EnableSsl = true
//         };

//         var mailMessage = new MailMessage
//         {
//             From = new MailAddress(_configuration["Gmail:Email"]),
//             Subject = subject,
//             Body = body,
//             IsBodyHtml = true
//         };

//         mailMessage.To.Add(emailAddress);
//         smtpClient.Send(mailMessage);

//         Console.WriteLine($"Email sent to {emailAddress} with subject: {subject}");
//     }
// }
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace HealthDesk.Application;

public class MessageService : IMessageService
{
    private readonly IConfiguration _configuration;

    public MessageService(IConfiguration configuration)
    {
        _configuration = configuration;
        TwilioClient.Init(
            _configuration["Twilio:AccountSid"],
            _configuration["Twilio:AuthToken"]
        );
    }

    // Send an SMS message using Twilio
    public void SendSms(string mobileNumber, string message)
    {
        var messageResponse = MessageResource.Create(
            to: new PhoneNumber($"+91{mobileNumber}"),
            from: new PhoneNumber(_configuration["Twilio:FromPhoneNumber"]),
            body: message
        );

        Console.WriteLine($"Sent SMS: {messageResponse.Sid}");
    }

    // Send an email message using Gmail SMTP
    public void SendEmail(string emailAddress, string subject, string body)
    {
        var smtpClient = new SmtpClient(_configuration["Gmail:SmtpServer"], int.Parse(_configuration["Gmail:SmtpPort"]))
        {
                        Credentials = new NetworkCredential(_configuration["Gmail:Email"], _configuration["Gmail:Password"]),
            EnableSsl = true
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(_configuration["Gmail:Email"]),
            Subject = subject,
            Body = body,
            IsBodyHtml = true
        };

        mailMessage.To.Add(emailAddress);
        smtpClient.Send(mailMessage);

        Console.WriteLine($"Email sent to {emailAddress} with subject: {subject}");
    }
}
