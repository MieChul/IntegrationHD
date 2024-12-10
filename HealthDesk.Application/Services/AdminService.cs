
using HealthDesk.Application.Interfaces;
using HealthDesk.Core;
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

      public async Task<List<User>> GetAll()
    {
        var user = await _userRepository.GetAllAsync();
        return user.ToList();
    }
}
