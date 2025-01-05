using HealthDesk.Core;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;

public class Laboratory : BaseEntity
{
    [BsonElement("user_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string UserId { get; set; }

    [BsonElement("lab_tests")]
    public List<LabTest> LabTests { get; set; }
}

public class LabTest : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("specimen")]
    public string Specimen { get; set; }

    [BsonElement("precautions")]
    public string Precautions { get; set; }

    [BsonElement("reporting_time")]
    public string ReportingTime { get; set; }

    [BsonElement("amount")]
    public decimal Amount { get; set; }

    [BsonElement("comment")]
    public string Comment { get; set; }
}
