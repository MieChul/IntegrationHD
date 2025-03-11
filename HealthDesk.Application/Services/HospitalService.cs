using HealthDesk.Core;
using HealthDesk.Infrastructure;

namespace HealthDesk.Application;

public class HospitalService : IHospitalService
{

    private readonly IHospitalRepository _hospitalRepository;
    private readonly IMessageService _messageService;
    public HospitalService(IHospitalRepository hospitalRepository, IMessageService messageService)
    {
        _hospitalRepository = hospitalRepository;
        _messageService = messageService;
    }
    // 1. Get all physicians for a hospital
    public async Task<IEnumerable<PhysicianDto>> GetAllPhysiciansAsync(string id)
    {
        var hospital = await GetHospitalByIdAsync(id);
        return hospital.Physicians.Select(physicianId => new PhysicianDto { Id = physicianId });
    }

    // 2. Add a physician to the hospital
    public async Task AddPhysicianAsync(string id, string physicianId)
    {
        var hospital = await GetHospitalByIdAsync(id);

        if (hospital.Physicians.Contains(physicianId))
            throw new ArgumentException("Physician already exists in the hospital.");

        hospital.Physicians.Add(physicianId);
        await _hospitalRepository.UpdateAsync(hospital);
    }

    // 3. Delete a physician from the hospital
    public async Task DeletePhysicianAsync(string id, string physicianId)
    {
        var hospital = await GetHospitalByIdAsync(id);

        if (!hospital.Physicians.Contains(physicianId))
            throw new ArgumentException("Physician not found in the hospital.");

        hospital.Physicians.Remove(physicianId);
        await _hospitalRepository.UpdateAsync(hospital);
    }

    // 4. Get all services for a hospital
    public async Task<IEnumerable<ServiceDto>> GetAllServicesAsync(string id)
    {
        var hospital = await GetHospitalByIdAsync(id);
        return hospital.Services.Select(service => GenericMapper.Map<Service, ServiceDto>(service));
    }

    // 5. Save or update a service
    public async Task SaveServiceAsync(string id, ServiceDto dto)
    {
        var hospital = await GetHospitalByIdAsync(id);

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
        var hospital = await _hospitalRepository.GetByIdAsync(id);
        if (hospital == null)
            throw new ArgumentException("Hospital not found.");

        return hospital;
    }

    Task<IEnumerable<ServiceDto>> IHospitalService.GetAllServicesAsync(string id)
    {
        throw new NotImplementedException();
    }
}