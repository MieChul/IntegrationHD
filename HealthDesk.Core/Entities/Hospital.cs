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
    public List<string> Physicians { get; set; } // References Physician IDs

    [BsonElement("services")]
    public List<Service> Services { get; set; }

    [BsonElement("medical_cases")]
    public List<MedicalCase> MedicalCases { get; set; }

    [BsonElement("reviews")]
    public List<Reviews> Reviews { get; set; } = new();
}

public class Service : BaseEntity
{
    [BsonElement("service_name")]
    public string ServiceName { get; set; }

    [BsonElement("specification")]
    public string Specification { get; set; }

    [BsonElement("comment")]
    public string Comment { get; set; }
}
