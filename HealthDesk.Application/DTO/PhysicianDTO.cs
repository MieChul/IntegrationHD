
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