
using System.Dynamic;
using HealthDesk.Application.Interfaces;
using HealthDesk.Core.Enum;
using HealthDesk.Infrastructure;

namespace HealthDesk.Application;
public class AdminService : IAdminService
{
    private readonly IUserRepository _userRepository;
    private readonly IMessageService _messageService;
     private readonly IPharmaceuticalRepository _pharmaceuticalRepository;
    public AdminService(IUserRepository userRepository, IMessageService messageService, IPharmaceuticalRepository pharmaceuticalRepository)
    {
        _userRepository = userRepository;
        _messageService = messageService;
        _pharmaceuticalRepository = pharmaceuticalRepository;
    }

    public async Task AdminAction(string id, string userRole, string value, string comments)
    {
        var user = await _userRepository.GetByIdAsync(id);

        // hash password if it was entered
        if (user != null && user.Roles.Any(role => role.Role.ToString().ToLower() == userRole))
        {
            user.Roles.ForEach(r =>
            {
                if (value == "Blocked" || r.Role.ToString().ToLower() == userRole)
                {
                    r.Status = value;
                }
            });
            user.RejectionComments = comments;
            await _userRepository.UpdateAsync(user);

            if (string.IsNullOrEmpty(user.RejectionComments))
            {

                if (string.IsNullOrEmpty(user.Mobile))
                    _messageService.SendEmail(user.Email, "Congratulations, Your application for using HealthDesk has been approved.", "Hello " + user.FirstName + ", We are pleased to inform that your application has been approved for using HealtDesk App.\n Login using User name:" + user.Username + "\n Thank You, Admin HealthDesk");
                else
                    _messageService.SendSms(user.Mobile, "Congratulations " + user.FirstName + ", Your application for using HealthDesk has been approved. Login using User name:" + user.Username);

            }
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
                Role = user.DependentId != null ? "Dependent Patient" : role.Role.ToString(), // Role from the current iteration
                Status = role.Status,
                DependentName = user.DependentId == null && role.Role != Role.Physician ? user.DependentName : "",
                City = (role.Role == Role.Physician || role.Role == Role.Patient)
                    ? user.City
                    : user.ClinicCity
            }))
            .ToList();

        return userList;
    }

    public async Task<List<dynamic>> GetAllBrands()
    {
        // 1) load every Pharmaceutical record
        var allPharmas = await _pharmaceuticalRepository.GetAllAsync();

        var result = new List<dynamic>();

        foreach (var pharma in allPharmas)
        {
            // 2) lookup the submitting user
            var user = await _userRepository.GetByIdAsync(pharma.UserId);
            var submittedBy = user is not null
                ? $"{user.AuthFirstName} {user.AuthLastName}".Trim()
                : string.Empty;

            // 3) for each BrandLibrary entry, build a dynamic object
            foreach (var bl in pharma.BrandLibrary)
            {
                dynamic dto = new ExpandoObject();
                var dict = (IDictionary<string, object>)dto;

                dict["BrandName"] = bl.BrandName;
                dict["GenericName"] = bl.GenericName;
                dict["DrugClass"] = bl.DrugClass;
                dict["DosageForm"] = bl.DosageForm;
                dict["Strength"] = bl.Strength;
                dict["ApprovalAgency"] = bl.ApprovalAgency;
                dict["SubmittedBy"] = submittedBy;

                result.Add(dto);
            }
        }

        return result;
    }
}

