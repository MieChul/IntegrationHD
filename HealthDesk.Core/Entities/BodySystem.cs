using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;

public class BodySystem : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }
}
