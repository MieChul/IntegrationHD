
using HealthDesk.Application.Interfaces;
using HealthDesk.Core;
using HealthDesk.Core.Enum;
using HealthDesk.Infrastructure;

namespace HealthDesk.Application;
public class AccountService : IAccountService
{
    private readonly IUserRepository _userRepository;
    private readonly IPhysicianRepository _physicianRepository;
    private readonly IPatientRepository _patientRepository;
    private readonly IHospitalRepository _hospitalRepository;
    private readonly ILaboratoryRepository _laboratoryRepository;
    private readonly IPharmacyRepository _pharmacyRepository;
    private readonly IMessageService _messageService;
    public AccountService(IUserRepository userRepository, IMessageService messageService, IPhysicianRepository physicianRepository, IPatientRepository patientRepository, IHospitalRepository hospitalRepository, ILaboratoryRepository laboratoryRepository, IPharmacyRepository pharmacyRepository)
    {
        _userRepository = userRepository;
        _messageService = messageService;
        _physicianRepository = physicianRepository;
        _hospitalRepository = hospitalRepository;
        _laboratoryRepository = laboratoryRepository;
        _patientRepository = patientRepository;
        _pharmacyRepository = pharmacyRepository;
    }

    public async Task<User> GetById(string id)
    {
        var userEntity = await _userRepository.GetByIdAsync(id);
        if (userEntity == null) throw new KeyNotFoundException("User not found");
        return userEntity;
    }


    public async Task RegisterUserInfo(string id, UpdateUserInfoRequestDto model)
    {

        var user = await _userRepository.GetByIdAsync(id);
        if (user != null)
        {
            user.Username = model.Username;
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
            user.Roles.ForEach(r =>
 {
     if (r.Role.ToString().ToLower() == model.Role)
     {
         // If no status is present and model.IsSave is true, set status to "Saved"
         if (string.IsNullOrEmpty(r.Status) && model.IsSave)
         {
             r.Status = "Saved";
         }
         // If status is already present and model.IsSave is true, retain the existing status
         else if (!string.IsNullOrEmpty(r.Status) && model.IsSave)
         {
             r.Status = r.Status;
         }
         // If model.IsSave is false, set status based on role
         else if (!model.IsSave)
         {
             r.Status = (r.Role == Role.Physician) ? "Submitted" : "Approved";
         }
     }
 });


            if (user.Roles.Any(u => u.Status == "Approved"))
                user.CanSwitch = true;


            user.ProfImage = model.ProfImage;
            user.ClinicImage = model.ClinicImage;
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

            user.NoDocConsentProvided = model.NoDocConsentProvided;
            await _userRepository.UpdateAsync(user);
            if (!string.IsNullOrEmpty(user.DependentId))
            {
                var userEntity = await _userRepository.GetByIdAsync(user.DependentId);
                userEntity.DependentName = $"{user.FirstName} {user.LastName}";
                await _userRepository.UpdateAsync(userEntity);
            }



            var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", user.Id);
            if (physician != null)
            {
                if (!physician.Clinics.Any())
                {
                    var physicianClinic = new Clinic()
                    {
                        Name = model.ClinicName,
                        FlatNumber = model.ClinicAddress1,
                        Building = model.ClinicAddress2,
                        Area = model.ClinicArea,
                        City = model.ClinicCity,
                        State = model.ClinicState,
                        PinCode = model.ClinicPincode,
                        IsDefault = true
                    };
                    physician.Clinics.Add(physicianClinic);
                }
                else
                {
                    var physicianClinic = physician.Clinics.Where(c => c.IsDefault).FirstOrDefault();
                    physicianClinic.Name = model.ClinicName;
                    physicianClinic.FlatNumber = model.ClinicAddress1;
                    physicianClinic.Building = model.ClinicAddress2;
                    physicianClinic.Area = model.ClinicArea;
                    physicianClinic.City = model.ClinicCity;
                    physicianClinic.State = model.ClinicState;
                    physicianClinic.PinCode = model.ClinicPincode;
                }
                await _physicianRepository.UpdateAsync(physician);
            }

            if (!model.IsSave)
            {
                _messageService.SendEmail("ganesh.divekar@gmail.com;raomithul@gmail.com", "HealthApp: New application has been submitted for review.", "Name :" + model.FirstName + " Mob:" + model.Mobile1);
            }
        }
    }

