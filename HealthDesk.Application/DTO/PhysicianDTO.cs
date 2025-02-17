
using System.ComponentModel.DataAnnotations;
using HealthDesk.Core;
using Microsoft.AspNetCore.Http;

namespace HealthDesk.Application;
public class PhysicianClinicDto
{
    public string? Id { get; set; }

    [Required(ErrorMessage = "Name is required.")]
    [StringLength(25, ErrorMessage = "Name cannot exceed 25 characters.")]
    public string Name { get; set; }

    [StringLength(50, ErrorMessage = "House Number cannot exceed 50 characters.")]
    public string FlatNumber { get; set; }

    [StringLength(50, ErrorMessage = "Building cannot exceed 50 characters.")]
    public string Building { get; set; }

    [Required(ErrorMessage = "Area is required.")]
    [StringLength(100, ErrorMessage = "Area cannot exceed 100 characters.")]
    public string Area { get; set; }

    [Required(ErrorMessage = "Pincode is required.")]
    [RegularExpression(@"^[1-9][0-9]{5}$", ErrorMessage = "Invalid Pincode.")]
    public string PinCode { get; set; }

    [Required(ErrorMessage = "State is required.")]
    public string State { get; set; }

    [Required(ErrorMessage = "City is required.")]
    public string City { get; set; }

    [Required(ErrorMessage = "At least one day must be selected.")]
    [MinLength(1, ErrorMessage = "At least one day must be selected.")]
    public List<ClinicSlotsDto> ClinicSlots { get; set; }

    public bool? IsActive { get; set; } = false;

    [Required(ErrorMessage = "At least one day must be selected.")]
    [MinLength(1, ErrorMessage = "At least one day must be selected.")]
    public List<string> Days { get; set; }


    [Required(ErrorMessage = "Number of Patients is required.")]
    public int MaxNumberOfPatients { get; set; }
}

public class ClinicSlotsDto
{
    public string? Id { get; set; }

