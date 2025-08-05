
using HealthDesk.Core;

namespace HealthDesk.Application;

public interface IHospitalService
{
    Task<IEnumerable<PhysicianRecordDto>> GetAllPhysiciansAsync(string hospitalId);
    Task SavePhysicianAsync(string hospitalId, PhysicianRecordDto dto);
    Task DeletePhysicianAsync(string hospitalId, string physicianId);
    Task<dynamic> GetPhysicanByMobileAsync(string mobile);
    Task<IEnumerable<ServiceDto>> GetAllServicesAsync(string id);
    Task SaveServiceAsync(string id, List<ServiceDto> dtos);
    Task DeleteServiceAsync(string id, string serviceId);
    Task<dynamic> GetAllMedicalCasesAsync(string hospitalId);
    Task<List<ImageDto>> SaveMedicalCaseAsync(MedicalCaseDto dto);
    Task DeleteMedicalCaseAsync(string hospitalId, string caseId);
    Task<MedicalCase> GetMedicalCase(string userId, string id);
    Task<HospitalInfoDto> GetHospitalInfoAsync(string hospitalId);
    Task SaveComment(string userId, string medicalCaseId, CommentDto dto);
    Task ToggleLikeAsync(string medicalCaseUserId, string medicalCaseId, string userId);
    Task UpdatePreferencesAsync(string userId, List<string> preferences);

}
