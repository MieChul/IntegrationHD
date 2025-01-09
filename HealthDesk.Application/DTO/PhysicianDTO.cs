
using System.ComponentModel.DataAnnotations;

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

    [Required(ErrorMessage = "Timing is required.")]
    public string Timing { get; set; }

    public bool IsActive { get; set; } = false;

    [Required(ErrorMessage = "At least one day must be selected.")]
    [MinLength(1, ErrorMessage = "At least one day must be selected.")]
    public List<string> Days { get; set; }
}


public class DesignPrescriptionDto
{
    public string Id { get; set; }
    public int TemplateId { get; set; }

    [Required(ErrorMessage = "Template Name is Required.")]
    [StringLength(25, ErrorMessage = "Name cannot exceed 25 characters.")]
    public string TemplateName { get; set; } // Required field
    public string HeaderImage { get; set; } // Base64 encoded
    public string FooterImage { get; set; } // Base64 encoded
    public string HeaderUrl { get; set; }   // Mapped URL
    public string FooterUrl { get; set; }   // Mapped URL
    public bool IsDefault { get; set; }

    [RegularExpression(@"^[a-zA-Z0-9.,' ]+$", ErrorMessage = "Physician Name can only contain alphanumeric characters, dots, commas, and apostrophes.")]
    [StringLength(25, ErrorMessage = "Physician Name cannot exceed 25 characters.")]
    public string PhysicianName { get; set; }

    public string PhysicianNameFontType { get; set; }
    public string PhysicianNameFontSize { get; set; }
    public string PhysicianNameFontColor { get; set; }

    [StringLength(100, ErrorMessage = "Address cannot exceed 100 characters.")]
    [Required(ErrorMessage = "Clinic Address is required.")]
    public string ClinicAddress { get; set; }

    public string ClinicAddressFontType { get; set; }
    public string ClinicAddressFontSize { get; set; }
    public string ClinicAddressFontColor { get; set; }

    public string ClinicName { get; set; }
    public string ClinicNameFontType { get; set; }
    public string ClinicNameFontSize { get; set; }
    public string ClinicNameFontColor { get; set; }

    [StringLength(200, ErrorMessage = "Footer Text cannot exceed 200 characters.")]
    public string FooterText { get; set; }
    public string FooterTextFontType { get; set; }
    public string FooterTextFontSize { get; set; }
    public string FooterTextFontColor { get; set; }

    [Required(ErrorMessage = "Phone Number is required.")]
    [RegularExpression(@"^[6-9][0-9]{9}$", ErrorMessage = "Invalid Phone Number.")]
    public string ClinicPhone { get; set; }
    public string ClinicPhoneFontType { get; set; }
    public string ClinicPhoneFontSize { get; set; }
    public string ClinicPhoneFontColor { get; set; }

    [StringLength(50, ErrorMessage = "Timings cannot exceed 50 characters.")]
    [Required(ErrorMessage = "Clinic Timings are required.")]
    public string ClinicTimings { get; set; }
    public string ClinicTimingsFontType { get; set; }
    public string ClinicTimingsFontSize { get; set; }
    public string ClinicTimingsFontColor { get; set; }

    [Required(ErrorMessage = "MRC Number is required.")]
    [RegularExpression(@"^[a-zA-Z0-9]+$", ErrorMessage = "MRC Number can only contain alphanumeric characters.")]
    public string MrcNumber { get; set; }
    public string MrcNumberFontType { get; set; }
    public string MrcNumberFontSize { get; set; }
    public string MrcNumberFontColor { get; set; }

    [RegularExpression(@"^[a-zA-Z0-9.,' ]+$", ErrorMessage = "Qualification can only contain alphanumeric characters, dots, commas, and apostrophes.")]
    [StringLength(50, ErrorMessage = "Qualification cannot exceed 50 characters.")]
    public string Qualification { get; set; }
    public string QualificationFontType { get; set; }
    public string QualificationFontSize { get; set; }
    public string QualificationFontColor { get; set; }

    public string LogoImage { get; set; }
    public string LogoUrl { get; set; }
}

public class PatientRecordDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Gender { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Mobile { get; set; }
    public string ABHAID { get; set; }
    public string SecondaryId { get; set; }
    public string PatientReferenceId { get; set; }
}

public class PrescriptionDto
{
    public string PatientId { get; set; }
    public DateTime VisitedDate { get; set; }
    public string PrescriptionUrl { get; set; }
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
    public List<FrequencyDaysDto> Days { get; set; } = new();
    public string Instruction { get; set; }
}
