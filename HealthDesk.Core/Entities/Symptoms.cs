using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;

public class Symptoms : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }
}
