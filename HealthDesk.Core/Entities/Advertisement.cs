using HealthDesk.Core;
using MongoDB.Bson.Serialization.Attributes;

public class Advertisement : BaseEntity
{
    [BsonElement("image_url")]
    public string ImageUrl { get; set; }

    [BsonElement("type")]
    public int Type { get; set; }

    [BsonElement("sub_type")]
    public int SubType { get; set; }
}