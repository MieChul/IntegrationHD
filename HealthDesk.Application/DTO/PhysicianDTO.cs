
using System.ComponentModel.DataAnnotations;

namespace HealthDesk.Application;
public class PhysicianClinicDto
{
    public string ClinicId { get; set; }
    [Required]
    [StringLength(25)]
    public string Name { get; set; }

    [StringLength(50)]
    public string HouseNumber { get; set; }

    [StringLength(50)]
    public string Building { get; set; }

    [Required]
    [StringLength(100)]
    public string Area { get; set; }

    [Required]
    [RegularExpression(@"^[1-9][0-9]{5}$", ErrorMessage = "Invalid Pincode")]
    public string Pincode { get; set; }

    [Required]
    public string State { get; set; }

    [Required]
    public string City { get; set; }

    [Required]
    public string Timing { get; set; }

    public bool IsActive { get; set; }

    [Required]
    [MinLength(1, ErrorMessage = "At least one day must be selected.")]
    public List<string> Days { get; set; }
}

public class DesignPrescriptionDto
{
    public string Id { get; set; }
    public string HeaderUrl { get; set; }
    public string FooterUrl { get; set; }
    public bool IsDefault { get; set; }
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
