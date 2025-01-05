
using HealthDesk.Application.Interfaces;
using HealthDesk.Core.Enum;
using HealthDesk.Infrastructure;

namespace HealthDesk.Application;
public class AdminService : IAdminService
{
    private readonly IUserRepository _userRepository;
    private readonly IMessageService _messageService;
    public AdminService(IUserRepository userRepository, IMessageService messageService)
    {
        _userRepository = userRepository;
        _messageService = messageService;
    }

    public async Task AdminAction(string id, string userRole, string value, string comments)
    {
        var user = await _userRepository.GetByIdAsync(id);

        // hash password if it was entered
        if (user != null && user.Roles.Any(role => role.Role.ToString().ToLower() == userRole))
        {
            user.Roles.ForEach(r =>
            {
                if (r.Role.ToString().ToLower() == userRole)
                {
                    r.Status = value;
                }
            });
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
            .Where(user => user.Roles.All(role => role.Role != Role.Admin)) // Exclude users with Admin role
            .SelectMany(user => user.Roles.Select(role => (dynamic)new // Cast to dynamic
            {
                Id = user.Id,
                UserName = user.Username,
                Name = (role.Role == Role.Physician || role.Role == Role.Patient)
                    ? $"{user.FirstName} {user.LastName}"
                    : user.OrgName,
                LastName = user.LastName,
                Contact = !string.IsNullOrEmpty(user.Mobile) ? user.Mobile : user.Email,
                Role = role.Role.ToString(), // Role from the current iteration
                Status = role.Status,
                DependentName =user.DependentName,
                City = (role.Role == Role.Physician || role.Role == Role.Patient)
                    ? user.City
                    : user.ClinicCity
            }))
            .ToList();

        return userList; 
    }
}
