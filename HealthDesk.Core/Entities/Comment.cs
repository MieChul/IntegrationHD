using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;
public class Comment : BaseEntity
{
    [BsonElement("case_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string CaseId { get; set; }

    [BsonElement("text")]
    public string Text { get; set; }

    [BsonElement("user_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string UserId { get; set; }
}
