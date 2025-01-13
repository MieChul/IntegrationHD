using HealthDesk.Core;
using HealthDesk.Infrastructure;

namespace HealthDesk.Application;

public class PatientService : IPatientService
{

    private readonly IPatientRepository _patientRepository;
    private readonly IPhysicianRepository _physicianRepository;

    private readonly IUserRepository _userRepository;
    private readonly IMessageService _messageService;
    public PatientService(IPatientRepository patientRepository, IMessageService messageService, IPhysicianRepository physicianRepository, IUserRepository userRepository)
    {
        _patientRepository = patientRepository;
        _messageService = messageService;
        _physicianRepository = physicianRepository;
        _userRepository = userRepository;
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
    public async Task<IEnumerable<AppointmentDto>> GetAppointmentsAsync(string patientId, bool isPhysician = false)
    {
        if (isPhysician)
        {
            var patients = await _patientRepository.GetAllAsync(); // Get all patients asynchronously
            var appointments = patients
                .SelectMany(p => p.Appointments) // Flatten appointments
                .Where(ap => ap.PhysicianId == patientId) // Filter by PhysicianId
                .Select(ap => GenericMapper.Map<Appointment, AppointmentDto>(ap)) // Map to DTO
                .ToList();

            return appointments;
        }
        else
        {
            var patient = await GetPatientByIdAsync(patientId);
            return patient.Appointments.Select(a => GenericMapper.Map<Appointment, AppointmentDto>(a));
        }
    }

    public async Task SaveAppointmentAsync(string patientId, AppointmentDto dto)
    {
        var patient = await GetPatientByIdAsync(patientId);
        if (patient == null) throw new ArgumentException("Patient not found.");

        var user = await _userRepository.GetByIdAsync(patientId);
        if (user == null || string.IsNullOrEmpty(user.Mobile))
        {
            throw new ArgumentException("Unable to retrieve patient mobile number.");
        }
        var appointment = new Appointment();
        GenericMapper.Map(dto, appointment);
        appointment.Mobile = user.Mobile;
        appointment.PatientName = user.FirstName + " " + user.LastName;

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

    public async Task UpdateAppointmentStatus(string patientId, string appointmentId, string status)
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
        var patient = await _patientRepository.GetByDynamicPropertyAsync("UserId", patientId);
        if (patient == null)
            throw new ArgumentException("Patient not found.");
        return patient;
    }
    public async Task<IEnumerable<PatientComplianceDto>> GetComplianceAsync(string patientId)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        return patient.Compliance.Select(c => GenericMapper.Map<Compliance, PatientComplianceDto>(c));
    }

    public async Task AddOrUpdateComplianceAsync(string patientId, PatientComplianceDto dto)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        var compliance = patient.Compliance.FirstOrDefault(c => c.Id == dto.Id) ?? new Compliance { };

        GenericMapper.Map(dto, compliance);

        if (!patient.Compliance.Any(c => c.Id == compliance.Id))
            patient.Compliance.Add(compliance);

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task DeleteComplianceAsync(string patientId, string complianceId)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        patient.Compliance.RemoveAll(c => c.Id == complianceId);
        await _patientRepository.UpdateAsync(patient);
    }

    public async Task UpdatePillsCountAsync(string patientId, string complianceId, int count)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        var compliance = patient.Compliance.FirstOrDefault(c => c.Id == complianceId);
        if (compliance != null)
        {
            compliance.PillsCount += count;
            await _patientRepository.UpdateAsync(patient);
        }
    }

    public async Task<double> GetCompliancePercentageAsync(string patientId)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        var compliantDetails = patient.Compliance.SelectMany(c => c.ComplianceDetails).Where(cd => cd.IsCompliant).Count();
        var totalDetails = patient.Compliance.SelectMany(c => c.ComplianceDetails).Count();
        return totalDetails > 0 ? (double)compliantDetails / totalDetails * 100 : 0;
    }

    public async Task<IEnumerable<ActivityDto>> GetActivitiesAsync(string patientId)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        return patient.Activities.Select(a => GenericMapper.Map<Activity, ActivityDto>(a));
    }

    public async Task AddOrUpdateActivityAsync(string patientId, ActivityDto dto)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        var activity = patient.Activities.FirstOrDefault(a => a.Id == dto.Id) ?? new Activity { };

        GenericMapper.Map(dto, activity);

        if (!patient.Activities.Any(a => a.Id == activity.Id))
            patient.Activities.Add(activity);

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task DeleteActivityAsync(string patientId, string activityId)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        patient.Activities.RemoveAll(a => a.Id == activityId);
        await _patientRepository.UpdateAsync(patient);
    }
    public async Task<IEnumerable<ComplianceDetailDto>> GetComplianceDetailsAsync(string patientId, string complianceId)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        var compliance = patient.Compliance.FirstOrDefault(c => c.Id == complianceId);

        if (compliance == null)
            throw new ArgumentException("Compliance not found.");

        return compliance.ComplianceDetails.Select(cd => GenericMapper.Map<ComplianceDetail, ComplianceDetailDto>(cd));
    }

    public async Task AddOrUpdateComplianceDetailAsync(string patientId, string complianceId, ComplianceDetailDto dto)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        var compliance = patient.Compliance.FirstOrDefault(c => c.Id == complianceId);

        if (compliance == null)
            throw new ArgumentException("Compliance not found.");

        var detail = compliance.ComplianceDetails.FirstOrDefault(cd => cd.Id == dto.Id) ?? new ComplianceDetail { };
        GenericMapper.Map(dto, detail);

        if (!compliance.ComplianceDetails.Any(cd => cd.Id == detail.Id))
            compliance.ComplianceDetails.Add(detail);

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task<IEnumerable<ReminderDto>> GetRemindersAsync(string patientId)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        return patient.Compliance.SelectMany(c => c.Reminders).Select(r => GenericMapper.Map<Reminder, ReminderDto>(r));
    }

    public async Task AddOrUpdateReminderAsync(string patientId, ReminderDto dto)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        var reminder = patient.Compliance.SelectMany(c => c.Reminders).FirstOrDefault(r => r.Id == dto.Id) ?? new Reminder { };

        GenericMapper.Map(dto, reminder);

        if (!patient.Compliance.Any(c => c.Reminders.Contains(reminder)))
            patient.Compliance.First().Reminders.Add(reminder); // Adding to the first compliance for simplicity

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task DeleteReminderAsync(string patientId, string reminderId)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);

        foreach (var compliance in patient.Compliance)
            compliance.Reminders.RemoveAll(r => r.Id == reminderId);

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task<dynamic> GetPhysicians()
    {
        var physicians = await _physicianRepository.GetAllAsync();

        // Fetch user details for each physician and format the name
        var physicianDetails = new List<dynamic>();
        foreach (var physician in physicians)
        {
            var user = await _userRepository.GetByIdAsync(physician.UserId);
            if (user != null)
            {
                physicianDetails.Add(new
                {
                    Id = physician.UserId,
                    Name = $"Dr. {user.FirstName} {user.LastName}"
                });
            }
        }

        return physicianDetails;
    }

}