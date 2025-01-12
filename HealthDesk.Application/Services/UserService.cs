using System.Net.Mail;
using HealthDesk.Core;
using HealthDesk.Core.Enum;
using HealthDesk.Infrastructure;

namespace HealthDesk.Application;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IPhysicianRepository _physicianRepository;
    private readonly IPatientRepository _patientRepository;
    private readonly IPharmaceuticalRepository _pharmaceuticalRepository;
    private readonly IHospitalRepository _hospitalRepository;
    private readonly ILaboratoryRepository _laboratoryRepository;
    private readonly IPharmacyRepository _pharmacyRepository;

    public UserService(IUserRepository userRepository, IRefreshTokenRepository refreshTokenRepository, IPhysicianRepository physicianRepository, IPatientRepository patientRepository, IPharmaceuticalRepository pharmaceuticalRepository, IHospitalRepository hospitalRepository, ILaboratoryRepository laboratoryRepository, IPharmacyRepository pharmacyRepository)
    {
        _userRepository = userRepository;
        _refreshTokenRepository = refreshTokenRepository;
        _physicianRepository = physicianRepository;
        _patientRepository = patientRepository;
        _pharmaceuticalRepository = pharmaceuticalRepository;
        _hospitalRepository = hospitalRepository;
        _laboratoryRepository = laboratoryRepository;
        _pharmacyRepository = pharmacyRepository;
    }

    public async Task<string?> GetUsernameAsync(string contact)
    {
        var isEmail = false;

        try
        {
            var mailAddress = new MailAddress(contact);
            isEmail = mailAddress.Address == contact;
        }
        catch
        {
            isEmail = false;
        }
        var user = await _userRepository.GetByEmailOrMobileAsync(contact, isEmail);

        return user?.Username;
    }


    public async Task<bool> IsTaken(string name, string value)
    {
        var found = await _userRepository.GetByDynamicPropertyAsync(name, value);
        return found != null && !string.IsNullOrEmpty(found.Username);
    }

    public async Task<string> Register(UserRegistrationDto userDto)
    {
        // Step 1: Map and create the user
        var user = new User();
        GenericMapper.Map<UserRegistrationDto, User>(userDto, user);
        user.Roles = new List<UserRole>();
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

        // Step 2: Create a role-specific entry
        var role = (Role)userDto.RoleId;
        string roleId = string.Empty;

        switch (role)
        {
            case Role.Physician:
                var physician = new Physician
                {
                    UserId = user.Id, // Link to the user
                    Clinics = new List<Clinic>(),
                    DesignPrescriptions = new List<DesignPrescription>(),
                    Patients = new List<PatientRecord>(),
                    MedicalCases = new List<MedicalCase>()
                };
                await _physicianRepository.AddAsync(physician);
                roleId = physician.Id; // Retrieve the generated Id
                break;

            case Role.Patient:
                var patient = new Patient
                {
                    UserId = user.Id,
                    MedicalHistory = new List<MedicalHistory>(),
                    CurrentTreatments = new List<Treatment>(),
                    Appointments = new List<Appointment>(),
                    SelfRecords = new List<SelfRecord>(),
                    Symptoms = new List<Symptom>(),
                    LabInvestigations = new List<LabInvestigation>(),
                    Immunizations = new List<Immunization>(),
                    Compliance = new List<Compliance>(),
                    Activities = new List<Activity>(),
                    PatientInfo = new PatientInfo(),
                    HomeRemedies = new List<HomeRemedy>(),
                    Reports = new List<Report>()
                };
                await _patientRepository.AddAsync(patient);
                roleId = patient.Id;
                break;

            case Role.Pharmaceutical:
                var pharmaceutical = new Pharmaceutical
                {
                    UserId = user.Id,
                    BrandLibrary = new List<BrandLibrary>(),
                    Surveys = new List<Survey>()
                };
                await _pharmaceuticalRepository.AddAsync(pharmaceutical);
                roleId = pharmaceutical.Id;
                break;

            case Role.Hospital:
                var hospital = new Hospital
                {
                    UserId = user.Id,
                    Physicians = new List<string>(),
                    Services = new List<Service>(),
                    MedicalCases = new List<MedicalCase>()
                };
                await _hospitalRepository.AddAsync(hospital);
                roleId = hospital.Id;
                break;

            case Role.Laboratory:
                var laboratory = new Laboratory
                {
                    UserId = user.Id,
                    LabTests = new List<LabTest>()
                };
                await _laboratoryRepository.AddAsync(laboratory);
                roleId = laboratory.Id;
                break;

            case Role.Pharmacy:
                var pharmacy = new Pharmacy
                {
                    UserId = user.Id,
                    Medicines = new List<Medicine>()
                };
                await _pharmacyRepository.AddAsync(pharmacy);
                roleId = pharmacy.Id;
                break;

            default:
                throw new InvalidOperationException("Unsupported role");
        }

        // Step 3: Add the role to the user with the role-specific entity ID
        user.Roles.Add(new UserRole
        {
            Role = role,
            Status = "New",
            Id = roleId // Add the newly created entity's Id
        });

        // Step 4: Save the user with the updated roles
        await _userRepository.AddAsync(user);

        return user.Id;
    }

    public async Task<bool> ResetPasswordAsync(string contact, string newPassword, bool isEmail = false)
    {
        var user = await _userRepository.GetByEmailOrMobileAsync(contact, isEmail);
        if (user == null) return false;

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
        await _userRepository.UpdateAsync(user);
        return true;
    }
}