    [Required(ErrorMessage = "Name is required.")]
    [StringLength(25, ErrorMessage = "Name cannot exceed 25 characters.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "From time is required.")]
    public string TimingFrom { get; set; }

    [Required(ErrorMessage = "To time is required.")]
    public string TimingTo { get; set; }

    public List<SubSlotDto> SubSlots { get; set; } = new();
}

public class SubSlotDto
{
    public string StartTime { get; set; }
    public string EndTime { get; set; }
    public int BookedCount { get; set; }
    public int AvailableCount { get; set; }
    public string ColorClass { get; set; }
}


public class DesignPrescriptionDto : BaseEntity
{
    public string? Id { get; set; }
    public string TemplateId { get; set; }

    [Required(ErrorMessage = "Template Name is Required.")]
    [StringLength(25, ErrorMessage = "Name cannot exceed 25 characters.")]
    public string TemplateName { get; set; } // Required field
    public string? HeaderImage { get; set; } = string.Empty;// Base64 encoded
    public string? FooterImage { get; set; } = string.Empty;// Base64 encoded
    public string? HeaderUrl { get; set; } = string.Empty;  // Mapped URL
    public string? FooterUrl { get; set; } = string.Empty; // Mapped URL
    public bool IsDefault { get; set; } = false;

    [RegularExpression(@"^[a-zA-Z0-9.,' ]+$", ErrorMessage = "Physician Name can only contain alphanumeric characters, dots, commas, and apostrophes.")]
    [StringLength(25, ErrorMessage = "Physician Name cannot exceed 25 characters.")]
    public string? PhysicianName { get; set; } = string.Empty;

    public string? PhysicianNameFontType { get; set; } = string.Empty;
    public string? PhysicianNameFontSize { get; set; } = string.Empty;
    public string? PhysicianNameFontColor { get; set; } = string.Empty;

    [StringLength(100, ErrorMessage = "Address cannot exceed 100 characters.")]
    [Required(ErrorMessage = "Clinic Address is required.")]
    public string? ClinicAddress { get; set; } = string.Empty;

    public string? ClinicAddressFontType { get; set; } = string.Empty;
    public string? ClinicAddressFontSize { get; set; } = string.Empty;
    public string? ClinicAddressFontColor { get; set; } = string.Empty;

    public string? ClinicName { get; set; } = string.Empty;
    public string? ClinicNameFontType { get; set; } = string.Empty;
    public string? ClinicNameFontSize { get; set; } = string.Empty;
    public string? ClinicNameFontColor { get; set; } = string.Empty;

    [StringLength(200, ErrorMessage = "Footer Text cannot exceed 200 characters.")]
    public string? FooterText { get; set; } = string.Empty;
    public string? FooterTextFontType { get; set; } = string.Empty;
    public string? FooterTextFontSize { get; set; } = string.Empty;
    public string? FooterTextFontColor { get; set; } = string.Empty;

    [Required(ErrorMessage = "Phone Number is required.")]
    [RegularExpression(@"^[6-9][0-9]{9}$", ErrorMessage = "Invalid Phone Number.")]
    public string? ClinicPhone { get; set; } = string.Empty;
    public string? ClinicPhoneFontType { get; set; } = string.Empty;
    public string? ClinicPhoneFontSize { get; set; } = string.Empty;
    public string? ClinicPhoneFontColor { get; set; } = string.Empty;

    [StringLength(50, ErrorMessage = "Timings cannot exceed 50 characters.")]
    [Required(ErrorMessage = "Clinic Timings are required.")]
    public string? ClinicTimings { get; set; } = string.Empty;
    public string? ClinicTimingsFontType { get; set; } = string.Empty;
    public string? ClinicTimingsFontSize { get; set; } = string.Empty;
    public string? ClinicTimingsFontColor { get; set; } = string.Empty;
    [Required(ErrorMessage = "MRC Number is required.")]
    [RegularExpression(@"^[a-zA-Z0-9]+$", ErrorMessage = "MRC Number can only contain alphanumeric characters.")]
    public string? MrcNumber { get; set; } = string.Empty;
    public string? MrcNumberFontType { get; set; } = string.Empty;
    public string? MrcNumberFontSize { get; set; } = string.Empty;
    public string? MrcNumberFontColor { get; set; } = string.Empty;

    [RegularExpression(@"^[a-zA-Z0-9.,' ]+$", ErrorMessage = "Qualification can only contain alphanumeric characters, dots, commas, and apostrophes.")]
    [StringLength(50, ErrorMessage = "Qualification cannot exceed 50 characters.")]
    public string? Qualification { get; set; } = string.Empty;
    public string? QualificationFontType { get; set; } = string.Empty;
    public string? QualificationFontSize { get; set; } = string.Empty;
    public string? QualificationFontColor { get; set; } = string.Empty;

    public string? LogoImage { get; set; } = string.Empty;
    public string? LogoUrl { get; set; } = string.Empty;
}

public class PatientRecordDto
{
    public string? Id { get; set; }
    public string? UserId { get; set; }
    public string Name { get; set; }
    public string Gender { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Mobile { get; set; }
    public string? ABHAID { get; set; } = string.Empty;
    public string? SecondaryId { get; set; } = string.Empty;
    public DateTime LastVisitedDate { get; set; }
}

public class PrescriptionDto
{
    public string? PhysicianId { get; set; } = string.Empty;
    public string? PatientId { get; set; } = string.Empty;
    public string? PrescriptionUrl { get; set; }
    public string? Illness { get; set; } = string.Empty;
    public string? PdfBase64 { get; set; } = string.Empty;
    public DateTime? DateOfDiagnosis { get; set; } = DateTime.Now;
}

public class MedicalCaseDto
{
    public string Id { get; set; }
    public string ImageUrl1 { get; set; }
    public string ImageUrl2 { get; set; }
    public string ImageUrl3 { get; set; }
    public string Speciality { get; set; }
    public string Diagnosis { get; set; }
    public string PatientInitials { get; set; }
    public int Age { get; set; }
    public List<string> ChiefComplaints { get; set; }
    public string PastHistory { get; set; }
    public string Examination { get; set; }
    public string Investigations { get; set; }
    public string Treatment { get; set; }
    public string CaseSummary { get; set; }
    public int LikesCount { get; set; }
}

public class ComplianceDetailDto
{
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public string Time { get; set; }
    public bool IsCompliant { get; set; }
}

public class ReminderDto
{
    public string Id { get; set; }
    public List<string> TimesOfDay { get; set; } = new();
    public string Instruction { get; set; }
}

public class SaveMultipleAppointmentsRequest
{
    public string Status { get; set; } = string.Empty;
    public string? Time { get; set; }
    public string? Reason { get; set; }
    public DateTime? Date { get; set; }
    public List<AppointmentDto> Dtos { get; set; } = new List<AppointmentDto>();
}
public class ProfileDTO
{
    public string? Id { get; set; }

    [Required(ErrorMessage = "Profile name is required.")]
    [StringLength(25, ErrorMessage = "Profile name cannot exceed 25 characters.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "At least one investigation is required.")]
    [MinLength(1, ErrorMessage = "At least one investigation is required.")]
    public List<ProfileInvestigationDTO> Investigations { get; set; }
}

public class ProfileInvestigationDTO
{
    public string? Id { get; set; }

    [Required(ErrorMessage = "Investigation name is required.")]
    [StringLength(100, ErrorMessage = "Investigation name cannot exceed 100 characters.")]
    public string Name { get; set; }

    public string? ProfileId { get; set; }
}

