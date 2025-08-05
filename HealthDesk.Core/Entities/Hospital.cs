using HealthDesk.Core;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;

public class Hospital : BaseEntity
{
    [BsonElement("user_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string UserId { get; set; }

    [BsonElement("physicians")]
    public List<PhysicianRecord> Physicians { get; set; } // References Physician IDs

    [BsonElement("services")]
    public List<Service> Services { get; set; }

    [BsonElement("medical_cases")]
    public List<MedicalCase> MedicalCases { get; set; }

    [BsonElement("reviews")]
    public List<Reviews> Reviews { get; set; } = new();

    [BsonElement("hospitalinfo")]
    public HospitalInfo HospitalInfo { get; set; }
}

public class Service : BaseEntity
{
    [BsonElement("service_name")]
    public string Name { get; set; }

    [BsonElement("specification")]
    public string Specification { get; set; }

    [BsonElement("comment")]
    public string Comment { get; set; }
}

public class PhysicianRecord : BaseEntity
{
    [BsonElement("user_id")]
    public string? UserId { get; set; }

    [BsonElement("days")]
    public List<string> Days { get; set; }

    [BsonElement("to")]
    public string To { get; set; }

    [BsonElement("from")]
    public string From { get; set; }

    [BsonElement("is_active")]
    public bool IsActive { get; set; }
}


public class HospitalInfo
{
    public List<string>? Preferences { get; set; } = new List<string>();

}
