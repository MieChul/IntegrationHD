using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;

public class Physician : BaseEntity
{
    [BsonElement("user_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string UserId { get; set; }

    [BsonElement("clinics")]
    public List<Clinic> Clinics { get; set; } = new();

    [BsonElement("design_prescriptions")]
    public List<DesignPrescription> DesignPrescriptions { get; set; } = new();

    [BsonElement("patients")]
    public List<PatientRecord> Patients { get; set; } = new();

    [BsonElement("medical_cases")]
    public List<MedicalCase> MedicalCases { get; set; } = new();
}

public class Clinic : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("flat_number")]
    public string FlatNumber { get; set; }

    [BsonElement("building")]
    public string Building { get; set; }

    [BsonElement("area")]
    public string Area { get; set; }

    [BsonElement("pin_code")]
    public string PinCode { get; set; }

    [BsonElement("state")]
    public string State { get; set; }

    [BsonElement("city")]
    public string City { get; set; }

    [BsonElement("timing")]
    public string Timing { get; set; }

    [BsonElement("days")]
    public string Days { get; set; }

    [BsonElement("is_active")]
    public bool IsActive { get; set; }
}

public class DesignPrescription: BaseEntity
{
    [BsonElement("header_url")]
    public string HeaderUrl { get; set; }

    [BsonElement("footer_url")]
    public string FooterUrl { get; set; }

    [BsonElement("is_default")]
    public bool IsDefault { get; set; }
}

public class PatientRecord : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("gender")]
    public string Gender { get; set; }

    [BsonElement("dob")]
    public DateTime DateOfBirth { get; set; }

    [BsonElement("mobile")]
    public string Mobile { get; set; }

    [BsonElement("abha_id")]
    public string ABHAID { get; set; }

    [BsonElement("secondary_id")]
    public string SecondaryId { get; set; }

    [BsonElement("patient_reference_id")]
    public string PatientReferenceId { get; set; }

    [BsonElement("prescriptions")]
    public List<Prescription> Prescriptions { get; set; } = new();

    [BsonElement("last_visited_date")]
    public DateTime LastVisitedDate { get; set; }
}

public class Prescription : BaseEntity
{
    [BsonElement("date_of_diagnosis")]
    public DateTime DateOfDiagnosis { get; set; }

    [BsonElement("prescription_url")]
    public string PrescriptionUrl { get; set; }

    [BsonElement("physician_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string PhysicianId { get; set; }

    [BsonElement("clinic_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string ClinicId { get; set; }

    [BsonElement("remarks")]
    public string Remarks { get; set; }
}

public class MedicalCase : BaseEntity
{
    [BsonElement("image_url1")]
    public string ImageUrl1 { get; set; }

    [BsonElement("image_url2")]
    public string ImageUrl2 { get; set; }

    [BsonElement("image_url3")]
    public string ImageUrl3 { get; set; }

    [BsonElement("speciality")]
    public string Speciality { get; set; }

    [BsonElement("diagnosis")]
    public string Diagnosis { get; set; }

    [BsonElement("patient_initials")]
    public string PatientInitials { get; set; }

    [BsonElement("age")]
    public int Age { get; set; }

    [BsonElement("chief_complaints")]
    public List<string> ChiefComplaints { get; set; } = new();

    [BsonElement("past_history")]
    public string PastHistory { get; set; }

    [BsonElement("examination")]
    public string Examination { get; set; }

    [BsonElement("investigations")]
    public string Investigations { get; set; }

    [BsonElement("treatment")]
    public string Treatment { get; set; }

    [BsonElement("case_summary")]
    public string CaseSummary { get; set; }
    public int LikesCount { get; set; } = 0;
}
