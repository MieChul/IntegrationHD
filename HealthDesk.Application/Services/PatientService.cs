using HealthDesk.Core;
using HealthDesk.Core.Enum;
using HealthDesk.Infrastructure;

namespace HealthDesk.Application;

public class PatientService : IPatientService
{

    private readonly IPatientRepository _patientRepository;
    private readonly IPhysicianRepository _physicianRepository;
    private readonly IHospitalRepository _hospitalRepository;
    private readonly ILaboratoryRepository _laboratoryRepository;
    private readonly IPharmacyRepository _pharmacyRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMessageService _messageService;
    public PatientService(IPatientRepository patientRepository, IMessageService messageService, IPhysicianRepository physicianRepository, IUserRepository userRepository, IHospitalRepository hospitalRepository, ILaboratoryRepository laboratoryRepository, IPharmacyRepository pharmacyRepository)
    {
        _patientRepository = patientRepository;
        _messageService = messageService;
        _physicianRepository = physicianRepository;
        _userRepository = userRepository;
        _hospitalRepository = hospitalRepository;
        _laboratoryRepository = laboratoryRepository;
        _pharmacyRepository = pharmacyRepository;
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
        RemoveIfNotExpired(patient.MedicalHistory, h => h.Id == historyId);
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

    public async Task SaveCurrentTreatmentRxAsync(string patientId, List<CurrentTreatmentDto> dtos)
    {
        var patient = await GetPatientByIdAsync(patientId);
        if (patient.CurrentTreatments == null)
        {
            patient.CurrentTreatments = new List<Treatment>();
        }

        foreach (var dto in dtos)
        {
            // Map each property from the DTO to the Treatment entity
            var treatment = new Treatment
            {
                Brand = dto.Brand,
                TreatmentDrug = dto.TreatmentDrug,
                DosageForm = dto.DosageForm,
                StrengthUnit = dto.StrengthUnit,
                Frequency = dto.Frequency,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Comment = dto.Comment
            };

            // Add the treatment to the patient's collection
            patient.CurrentTreatments.Add(treatment);
        }

        await _patientRepository.UpdateAsync(patient);
    }

    public async Task DeleteCurrentTreatmentAsync(string patientId, string treatmentId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        RemoveIfNotExpired(patient.CurrentTreatments, h => h.Id == treatmentId);
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
        if (dto.Status == "pending")
        {
            var existingAppointment = (await GetAppointmentsAsync(dto.PhysicianId, true))
                                     .Where(a => a.SlotId == dto.SlotId && a.Time == dto.Time && a.Date.Date == dto.Date.Date && (a.Status != "cancelled" || a.Status != "rejected")).ToList();

            if (existingAppointment != null && existingAppointment.Any())
            {
                throw new InvalidOperationException("Someone already booked the slot for " + dto.Time + ". Please refresh.");
            }
        }

        var patient = await GetPatientByIdAsync(patientId);
        if (patient == null) throw new ArgumentException("Patient not found.");

        if (patient.Appointments.Any(a => a.Date.Date == dto.Date.Date && dto.Id == null)) throw new InvalidOperationException("You already have an appoint request for the selected slot. Please choose another slot.");


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
        RemoveIfNotExpired(patient.SelfRecords, r => r.Id == recordId);
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
        RemoveIfNotExpired(patient.Symptoms, r => r.Id == symptomId);
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
        RemoveIfNotExpired(patient.LabInvestigations, r => r.Id == investigationId);
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
        RemoveIfNotExpired(patient.Reports, r => r.Id == reportId);
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
        RemoveIfNotExpired(patient.Immunizations, r => r.Id == patientId);
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
        // Retrieve the patient document from your data store.
        var patient = await GetPatientByIdAsync(patientId);
        if (patient == null)
        {
            throw new Exception("Patient not found");
        }

        var complianceDtos = new List<PatientComplianceDto>();

        // Get active treatments (those that have not ended)
        var activeTreatments = patient.CurrentTreatments.Where(t => t.EndDate == null).ToList();

        foreach (var treatment in activeTreatments)
        {
            // Find the associated compliance record for this treatment.
            // We assume each treatment has at most one compliance record.
            var complianceEntity = patient.Compliance.FirstOrDefault(c => c.TreatmentId == treatment.Id);
            if (complianceEntity != null)
            {
                var dto = new PatientComplianceDto
                {
                    Id = complianceEntity.Id,
                    TreatmentId = complianceEntity.TreatmentId,
                    Brand = treatment.Brand,
                    TreatmentDrug = treatment.TreatmentDrug,
                    DosageForm = treatment.DosageForm,
                    StrengthUnit = treatment.StrengthUnit,
                    Frequency = treatment.Frequency,
                    StartDate = treatment.StartDate
                };

                if (complianceEntity.ComplianceDetails == null || complianceEntity.ComplianceDetails.Count == 0)
                    dto.CompliancePercentage = 0;
                else
                {
                    var taken = complianceEntity.ComplianceDetails.Count(cd => cd.PillTaken);
                    dto.CompliancePercentage = Math.Round((double)taken / complianceEntity.ComplianceDetails.Count * 100, 2);

                }

                if (complianceEntity.PatientMedicineInfos == null || complianceEntity.PatientMedicineInfos.Count == 0 || !complianceEntity.PatientMedicineInfos.Any(m => m.IsActive))
                    dto.PillsCount = 0;

                var activeInfo = complianceEntity.PatientMedicineInfos.Where(m => m.IsActive).FirstOrDefault();
                if (complianceEntity.ComplianceDetails == null || !complianceEntity.ComplianceDetails.Any())
                    dto.PillsCount = activeInfo.Count;
                else
                {
                    int taken = complianceEntity.ComplianceDetails.Count(cd => cd.PillTaken);
                    dto.PillsCount = activeInfo.Count - taken;
                }
                complianceDtos.Add(dto);
            }
        }

        return complianceDtos;
    }


    public async Task AddOrUpdateMedicalInfoAsync(string patientId, string treatmentId, PatientMedicineInfoDto dto)
    {
        var patient = await GetPatientByIdAsync(patientId);
        if (patient == null)
        {
            throw new Exception("Patient not found");
        }

        // Find the compliance record using dto.Id (which should be set to the relevant compliance record's id)
        var compliance = patient.Compliance.FirstOrDefault(c => c.TreatmentId == treatmentId);
        if (compliance == null)
        {
            throw new Exception("Compliance record not found for updating medicine info");
        }

        // Mark all existing PatientMedicineInfo records as inactive.
        foreach (var info in compliance.PatientMedicineInfos)
        {
            info.IsActive = false;
        }

        // Set the new medicine info as active.
        dto.IsActive = true;

        // Option 1: Update an existing active record if it exists (here we always add a new record)
        // Option 2: Simply add the new medicine info record.
        var entity = new PatientMedicineInfo();
        GenericMapper.Map(dto, entity);
        compliance.PatientMedicineInfos.Add(entity);

        // Save the updated patient document.
        await _patientRepository.UpdateAsync(patient);
    }

    public async Task ConfirmIntake(string patientId, string treatmentId, bool isTaken)
    {
        var patient = await GetPatientByIdAsync(patientId);
        if (patient == null)
        {
            throw new Exception("Patient not found");
        }

        var compliance = patient.Compliance.FirstOrDefault(c => c.TreatmentId == treatmentId);
        if (compliance == null)
        {
            throw new Exception("No compliance record available for intake confirmation.");
        }

        // Create a new compliance detail record
        var detail = new PatientComplianceDetail
        {
            Date = DateTime.UtcNow,
            Time = DateTime.UtcNow.ToString("HH:mm"), // Format as needed
            PillTaken = isTaken
        };

        // Add the new detail record
        compliance.ComplianceDetails.Add(detail);

        // The CompliancePercentage and PillsCount are computed automatically by the DTO getters.
        // Save changes to the patient document.
        await _patientRepository.UpdateAsync(patient);
    }


    // public async Task AddOrUpdateRemainderInfoAsync(string patientId, PatientReminderDto dto)
    // {
    //     var patient = await GetPatientByIdAsync(patientId);
    //     if (patient == null)
    //     {
    //         throw new Exception("Patient not found");
    //     }

    //     // Here, dto should include a ComplianceId property (we're using "TreatmentId" linkage)
    //     // For this example, assume that dto.Id is the reminder id, and we expect a compliance record with that id.
    //     var compliance = patient.Compliance.FirstOrDefault(c => c.Id == dto.Id);
    //     if (compliance == null)
    //     {
    //         throw new Exception("Compliance record not found for updating reminder");
    //     }

    //     // Look for an existing reminder with the same id (if any)
    //     var existingReminder = compliance.Reminders.FirstOrDefault(r => r.Id == dto.Id);
    //     if (existingReminder != null)
    //     {
    //         // Update the reminder.
    //         existingReminder.TimesOfDay = dto.TimesOfDay;
    //         existingReminder.Instruction = dto.Instruction;
    //     }
    //     else
    //     {
    //         // If no id was passed, generate a new one.
    //         if (string.IsNullOrEmpty(dto.Id))
    //         {
    //             dto.Id = ObjectId.GenerateNewId().ToString();
    //         }
    //         // Add new reminder.
    //         var newReminder = new Reminder
    //         {
    //             Id = dto.Id,
    //             TimesOfDay = dto.TimesOfDay,
    //             Instruction = dto.Instruction
    //         };
    //         compliance.Reminders.Add(newReminder);
    //     }

    //     await UpdatePatientAsync(patient);
    // }




    public async Task<IEnumerable<ActivityDto>> GetActivitiesAsync(string patientId)
    {
        var patient = await GetPatientByIdAsync(patientId);
        return patient.Activities.Select(a => GenericMapper.Map<Activity, ActivityDto>(a));
    }

    public async Task AddOrUpdateActivityAsync(string patientId, ActivityDto dto)
    {
        // Fetch the patient by dynamic property
        var patient = await GetPatientByIdAsync(patientId); ;
        if (patient == null)
            throw new ArgumentException("Patient not found.");

        // Find the activity to update or create a new one if not found
        var activity = patient.Activities.FirstOrDefault(a => a.Id == dto.Id);

        if (activity == null)
        {
            // New Activity: Map the DTO and add to patient's activities
            activity = new Activity();
            GenericMapper.Map(dto, activity);

            // Map Meals
            activity.Meals = dto.Meals?.Select(mdto => new Meal
            {
                MealType = mdto.Type,
                Food = mdto.Food,
                Quantity = mdto.Quantity
            }).ToList();

            // Map Exercises
            activity.Exercises = dto.Exercises?.Select(edto => new Exercise
            {
                Id = Guid.NewGuid().ToString(),
                Type = edto.Type,
                ExerciseName = edto.Exercise,
                DurationMinutes = edto.DurationMinutes
            }).ToList();

            patient.Activities.Add(activity);
        }
        else
        {
            // Update existing activity
            GenericMapper.Map(dto, activity);

            // === Handle Meals ===
            if (activity.Meals == null)
                activity.Meals = new List<Meal>();

            var dtoMeals = dto.Meals ?? new List<MealsDto>();
            var dtoMealIds = dtoMeals.Where(m => !string.IsNullOrEmpty(m.Id)).Select(m => m.Id).ToList();

            // Remove meals not present in the DTO
            var mealsToRemove = activity.Meals
                .Where(m => !string.IsNullOrEmpty(m.Id) && !dtoMealIds.Contains(m.Id))
                .ToList();
            foreach (var meal in mealsToRemove)
            {
                activity.Meals.Remove(meal);
            }

            // Process each meal from DTO
            foreach (var mealDto in dtoMeals)
            {
                if (!string.IsNullOrEmpty(mealDto.Id))
                {
                    // Update existing meal
                    var existingMeal = activity.Meals.FirstOrDefault(m => m.Id == mealDto.Id);
                    if (existingMeal != null)
                    {
                        existingMeal.MealType = mealDto.Type;
                        existingMeal.Food = mealDto.Food;
                        existingMeal.Quantity = mealDto.Quantity;
                    }
                    else
                    {
                        // If Id is provided but not found, consider it a new meal
                        var newMeal = new Meal
                        {
                            Id = Guid.NewGuid().ToString(),
                            MealType = mealDto.Type,
                            Food = mealDto.Food,
                            Quantity = mealDto.Quantity
                        };
                        activity.Meals.Add(newMeal);
                    }
                }
                else
                {
                    // New meal (no Id provided)
                    var newMeal = new Meal
                    {
                        Id = Guid.NewGuid().ToString(),
                        MealType = mealDto.Type,
                        Food = mealDto.Food,
                        Quantity = mealDto.Quantity
                    };
                    activity.Meals.Add(newMeal);
                }
            }

            // === Handle Exercises ===
            if (activity.Exercises == null)
                activity.Exercises = new List<Exercise>();

            var dtoExercises = dto.Exercises ?? new List<ExerciseDto>();
            var dtoExerciseIds = dtoExercises.Where(e => !string.IsNullOrEmpty(e.Id)).Select(e => e.Id).ToList();

            // Remove exercises not present in the DTO
            var exercisesToRemove = activity.Exercises
                .Where(e => !string.IsNullOrEmpty(e.Id) && !dtoExerciseIds.Contains(e.Id))
                .ToList();
            foreach (var exercise in exercisesToRemove)
            {
                activity.Exercises.Remove(exercise);
            }

            // Process each exercise from DTO
            foreach (var exerciseDto in dtoExercises)
            {
                if (!string.IsNullOrEmpty(exerciseDto.Id))
                {
                    // Update existing exercise
                    var existingExercise = activity.Exercises.FirstOrDefault(e => e.Id == exerciseDto.Id);
                    if (existingExercise != null)
                    {
                        existingExercise.Type = exerciseDto.Type;
                        existingExercise.ExerciseName = exerciseDto.Exercise;
                        existingExercise.DurationMinutes = exerciseDto.DurationMinutes;
                    }
                    else
                    {
                        // If Id is provided but not found, consider it a new exercise
                        var newExercise = new Exercise
                        {
                            Id = Guid.NewGuid().ToString(),
                            Type = exerciseDto.Type,
                            ExerciseName = exerciseDto.Exercise,
                            DurationMinutes = exerciseDto.DurationMinutes
                        };
                        activity.Exercises.Add(newExercise);
                    }
                }
                else
                {
                    // New exercise (no Id provided)
                    var newExercise = new Exercise
                    {
                        Id = Guid.NewGuid().ToString(),
                        Type = exerciseDto.Type,
                        ExerciseName = exerciseDto.Exercise,
                        DurationMinutes = exerciseDto.DurationMinutes
                    };
                    activity.Exercises.Add(newExercise);
                }
            }
        }

        // Update patient in repository
        await _patientRepository.UpdateAsync(patient);
    }


    public async Task DeleteActivityAsync(string patientId, string activityId)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);
        RemoveIfNotExpired(patient.Activities, r => r.Id == activityId);
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
            RemoveIfNotExpired(compliance.Reminders, r => r.Id == reminderId);

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
                    Name = $"Dr. {user.FirstName} {user.LastName}",
                    physician.Clinics
                });
            }
        }

        return physicianDetails;
    }

    private void RemoveIfNotExpired<T>(List<T> items, Func<T, bool> predicate) where T : class
    {
        var currentTime = DateTime.UtcNow;
        var toRemove = items
            .Where(item => predicate(item) &&
                           (item.GetType().GetProperty("CreateDate")?.GetValue(item) is DateTime createDate) &&
                           (currentTime - createDate).TotalHours <= 1)
            .ToList();

        if (toRemove.Any())
        {
            items.RemoveAll(i => toRemove.Contains(i));
        }
        else
        {
            throw new InvalidOperationException("Upon confirmation, data can be deleted only by Admin.");
        }
    }


    public async Task<dynamic> GetEntities()
    {
        var users = await _userRepository.GetAllAsync();
        var entitiesList = new List<dynamic>();

        foreach (var user in users)
        {
            foreach (var role in user.Roles)
            {
                switch (role.Role)
                {
                    case Role.Physician:
                        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", user.Id);
                        foreach (var clinic in physician.Clinics)
                        {

                            var timings = clinic.ClinicSlots != null ? clinic.ClinicSlots.Select(slot => $"{slot?.TimingFrom} - {slot?.TimingTo}") : null;
                            var averageRating = physician.Reviews.Any()
                                ? physician.Reviews.Average(r => r.Rating)
                                : 0;

                            var physicianEntity = new
                            {
                                role = (int)role.Role,
                                entityType = "physician",
                                entityId = physician.Id,
                                userId = user.Id,
                                name = $"Dr. {user.FirstName} {user.LastName}",
                                clinicName = clinic.Name,
                                location = $"{clinic.Area}, {clinic.City}, {clinic.State}",
                                speciality = user.Speciality,
                                timing = timings != null ? string.Join(", ", timings) : "",
                                rating = averageRating,
                                reviews = physician.Reviews.Select(r => new
                                {
                                    r.UserId,
                                    r.Rating,
                                    r.Comment
                                }).ToList(),
                                services = new List<Service>(),
                                physicians = new List<User>(),
                                testname = new List<LabTest>(),
                                drugName = new List<Medicine>()
                            }
                        ;

                            entitiesList.Add(physicianEntity);
                        }
                        break;

                    case Role.Hospital:
                        var hospital = await _hospitalRepository.GetByDynamicPropertyAsync("UserId", user.Id);

                        var averageRating1 = hospital.Reviews.Any()
                            ? hospital.Reviews.Average(r => r.Rating)
                            : 0;

                        var physicians = new List<User>();
                        foreach (var phy in hospital.Physicians)
                        {
                            var p = await _userRepository.GetByIdAsync(phy.UserId);
                            physicians.Add(p);
                        }

                        var hospitalEntity = new
                        {
                            role = (int)role.Role,
                            entityType = "hospital",
                            name = user.OrgName,
                            userId = user.Id,
                            entityId = hospital.Id,
                            clinicName = user.ClinicName,
                            location = $"{user.ClinicArea}, {user.ClinicCity}, {user.State}",
                            speciality = string.Empty,
                            timing = string.Empty,
                            rating = averageRating1,
                            reviews = hospital.Reviews.Select(r => new
                            {
                                r.UserId,
                                r.Rating,
                                r.Comment
                            }).ToList(),
                            services = hospital.Services,
                            physicians = physicians,
                            testname = new List<LabTest>(),
                            drugName = new List<Medicine>()
                        };

                        entitiesList.Add(hospitalEntity);
                        break;

                    case Role.Pharmacy:
                        var pharmacy = await _pharmacyRepository.GetByDynamicPropertyAsync("UserId", user.Id);

                        var averageRating2 = pharmacy.Reviews.Any()
                            ? pharmacy.Reviews.Average(r => r.Rating)
                            : 0;

                        var pharmacyEntity = new
                        {
                            role = (int)role.Role,
                            entityType = "pharmacy",
                            name = user.OrgName,
                            entityId = pharmacy.Id,
                            userId = user.Id,
                            clinicName = user.ClinicName,
                            location = $"{user.ClinicArea}, {user.ClinicCity}, {user.State}",
                            speciality = string.Empty,
                            timing = string.Empty,
                            rating = averageRating2,
                            reviews = pharmacy.Reviews.Select(r => new
                            {
                                r.UserId,
                                r.Rating,
                                r.Comment
                            }).ToList(),
                            services = new List<Service>(),
                            physicians = new List<User>(),
                            testname = new List<LabTest>(),
                            drugName = pharmacy.Medicines
                        };

                        entitiesList.Add(pharmacyEntity);
                        break;

                    case Role.Laboratory:
                        var laboratory = await _laboratoryRepository.GetByDynamicPropertyAsync("UserId", user.Id);

                        var averageRating3 = laboratory.Reviews.Any()
                            ? laboratory.Reviews.Average(r => r.Rating)
                            : 0;

                        var laboratoryEntity = new
                        {
                            role = (int)role.Role,
                            entityType = "laboratory",
                            name = user.OrgName,
                            entityId = laboratory.Id,
                            userId = user.Id,
                            clinicName = user.ClinicName,
                            location = $"{user.ClinicArea}, {user.ClinicCity}, {user.State}",
                            speciality = string.Empty,
                            timing = string.Empty,
                            rating = averageRating3,
                            reviews = laboratory.Reviews.Select(r => new
                            {
                                r.UserId,
                                r.Rating,
                                r.Comment
                            }).ToList(),
                            services = new List<Service>(),
                            physicians = new List<User>(),
                            testname = laboratory.LabTests,
                            drugName = new List<Medicine>()
                        };

                        entitiesList.Add(laboratoryEntity);
                        break;

                    default:
                        break;
                }
            }
        }

        return entitiesList;
    }


    public async Task AddOrUpdateReview(string userId, string entityId, Role entityType, int rating, string comment)
    {
        switch (entityType)
        {
            case Role.Physician:
                var physician = await _physicianRepository.GetByIdAsync(entityId);
                if (physician == null)
                    throw new Exception("Physician not found.");

                var patient = await _patientRepository.GetByDynamicPropertyAsync("UserId", userId);
                if (!patient.Appointments.Any(x => x.PhysicianId == physician.UserId))
                {
                    throw new InvalidOperationException("You haven't had an appointment with this physician.");
                }

                var existingPhysicianReview = physician.Reviews.FirstOrDefault(r => r.UserId == userId);
                if (existingPhysicianReview != null)
                {
                    // Update Review
                    existingPhysicianReview.Rating = rating;
                    existingPhysicianReview.Comment = comment;
                }
                else
                {
                    // Add New Review
                    var newReview = new Reviews
                    {
                        UserId = userId,
                        Rating = rating,
                        Comment = comment,
                    };

                    physician.Reviews.Add(newReview);
                }

                await _physicianRepository.UpdateAsync(physician);
                break;

            case Role.Hospital:
                var hospital = await _hospitalRepository.GetByIdAsync(entityId);
                if (hospital == null)
                    throw new Exception("Hospital not found.");

                var existingHospitalReview = hospital.Reviews.FirstOrDefault(r => r.UserId == userId);
                if (existingHospitalReview != null)
                {
                    // Update Review
                    existingHospitalReview.Rating = rating;
                    existingHospitalReview.Comment = comment;
                }
                else
                {
                    // Add New Review
                    var newReview = new Reviews
                    {
                        UserId = userId,
                        Rating = rating,
                        Comment = comment,
                    };

                    hospital.Reviews.Add(newReview);
                }

                await _hospitalRepository.UpdateAsync(hospital);
                break;

            case Role.Pharmacy:
                var pharmacy = await _pharmacyRepository.GetByIdAsync(entityId);
                if (pharmacy == null)
                    throw new Exception("Pharmacy not found.");

                var existingPharmacyReview = pharmacy.Reviews.FirstOrDefault(r => r.UserId == userId);
                if (existingPharmacyReview != null)
                {
                    // Update Review
                    existingPharmacyReview.Rating = rating;
                    existingPharmacyReview.Comment = comment;
                }
                else
                {
                    // Add New Review
                    var newReview = new Reviews
                    {
                        UserId = userId,
                        Rating = rating,
                        Comment = comment,
                    };

                    pharmacy.Reviews.Add(newReview);
                }

                await _pharmacyRepository.UpdateAsync(pharmacy);
                break;

            case Role.Laboratory:
                var laboratory = await _laboratoryRepository.GetByIdAsync(entityId);
                if (laboratory == null)
                    throw new Exception("Laboratory not found.");

                var existingLabReview = laboratory.Reviews.FirstOrDefault(r => r.UserId == userId);
                if (existingLabReview != null)
                {
                    // Update Review
                    existingLabReview.Rating = rating;
                    existingLabReview.Comment = comment;
                }
                else
                {
                    // Add New Review
                    var newReview = new Reviews
                    {
                        UserId = userId,
                        Rating = rating,
                        Comment = comment,
                    };

                    laboratory.Reviews.Add(newReview);
                }

                await _laboratoryRepository.UpdateAsync(laboratory);
                break;

            default:
                throw new Exception("Invalid entity type.");
        }
    }
}