using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;
public class Vaccine : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }
}
