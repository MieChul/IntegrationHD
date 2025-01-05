namespace HealthDesk.Application;
public class MedicalHistoryDto
{
    public string Id { get; set; }
    public DateTime DateOfDiagnosis { get; set; }
    public string Disease { get; set; }
    public string TreatmentDrug { get; set; }
    public string DosageForm { get; set; }
    public string Strength { get; set; }
    public string Frequency { get; set; }
    public string Outcome { get; set; }
}

public class CurrentTreatmentDto
{
    public string Id { get; set; }
    public string Drug { get; set; }
    public string DosageForm { get; set; }
    public string Strength { get; set; }
    public string Frequency { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Comment { get; set; }
}

public class AppointmentDto
{
    public string Id { get; set; }
    public string PhysicianId { get; set; } // Reference to Physician
    public DateTime Date { get; set; }
    public string Time { get; set; }
    public string ClinicId { get; set; } // Reference to Clinic
    public string Status { get; set; }
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
