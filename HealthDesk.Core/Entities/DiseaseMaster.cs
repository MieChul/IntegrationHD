using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;

public class DiseaseMaster : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }
}
