
namespace HealthDesk.Application;
public interface IHospitalService
{
    Task<IEnumerable<PhysicianDto>> GetAllPhysiciansAsync(string id);
    Task AddPhysicianAsync(string id, string physicianId);
    Task DeletePhysicianAsync(string id, string physicianId);

    Task<IEnumerable<HospitalServiceDto>> GetAllServicesAsync(string id);
    Task SaveServiceAsync(string id, HospitalServiceDto dto);
    Task DeleteServiceAsync(string id, string serviceId);
}