    public async Task<dynamic> SwithRole(string id, string role)
    {
        var userEntity = await _userRepository.GetByIdAsync(id);
        string roleId = string.Empty;
        if (userEntity == null) throw new KeyNotFoundException("User not found");

        if (userEntity.Roles.Any(r => r.Role.ToString().ToLower() == role && r.Status == "Approved"))
            return new { role = role, username = userEntity.Username, id = userEntity.Id, profImage = userEntity.ProfImage, status = "Approved", canswitch = userEntity.CanSwitch, dependentId = userEntity.DependentId, dependentName = userEntity.DependentName, hasDependent = userEntity.HasDependent };
        else if (CanSwitch(role, userEntity.Roles))
        {
            if (!userEntity.Roles.Any(r => r.Role.ToString().ToLower() == role))
            {
                if (Enum.TryParse(role, true, out Role roleSwitch)) // Case-insensitive conversion
                {
                    switch (roleSwitch)
                    {
                        case Role.Physician:
                            var physician = new Physician
                            {
                                UserId = id, // Link to the user
                                Clinics = new List<Clinic>(),
                                DesignPrescriptions = new List<DesignPrescription>(),
                                Patients = new List<PatientRecord>(),
                                MedicalCases = new List<MedicalCase>()
                            };
                            await _physicianRepository.AddAsync(physician);
                            roleId = physician.Id;
                            break;

                        case Role.Patient:
                            var patient = new Patient
                            {
                                UserId = id,
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

                        case Role.Hospital:
                            var hospital = new Hospital
                            {
                                UserId = id,
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
                                UserId = id,
                                LabTests = new List<LabTest>()
                            };
                            await _laboratoryRepository.AddAsync(laboratory);
                            roleId = laboratory.Id;
                            break;

                        case Role.Pharmacy:
                            var pharmacy = new Pharmacy
                            {
                                UserId = id,
                                Medicines = new List<Medicine>()
                            };
                            await _pharmacyRepository.AddAsync(pharmacy);
                            roleId = pharmacy.Id;
                            break;

                        default:
                            throw new InvalidOperationException("Unsupported role");
                    }
                    userEntity.Roles.Add(new UserRole { Id = roleId, Role = (Role)Enum.Parse(typeof(Role), role, true), Status = "New" });
                }
                _userRepository.UpdateAsync(userEntity);
            }

            return new { role = role, username = userEntity.Username, id = userEntity.Id, profImage = userEntity.ProfImage, status = "Confirm", canswitch = userEntity.CanSwitch, dependentId = userEntity.DependentId, dependentName = userEntity.DependentName, hasDependent = userEntity.HasDependent };
        }

        else
            throw new KeyNotFoundException("Cannot Switch");
    }

    private bool CanSwitch(string role, List<UserRole> currentRoles)
    {
        var roleCat1 = new HashSet<string> { "physician", "patient" };
        var roleCat2 = new HashSet<string> { "hospital", "laboratory", "pharmacy" };

        // Check if the role belongs to one of the categories
        bool isRoleInCat1 = roleCat1.Contains(role);
        bool isRoleInCat2 = roleCat2.Contains(role);

        // Ensure all current roles belong to one category only
        bool areCurrentRolesInCat1 = currentRoles.All(r => roleCat1.Contains(r.Role.ToString().ToLower()));
        bool areCurrentRolesInCat2 = currentRoles.All(r => roleCat2.Contains(r.Role.ToString().ToLower()));

        // Return true if both the role and currentRoles belong to the same category
        return (isRoleInCat1 && areCurrentRolesInCat1) || (isRoleInCat2 && areCurrentRolesInCat2);

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
            else if (!string.IsNullOrEmpty(model.ClinicImage))
                user.ClinicImage = model.ClinicImage;
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

    public async Task<UserDto> RefreshUserDetails(string id, string role)
    {
        var userEntity = await _userRepository.GetByIdAsync(id);
        if (userEntity == null) throw new KeyNotFoundException("User not found");

        var status = userEntity.Roles.Where(r => r.Role.ToString().ToLower() == role).FirstOrDefault()?.Status ?? "";
        var userDto = new UserDto();
        if (!string.IsNullOrEmpty(status))
        {
            userDto.Id = userEntity.Id;
            userDto.Username = userEntity.Username;
            userDto.Status = status;
            userDto.ProfImage = userEntity.ProfImage;
            userDto.CanSwitch = userEntity.CanSwitch;
            userDto.DependentId = userEntity.DependentId;
            userDto.DependentName = userEntity.DependentName;
            userDto.HasDependent = userEntity.HasDependent;
        }
        else
            throw new KeyNotFoundException("Role not found");

        return userDto;
    }

    public async Task<UserDto> AddDependent(string id)
    {
        // Fetch the parent user by ID
        var userEntity = await _userRepository.GetByIdAsync(id);
        if (userEntity == null)
            throw new KeyNotFoundException("User not found");

        // Check if a dependent already exists for this user
        User existingDependent = null;
        if (!string.IsNullOrEmpty(userEntity.DependentId))
            existingDependent = await _userRepository.GetByIdAsync(userEntity.DependentId);
        else
            existingDependent = await _userRepository.GetByDynamicPropertyAsync("DependentId", userEntity.Id);

        if (existingDependent != null)
        {
            // Map existing dependent to UserDto
            return new UserDto
            {
                Id = existingDependent.Id,
                Username = existingDependent.Username,
                Status = existingDependent.Roles?.FirstOrDefault()?.Status ?? "Unknown",
                ProfImage = existingDependent.ProfImage, // Populate if profile image exists
                CanSwitch = existingDependent.CanSwitch,
                DependentId = existingDependent.DependentId,
                DependentName = existingDependent.DependentName,
                HasDependent = existingDependent.HasDependent
            };
        }

        // Initialize a new dependent user
        var user = new User
        {
            PasswordHash = userEntity.PasswordHash,
            Mobile = userEntity.Mobile,
            Email = userEntity.Email,
            Username = userEntity.Username,
            DependentId = userEntity.Id,
            DependentName = $"{userEntity.FirstName} {userEntity.LastName}",
            HasDependent = false,
            CanSwitch = false
        };

        // Add the new dependent to the database
        try
        {

            await _userRepository.AddAsync(user);
            // Ensure the ID is retrieved
            if (string.IsNullOrEmpty(user.Id))
                throw new InvalidOperationException("Failed to retrieve the generated ID for the new user.");

            var roleId = string.Empty;
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
            user.Roles = new List<UserRole> { new UserRole { Id = roleId, Role = Role.Patient, Status = "New" } };
            await _userRepository.UpdateAsync(user);
            userEntity.HasDependent = true;
            userEntity.DependentName = $"{user.FirstName} {user.LastName}";
            await _userRepository.UpdateAsync(userEntity);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Failed to add the dependent user.", ex);
        }

        // Map the new user to a DTO
        var userDto = new UserDto
        {
            Id = user.Id,
            Username = userEntity.Username,
            Status = "New",
            ProfImage = "",
            CanSwitch = false,
            DependentId = user.DependentId,
            DependentName = $"{userEntity.FirstName} {userEntity.LastName}",
            HasDependent = false
        };

        return userDto;
    }
}
