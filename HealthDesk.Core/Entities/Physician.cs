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

    [BsonElement("profiles")]
    public List<Profile> Profiles { get; set; } = new();

    [BsonElement("reviews")]
    public List<Reviews> Reviews { get; set; } = new();

    [BsonElement("info")]
    public PhysicianInfo PhysicianInfo { get; set; }

}

public class Clinic : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("flat_number")]
    public string? FlatNumber { get; set; }

    [BsonElement("building")]
    public string? Building { get; set; }

    [BsonElement("area")]
    public string Area { get; set; }

    [BsonElement("pin_code")]
    public string PinCode { get; set; }

    [BsonElement("state")]
    public string State { get; set; }

    [BsonElement("city")]
    public string City { get; set; }

    [BsonElement("slots")]
    public List<ClinicSlots> ClinicSlots { get; set; }

    [BsonElement("days")]
    public List<string> Days { get; set; }

    [BsonElement("is_active")]
    public bool? IsActive { get; set; } = false;

    [BsonElement("is_default")]
    public bool IsDefault { get; set; }

    [BsonElement("max")]
    public int MaxNumberOfPatients { get; set; }
}

public class ClinicSlots : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("from")]
    public string TimingFrom { get; set; }

    [BsonElement("to")]
    public string TimingTo { get; set; }
}

public class DesignPrescription : BaseEntity
{
    [BsonElement("template_id")]
    public string TemplateId { get; set; }
    [BsonElement("header_url")]
    public string HeaderUrl { get; set; }

    [BsonElement("footer_url")]
    public string FooterUrl { get; set; }

    [BsonElement("logo_url")]
    public string LogoUrl { get; set; }

    [BsonElement("is_default")]
    public bool IsDefault { get; set; }
    [BsonElement("template_name")]
    public string TemplateName { get; set; }

    [BsonElement("clinic_name_font_type")]
    public string ClinicNameFontType { get; set; }

    [BsonElement("clinic_name_font_size")]
    public string ClinicNameFontSize { get; set; }

    [BsonElement("clinic_name_font_color")]
    public string ClinicNameFontColor { get; set; }

    [BsonElement("clinic_address_font_type")]
    public string ClinicAddressFontType { get; set; }

    [BsonElement("clinic_address_font_size")]
    public string ClinicAddressFontSize { get; set; }

    [BsonElement("clinic_address_font_color")]
    public string ClinicAddressFontColor { get; set; }

    [BsonElement("clinic_phone_font_type")]
    public string ClinicPhoneFontType { get; set; }

    [BsonElement("clinic_phone_font_size")]
    public string ClinicPhoneFontSize { get; set; }

    [BsonElement("clinic_phone_font_color")]
    public string ClinicPhoneFontColor { get; set; }

    [BsonElement("clinic_timings_font_type")]
    public string ClinicTimingsFontType { get; set; }

    [BsonElement("clinic_timings_font_size")]
    public string ClinicTimingsFontSize { get; set; }

    [BsonElement("clinic_timings_font_color")]
    public string ClinicTimingsFontColor { get; set; }

    [BsonElement("physician_name_font_type")]
    public string PhysicianNameFontType { get; set; }

    [BsonElement("physician_name_font_size")]
    public string PhysicianNameFontSize { get; set; }

    [BsonElement("physician_name_font_color")]
    public string PhysicianNameFontColor { get; set; }

    [BsonElement("mrc_number_font_type")]
    public string MrcNumberFontType { get; set; }

    [BsonElement("mrc_number_font_size")]
    public string MrcNumberFontSize { get; set; }

    [BsonElement("mrc_number_font_color")]
    public string MrcNumberFontColor { get; set; }

    [BsonElement("qualification_font_type")]
    public string QualificationFontType { get; set; }

    [BsonElement("qualification_font_size")]
    public string QualificationFontSize { get; set; }

    [BsonElement("qualification_font_color")]
    public string QualificationFontColor { get; set; }

    [BsonElement("footer_text_font_type")]
    public string FooterTextFontType { get; set; }

    [BsonElement("footer_text_font_size")]
    public string FooterTextFontSize { get; set; }

    [BsonElement("footer_text_font_color")]
    public string FooterTextFontColor { get; set; }
    [BsonElement("physician_name")]
    public string PhysicianName { get; set; }

    [BsonElement("clinic_address")]
    public string ClinicAddress { get; set; }

    [BsonElement("clinic_phone")]
    public string ClinicPhone { get; set; }

    [BsonElement("clinic_timings")]
    public string ClinicTimings { get; set; }

    [BsonElement("footer_text")]
    public string FooterText { get; set; }
    [BsonElement("clinic_name")]
    public string ClinicName { get; set; }
    [BsonElement("qualification")]
    public string Qualification { get; set; }
}

public class PatientRecord : BaseEntity
{
    [BsonElement("user_id")]
    public string UserId { get; set; }

    [BsonElement("abha_id")]
    public string? ABHAID { get; set; } = string.Empty;

    [BsonElement("secondary_id")]
    public string? SecondaryId { get; set; } = string.Empty;

    [BsonElement("prescriptions")]
    public List<Prescription> Prescriptions { get; set; } = new();

    [BsonElement("last_visited_date")]
    public DateTime LastVisitedDate { get; set; }
}

public class Prescription : BaseEntity
{
    [BsonElement("date_of_diagnosis")]
    public DateTime? DateOfDiagnosis { get; set; } = DateTime.Now;

    [BsonElement("prescription_url")]
    public string PrescriptionUrl { get; set; }

    [BsonElement("physician_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string PhysicianId { get; set; }

    [BsonElement("clinic_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string ClinicId { get; set; }

    [BsonElement("illness")]
    public string Illness { get; set; }
}

public class MedicalCase : BaseEntity
{
    [BsonElement("user_id")]
    public string UserId { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("submitted_by")]
    public string SubmittedBy { get; set; }

    [BsonElement("comments")]
    public List<Comment> Comments { get; set; }

    [BsonElement("likes")]
    public List<string> LikedBy { get; set; }

    [BsonElement("shares_count")]
    public int SharesCount { get; set; }

    [BsonElement("images")]
    public List<CaseImage> CaseImages { get; set; }

    [BsonElement("speciality")]
    public List<string> Speciality { get; set; }

    [BsonElement("diagnosis")]
    public string Diagnosis { get; set; }

    [BsonElement("patient_initials")]
    public string PatientInitials { get; set; }

    [BsonElement("age")]
    public decimal Age { get; set; }

    [BsonElement("complaints")]
    public List<Complaint> Complaints { get; set; }

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
}

public class Complaint : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("days")]
    public int Days { get; set; }
}

public class Profile : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("investigations")]
    public List<ProfileInvestigation> Investigations { get; set; } = new();
}

public class ProfileInvestigation : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("profile_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string ProfileId { get; set; }
}

public class PhysicianInfo
{
    public List<string>? Preferences { get; set; } = new List<string>();

}


