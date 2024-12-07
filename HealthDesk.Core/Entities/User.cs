using HealthDesk.Core.Enum;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;

public class User : BaseEntity
{
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public string Email { get; set; }
    public string Mobile { get; set; }
    public List<Role> Roles { get; set; } = new List<Role>();
    [BsonElement("u_id")]
    public string UniqueId { get; set; }

    [BsonElement("f_name")]
    public string FirstName { get; set; } = string.Empty;
    [BsonElement("l_name")]
    public string LastName { get; set; } = string.Empty;


    [BsonElement("status")]
    public string Status { get; set; } = string.Empty;

    [BsonElement("display_ame")]
    public string? DisplayName { get; set; } = string.Empty;

    [BsonElement("middle_name")]
    public string? MiddleName { get; set; } = string.Empty;

    [BsonElement("gender")]
    public string? Gender { get; set; } = string.Empty;

    [BsonElement("phone2")]
    public string? Mobile2 { get; set; } = string.Empty;

    [BsonElement("email2")]
    public string? Email2 { get; set; } = string.Empty;

    [BsonElement("aadhar")]
    public string? Aadhar { get; set; } = string.Empty;

    [BsonElement("pan")]
    public string? Pan { get; set; } = string.Empty;

    [BsonElement("address1")]
    public string? Address1 { get; set; } = string.Empty;

    [BsonElement("address2")]
    public string? Address2 { get; set; } = string.Empty;

    [BsonElement("city")]
    public string? City { get; set; } = string.Empty;

    [BsonElement("state")]
    public string? State { get; set; } = string.Empty;

    [BsonElement("area")]
    public string? Area { get; set; } = string.Empty;

    [BsonElement("pincode")]
    public string? Pincode { get; set; } = string.Empty;

    [BsonElement("birth_date")]
    public string? BirthDate { get; set; } = string.Empty;

    [BsonElement("clinic_name")]
    public string? ClinicName { get; set; } = string.Empty;

    [BsonElement("clinic_address1")]
    public string? ClinicAddress1 { get; set; } = string.Empty;

    [BsonElement("clinic_address2")]
    public string? ClinicAddress2 { get; set; } = string.Empty;

    [BsonElement("clinic_area")]
    public string? ClinicArea { get; set; } = string.Empty;

    [BsonElement("clinic_city")]
    public string ClinicCity { get; set; } = string.Empty;

    [BsonElement("clinic_state")]
    public string? ClinicState { get; set; } = string.Empty;

    [BsonElement("clinic_pincode")]
    public string? ClinicPincode { get; set; } = string.Empty;

    [BsonElement("org_name")]
    public string? OrgName { get; set; } = string.Empty;

    [BsonElement("auth_first_name")]
    public string? AuthFirstName { get; set; } = string.Empty;

    [BsonElement("auth_middle_name")]
    public string? AuthMiddleName { get; set; } = string.Empty;

    [BsonElement("auth_last_name")]
    public string? AuthLastName { get; set; } = string.Empty;

    [BsonElement("auth_designation")]
    public string? AuthDesignation { get; set; } = string.Empty;

    [BsonElement("auth_dept")]
    public string? AuthDept { get; set; } = string.Empty;

    [BsonElement("landLine")]
    public string? LandLine { get; set; } = string.Empty;

    [BsonElement("auth_mob")]
    public string? AuthMob { get; set; } = string.Empty;

    [BsonElement("auth_email")]
    public string? AuthEmail { get; set; } = string.Empty;
    [BsonElement("rej_comments")]
    public string RejectionComments { get; set; }

    [BsonElement("dob")]
    public DOBEntity DOB { get; set; }

    [BsonElement("blood_group")]
    public string BloodGroup { get; set; }


    [BsonElement("relation_id")]
    public string RelationId { get; set; }

    [BsonElement("graduation")]
    public G? Graduation { get; set; }

    [BsonElement("post_graduation")]
    public G? PostGraduation { get; set; }

    [BsonElement("super_specialization")]
    public G? SuperSpecialization { get; set; }


    [BsonElement("additional_qualification")]
    public G? AdditionalQualification { get; set; }

    [BsonElement("medical_registration")]
    public MR? MedicalRegistration { get; set; }

    [BsonElement("prof_image")]
    public string ProfImage { get; set; }
    [BsonElement("p_name")]
    public string PhyName { get; set; }
    [BsonElement("p_mrc")]
    public string PhyMrc { get; set; }
    [BsonElement("p_style")]
    public string Style { get; set; }
    [BsonElement("p_size")]
    public string Size { get; internal set; }
    [BsonElement("p_color")]
    public string Color { get; internal set; }
    [BsonElement("p_signature")]
    public string PhysicianSignature { get; internal set; }
    [BsonElement("p_stamp")]
    public string PhysicianStamp { get; internal set; }
    [BsonElement("p_header")]
    public string PhysicianHeader { get; internal set; }
    [BsonElement("p_footer")]
    public string PhysicianFooter { get; internal set; }
    [BsonElement("p_id")]
    public string ParentId { get; set; }

    [BsonElement("patient_diagnosis")]
    public List<PatientDiagnosis> PatientDiagnosis { get; set; }

