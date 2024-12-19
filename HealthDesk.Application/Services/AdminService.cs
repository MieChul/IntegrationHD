
using HealthDesk.Application.Interfaces;
using HealthDesk.Core;
using HealthDesk.Core.Enum;
using static HealthDesk.Application.UserRegistrationDto;

namespace HealthDesk.Application.Services;
public class AdminService : IAdminService
{
    private readonly IUserRepository _userRepository;
    private readonly IMessageService _messageService;
    public AdminService(IUserRepository userRepository, IMessageService messageService)
    {
        _userRepository = userRepository;
        _messageService = messageService;
    }

    public async Task AdminAction(string id, string value, string comments)
    {
        var user = await _userRepository.GetByIdAsync(id);

        // hash password if it was entered
        if (user != null)
        {
            user.Status = value;
            user.RejectionComments = comments;
            await _userRepository.UpdateAsync(user);

            if (string.IsNullOrEmpty(user.Mobile))
                _messageService.SendEmail(user.Email, "Congratulations, Your application for using HealthDesk has been approved.", "Hello " + user.FirstName + ", We are pleased to inform that your application has been approved for using HealtDesk App.\n Login using User name:" + user.Username + "\n Thank You, Admin HealthDesk");
            else
                _messageService.SendSms(user.Mobile, "Congratulations " + user.FirstName + ", Your application for using HealthDesk has been approved. Login using User name:" + user.Username);
        }
    }

    public async Task<List<dynamic>> GetAll()
    {
        var users = await _userRepository.GetAllAsync();

        var userList = users
     .Where(u => !u.Roles.Any(role => role == Role.Admin)) // Exclude Admin role
     .Select(u => (dynamic)new
     {
         Id = u.Id,
         UserName = u.Username,
         Name = u.Roles.Any(role => role == Role.Physician || role == Role.Patient)
             ? $"{u.FirstName} {u.LastName}"
             : u.OrgName,
         LastName = u.LastName,
         Contact = !string.IsNullOrEmpty(u.Mobile) ? u.Mobile : u.Email,
         Role = u.Roles.FirstOrDefault().ToString(),
         Status = u.Status,
         City = u.Roles.Any(role => role == Role.Physician || role == Role.Patient)
             ? u.City
             : u.ClinicCity,
     }).ToList();

        return userList.ToList();
    }
}
