using System.ComponentModel.DataAnnotations;
using HealthDesk.Core.Enum;

namespace HealthDesk.Application;

public class PasswordResetDto
{
    public string Contact { get; set; }
    public string NewPassword { get; set; }
    public bool IsEmail { get; set; }
}

public class UserLoginDto
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
}

public class UserDto
{
    public string Id { get; set; }
    public string Username { get; set; }
    public string Status { get; set; }
    public List<UserRoleDto> Roles { get; set; } = new();
    public string ProfImage { get; set; }
    public bool CanSwitch { get; set; }
    public string DependentId { get; set; }
    public bool HasDependent { get; set; }
    public string DependentName { get; set; }
    public bool IsMainApproved { get; set; }
    public string DateOfBirth { get; set; }
    public string Gender { get; set; }
}

public class UserRegistrationDto
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string? Email { get; set; } = string.Empty;
    public string Mobile { get; set; }
    public int RoleId { get; set; }
    public string? FirstName { get; set; } = string.Empty;
    public string? LastName { get; set; } = string.Empty;
    public string MiddleName { get; set; } = string.Empty;
    public DateTime? DOB { get; set; } = null;
    public string? Gender { get; set; } = string.Empty;
}

public class UpdateRequestDto
{
    public string? FirstName { get; set; } = string.Empty;
    public string? LastName { get; set; } = string.Empty;
    public string? Username { get; set; } = string.Empty;
    public string? Password { get; set; } = string.Empty;

    public string? Role { get; set; } = string.Empty;
    public string? ProfImage { get; set; } = string.Empty;
    public string? GDoc { get; set; } = string.Empty;
    public string? PDoc { get; set; } = string.Empty;
    public string? SDoc { get; set; } = string.Empty;
    public string? ADoc { get; set; } = string.Empty;
    public string? MDoc { get; set; } = string.Empty;
    public string? ClinicImage { get; set; } = string.Empty;
}

public class UpdateUserInfoRequestDto
{
    public string? DisplayName { get; set; } = string.Empty;
    public string? FirstName { get; set; } = string.Empty;
    public string? MiddleName { get; set; } = string.Empty;
    public string? LastName { get; set; } = string.Empty;
    public string? Gender { get; set; } = string.Empty;
    public string? Mobile1 { get; set; } = string.Empty;
    public string? Mobile2 { get; set; } = string.Empty;
    public string? Email1 { get; set; } = string.Empty;
    public string? Email2 { get; set; } = string.Empty;
    public string? Aadhar { get; set; } = string.Empty;
    public string? Pan { get; set; } = string.Empty;
    public string? Address1 { get; set; } = string.Empty;
    public string? Address2 { get; set; } = string.Empty;
    public string? City { get; set; } = string.Empty;
    public string? State { get; set; } = string.Empty;
    public string? Area { get; set; } = string.Empty;
    public string? Pincode { get; set; } = string.Empty;
    public Graduation? Graduation { get; set; } = null;
    public Graduation? PostGraduation { get; set; } = null;
    public Graduation? SuperSpecialization { get; set; } = null;
    public Graduation? AdditionalQualification { get; set; } = null;
    public MedicalRegistration? MedicalRegistration { get; set; } = null;
    public string? BirthDate { get; set; } = string.Empty;
    public string? ClinicName { get; set; } = string.Empty;
    public string? ClinicAddress1 { get; set; } = string.Empty;
    public string? ClinicAddress2 { get; set; } = string.Empty;
    public string? ClinicArea { get; set; } = string.Empty;
    public string ClinicCity { get; set; } = string.Empty;
    public string? ClinicState { get; set; } = string.Empty;
    public string? ClinicPincode { get; set; } = string.Empty;
    public string? OrgName { get; set; } = string.Empty;
    public string? AuthFirstName { get; set; } = string.Empty;
    public string? AuthMiddleName { get; set; } = string.Empty;
    public string? AuthLastName { get; set; } = string.Empty;
    public string? AuthDesignation { get; set; } = string.Empty;
    public string? AuthDept { get; set; } = string.Empty;
    public string? LandLine { get; set; } = string.Empty;
    public string? AuthMob { get; set; } = string.Empty;
    public string? AuthEmail { get; set; } = string.Empty;
    public string? BloodGroup { get; set; } = string.Empty;
    public string? RelationId { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public DOB? DOB { get; set; } = new DOB() { Day = 01, Month = 01, Year = 2000 };

    public bool IsSave { get; set; } = false;
    public string? ProfImage { get; set; } = string.Empty;

    public bool NoDocConsentProvided { get; set; } = false;
    public string ClinicImage { get; set; }
    public string Username { get; set; }
}

public class DOB
{
    public int Day { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
}

public class Graduation
{
    public string? Year { get; set; } = string.Empty;
    public string? Institute { get; set; } = string.Empty;
    public string? Document { get; set; } = string.Empty;
}

public class MedicalRegistration
{
    public string? CertificateNumber { get; set; } = string.Empty;
    public string? CouncilName { get; set; } = string.Empty;

    public string? Document { get; set; } = string.Empty;
}


public class RegisterPatientInfoDto
{
    public string? FirstName { get; set; } = string.Empty;
    public string? MiddleName { get; set; } = string.Empty;
    public string? LastName { get; set; } = string.Empty;
    public string? Mobile1 { get; set; } = string.Empty;
    public string? Mobile2 { get; set; } = string.Empty;
    public string? Email1 { get; set; } = string.Empty;
    public string? Email2 { get; set; } = string.Empty;
    public string? Aadhar { get; set; } = string.Empty;
    public string? Address1 { get; set; } = string.Empty;
    public string? Address2 { get; set; } = string.Empty;
    public string? City { get; set; } = string.Empty;
    public string? State { get; set; } = string.Empty;
    public string? Area { get; set; } = string.Empty;
    public string? Pincode { get; set; } = string.Empty;

    public string? BloodGroup { get; set; } = string.Empty;
}

public class UserRoleDto
{
    public Role Role { get; set; }
    public string Status { get; set; } = string.Empty;
}
