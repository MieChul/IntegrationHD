

using HealthDesk.Core;
using HealthDesk.Core.Enum;

namespace HealthDesk.Application;

public interface IPatientService
{
    Task<IEnumerable<MedicalHistoryDto>> GetMedicalHistoryAsync(string patientId);
    Task SaveMedicalHistoryAsync(string patientId, MedicalHistoryDto dto);
    Task DeleteMedicalHistoryAsync(string patientId, string historyId);

    // 2. Current Treatments
    Task<IEnumerable<CurrentTreatmentDto>> GetCurrentTreatmentsAsync(string patientId);
    Task SaveCurrentTreatmentAsync(string patientId, CurrentTreatmentDto dto);
    Task DeleteCurrentTreatmentAsync(string patientId, string treatmentId);

    // 3. Appointments
    Task<IEnumerable<AppointmentDto>> GetAppointmentsAsync(string patientId, bool isPhysician = false);
    Task SaveAppointmentAsync(string patientId, AppointmentDto dto);
    Task UpdateAppointmentStatus(string patientId, string appointmentId, string status);

    // 4. Self Records
    Task<IEnumerable<SelfRecordDto>> GetSelfRecordsAsync(string patientId);
    Task SaveSelfRecordAsync(string patientId, SelfRecordDto dto);
    Task DeleteSelfRecordAsync(string patientId, string recordId);

    // 5. Symptoms
    Task<IEnumerable<SymptomDto>> GetSymptomsAsync(string patientId);
    Task SaveSymptomAsync(string patientId, SymptomDto dto);
    Task DeleteSymptomAsync(string patientId, string symptomId);

    // 6. Lab Investigations
    Task<IEnumerable<LabInvestigationDto>> GetLabInvestigationsAsync(string patientId);
    Task SaveLabInvestigationsAsync(string patientId, LabInvestigationDto dto);
    Task DeleteLabInvestigationAsync(string patientId, string investigationId);

    // 7. Reports
    Task<IEnumerable<ReportDto>> GetReportsAsync(string patientId);
    Task<(Patient patient, Report investigation)> GetPatientAndPreparedInvestigationAsync(string patientId, ReportDto dto);
    Task SavePatientAsync(Patient patient);
    Task DeleteReportAsync(string patientId, string reportId);

    // 8. Immunizations
    Task<IEnumerable<ImmunizationDto>> GetImmunizationsAsync(string patientId);
    Task SaveImmunizationAsync(string patientId, ImmunizationDto dto);
    Task DeleteImmunizationAsync(string patientId, string immunizationId);

    // 9. Patient Info
    Task<PatientInfoDto> GetPatientInfoAsync(string patientId);
    Task UpdatePatientInfoAsync(string patientId, PatientInfoDto dto);
    Task<IEnumerable<ActivityDto>> GetActivitiesAsync(string patientId);
    Task AddOrUpdateActivityAsync(string patientId, ActivityDto dto);
    Task DeleteActivityAsync(string patientId, string activityId);
    Task<IEnumerable<ReminderDto>> GetRemindersAsync(string patientId);
    Task AddOrUpdateReminderAsync(string patientId, ReminderDto dto);
    Task DeleteReminderAsync(string patientId, string reminderId);
    Task<dynamic> GetPhysicians();
    Task<IEnumerable<PatientComplianceDto>> GetComplianceAsync(string patientId);
    Task AddOrUpdateMedicalInfoAsync(string patientId, string treatmentId, PatientMedicineInfoDto dto);
    Task ConfirmIntake(string patientId, string treatmentId, bool isTaken);

    Task<dynamic> GetEntities();
    Task AddOrUpdateReview(string userId, string entityId, Role entityType, int rating, string comment);
    Task SaveCurrentTreatmentRxAsync(string patientId, List<CurrentTreatmentDto> dtos);
    Task<dynamic> GetRemedies(string patientId);

    Task<List<ImageDto>> SaveRemedyAsync(RemedyDto dto);
    Task<Remedy> GetRemedy(string userId, string id);
    Task SaveComment(string remedyUserId, string remedyId, CommentDto dto);
    Task ToggleLikeAsync(string remedyUserId, string remedyId, string userId);
    Task UpdatePreferencesAsync(string userId, List<string> preferences);
}