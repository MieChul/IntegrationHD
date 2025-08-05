using System.ComponentModel.DataAnnotations;

namespace HealthDesk.Application;
public class ServiceDto
{
    public string? Id { get; set; }

    [Required(ErrorMessage = "Service name is required.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Specification name is required.")]

    public string Specification { get; set; }
    public string? Comment { get; set; }
}

public class PhysicianRecordDto
{
    public string? Id { get; set; }
    public string? UserId { get; set; }

    [Required(ErrorMessage = "Mobile number is required.")]
    [RegularExpression(@"^[789]\d{9}$", ErrorMessage = "Invalid mobile number format.")]
    public string Mobile { get; set; }

    [Required(ErrorMessage = "First name is required.")]
    [RegularExpression(@"^[a-zA-Z][a-zA-Z '-]{1,49}$", ErrorMessage = "Invalid first name format.")]
    public string FirstName { get; set; }

    [RegularExpression(@"^[a-zA-Z][a-zA-Z '-]{1,49}$", ErrorMessage = "Invalid middle name format.")]
    public string? MiddleName { get; set; }

    [Required(ErrorMessage = "Last name is required.")]
    [RegularExpression(@"^[a-zA-Z][a-zA-Z '-]{1,49}$", ErrorMessage = "Invalid last name format.")]
    public string LastName { get; set; }

    [Required(ErrorMessage = "Gender is required.")]
    public string Gender { get; set; }

    [Required(ErrorMessage = "Date of birth is required.")]
    public string DateOfBirth { get; set; }

    public string? Graduation { get; set; }

    public string? PostGraduation { get; set; }

    public string? SuperSpecialization { get; set; }

    public string? AdditionalQualification { get; set; }

    public string? Speciality { get; set; }

    [Required(ErrorMessage = "At least one day must be selected.")]
    [MinLength(1, ErrorMessage = "At least one day must be selected.")]
    public List<string> Days { get; set; }

    [Required(ErrorMessage = "To Timing is required.")]
    public string To { get; set; }

    [Required(ErrorMessage = "From Timing is required.")]
    public string From { get; set; }

    [Required(ErrorMessage = "Is Active is required.")]
    public bool IsActive { get; set; }
}

public class HospitalInfoDto
{
    public List<string>? Preferences { get; set; } = new List<string>();
}



