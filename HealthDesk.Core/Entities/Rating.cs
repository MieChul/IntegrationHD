using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;
public class Rating : BaseEntity
{
    [BsonElement("score")]
    public int Score { get; set; }

    [BsonElement("user_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string UserId { get; set; }

    [BsonElement("role")]
    public int Role { get; set; }


    [BsonElement("entity_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string EntityId { get; set; }
}

