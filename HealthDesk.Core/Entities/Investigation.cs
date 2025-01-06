
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;
public class Investigation : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }
}
