
namespace HealthDesk.Application;
public interface IHospitalService
{
    Task<IEnumerable<PhysicianRecordDto>> GetAllPhysiciansAsync(string hospitalId);
    Task SavePhysicianAsync(string hospitalId, PhysicianRecordDto dto);
    Task DeletePhysicianAsync(string hospitalId, string physicianId);
    Task<dynamic> GetPhysicanByMobileAsync(string mobile);

    Task<IEnumerable<ServiceDto>> GetAllServicesAsync(string id);
    Task SaveServiceAsync(string id, ServiceDto dto);
    Task DeleteServiceAsync(string id, string serviceId);
}
