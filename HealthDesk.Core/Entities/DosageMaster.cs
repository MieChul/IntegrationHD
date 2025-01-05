using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;

public class DosageMaster : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }
}
