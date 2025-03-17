
namespace HealthDesk.Application;

using System.ComponentModel.DataAnnotations;

public class LabTestDto
{
    public string? Id { get; set; }

    [Required(ErrorMessage = "Test name is required.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Specimen requirement is required.")]
    public string SpecimenRequirement { get; set; }

    [Required(ErrorMessage = "Precaution is required.")]
    public string Precaution { get; set; }

    [Required(ErrorMessage = "Reporting time is required.")]
    public string ReportingTime { get; set; }

    [Required(ErrorMessage = "Amount is required.")]
    public decimal Amount { get; set; }

    public string? Comment { get; set; }
}