using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;
public class AdministrationRoute : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }
}