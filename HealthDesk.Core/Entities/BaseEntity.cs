using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;

public class BaseEntity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString(); // Generate new ObjectId

    [BsonElement("create_date")]
    public DateTime CreateDate { get; set; } = DateTime.UtcNow; // Set to today's date in UTC
}