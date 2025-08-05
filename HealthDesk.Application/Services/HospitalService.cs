using HealthDesk.Core;
using HealthDesk.Core.Enum;
using HealthDesk.Infrastructure;

namespace HealthDesk.Application;

public class HospitalService : IHospitalService
{

    private readonly IHospitalRepository _hospitalRepository;
    private readonly IUserRepository _userRepository;
    private readonly IUserService _userService;
    private readonly IMessageService _messageService;
    private readonly IPhysicianRepository _physicianRepository;
    private readonly Random _random = new Random();
    public HospitalService(IHospitalRepository hospitalRepository, IMessageService messageService, IUserRepository userRepository, IUserService userService, IPhysicianRepository physicianRepository)
    {
        _hospitalRepository = hospitalRepository;
        _messageService = messageService;
        _userRepository = userRepository;
        _userService = userService;
        _physicianRepository = physicianRepository;
    }
    // 1. Get all physicians for a hospital
    public async Task<IEnumerable<PhysicianRecordDto>> GetAllPhysiciansAsync(string hospitalId)
    {
        var hospital = await GetHospitalByIdAsync(hospitalId);
        var physicians = new List<PhysicianRecordDto>();
        foreach (var p in hospital.Physicians)
        {
            var user = await _userRepository.GetByIdAsync(p.UserId);
            var physician = new PhysicianRecordDto()
            {
                Id = p.Id,
                UserId = p.UserId,
                FirstName = user.FirstName,
                MiddleName = user.MiddleName,
                LastName = user.LastName,
                Gender = user.Gender,
                Mobile = user.Mobile,
                Speciality = user.Speciality,
                Graduation = user.Graduation?.Name ?? string.Empty,
                PostGraduation = user.PostGraduation?.Name ?? string.Empty,
                SuperSpecialization = user.SuperSpecialization?.Name ?? string.Empty,
                AdditionalQualification = user.AdditionalQualification?.Name ?? string.Empty,
                From = p.From,
                To = p.To,
                Days = p.Days,
                IsActive = p.IsActive,
                DateOfBirth = user.BirthDate
            };
            physicians.Add(physician);
        }
        ;

        return physicians;
    }

    public async Task SavePhysicianAsync(string hospitalId, PhysicianRecordDto dto)
    {
        var hospital = await GetHospitalByIdAsync(hospitalId);
        var existingUser = await GetPhysicanByMobileAsync(dto.Mobile);
        if (existingUser == null)
        {
            var physicians = await _physicianRepository.GetAllAsync();
            var user = new UserRegistrationDto
            {
                Username = "phy_" + dto.FirstName + '_' + dto.LastName + '_' + (physicians.Count() + 1),
                RoleId = 1,
                Password = GenerateRandomString(),
                Mobile = dto.Mobile,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                MiddleName = dto.MiddleName ?? string.Empty,
                Gender = dto.Gender,
                DOB = Convert.ToDateTime(dto.DateOfBirth),
                Speciality = dto.Speciality,
                SuperSpecialization = dto.SuperSpecialization,
                AdditionalQualification = dto.AdditionalQualification,
                PostGraduation = dto.PostGraduation
            };
            var id = await _userService.Register(user);
            dto.UserId = id;
            _messageService.SendSms(dto.Mobile, "Hi, Welcome to HealthDesk. Your profile is created with Username: " + user.Username + " and Password: " + user.Password);
        }
        else if (string.IsNullOrEmpty(dto.Id))
        {
            dto.UserId = existingUser.UserId;
        }

        var physician = GenericMapper.Map<PhysicianRecordDto, PhysicianRecord>(dto);

        if (string.IsNullOrEmpty(dto.Id))
        {
            hospital.Physicians.Add(physician);
        }
        else
        {
            var existing = hospital.Physicians.FirstOrDefault(p => p.Id == dto.Id);
            if (existing != null) GenericMapper.Map(dto, existing);
        }

        await _hospitalRepository.UpdateAsync(hospital);
    }

    // 3. Delete a physician from the hospital
    public async Task DeletePhysicianAsync(string hospitalId, string physicianId)
    {
        var hospital = await _hospitalRepository.GetByIdAsync(hospitalId);
        RemoveIfNotExpired(hospital.Physicians, r => r.Id == physicianId);
        await _hospitalRepository.UpdateAsync(hospital);
    }