    [BsonElement("patient_rx_diagnosis")]
    public List<PatientRxDiagnosis> PatientRxDiagnosis { get; set; }
    [BsonElement("patient_immunization")]
    public List<PatientImmunization> PatientImmunization { get; set; }
    [BsonElement("patient_laboratory_investigation")]
    public List<PatientLaboratoryInvestigation> PatientLaboratoryInvestigation { get; set; }
    [BsonElement("patient_self_recording")]
    public List<PatientSelfRecording> PatientSelfRecording { get; set; }
    [BsonElement("patient_appointment")]
    public List<PatientAppointment> PatientAppointments { get; set; }
    [BsonElement("role")]
    public string Role { get; set; }
    [BsonElement("no_doc_consent")]
    public bool NoDocConsentProvided { get; set; }
}

public class DOBEntity
{
    [BsonElement("day")]
    public int Day { get; set; }
    [BsonElement("month")]
    public int Month { get; set; }
    [BsonElement("year")]
    public int Year { get; set; }
}


public class G
{
    [BsonElement("year")]
    public string? Year { get; set; } = string.Empty;
    [BsonElement("institute")]
    public string? Institute { get; set; } = string.Empty;
    public string? Document { get; set; } = string.Empty;
}

public class MR
{
    [BsonElement("certificate_number")]
    public string? CertificateNumber { get; set; } = string.Empty;

    [BsonElement("council_name")]
    public string? CouncilName { get; set; } = string.Empty;
    public string? Document { get; set; } = string.Empty;
}

public class PatientDiagnosis
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    [BsonElement("disease")]
    public string Disease { get; set; } = string.Empty;
    [BsonElement("date_diagnosis")]
    public string DateDiagnosis { get; set; } = string.Empty;
    [BsonElement("drug_name")]
    public string DrugName { get; set; } = string.Empty;
    [BsonElement("form")]
    public string Form { get; set; } = string.Empty;
    [BsonElement("strength")]
    public string Strength { get; set; } = string.Empty;
    [BsonElement("frequency")]
    public string Frequency { get; set; } = string.Empty;
    [BsonElement("start_date")]
    public string StartDate { get; set; } = string.Empty;
    [BsonElement("end_date")]
    public string EndDate { get; set; } = string.Empty;
    [BsonElement("timing")]
    public string Timing { get; set; } = string.Empty;
    [BsonElement("duration")]
    public string Duration { get; set; } = string.Empty;
    [BsonElement("d_date")]
    public DateEntity DDate { get; set; } = new DateEntity() { Day = 01, Month = 01, Year = 2000 };
    [BsonElement("s_date")]

    public DateEntity SDate { get; set; } = new DateEntity() { Day = 01, Month = 01, Year = 2000 };
    [BsonElement("e_date")]
    public DateEntity EDate { get; set; } = new DateEntity() { Day = 01, Month = 01, Year = 2000 };
}


public class DateEntity
{
    [BsonElement("day")]
    public int Day { get; set; }
    [BsonElement("month")]
    public int Month { get; set; }
    [BsonElement("year")]
    public int Year { get; set; }
}

public class PatientRxDiagnosis
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    [BsonElement("date")]
    public string Date { get; set; } = string.Empty;
    [BsonElement("time")]
    public string Time { get; set; } = string.Empty;
    [BsonElement("type")]
    public string Type { get; set; } = string.Empty;
    [BsonElement("parameters")]
    public string Parameters { get; set; } = string.Empty;
    [BsonElement("results")]
    public string Results { get; set; } = string.Empty;
    [BsonElement("comment")]
    public string Comment { get; set; } = string.Empty;
    [BsonElement("report")]
    public string Report { get; set; } = string.Empty;
}

public class PatientSelfRecording
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    [BsonElement("date")]
    public string Date { get; set; } = string.Empty;
    [BsonElement("time")]
    public string Time { get; set; } = string.Empty;
    [BsonElement("parameter")]
    public string Parameter { get; set; } = string.Empty;
    [BsonElement("value")]
    public string Value { get; set; } = string.Empty;
    [BsonElement("unit")]
    public string Unit { get; set; } = string.Empty;
    [BsonElement("instrument")]
    public string Instrument { get; set; } = string.Empty;
}

public class PatientLaboratoryInvestigation
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    [BsonElement("date")]
    public string Date { get; set; } = string.Empty;
    [BsonElement("time")]
    public string Time { get; set; } = string.Empty;
    [BsonElement("test")]
    public string Test { get; set; } = string.Empty;
    [BsonElement("value")]
    public string Value { get; set; } = string.Empty;
    [BsonElement("unit")]
    public string Unit { get; set; } = string.Empty;
    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;
}

public class PatientImmunization
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    [BsonElement("date")]
    public string Date { get; set; } = string.Empty;
    [BsonElement("vaccine_name")]
    public string VaccineName { get; set; } = string.Empty;
    [BsonElement("disease")]
    public string Disease { get; set; } = string.Empty;
    [BsonElement("route")]
    public string Route { get; set; } = string.Empty;
    [BsonElement("form")]
    public string Form { get; set; } = string.Empty;
    [BsonElement("details")]
    public string Details { get; set; } = string.Empty;
}


public class PatientAppointment
{
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    [BsonElement("date")]
    public string Date { get; set; } = string.Empty;
    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;
    [BsonElement("outcome")]
    public string Outcome { get; set; } = string.Empty;
    [BsonElement("status")]
    public string Status { get; set; } = string.Empty;
    [BsonElement("time")]
    public string Time { get; set; } = string.Empty;
    [BsonElement("type_id")]
    public string TypeId { get; set; } = string.Empty;
    [BsonElement("type")]
    public string Type { get; set; } = string.Empty;
}
