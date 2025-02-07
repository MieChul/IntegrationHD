using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;

public class Patient : BaseEntity
{
    [BsonElement("user_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string UserId { get; set; }

    [BsonElement("medical_history")]
    public List<MedicalHistory> MedicalHistory { get; set; } = new();

    [BsonElement("current_treatments")]
    public List<Treatment> CurrentTreatments { get; set; } = new();

    [BsonElement("appointments")]
    public List<Appointment> Appointments { get; set; } = new();

    [BsonElement("self_records")]
    public List<SelfRecord> SelfRecords { get; set; } = new();

    [BsonElement("symptoms")]
    public List<Symptom> Symptoms { get; set; } = new();

    [BsonElement("lab_investigations")]
    public List<LabInvestigation> LabInvestigations { get; set; } = new();

    [BsonElement("reports")]
    public List<Report> Reports { get; set; } = new();

    [BsonElement("immunizations")]
    public List<Immunization> Immunizations { get; set; } = new();

    [BsonElement("compliance")]
    public List<Compliance> Compliance { get; set; } = new();

    [BsonElement("activity")]
    public List<Activity> Activities { get; set; } = new();

    [BsonElement("patient_info")]
    public PatientInfo PatientInfo { get; set; }

    [BsonElement("home_remedies")]
    public List<HomeRemedy> HomeRemedies { get; set; } = new();
}

public class MedicalHistory : BaseEntity
{
    [BsonElement("disease")]
    public string Disease { get; set; }

    [BsonElement("date_of_diagnosis")]
    public DateTime DateOfDiagnosis { get; set; }

    [BsonElement("treatment")]
    public string TreatmentDrug { get; set; }

    [BsonElement("outcome")]
    public string? Outcome { get; set; }

    [BsonElement("dosage_form")]
    public string DosageForm { get; set; }

    [BsonElement("strength")]
    public double Strength { get; set; }


    [BsonElement("strength_unit")]
    public string StrengthUnit { get; set; }

    [BsonElement("frequency")]
    public string Frequency { get; set; }
}

public class Treatment : BaseEntity
{

    [BsonElement("drug")]
    public string TreatmentDrug { get; set; }

    [BsonElement("dosage_form")]
    public string DosageForm { get; set; }

    [BsonElement("strength")]
    public double Strength { get; set; }

    [BsonElement("strength_unit")]
    public string StrengthUnit { get; set; }

    [BsonElement("frequency")]
    public string Frequency { get; set; }

    [BsonElement("start_date")]
    public DateTime StartDate { get; set; }

    [BsonElement("end_date")]
    public DateTime? EndDate { get; set; } = null;

    [BsonElement("comment")]
    public string? Comment { get; set; }
}

public class Appointment : BaseEntity
{
    [BsonElement("physician_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string PhysicianId { get; set; }

    [BsonElement("patient_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string PatientId { get; set; }

    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("time")]
    public string Time { get; set; }

    [BsonElement("status")]
    public string Status { get; set; }

    [BsonElement("clinic_name")]
    public string ClinicName { get; set; }

    [BsonElement("mobile")]
    public string Mobile { get; set; }

    [BsonElement("reason")]
    public string? Reason { get; set; } = string.Empty;

    [BsonElement("physician_name")]
    public string? PhysicianName { get; set; } = string.Empty;

    [BsonElement("patient_name")]
    public string? PatientName { get; set; } = string.Empty;
    [BsonElement("slot_id")]
    public string SlotId { get; set; }
    [BsonElement("slot_name")]
    public string SlotName { get; set; }
}

public class Activity : BaseEntity
{
    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("meals")]
    public List<Meal> Meals { get; set; } = new();

    [BsonElement("exercises")]
    public List<Exercise> Exercises { get; set; } = new();
}

public class Meal : BaseEntity
{
    [BsonElement("meal_type")]
    public string MealType { get; set; }

    [BsonElement("food")]
    public string Food { get; set; }

    [BsonElement("quantity")]
    public string Quantity { get; set; }
}

public class Exercise : BaseEntity
{
    [BsonElement("type")]
    public string Type { get; set; }

    [BsonElement("duration_minutes")]
    public int DurationMinutes { get; set; }
}

public class SelfRecord : BaseEntity
{
    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("type")]
    public string Type { get; set; }

    [BsonElement("value")]
    public double Value { get; set; }

    [BsonElement("unit")]
    public string Unit { get; set; }
}

public class Symptom : BaseEntity
{
    [BsonElement("date")]
    public DateTime DateOfOnset { get; set; }

    [BsonElement("time")]
    public string TimeOfOnset { get; set; }

    [BsonElement("symptom_type")]
    public string SymptomType { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("severity")]
    public string Severity { get; set; }

    [BsonElement("comment")]
    public string Comment { get; set; }

    [BsonElement("endDate")]
    public DateTime? EndDate { get; set; }
}

public class LabInvestigation : BaseEntity
{

    [BsonElement("name")]
    public string LaboratoryName { get; set; }

    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("time")]
    public string Time { get; set; }

    [BsonElement("test")]
    public string LabTest { get; set; }

    [BsonElement("value")]
    public string Value { get; set; }

    [BsonElement("unit")]
    public string Unit { get; set; }
}

public class Immunization : BaseEntity
{

    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("vaccine")]
    public string Vaccine { get; set; }

    [BsonElement("disease")]
    public string Disease { get; set; }

    [BsonElement("route")]
    public string Route { get; set; }

    [BsonElement("dosage")]
    public string DosageForm { get; set; }

    [BsonElement("details")]
    public string Details { get; set; }
}

public class HomeRemedy : BaseEntity
{
    [BsonElement("remedy")]
    public string Remedy { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }
}

public class Compliance : BaseEntity
{

