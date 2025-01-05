using HealthDesk.Core;
using HealthDesk.Infrastructure;

namespace HealthDesk.Application;

public class PatientService : IPatientService
{

    private readonly IPatientRepository _patientRepository;
    private readonly IMessageService _messageService;
    public PatientService(IPatientRepository patientRepository, IMessageService messageService)
    {
        _patientRepository = patientRepository;
        _messageService = messageService;
    }

   // 1. Medical History
    public async Task<IEnumerable<MedicalHistoryDto>> GetMedicalHistoryAsync(string patientId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        return patient.MedicalHistory.Select(h => GenericMapper.Map<MedicalHistory, MedicalHistoryDto>(h));
    }

    public async Task SaveMedicalHistoryAsync(string patientId, MedicalHistoryDto dto)
    {
        var patient = await GetPatientByIdAsync(patientId);

        var history = new MedicalHistory();
        GenericMapper.Map(dto, history);

        if (string.IsNullOrEmpty(dto.Id))
        {
            patient.MedicalHistory.Add(history);
        }
        else
        {
            var existing = patient.MedicalHistory.FirstOrDefault(h => h.Id == dto.Id);
            if (existing == null) throw new ArgumentException("Medical history not found.");
            GenericMapper.Map(dto, existing);
        }

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task DeleteMedicalHistoryAsync(string patientId, string historyId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        patient.MedicalHistory.RemoveAll(h => h.Id == historyId);
        await _patientRepository.UpdateAsync(patient);
    }

    // 2. Current Treatments
    public async Task<IEnumerable<CurrentTreatmentDto>> GetCurrentTreatmentsAsync(string patientId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        return patient.CurrentTreatments.Select(t => GenericMapper.Map<Treatment, CurrentTreatmentDto>(t));
    }

    public async Task SaveCurrentTreatmentAsync(string patientId, CurrentTreatmentDto dto)
    {
        var patient = await GetPatientByIdAsync(patientId);

        var treatment = new Treatment();
        GenericMapper.Map(dto, treatment);

        if (string.IsNullOrEmpty(dto.Id))
        {
            patient.CurrentTreatments.Add(treatment);
        }
        else
        {
            var existing = patient.CurrentTreatments.FirstOrDefault(t => t.Id == dto.Id);
            if (existing == null) throw new ArgumentException("Current treatment not found.");
            GenericMapper.Map(dto, existing);
        }

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task DeleteCurrentTreatmentAsync(string patientId, string treatmentId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        patient.CurrentTreatments.RemoveAll(t => t.Id == treatmentId);
        await _patientRepository.UpdateAsync(patient);
    }

    // 3. Appointments
    public async Task<IEnumerable<AppointmentDto>> GetAppointmentsAsync(string patientId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        return patient.Appointments.Select(a => GenericMapper.Map<Appointment, AppointmentDto>(a));
    }

    public async Task SaveAppointmentAsync(string patientId, AppointmentDto dto)
    {
        var patient = await GetPatientByIdAsync(patientId);

        var appointment = new Appointment();
        GenericMapper.Map(dto, appointment);

        if (string.IsNullOrEmpty(dto.Id))
        {
            patient.Appointments.Add(appointment);
        }
        else
        {
            var existing = patient.Appointments.FirstOrDefault(a => a.Id == dto.Id);
            if (existing == null) throw new ArgumentException("Appointment not found.");
            GenericMapper.Map(dto, existing);
        }

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task DeleteAppointmentAsync(string patientId, string appointmentId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        patient.Appointments.RemoveAll(a => a.Id == appointmentId);
        await _patientRepository.UpdateAsync(patient);
    }

    // 4. Self Records
    public async Task<IEnumerable<SelfRecordDto>> GetSelfRecordsAsync(string patientId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        return patient.SelfRecords.Select(r => GenericMapper.Map<SelfRecord, SelfRecordDto>(r));
    }

    public async Task SaveSelfRecordAsync(string patientId, SelfRecordDto dto)
    {
        var patient = await GetPatientByIdAsync(patientId);

        var record = new SelfRecord();
        GenericMapper.Map(dto, record);

        if (string.IsNullOrEmpty(dto.Id))
        {
            patient.SelfRecords.Add(record);
        }
        else
        {
            var existing = patient.SelfRecords.FirstOrDefault(r => r.Id == dto.Id);
            if (existing == null) throw new ArgumentException("Self record not found.");
            GenericMapper.Map(dto, existing);
        }

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task DeleteSelfRecordAsync(string patientId, string recordId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        patient.SelfRecords.RemoveAll(r => r.Id == recordId);
        await _patientRepository.UpdateAsync(patient);
    }

    // 5. Symptoms
    public async Task<IEnumerable<SymptomDto>> GetSymptomsAsync(string patientId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        return patient.Symptoms.Select(s => GenericMapper.Map<Symptom, SymptomDto>(s));
    }

    public async Task SaveSymptomAsync(string patientId, SymptomDto dto)
    {
        var patient = await GetPatientByIdAsync(patientId);

        var symptom = new Symptom();
        GenericMapper.Map(dto, symptom);

        if (string.IsNullOrEmpty(dto.Id))
        {
            patient.Symptoms.Add(symptom);
        }
        else
        {
            var existing = patient.Symptoms.FirstOrDefault(s => s.Id == dto.Id);
            if (existing == null) throw new ArgumentException("Symptom not found.");
            GenericMapper.Map(dto, existing);
        }

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task DeleteSymptomAsync(string patientId, string symptomId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        patient.Symptoms.RemoveAll(s => s.Id == symptomId);
        await _patientRepository.UpdateAsync(patient);
    }

    // 6. Lab Investigations
    public async Task<IEnumerable<LabInvestigationDto>> GetLabInvestigationsAsync(string patientId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        return patient.LabInvestigations.Select(i => GenericMapper.Map<LabInvestigation, LabInvestigationDto>(i));
    }

    public async Task SaveLabInvestigationAsync(string patientId, LabInvestigationDto dto)
    {
        var patient = await GetPatientByIdAsync(patientId);

        var investigation = new LabInvestigation();
        GenericMapper.Map(dto, investigation);

        if (string.IsNullOrEmpty(dto.Id))
        {
            patient.LabInvestigations.Add(investigation);
        }
        else
        {
            var existing = patient.LabInvestigations.FirstOrDefault(i => i.Id == dto.Id);
            if (existing == null) throw new ArgumentException("Lab investigation not found.");
            GenericMapper.Map(dto, existing);
        }

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task DeleteLabInvestigationAsync(string patientId, string investigationId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        patient.LabInvestigations.RemoveAll(i => i.Id == investigationId);
        await _patientRepository.UpdateAsync(patient);
    }

    // 7. Reports
    public async Task<IEnumerable<ReportDto>> GetReportsAsync(string patientId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        return patient.Reports.Select(r => GenericMapper.Map<Report, ReportDto>(r));
    }

    public async Task SaveReportAsync(string patientId, ReportDto dto)
    {
        var patient = await GetPatientByIdAsync(patientId);

        var report = new Report();
        GenericMapper.Map(dto, report);

        if (string.IsNullOrEmpty(dto.Id))
        {
            patient.Reports.Add(report);
        }
        else
        {
            var existing = patient.Reports.FirstOrDefault(r => r.Id == dto.Id);
            if (existing == null) throw new ArgumentException("Report not found.");
            GenericMapper.Map(dto, existing);
        }

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task DeleteReportAsync(string patientId, string reportId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        patient.Reports.RemoveAll(r => r.Id == reportId);
        await _patientRepository.UpdateAsync(patient);
    }

    // 8. Immunizations
    public async Task<IEnumerable<ImmunizationDto>> GetImmunizationsAsync(string patientId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        return patient.Immunizations.Select(i => GenericMapper.Map<Immunization, ImmunizationDto>(i));
    }

    public async Task SaveImmunizationAsync(string patientId, ImmunizationDto dto)
    {
        var patient = await GetPatientByIdAsync(patientId);

        var immunization = new Immunization();
        GenericMapper.Map(dto, immunization);

        if (string.IsNullOrEmpty(dto.Id))
        {
            patient.Immunizations.Add(immunization);
        }
        else
        {
            var existing = patient.Immunizations.FirstOrDefault(i => i.Id == dto.Id);
            if (existing == null) throw new ArgumentException("Immunization not found.");
            GenericMapper.Map(dto, existing);
        }

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task DeleteImmunizationAsync(string patientId, string immunizationId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        patient.Immunizations.RemoveAll(i => i.Id == immunizationId);
        await _patientRepository.UpdateAsync(patient);
    }

    // 9. Patient Info
    public async Task<PatientInfoDto> GetPatientInfoAsync(string patientId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        return GenericMapper.Map<PatientInfo, PatientInfoDto>(patient.PatientInfo);
    }

    public async Task UpdatePatientInfoAsync(string patientId, PatientInfoDto dto)
    {
        var patient = await GetPatientByIdAsync(patientId);
        GenericMapper.Map(dto, patient.PatientInfo);
        await _patientRepository.UpdateAsync(patient);
    }

    // Helper Method
    private async Task<Patient> GetPatientByIdAsync(string patientId)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        if (patient == null)
            throw new ArgumentException("Patient not found.");
        return patient;
    }
}