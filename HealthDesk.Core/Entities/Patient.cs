using System.Runtime.CompilerServices;
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
    public List<Remedy> HomeRemedies { get; set; } = new();

}

public class MedicalHistory : BaseEntity
{
    [BsonElement("disease")]
    public string Disease { get; set; }

    [BsonElement("date_of_diagnosis")]
    public DateTime DateOfDiagnosis { get; set; }

    [BsonElement("start_date")]
    public DateTime Start { get; set; }

    [BsonElement("end_date")]
    public DateTime? End { get; set; }

    [BsonElement("price")]
    public decimal? Price { get; set; }
}

public class Treatment : BaseEntity
{
    [BsonElement("brand")]
    public string Brand { get; set; }

    [BsonElement("drug")]
    public string TreatmentDrug { get; set; }

    [BsonElement("dosage_form")]
    public string DosageForm { get; set; }

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

    [BsonElement("price")]
    public decimal? Price { get; set; }
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

    [BsonElement("total_calories")]
    public decimal? TotalCalories { get; set; }

    [BsonElement("total_calories_burnt")]
    public decimal? TotalCaloriesBurnt { get; set; }
}

public class Meal : BaseEntity
{
    [BsonElement("meal_type")]
    public string Type { get; set; } = string.Empty;

    [BsonElement("food_items")]
    public List<Item> FoodItems { get; set; }
}

public class Item : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("quantity")]
    public int Quantity { get; set; }

    [BsonElement("calories")]
    public decimal? Calories { get; set; }
}

public class Exercise : BaseEntity
{
    [BsonElement("type")]
    public string Type { get; set; } = string.Empty;

    [BsonElement("exercise_items")]
    public List<Item> ExerciseItems { get; set; }
}

public class SelfRecord : BaseEntity
{
    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("type")]
    public string Type { get; set; }

    [BsonElement("value1")]
    public double Value1 { get; set; }

    [BsonElement("value2")]
    public double? Value2 { get; set; }

    [BsonElement("unit")]
    public string Unit { get; set; }

    [BsonElement("time")]
    public string Time { get; set; }
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

    [BsonElement("price")]
    public decimal? Price { get; set; }
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

    [BsonElement("price")]
    public decimal? Price { get; set; }
}

public class Remedy : BaseEntity
{
    [BsonElement("user_id")]
    public string UserId { get; set; }

    [BsonElement("submitted_by")]
    public string SubmittedBy { get; set; }

    [BsonElement("remedy_for")]
    public List<string> RemedyFor { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("comments")]
    public List<Comment> Comments { get; set; } = new();

    [BsonElement("liked_by")]
    public List<string> LikedBy { get; set; }

    [BsonElement("share_count")]
    public int ShareCount { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("preparation_method")]
    public string PreparationMethod { get; set; }

    [BsonElement("usage_direction")]
    public string UsageDirection { get; set; }

    [BsonElement("precaution")]
    public string Precaution { get; set; }

    [BsonElement("ingredients")]
    public List<Ingredient> Ingredients { get; set; } = new();


    [BsonElement("images")]
    public List<CaseImage> Images { get; set; } = new();
}

public class Ingredient : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("quantity")]
    public decimal Quantity { get; set; }

}

public class CaseImage : BaseEntity
{
    public string ImageUrl { get; set; }
    public bool IsDefault { get; set; }
}

public class Compliance : BaseEntity
{
    public string Id { get; set; }
    public string TreatmentId { get; set; }
    public List<PatientComplianceDetail> ComplianceDetails { get; set; } = new();
    public List<PatientMedicineInfo> PatientMedicineInfos { get; set; } = new();
    public List<Reminder> Reminders { get; set; } = new();
}

public class PatientComplianceDetail : BaseEntity
{
    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("time")]
    public string Time { get; set; }

    [BsonElement("pill_taken")]
    public bool PillTaken { get; set; }
}

public class PatientMedicineInfo : BaseEntity
{
    public DateTime PurchaseDate { get; set; }
    public int Count { get; set; }
    public int ThreshHold { get; set; }
    public bool IsActive { get; set; }
}

public class Reminder : BaseEntity
{

    public string Id { get; set; }
    public List<string> TimesOfDay { get; set; } = new();
    public string Instruction { get; set; }
}


public class PatientInfo : BaseEntity
{
    [BsonElement("weight")]
    public double Weight { get; set; }

    [BsonElement("height")]
    public double Height { get; set; }

    [BsonElement("lifestyle")]
    public string LifeStyle { get; set; }


    [BsonElement("age")]
    public string Age { get; set; }


    [BsonElement("gender")]
    public string Gender { get; set; }

    [BsonElement("preferences")]
    public List<string>? Preferences { get; set; } = new List<string>();
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

    [BsonElement("comment")]
    public string Comment { get; set; }

    [BsonElement("report_url")]
    public string FilePath { get; set; }

    [BsonElement("price")]
    public decimal? Price { get; set; }
}


