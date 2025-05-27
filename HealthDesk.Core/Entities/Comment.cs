using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;

public class Comment : BaseEntity
{
    [BsonElement("comment")]
    public string Text { get; set; }

    [BsonElement("user_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string UserId { get; set; }

    [BsonElement("submitted_by")]
    public string SubmittedBy { get; set; }

    [BsonElement("item_Type")]
    public string ItemType { get; set; }
}