    [BsonElement("dosage_form")]
    public string DosageForm { get; set; }

    [BsonElement("drug_name")]
    public string DrugName { get; set; }

    [BsonElement("strength")]
    public string Strength { get; set; }

    [BsonElement("frequency")]
    public string Frequency { get; set; }

    [BsonElement("pills_count")]
    public int PillsCount { get; set; }

    [BsonElement("compliance_details")]
    public List<ComplianceDetail> ComplianceDetails { get; set; } = new();

    [BsonElement("reminders")]
    public List<Reminder> Reminders { get; set; } = new();
}

public class ComplianceDetail : BaseEntity
{
    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("time")]
    public string Time { get; set; }

    [BsonElement("is_compliant")]
    public bool IsCompliant { get; set; }
}

public class Reminder : BaseEntity
{

    [BsonElement("frequency_time")]
    public List<string> TimesOfDay { get; set; }

    [BsonElement("days")]
    public List<FrequencyDays> Days { get; set; }

    [BsonElement("instruction")]
    public string Instruction { get; set; }
}

public class FrequencyDays : BaseEntity
{
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }

    public int FrequencyDayTypeKey { get; set; }
    public List<string> WeekDaysSelected { get; set; }
}

public class PatientInfo : BaseEntity
{
    [BsonElement("weight")]
    public double Weight { get; set; }

    [BsonElement("height")]
    public double Height { get; set; }

    [BsonElement("occupation")]
    public string Occupation { get; set; }

    [BsonElement("lifestyle")]
    public string Lifestyle { get; set; }
}

public class Report : BaseEntity
{
    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("time")]
    public string Time { get; set; }

    [BsonElement("type")]
    public string Type { get; set; }

    [BsonElement("assessment")]
    public string Assessment { get; set; }

    [BsonElement("results")]
    public string Results { get; set; }

    [BsonElement("comment")]
    public string Comment { get; set; }

    [BsonElement("report_url")]
    public string ReportUrl { get; set; }
}

