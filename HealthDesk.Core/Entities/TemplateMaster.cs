using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;

public class TemplateMaster : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("url")]
    public string Url { get; set; }
}
