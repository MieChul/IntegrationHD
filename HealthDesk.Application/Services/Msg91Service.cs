using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using HealthDesk.Application;
using Microsoft.Extensions.Configuration;

public class Msg91Service : IMsg91Service
{
    private readonly HttpClient _client;
    private readonly string _templateId;

    public Msg91Service(IConfiguration configuration)
    {
        _templateId = configuration["Msg91:TemplateId"];
        string authKey = configuration["Msg91:AuthKey"];
        
        _client = new HttpClient();
        _client.DefaultRequestHeaders.Add("authkey", authKey);
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }

    public async Task<bool> SendOtpAsync(string mobileNumber)
    {
        var endpoint = "https://api.msg91.com/api/v5/otp";
        var payload = new
        {
            template_id = _templateId,
            mobile = $"91{mobileNumber}"
        };

        var jsonPayload = JsonSerializer.Serialize(payload);
        var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

        var response = await _client.PostAsync(endpoint, content);
        var responseString = await response.Content.ReadAsStringAsync();

        return response.IsSuccessStatusCode && responseString.Contains("success");
    }

    public async Task<bool> VerifyOtpAsync(string mobileNumber, string otp)
    {
        var endpoint = "https://api.msg91.com/api/v5/otp/verify";
        var payload = new
        {
            mobile = $"91{mobileNumber}",
            otp = otp
        };

        var jsonPayload = JsonSerializer.Serialize(payload);
        var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

        var response = await _client.PostAsync(endpoint, content);
        var responseString = await response.Content.ReadAsStringAsync();
        
        return response.IsSuccessStatusCode && responseString.Contains("success");
    }
}
