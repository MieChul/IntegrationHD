
using HealthDesk.Application.DTO;
using HealthDesk.Core;

namespace HealthDesk.Application;
public interface IPhysicianService
{
    Task<IEnumerable<Clinic>> GetClinicsAsync(string physicianId);
    Task AddOrUpdateClinicAsync(string physicianId, PhysicianClinicDto clinicDto);
    Task DeleteClinicAsync(string physicianId, string clinicId);
    Task<dynamic> GetAllDesignPrescriptionsAsync(string physicianId);
    Task SaveDesignPrescriptionAsync(string physicianId, DesignPrescriptionDto dto);
    Task DeleteDesignPrescriptionAsync(string physicianId, string prescriptionId);

    Task<IEnumerable<PatientRecordDto>> GetAllPatientsAsync(string physicianId);
    Task SavePatientAsync(string physicianId, PatientRecordDto dto);
    Task DeletePatientAsync(string physicianId, string patientId);

    Task<IEnumerable<PrescriptionDto>> GetPrescriptionsAsync(string physicianId, string patientId);

    Task<string> AddPrescriptionAsync(PrescriptionDto dto);

    Task<IEnumerable<MedicalCaseDto>> GetAllMedicalCasesAsync(string physicianId);
    Task SaveMedicalCaseAsync(string physicianId, MedicalCaseDto dto);
    Task DeleteMedicalCaseAsync(string physicianId, string caseId);

    Task IncrementLikesAsync(string physicianId, string caseId);

    Task<dynamic> GetUserDetailsAsync(string id);

    Task<DesignPrescriptionDto> LoadPrescriptionAsync(string physicianId, string prescriptionId);
    Task<int> GetDesignPrescriptionCountAsync(string physicianId);
    Task<dynamic> GetPatientByMobileAsync(string id, string mobile);
    Task<dynamic> GetDefaultPrescriptionHeaderFooter(string physicianId);
    Task<List<ProfileDTO>> GetProfilesAsync(string physicianId);
    Task SaveProfilesAsync(string physicianId, List<ProfileDTO> profileDtos);
    Task<int> GetPrescriptionCountAsync(string physicianId, string patientId);
    Task<string> GetLatestPrescriptionAsync(string physicianId, string patientId);
    Task<dynamic> GetClinicSlotsAsync(string physicianId, string clinicId, DateTime date);
    Task SaveMultipleAppointment(string status, DateTime? date, string? time, string? reason, List<AppointmentDto> dtos);
}
