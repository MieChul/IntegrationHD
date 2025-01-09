
using HealthDesk.Application.DTO;
using HealthDesk.Core;
using HealthDesk.Infrastructure;

namespace HealthDesk.Application;
public class PhysicianService : IPhysicianService
{
    private readonly IPhysicianRepository _physicianRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMessageService _messageService;
    public PhysicianService(IPhysicianRepository physicianRepository, IMessageService messageService, IUserRepository userRepository)
    {
        _physicianRepository = physicianRepository;
        _messageService = messageService;
        _userRepository = userRepository;
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
            physician.Clinics.Add(clinic);
        }
        else
        {
            // Update existing clinic
            GenericMapper.Map(clinicDto, clinic);
            clinic.Days = clinicDto.Days;
        }

        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task DeleteClinicAsync(string physicianId, string clinicId)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        physician.Clinics.RemoveAll(c => c.Id == clinicId);
        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task<IEnumerable<Clinic>> GetClinicsAsync(string physicianId)
    {
        var physician = await _physicianRepository.GetByDynamicPropertyAsync("UserId", physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        return physician.Clinics;
    }
    public async Task<IEnumerable<DesignPrescriptionDto>> GetAllDesignPrescriptionsAsync(string physicianId)
    {
        var physician = await _physicianRepository.GetByIdAsync(physicianId);
        return physician.DesignPrescriptions.Select(dp => GenericMapper.Map<DesignPrescription, DesignPrescriptionDto>(dp));
    }

    public async Task DeleteDesignPrescriptionAsync(string physicianId, string prescriptionId)
    {
        var physician = await _physicianRepository.GetByIdAsync(physicianId);
        physician.DesignPrescriptions.RemoveAll(dp => dp.Id == prescriptionId);
        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task<IEnumerable<PatientRecordDto>> GetAllPatientsAsync(string physicianId)
    {
        var physician = await _physicianRepository.GetByIdAsync(physicianId);
        return physician.Patients.Select(p => GenericMapper.Map<PatientRecord, PatientRecordDto>(p));
    }

    public async Task SavePatientAsync(string physicianId, PatientRecordDto dto)
    {
        var physician = await _physicianRepository.GetByIdAsync(physicianId);
        var patient = GenericMapper.Map<PatientRecordDto, PatientRecord>(dto);

        if (string.IsNullOrEmpty(dto.Id))
            physician.Patients.Add(patient);
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
        physician.Patients.RemoveAll(p => p.Id == patientId);
        await _physicianRepository.UpdateAsync(physician);
    }

    public async Task<IEnumerable<PrescriptionDto>> GetPrescriptionsAsync(string physicianId, string patientId)
    {
        var physician = await _physicianRepository.GetByIdAsync(physicianId);
        var patient = physician.Patients.FirstOrDefault(p => p.Id == patientId);
        return patient?.Prescriptions.Select(p => GenericMapper.Map<Prescription, PrescriptionDto>(p));
    }

    public async Task<string> AddPrescriptionAsync(string physicianId, PrescriptionDto dto)
    {
        var physician = await _physicianRepository.GetByIdAsync(physicianId);
        if (physician == null)
            throw new ArgumentException("Physician not found.");

        var patient = physician.Patients.FirstOrDefault(p => p.Id == dto.PatientId);
        if (patient == null)
            throw new ArgumentException("Patient not found.");

        var prescription = GenericMapper.Map<PrescriptionDto, Prescription>(dto);
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
        physician.MedicalCases.RemoveAll(mc => mc.Id == caseId);
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
            FullName = $"{user.FirstName}, {user.LastName}",
            MrcNumber = user.MedicalRegistration.CertificateNumber
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
}