    private string GenerateRandomString(int length = 8)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return new string(Enumerable.Repeat(chars, length)
                                    .Select(s => s[_random.Next(s.Length)]).ToArray());
    }

    // 4. Get all services for a hospital
    public async Task<IEnumerable<ServiceDto>> GetAllServicesAsync(string id)
    {
        var hospital = await GetHospitalByIdAsync(id);
        return hospital.Services.Select(service => GenericMapper.Map<Service, ServiceDto>(service));
    }

    // 5. Save or update a service
    public async Task SaveServiceAsync(string id, List<ServiceDto> dtos)
    {
        var hospital = await GetHospitalByIdAsync(id);
        foreach (var dto in dtos)
        {
            var service = new Service();
            GenericMapper.Map(dto, service);

            if (string.IsNullOrEmpty(dto.Id))
            {
                // Add a new service
                hospital.Services.Add(service);
            }
            else
            {
                // Update an existing service
                var existingService = hospital.Services.FirstOrDefault(s => s.Id == dto.Id);
                if (existingService == null)
                    throw new ArgumentException("Service not found.");

                GenericMapper.Map(dto, existingService);
            }

            await _hospitalRepository.UpdateAsync(hospital);
        }

    }

    // 6. Delete a service
    public async Task DeleteServiceAsync(string id, string serviceId)
    {
        var hospital = await GetHospitalByIdAsync(id);

        var serviceToRemove = hospital.Services.FirstOrDefault(s => s.Id == serviceId);
        if (serviceToRemove == null)
            throw new ArgumentException("Service not found.");

        hospital.Services.Remove(serviceToRemove);
        await _hospitalRepository.UpdateAsync(hospital);
    }

    // Helper method to get hospital by UserId
    private async Task<Hospital> GetHospitalByIdAsync(string id)
    {
        var hospital = await _hospitalRepository.GetByDynamicPropertyAsync("UserId", id);
        if (hospital == null)
            throw new ArgumentException("Hospital not found.");

        return hospital;
    }
    public async Task<dynamic> GetPhysicanByMobileAsync(string mobile)
    {
        // Retrieve user based on the mobile number
        var user = await _userRepository.GetByDynamicPropertyAsync("Mobile", mobile);

        // Check if the user has a Patient role
        if (user != null && user.Roles.Any(r => r.Role == Role.Physician))
        {
            // Return patient details if found
            return new
            {
                UserId = user.Id,
                FirstName = user.FirstName,
                MiddleName = user.MiddleName,
                LastName = user.LastName,
                Gender = user.Gender,
                DateOfBirth = user.BirthDate,
                Mobile = user.Mobile,
                Speciality = user.Speciality,
                Graduation = user.Graduation?.Name ?? string.Empty,
                PostGraduation = user.PostGraduation?.Name ?? string.Empty,
                SuperSpecialization = user.SuperSpecialization?.Name ?? string.Empty,
                AdditionalQualification = user.AdditionalQualification?.Name ?? string.Empty
            };
        }

        // Return null if user does not exist or does not have the Patient role
        return null;
    }

    private void RemoveIfNotExpired<T>(List<T> items, Func<T, bool> predicate) where T : class
    {
        var currentTime = DateTime.UtcNow;
        var toRemove = items
            .Where(item => predicate(item) &&
                           (item.GetType().GetProperty("CreateDate")?.GetValue(item) is DateTime createDate) &&
                           (currentTime - createDate).TotalHours <= 1)
            .ToList();

        if (toRemove.Any())
        {
            items.RemoveAll(i => toRemove.Contains(i));
        }
        else
        {
            throw new InvalidOperationException("Cannot remove item(s) as they were created more than 1 hour ago. Please contact admin.");
        }
    }

    public async Task<dynamic> GetAllMedicalCasesAsync(string hospitalId)
    {
        var medicalCases = _hospitalRepository.GetAllCases();
        var medicalCasesWithThumbnail = medicalCases.Select(r => new
        {
            r.Id,
            r.Name,
            r.CaseSummary,
            r.UserId,
            r.CaseImages,
            r.Comments,
            r.CreateDate,
            r.Speciality,
            r.Diagnosis,
            r.PatientInitials,
            r.Age,
            r.Complaints,
            r.PastHistory,
            r.Examination,
            r.Investigations,
            r.Treatment,
            r.SubmittedBy,
            r.LikedBy,
            ThumbnailUrl = r.CaseImages.FirstOrDefault(i => i.IsDefault)?.ImageUrl,
            LikedCount = r.LikedBy?.Count ?? 0
        });

        var yourmedicalCases = medicalCasesWithThumbnail.Where(r => r.UserId == hospitalId);

        return new
        {
            Others = medicalCasesWithThumbnail,
            Yours = yourmedicalCases
        };
    }

    public async Task<List<ImageDto>> SaveMedicalCaseAsync(MedicalCaseDto dto)
    {
        var hospital = await _hospitalRepository.GetByDynamicPropertyAsync("UserId", dto.UserId);
        var user = await _userRepository.GetByIdAsync(dto.UserId);
        var medicalCase = new MedicalCase();
        if (!string.IsNullOrEmpty(dto.Id))
            medicalCase = hospital.MedicalCases.FirstOrDefault(mc => mc.Id == dto.Id);

        GenericMapper.Map<MedicalCaseDto, MedicalCase>(dto, medicalCase);

        medicalCase.CaseImages = new List<CaseImage>();
        var count = 0;
        foreach (var img in dto.Images)
        {
            if (!string.IsNullOrEmpty(img.Image))
            {
                img.ImageName = $@"{medicalCase.Id}_image{count++}.png";
                medicalCase.CaseImages.Add(new CaseImage
                {
                    ImageUrl = $@"/assets/documents/{dto.UserId}/medical_cases/{img.ImageName}",
                    IsDefault = img.IsDefault
                });
            }

        }

        medicalCase.SubmittedBy = user.OrgName;
        if (string.IsNullOrEmpty(dto.Id))
            hospital.MedicalCases.Add(medicalCase);

        await _hospitalRepository.UpdateAsync(hospital);
        return dto.Images;
    }

    public async Task DeleteMedicalCaseAsync(string hospitalId, string caseId)
    {
        var hospital = await _hospitalRepository.GetByIdAsync(hospitalId);
        RemoveIfNotExpired(hospital.MedicalCases, r => r.Id == caseId);
        await _hospitalRepository.UpdateAsync(hospital);
    }

    public async Task<MedicalCase> GetMedicalCase(string userId, string id)
    {
        var hospital = await _hospitalRepository.GetByDynamicPropertyAsync("UserId", userId);
        if (hospital == null)
            throw new ArgumentException("hospital not found.");

        return hospital.MedicalCases.Where(h => h.Id == id).FirstOrDefault();
    }

    public async Task<HospitalInfoDto> GetHospitalInfoAsync(string hospitalId)
    {
        var hospital = await _hospitalRepository.GetByDynamicPropertyAsync("UserId", hospitalId);
        if (hospital.HospitalInfo == null)
            hospital.HospitalInfo = new HospitalInfo() { Preferences = new List<string>() };

        return GenericMapper.Map<HospitalInfo, HospitalInfoDto>(hospital.HospitalInfo);
    }

    public async Task SaveComment(string userId, string medicalCaseId, CommentDto dto)
    {
        var hospital = await _hospitalRepository.GetByDynamicPropertyAsync("UserId", userId);
        var user = await _userRepository.GetByIdAsync(dto.UserId);
        if (hospital == null)
            throw new ArgumentException("Hospital not found.");
        var comment = new Comment();
        if (!string.IsNullOrEmpty(dto.Id))
            comment = hospital.MedicalCases?.FirstOrDefault(h => h.Id == medicalCaseId)?.Comments?.FirstOrDefault(c => c.Id == dto.Id) ?? new Comment();
        GenericMapper.Map<CommentDto, Comment>(dto, comment);
        comment.SubmittedBy = user.FirstName + " " + user.LastName;
        if (string.IsNullOrEmpty(dto.Id))
        {
            var medicalCase = hospital.MedicalCases?.FirstOrDefault(h => h.Id == medicalCaseId);
            if (medicalCase != null)
            {
                medicalCase.Comments ??= new List<Comment>();
                medicalCase.Comments.Add(comment);

            }

        }
        await _hospitalRepository.UpdateAsync(hospital);
    }

    public async Task ToggleLikeAsync(string medicalCaseUserId, string medicalCaseId, string userId)
    {
        var hospital = await _hospitalRepository.GetByDynamicPropertyAsync("UserId", medicalCaseUserId);
        if (hospital == null)
            throw new ArgumentException("Hospital not found.");

        var medicalCase = hospital.MedicalCases?.FirstOrDefault(h => h.Id == medicalCaseId);
        if (medicalCase == null)
            throw new ArgumentException("Medical Case not found.");

        medicalCase.LikedBy ??= new List<string>();

        if (medicalCase.LikedBy.Contains(userId))
            medicalCase.LikedBy.Remove(userId);
        else
            medicalCase.LikedBy.Add(userId);

        await _hospitalRepository.UpdateAsync(hospital);
    }

    public async Task UpdatePreferencesAsync(string userId, List<string> preferences)
    {
        var hospital = await _hospitalRepository.GetByDynamicPropertyAsync("UserId", userId);
        if (hospital == null)
            throw new ArgumentException("Patient not found.");
        if (hospital.HospitalInfo == null)
            hospital.HospitalInfo = new HospitalInfo();
        hospital.HospitalInfo.Preferences = new List<string>();
        hospital.HospitalInfo.Preferences.AddRange(preferences);
        await _hospitalRepository.UpdateAsync(hospital);
    }

}