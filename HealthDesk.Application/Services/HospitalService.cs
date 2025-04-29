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
                Graduation = user.Graduation.Name,
                PostGraduation = user.PostGraduation.Name ?? string.Empty,
                SuperSpecialization = user.SuperSpecialization.Name ?? string.Empty,
                AdditionalQualification = user.AdditionalQualification.Name ?? string.Empty,
                From = p.From,
                To = p.To,
                Days = p.Days,
                IsActive = p.IsActive
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
}