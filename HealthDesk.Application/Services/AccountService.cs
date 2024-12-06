
using HealthDesk.Application.Interfaces;
using HealthDesk.Core;
using static HealthDesk.Application.UserRegistrationDto;

namespace HealthDesk.Application.Services;
public class AccountService : IAccountService
{
    private readonly IUserRepository _userRepository;
    private readonly IMessageService _messageService;
    public AccountService(IUserRepository userRepository, IMessageService messageService)
    {
        _userRepository = userRepository;
        _messageService = messageService;
    }

    public async Task<List<User>> GetAll()
    {
        var user = await _userRepository.GetAllAsync();
        return user.ToList();
    }

    public async Task<User> GetById(string id)
    {
        var userEntity = await _userRepository.GetByIdAsync(id);
        if (userEntity == null) throw new KeyNotFoundException("User not found");
        // var userDto = new UpdateUserInfoRequestDto();
        // GenericMapper.Map<User, UpdateUserInfoRequestDto>(userEntity, userDto);
        // userDto.Role = userEntity.Roles.FirstOrDefault().ToString().ToLower();
        userEntity.Role=userEntity.Roles.FirstOrDefault().ToString().ToLower();
        return userEntity;
    }

    public void RegisterPatientInfo(string id, RegisterPatientInfoDto model)
    {
        throw new NotImplementedException();
    }

    public async Task RegisterUserInfo(string id, UpdateUserInfoRequestDto model)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user != null)
        {
            user.DisplayName = model.DisplayName;
            user.FirstName = model.FirstName;
            user.MiddleName = model.MiddleName;
            user.LastName = model.LastName;
            user.Gender = model.Gender;
            user.Mobile = model.Mobile1;
            user.Mobile2 = model.Mobile2;
            user.Email = model.Email1;
            user.Email2 = model.Email2;
            user.Aadhar = model.Aadhar;
            user.Pan = model.Pan;
            user.Address1 = model.Address1;
            user.Address2 = model.Address2;
            user.City = model.City;
            user.State = model.State;
            user.Area = model.Area;
            user.Pincode = model.Pincode;
            user.BirthDate = model.BirthDate;
            user.ClinicName = model.ClinicName;
            user.ClinicAddress1 = model.ClinicAddress1;
            user.ClinicAddress2 = model.ClinicAddress2;
            user.ClinicArea = model.ClinicArea;
            user.ClinicCity = model.ClinicCity;
            user.ClinicState = model.ClinicState;
            user.ClinicPincode = model.ClinicPincode;
            user.OrgName = model.OrgName;
            user.AuthFirstName = model.AuthFirstName;
            user.AuthMiddleName = model.AuthMiddleName;
            user.AuthLastName = model.AuthLastName;
            user.AuthDesignation = model.AuthDesignation;
            user.AuthDept = model.AuthDept;
            user.LandLine = model.LandLine;
            user.AuthMob = model.AuthMob;
            user.AuthEmail = model.AuthEmail;
            user.Status = model.IsSave ? "Saved" : "Submitted";
            user.ProfImage = model.ProfImage;
            if (model.DOB != null)
            {
                user.DOB = new DOBEntity
                {
                    Day = model.DOB.Day,
                    Month = model.DOB.Month,
                    Year = model.DOB.Year
                };
            }

            user.BloodGroup = model.BloodGroup;
            user.RelationId = model.RelationId;

            if (model.Graduation != null)
            {
                user.Graduation = new G
                {
                    Year = model.Graduation.Year,
                    Institute = model.Graduation.Institute,
                    Document = model.Graduation.Document
                };
            }

            if (model.PostGraduation != null)
            {
                user.PostGraduation = new G
                {
                    Year = model.PostGraduation.Year,
                    Institute = model.PostGraduation.Institute,
                    Document = model.PostGraduation.Document
                };
            }

            if (model.AdditionalQualification != null)
            {
                user.AdditionalQualification = new G
                {
                    Year = model.AdditionalQualification.Year,
                    Institute = model.AdditionalQualification.Institute,
                    Document = model.AdditionalQualification.Document
                };
            }

            if (model.SuperSpecialization != null)
            {
                user.SuperSpecialization = new G
                {
                    Year = model.SuperSpecialization.Year,
                    Institute = model.SuperSpecialization.Institute,
                    Document = model.SuperSpecialization.Document
                };
            }

            if (model.MedicalRegistration != null)
            {
                user.MedicalRegistration = new MR
                {
                    CouncilName = model.MedicalRegistration.CouncilName,
                    CertificateNumber = model.MedicalRegistration.CertificateNumber,
                    Document = model.MedicalRegistration.Document
                };
            }


            await _userRepository.UpdateAsync(user);

            if (!model.IsSave)
            {
                _messageService.SendEmail("ganesh.divekar@gmail.com;raomithul@gmail.com", "HealthApp: New application has been submitted for review.", "Name :" + model.FirstName + " Mob:" + model.Mobile1);
            }
        }
    }

    public async Task Update(string id, UpdateRequestDto model)
    {
        var user = await _userRepository.GetByIdAsync(id);

        // validate
        if (model.Username != user.Username && _userRepository.GetByUsernameAsync(model.Username) != null)
            throw new Exception("Username '" + model.Username + "' is already taken");

        // hash password if it was entered
        if (!string.IsNullOrEmpty(model.Password))
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

        if (string.IsNullOrEmpty(model.Username))
        {
            // if (!string.IsNullOrEmpty(model.Role))
            //     user.Role = model.Role;
            if (!string.IsNullOrEmpty(model.ProfImage))
                user.ProfImage = model.ProfImage;
            else if (!string.IsNullOrEmpty(model.GDoc))
                user.Graduation.Document = model.GDoc;
            else if (!string.IsNullOrEmpty(model.PDoc))
                user.PostGraduation.Document = model.PDoc;
            else if (!string.IsNullOrEmpty(model.ADoc))
                user.AdditionalQualification.Document = model.ADoc;
            else if (!string.IsNullOrEmpty(model.MDoc))
                user.MedicalRegistration.Document = model.MDoc;
            else if (!string.IsNullOrEmpty(model.SDoc))
                user.SuperSpecialization.Document = model.SDoc;
        }
        else
        {
            user.Username = model.Username;
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
        }
        await _userRepository.UpdateAsync(user);
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
        }

    }
}
