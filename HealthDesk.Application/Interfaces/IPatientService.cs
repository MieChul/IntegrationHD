

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
    Task<IEnumerable<AppointmentDto>> GetAppointmentsAsync(string patientId);
    Task SaveAppointmentAsync(string patientId, AppointmentDto dto);
    Task DeleteAppointmentAsync(string patientId, string appointmentId);

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
    Task SaveLabInvestigationAsync(string patientId, LabInvestigationDto dto);
    Task DeleteLabInvestigationAsync(string patientId, string investigationId);

    // 7. Reports
    Task<IEnumerable<ReportDto>> GetReportsAsync(string patientId);
    Task SaveReportAsync(string patientId, ReportDto dto);
    Task DeleteReportAsync(string patientId, string reportId);

    // 8. Immunizations
    Task<IEnumerable<ImmunizationDto>> GetImmunizationsAsync(string patientId);
    Task SaveImmunizationAsync(string patientId, ImmunizationDto dto);
    Task DeleteImmunizationAsync(string patientId, string immunizationId);

    // 9. Patient Info
    Task<PatientInfoDto> GetPatientInfoAsync(string patientId);
    Task UpdatePatientInfoAsync(string patientId, PatientInfoDto dto);
}