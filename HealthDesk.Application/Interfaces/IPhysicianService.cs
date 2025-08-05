
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

    Task<IEnumerable<PrescriptionDto>> GetPrescriptionsAsync(string? physicianId, string patientId, bool getAll = false);
    Task<PatientHistoryDto> GetPatientHistoryAsync(string patientId);

    Task<string> AddPrescriptionAsync(PrescriptionDto dto);

    Task<dynamic> GetAllMedicalCasesAsync(string physicianId);
    Task<List<ImageDto>> SaveMedicalCaseAsync(MedicalCaseDto dto);
    Task DeleteMedicalCaseAsync(string physicianId, string caseId);
    Task<MedicalCase> GetMedicalCase(string userId, string id);
    Task<dynamic> GetUserDetailsAsync(string id);

    Task<DesignPrescriptionDto> LoadPrescriptionAsync(string physicianId, string prescriptionId);
    Task<int> GetDesignPrescriptionCountAsync(string physicianId);
    Task<dynamic> GetPatientByMobileAsync(string id, string mobile);
    Task<dynamic> GetDependentByMobileAsync(string mobile);

    Task<dynamic> GetPhysicianByMobileAsync(string mobile);
    Task<dynamic> GetDefaultPrescriptionHeaderFooter(string physicianId);
    Task<List<ProfileDTO>> GetProfilesAsync(string physicianId);
    Task SaveProfilesAsync(string physicianId, ProfileDTO profileDto);
    Task<int> GetPrescriptionCountAsync(string physicianId, string patientId);
    Task<string> GetLatestPrescriptionAsync(string physicianId, string patientId);
    Task<dynamic> GetClinicSlotsAsync(string physicianId, string clinicId, DateTime date);
    Task SaveMultipleAppointment(string status, DateTime? date, string? time, string? reason, List<AppointmentDto> dtos);
    Task DeleteProfileAsync(string physicianId, string profileId);

    Task<PhysicianInfoDto> GetPhysicianInfoAsync(string physicianId);
    Task SaveComment(string userId, string caseId, CommentDto dto);
    Task ToggleLikeAsync(string userId, string caseId, string likedUser);
    Task UpdatePreferencesAsync(string userId, List<string> preferences);
    Task<IEnumerable<SurveyDto>> GetSurveysSharedWithPhysicianAsync(string physicianId);
    Task<SurveyDto> GetSurveyByIdAsync(string surveyId);
    Task SaveSurveyResponseAsync(string surveyId, SurveyResponseDto responseDto);
}
