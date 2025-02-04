using System.ComponentModel.DataAnnotations;

namespace HealthDesk.Application;
public class MedicalHistoryDto
{
    public string? Id { get; set; }

    [Required(ErrorMessage = "Date of diagnosis is required.")]
    [DataType(DataType.Date)]
    public DateTime DateOfDiagnosis { get; set; }

    [Required(ErrorMessage = "Disease is required.")]
    [StringLength(100, ErrorMessage = "Disease must not exceed 100 characters.")]
    public string Disease { get; set; }


    [Required(ErrorMessage = "Treatment drug is required.")]
    [StringLength(100, ErrorMessage = "Treatment drug must not exceed 100 characters.")]
    public string TreatmentDrug { get; set; }

    [Required(ErrorMessage = "Dosage form is required.")]
    [StringLength(50, ErrorMessage = "Dosage form must not exceed 50 characters.")]
    public string DosageForm { get; set; }

    [Required(ErrorMessage = "Strength is required.")]
    [Range(0, double.MaxValue, ErrorMessage = "Strength must be a positive number.")]
    public double Strength { get; set; }

    [Required(ErrorMessage = "Strength unit is required.")]
    [StringLength(50, ErrorMessage = "Strength unit must not exceed 50 characters.")]
    public string StrengthUnit { get; set; }

    [Required(ErrorMessage = "Frequency is required.")]
    [StringLength(50, ErrorMessage = "Frequency must not exceed 50 characters.")]
    public string Frequency { get; set; }

    [Required(ErrorMessage = "Outcome is required.")]
    [StringLength(50, ErrorMessage = "Outcome must not exceed 50 characters.")]
    public string Outcome { get; set; }
}

public class CurrentTreatmentDto
{
    public string? Id { get; set; }

    [Required(ErrorMessage = "Treatment drug is required.")]
    [StringLength(100, ErrorMessage = "Treatment drug must not exceed 100 characters.")]
    public string TreatmentDrug { get; set; }
    [Required(ErrorMessage = "Dosage form is required.")]
    [StringLength(50, ErrorMessage = "Dosage form must not exceed 50 characters.")]
    public string DosageForm { get; set; }


    [Required(ErrorMessage = "Strength is required.")]
    [Range(0, double.MaxValue, ErrorMessage = "Strength must be a positive number.")]
    public double Strength { get; set; }

    [Required(ErrorMessage = "Strength unit is required.")]
    [StringLength(50, ErrorMessage = "Strength unit must not exceed 50 characters.")]
    public string StrengthUnit { get; set; }

    [Required(ErrorMessage = "Frequency is required.")]
    [StringLength(50, ErrorMessage = "Frequency must not exceed 50 characters.")]
    public string Frequency { get; set; }

    [Required(ErrorMessage = "Start Date is required.")]
    [DataType(DataType.Date)]
    public DateTime StartDate { get; set; }

    [DataType(DataType.Date)]
    public DateTime? EndDate { get; set; }

    [StringLength(100, ErrorMessage = "Comment must not exceed 100 characters.")]
    public string? Comment { get; set; }
}

public class AppointmentDto
{
    public string? Id { get; set; }

    [Required(ErrorMessage = "Physician ID is required.")]
    public string PhysicianId { get; set; } = string.Empty;

    [Required(ErrorMessage = "Patient ID is required.")]
    public string PatientId { get; set; } = string.Empty;

    [Required(ErrorMessage = "Date is required.")]
    [FutureDate(ErrorMessage = "Appointment date cannot be in the past.")]
    public DateTime Date { get; set; }

    [Required(ErrorMessage = "Time is required.")]
    [TimeNotInPast(nameof(Date), ErrorMessage = "Appointment date and time cannot be in the past.")]
    public string Time { get; set; } = string.Empty;

    [Required(ErrorMessage = "Clinic name is required.")]
    public string ClinicName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Clinic name is required.")]
    public string Status { get; set; } = string.Empty;

    public string? Mobile { get; set; } = string.Empty;

    public string? Reason { get; set; } = string.Empty;

    [Required(ErrorMessage = "Physician name is required.")]
    public string PhysicianName { get; set; }

    public string? PatientName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Slot ID is required.")]
    public string SlotId { get; set; }

    [Required(ErrorMessage = "Slot name is required.")]
    public string SlotName { get; set; }
}


public class SelfRecordDto
{
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public string RecordType { get; set; }
    public string Description { get; set; }
}

public class SymptomDto
{
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public string Time { get; set; }
    public string SymptomType { get; set; }
    public string Description { get; set; }
    public string Severity { get; set; }
    public string Comment { get; set; }
}

public class LabInvestigationDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public string Time { get; set; }
    public string Test { get; set; }
    public string Value { get; set; }
    public string Unit { get; set; }
}

public class ReportDto
{
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public string Time { get; set; }
    public string Type { get; set; }
    public string Assessment { get; set; }
    public string Results { get; set; }
    public string Comment { get; set; }
    public string ReportUrl { get; set; }
}

public class ImmunizationDto
{
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public string Vaccine { get; set; }
    public string Disease { get; set; }
    public string Route { get; set; }
    public string Dosage { get; set; }
    public string Details { get; set; }
}

public class PatientInfoDto
{
    public double Weight { get; set; }
    public double Height { get; set; }
    public string Occupation { get; set; }
    public string Lifestyle { get; set; }
}

public class PatientComplianceDto
{
    public string Id { get; set; }
    public string DosageForm { get; set; }
    public string DrugName { get; set; }
    public string Strength { get; set; }
    public string Frequency { get; set; }
    public double CompliancePercentage { get; set; }
    public int PillsCount { get; set; }
    public List<ComplianceDetailDto> ComplianceDetails { get; set; } = new();
    public List<ReminderDto> Reminders { get; set; } = new();
}

public class FrequencyDaysDto
{
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
    public int FrequencyDayTypeKey { get; set; }
    public List<string> WeekDaysSelected { get; set; } = new();
}

public class ActivityDto
{
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public List<MealDto> Meals { get; set; } = new();
    public List<ExerciseDto> Exercises { get; set; } = new();
}

public class MealDto
{
    public string Id { get; set; }
    public string MealType { get; set; }
    public string Food { get; set; }
    public string Quantity { get; set; }
}

public class ExerciseDto
{
    public string Id { get; set; }
    public string Type { get; set; }
    public int DurationMinutes { get; set; }
}


