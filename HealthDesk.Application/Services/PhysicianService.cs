
using System.Globalization;
using System.Threading.Tasks;
using HealthDesk.Application.DTO;
using HealthDesk.Core;
using HealthDesk.Core.Enum;
using HealthDesk.Infrastructure;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;

namespace HealthDesk.Application;
public class PhysicianService : IPhysicianService
{
    private readonly IPhysicianRepository _physicianRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMessageService _messageService;

    private readonly IUserService _userService;
    private readonly IPatientService _patientService;

    private readonly IPatientRepository _patientRepository;

    private readonly Random _random = new Random();
    public PhysicianService(IPhysicianRepository physicianRepository, IMessageService messageService, IUserRepository userRepository, IUserService userService, IPatientService patientService, IPatientRepository patientRepository)
    {
        _physicianRepository = physicianRepository;
        _messageService = messageService;
        _userRepository = userRepository;
        _userService = userService;
        _patientService = patientService;
        _patientRepository = patientRepository;
    }

    public async Task AddOrUpdateClinicAsync(string physicianId, PhysicianClinicDto clinicDto)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        var clinic = physician.Clinics.FirstOrDefault(c => c.Id == clinicDto.Id);

        if (clinic == null)
        {
            clinic = new Clinic { };
            GenericMapper.Map(clinicDto, clinic);
            clinic.ClinicSlots = clinicDto.ClinicSlots?.Select(sdto => new ClinicSlots
            {
                Name = sdto.Name,
                TimingFrom = sdto.TimingFrom,
                TimingTo = sdto.TimingTo
            }).ToList();
            physician.Clinics.Add(clinic);
        }
        else
        {
            // Update existing clinic
            GenericMapper.Map(clinicDto, clinic);
            clinic.Days = clinicDto.Days;
            if (clinic.ClinicSlots == null)
                clinic.ClinicSlots = new List<ClinicSlots>();

            var dtoSlots = clinicDto.ClinicSlots ?? new List<ClinicSlotsDto>();
            var dtoSlotIds = dtoSlots.Where(s => !string.IsNullOrEmpty(s.Id)).Select(s => s.Id).ToList();
            var slotsToRemove = clinic.ClinicSlots.Where(s => !string.IsNullOrEmpty(s.Id) && !dtoSlotIds.Contains(s.Id)).ToList();
            foreach (var slot in slotsToRemove)
            {
                clinic.ClinicSlots.Remove(slot);
            }
            // Process each slot from DTO.
            foreach (var slotDto in dtoSlots)
            {
                if (!string.IsNullOrEmpty(slotDto.Id))
                {
                    // Find matching slot in entity by Id.
                    var existingSlot = clinic.ClinicSlots.FirstOrDefault(s => s.Id == slotDto.Id);
                    if (existingSlot != null)
                    {
                        // Update the existing slot.
                        existingSlot.Name = slotDto.Name;
                        existingSlot.TimingFrom = slotDto.TimingFrom;
                        existingSlot.TimingTo = slotDto.TimingTo;
                    }
                    else
                    {
                        // If an Id is provided but not found, consider this as a new slot.
                        var newSlot = new ClinicSlots
                        {
                            Name = slotDto.Name,
                            TimingFrom = slotDto.TimingFrom,
                            TimingTo = slotDto.TimingTo
                        };
                        clinic.ClinicSlots.Add(newSlot);
                    }
                }
                else
                {
                    // New slot (no Id provided).
                    var newSlot = new ClinicSlots
                    {
                        Name = slotDto.Name,
                        TimingFrom = slotDto.TimingFrom,
                        TimingTo = slotDto.TimingTo
                    };
                    clinic.ClinicSlots.Add(newSlot);
                }
            }

        }

        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task DeleteClinicAsync(string physicianId, string clinicId)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        RemoveIfNotExpired(physician.Clinics, r => r.Id == clinicId);
        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task<IEnumerable<Clinic>> GetClinicsAsync(string physicianId)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        return physician.Clinics;
    }
    public async Task<dynamic> GetAllDesignPrescriptionsAsync(string physicianId)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        return physician.DesignPrescriptions.Select(dp => new { Id = dp.Id, Name = dp.TemplateName, Clinic = dp.ClinicName, IsDefault = dp.IsDefault });
    }

    public async Task DeleteDesignPrescriptionAsync(string physicianId, string prescriptionId)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        RemoveIfNotExpired(physician.DesignPrescriptions, r => r.Id == prescriptionId);
        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task<IEnumerable<PatientRecordDto>> GetAllPatientsAsync(string physicianId)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        return physician.Patients.Select(p => GenericMapper.Map<PatientRecord, PatientRecordDto>(p));
    }

    public async Task SavePatientAsync(string physicianId, PatientRecordDto dto)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        var existingUser = await GetPatientByMobileAsync(physicianId, dto.Mobile);
        if (existingUser == null)
        {
            var patients = await _patientRepository.GetAllAsync();
            var user = new UserRegistrationDto
            {
                Username = dto.FirstName + '_' + dto.LastName + '_' + (patients.Count() + 1),
                RoleId = 2,
                Password = GenerateRandomString(),
                Mobile = dto.Mobile,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                MiddleName = dto.MiddleName,
                Gender = dto.Gender,
                DOB = dto.DateOfBirth
            };
            var id = await _userService.Register(user);
            dto.UserId = id;
            //_messageService.SendSms(dto.Mobile, "Hi, Welcome to HealthDesk. Your profile is created with Username: " + dto.Name + " and Password: " + user.Password);
        }
        else if (string.IsNullOrEmpty(dto.Id))
        {
            dto.UserId = existingUser.UserId;
        }

        var patient = GenericMapper.Map<PatientRecordDto, PatientRecord>(dto);

        if (string.IsNullOrEmpty(dto.Id))
        {
            patient.LastVisitedDate = DateTime.Now;
            physician.Patients.Add(patient);
        }

        else
        {
            var existing = physician.Patients.FirstOrDefault(p => p.Id == dto.Id);
            if (existing != null) GenericMapper.Map(dto, existing);
        }

        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task DeletePatientAsync(string physicianId, string patientId)
    {
        var physician = await _physicianRepository.GetByIdAsync(physicianId);
        RemoveIfNotExpired(physician.Patients, r => r.Id == patientId);
        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task<IEnumerable<PrescriptionDto>> GetPrescriptionsAsync(string? physicianId, string patientId, bool getAll = false)
    {
        if (getAll)
        {
            var physician = await _physicianRepository.GetAllAsync();
            var patients = physician.SelectMany(p => p.Patients).Where(x => x.UserId == patientId);
            var prescriptions = patients.SelectMany(pt => pt.Prescriptions);
            return prescriptions.Select(p => GenericMapper.Map<Prescription, PrescriptionDto>(p));
        }
        else
        {
            var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
            var patient = physician.Patients.FirstOrDefault(p => p.UserId == patientId);
            return patient?.Prescriptions.Select(p => GenericMapper.Map<Prescription, PrescriptionDto>(p));

        }
    }

    public async Task<string> GetLatestPrescriptionAsync(string physicianId, string patientId)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        var patient = physician.Patients.FirstOrDefault(p => p.UserId == patientId);
        return patient?.Prescriptions?.Select(p => GenericMapper.Map<Prescription, PrescriptionDto>(p))?.OrderByDescending(p => p.DateOfDiagnosis)?.FirstOrDefault()?.PrescriptionUrl ?? string.Empty;
    }

    public async Task<string> AddPrescriptionAsync(PrescriptionDto dto)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", dto.PhysicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        var patient = physician.Patients.FirstOrDefault(p => p.UserId == dto.PatientId);
        if (patient == null)
            throw new ArgumentException("Patient not found.");

        var prescription = GenericMapper.Map<PrescriptionDto, Prescription>(dto);
        patient.LastVisitedDate = DateTime.Now.Date;
        prescription.DateOfDiagnosis = DateTime.Now.Date;
        patient.Prescriptions.Add(prescription);

        await _physicianRepository.UpdateAsync(physician);
        return prescription.Id; // Return the ID of the added prescription
    }

    public async Task<IEnumerable<MedicalCaseDto>> GetAllMedicalCasesAsync(string physicianId)
    {
        var physician = await _physicianRepository.GetByIdAsync(physicianId);
        return physician.MedicalCases.Select(mc => GenericMapper.Map<MedicalCase, MedicalCaseDto>(mc));
    }

    public async Task SaveMedicalCaseAsync(string physicianId, MedicalCaseDto dto)
    {
        var physician = await _physicianRepository.GetByIdAsync(physicianId);
        var medicalCase = GenericMapper.Map<MedicalCaseDto, MedicalCase>(dto);

        if (string.IsNullOrEmpty(dto.Id))
            physician.MedicalCases.Add(medicalCase);
        else
        {
            var existing = physician.MedicalCases.FirstOrDefault(mc => mc.Id == dto.Id);
            if (existing != null) GenericMapper.Map(dto, existing);
        }

        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task DeleteMedicalCaseAsync(string physicianId, string caseId)
    {
        var physician = await _physicianRepository.GetByIdAsync(physicianId);
        RemoveIfNotExpired(physician.MedicalCases, r => r.Id == caseId);
        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task IncrementLikesAsync(string physicianId, string caseId)
    {
        var physician = await _physicianRepository.GetByIdAsync(physicianId);
        var medicalCase = physician.MedicalCases.FirstOrDefault(mc => mc.Id == caseId);
        if (medicalCase != null) medicalCase.LikesCount++;

        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task<dynamic> GetUserDetailsAsync(string id)
    {
        var user = await _userRepository.GetByIdAsync(id); // Assuming service method exists
        if (user == null)
            throw new ArgumentException("User not found.");

        var userDetails = new
        {
            PhoneNumber = user.Mobile,
            FullName = $"{user.FirstName} {user.LastName}",
            MrcNumber = user.MedicalRegistration.CertificateNumber,
            Qualifications = string.Join(", ", new[] { user.Graduation?.Name, user.PostGraduation?.Name, user.SuperSpecialization?.Name, user.AdditionalQualification?.Name }.Where(x => !string.IsNullOrWhiteSpace(x)))
        };

        return userDetails;
    }

    public async Task<int> GetDesignPrescriptionCountAsync(string physicianId)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        return physician.DesignPrescriptions.Count;
    }

    public async Task<DesignPrescriptionDto> LoadPrescriptionAsync(string physicianId, string prescriptionId)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        var prescription = physician.DesignPrescriptions.FirstOrDefault(p => p.Id == prescriptionId);
        if (prescription == null)
            return null;

        return GenericMapper.Map<DesignPrescription, DesignPrescriptionDto>(prescription);
    }

    public async Task SaveDesignPrescriptionAsync(string physicianId, DesignPrescriptionDto dto)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        if (dto.IsDefault)
        {
            foreach (var prescription in physician.DesignPrescriptions)
            {
                prescription.IsDefault = false;
            }
        }

        if (string.IsNullOrEmpty(dto.Id))
        {
            var newPrescription = GenericMapper.Map<DesignPrescriptionDto, DesignPrescription>(dto);
            newPrescription.Id = ObjectId.GenerateNewId().ToString();
            physician.DesignPrescriptions.Add(newPrescription);
        }
        else
        {
            var existingPrescription = physician.DesignPrescriptions.FirstOrDefault(p => p.Id == dto.Id);
            if (existingPrescription != null)
            {
                GenericMapper.Map(dto, existingPrescription);
            }
        }

        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task<dynamic> GetPatientByMobileAsync(string physicianId, string mobile)
    {
        // Retrieve user based on the mobile number
        var user = await _userRepository.GetByDynamicPropertyAsync("Mobile", mobile);

        // Check if the user has a Patient role
        if (user != null && user.Roles.Any(r => r.Role == Role.Patient))
        {
            // Return patient details if found
            return new
            {
                UserId = user.Id,
                FirstName = user.FirstName,
                MiddleName = user.MiddleName,
                LastName = user.LastName,
                Gender = user.Gender,
                DateOfBirth = user.BirthDate
            };
        }

        // Return null if user does not exist or does not have the Patient role
        return null;
    }

    public async Task<dynamic> GetPhysicianByMobileAsync(string mobile)
    {
        // Retrieve user based on the mobile number
        var user = await _userRepository.GetByDynamicPropertyAsync("Mobile", mobile);

        // Check if the user has a Patient role
        if (user != null && user.Roles.Any(r => r.Role == Role.Physician))
        {
            // Return patient details if found
            return new
            {
                UserId = user.Id,
                FirstName = user.FirstName,
                MiddleName = user.MiddleName,
                LastName = user.LastName,
                Speciality = user.Speciality,

            };
        }

        // Return null if user does not exist or does not have the Patient role
        return null;
    }

    private string GenerateRandomString(int length = 8)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return new string(Enumerable.Repeat(chars, length)
                                    .Select(s => s[_random.Next(s.Length)]).ToArray());
    }

    public async Task<dynamic> GetDefaultPrescriptionHeaderFooter(string physicianId)
    {

        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        var defaultPrescription = physician.DesignPrescriptions.Where(p => p.IsDefault).FirstOrDefault();
        return new
        {
            header = defaultPrescription.HeaderUrl,
            footer = defaultPrescription.FooterUrl
        };
    }

    public async Task<List<ProfileDTO>> GetProfilesAsync(string physicianId)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        return physician.Profiles.Select(profile => new ProfileDTO
        {
            Id = profile.Id,
            Name = profile.Name,
            Investigations = profile.Investigations.Select(inv => new ProfileInvestigationDTO
            {
                Id = inv.Id,
                Name = inv.Name,
                ProfileId = inv.ProfileId
            }).ToList()
        }).ToList();
    }

    public async Task SaveProfilesAsync(string physicianId, ProfileDTO profileDto)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        // Ensure physician's profiles are loaded
        if (physician.Profiles == null)
            physician.Profiles = new List<Profile>();

        // Try to find an existing profile by ID
        var existingProfile = physician.Profiles.FirstOrDefault(p => p.Id == profileDto.Id);

        if (existingProfile != null)
        {
            // Update profile name
            existingProfile.Name = profileDto.Name;

            // Convert incoming investigations to a HashSet for quick lookup
            var incomingInvestigationNames = new HashSet<string>(profileDto.Investigations.Select(i => i.Name));

            // Remove investigations that are no longer in the new list
            existingProfile.Investigations.RemoveAll(inv => !incomingInvestigationNames.Contains(inv.Name));

            // Add new investigations that don't exist in the profile
            foreach (var dtoInvestigation in profileDto.Investigations)
            {
                if (!existingProfile.Investigations.Any(inv => inv.Name == dtoInvestigation.Name))
                {
                    existingProfile.Investigations.Add(new ProfileInvestigation
                    {
                        Name = dtoInvestigation.Name,
                        ProfileId = existingProfile.Id
                    });
                }
            }
        }
        else
        {
            // Create a new profile if it doesn't exist
            var newProfile = new Profile
            {
                Name = profileDto.Name,
                Investigations = profileDto.Investigations.Select(inv => new ProfileInvestigation
                {
                    Name = inv.Name
                }).ToList()
            };

            physician.Profiles.Add(newProfile);
        }

        // Save updates
        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task DeleteProfileAsync(string physicianId, string profileId)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        RemoveIfNotExpired(physician.Profiles, r => r.Id == profileId);
        await _physicianRepository.UpdateAsync(physician);
    }



    public async Task<int> GetPrescriptionCountAsync(string physicianId, string patientId)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        return physician.Patients.Where(p => p.UserId == patientId)?.FirstOrDefault()?.Prescriptions.Count ?? 0;
    }

    public async Task<dynamic> GetClinicSlotsAsync(string physicianId, string clinicId, DateTime date)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        var clinic = physician.Clinics.FirstOrDefault(c => c.Id == clinicId);
        if (clinic == null)
            throw new ArgumentException("Clinic not found.");

        var slots = new List<ClinicSlotsDto>();

        foreach (var slot in clinic.ClinicSlots)
        {
            var subSlots = await GetSubSlots(physicianId, slot, clinic, date); // ✅ Await here

            slots.Add(new ClinicSlotsDto
            {
                Id = slot.Id,
                Name = slot.Name,
                TimingFrom = slot.TimingFrom,
                TimingTo = slot.TimingTo,
                SubSlots = subSlots
            });
        }

        return slots;
    }

    private async Task<List<SubSlotDto>> GetSubSlots(string physicianId, ClinicSlots slot, Clinic clinic, DateTime date)
    {
        var appointments = (await _patientService.GetAppointmentsAsync(physicianId, true))
                          .Where(a => a.SlotId == slot.Id && a.Date.Date == date.Date)
                          .ToList();

        var subSlots = new List<SubSlotDto>();
        DateTime currentTime = DateTime.Now;
        DateTime startTime = DateTime.Parse(slot.TimingFrom);
        DateTime endTime = DateTime.Parse(slot.TimingTo);
        int maxPatients = clinic.MaxNumberOfPatients;

        if (date.Date == currentTime.Date)
        {
            int nextHour = currentTime.Hour + 1; // Move to the next hour
            if (nextHour >= endTime.Hour) // ❌ If all slots have passed, return empty list
            {
                return subSlots;
            }
            startTime = new DateTime(currentTime.Year, currentTime.Month, currentTime.Day, nextHour, 0, 0);
        }

        while (startTime.AddMinutes(60) <= endTime)
        {
            var subSlotAppointments = appointments.Where(a =>
                DateTime.TryParseExact(a.Time, "hh:mm tt", System.Globalization.CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime appointmentTime)
                && appointmentTime >= startTime
                && appointmentTime < startTime.AddMinutes(60)).Count();
            subSlots.Add(new SubSlotDto
            {
                StartTime = startTime.ToString("hh:mm tt"),
                EndTime = startTime.AddMinutes(60).ToString("hh:mm tt"),
                BookedCount = subSlotAppointments,
                AvailableCount = maxPatients - subSlotAppointments,
                ColorClass = GetSlotColor(subSlotAppointments, maxPatients)
            });
            startTime = startTime.AddMinutes(60);
        }

        return subSlots;
    }

    private string GetSlotColor(int booked, int max)
    {
        double percentBooked = (double)booked / max;

        if (percentBooked == 1) return "bg-danger";
        if (percentBooked > 0.5) return "bg-orange";
        if (percentBooked > 0) return "bg-warning";
        return "bg-success";
    }

    public async Task SaveMultipleAppointment(string status, DateTime? date, string? time, string? reason, List<AppointmentDto> dtos)
    {
        foreach (var appoint in dtos)
        {
            appoint.Status = status;
            if (date.HasValue)
                appoint.Date = date.Value;
            if (!string.IsNullOrEmpty(time))
                appoint.Time = time;
            if (!string.IsNullOrEmpty(reason))
                appoint.Reason = reason;
            await _patientService.SaveAppointmentAsync(appoint.PatientId, appoint);
        }
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
            throw new InvalidOperationException("Cannot remove item(s) as they were created more than 1 hour ago. Please contact admin.");
        }
    }

    public async Task<PatientHistoryDto> GetPatientHistoryAsync(string patientId)
    {
        // Retrieve the patient entity using patientId as the user id.
        var patientEntity = await _patientRepository.GetByDynamicPropertyAsync("UserId", patientId);
        if (patientEntity == null)
        {
            throw new ArgumentException("Patient not found.");
        }

        // Map each collection individually using the GenericMapper.
        // (Assuming the patient entity has a property 'Prescriptions' matching PrescriptionDto.)
        var prescriptions = await GetPrescriptionsAsync(null, patientId, true);
        var prescriptionsDto = (prescriptions?
                    .Select(p => GenericMapper.Map(p, new PrescriptionDto()))
                    .ToList()) ?? new List<PrescriptionDto>();

        var selfRecordsDto = patientEntity.SelfRecords?
            .Select(sr => GenericMapper.Map(sr, new SelfRecordDto()))
            .ToList() ?? new List<SelfRecordDto>();

        var labInvestigationsDto = patientEntity.LabInvestigations?
            .Select(li => GenericMapper.Map(li, new LabInvestigationDto()))
            .ToList() ?? new List<LabInvestigationDto>();

        var reportsDto = patientEntity.Reports?
            .Select(r => GenericMapper.Map(r, new ReportDto()))
            .ToList() ?? new List<ReportDto>();

        var immunizationsDto = patientEntity.Immunizations?
            .Select(i => GenericMapper.Map(i, new ImmunizationDto()))
            .ToList() ?? new List<ImmunizationDto>();

        var symptomsDto = patientEntity.Symptoms?
            .Select(s => GenericMapper.Map(s, new SymptomDto()))
            .ToList() ?? new List<SymptomDto>();

        // Create the history DTO using the mapped collections.
        var historyDto = new PatientHistoryDto
        {
            Prescriptions = prescriptionsDto,
            SelfRecords = selfRecordsDto,
            LabInvestigations = labInvestigationsDto,
            Reports = reportsDto,
            Immunizations = immunizationsDto,
            Symptoms = symptomsDto
        };

        return historyDto;

    }

}