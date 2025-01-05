
using HealthDesk.Application.DTO;
using HealthDesk.Core;

namespace HealthDesk.Application;
public interface IPhysicianService
{
    Task<IEnumerable<Clinic>> GetClinicsAsync(string physicianId);
    Task AddOrUpdateClinicAsync(string physicianId, PhysicianClinicDto clinicDto);
    Task DeleteClinicAsync(string physicianId, string clinicId);

}
