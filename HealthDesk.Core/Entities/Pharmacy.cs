
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;
public class Pharmacy : BaseEntity
{

    [BsonElement("user_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string UserId { get; set; }

    [BsonElement("medicines")]
    public List<Medicine> Medicines { get; set; }

    [BsonElement("reviews")]
    public List<Reviews> Reviews { get; set; } = new();

}

public class Medicine : BaseEntity
{
    [BsonElement("brand_owner")]
    public string BrandOwner { get; set; }

    [BsonElement("brand_name")]
    public string BrandName { get; set; }

    [BsonElement("generic_name")]
    public string GenericName { get; set; }

    [BsonElement("drug_class")]
    public string DrugClass { get; set; }

    [BsonElement("dosage_form")]
    public string DosageForm { get; set; }

    [BsonElement("strength")]
    public string Strength { get; set; }

    [BsonElement("price")]
    public decimal Price { get; set; }

    [BsonElement("discount")]
    public double Discount { get; set; }

    [BsonElement("comment")]
    public string? Comment { get; set; }
}

public class Reviews : BaseEntity
{
    [BsonElement("user_id")]
    public string UserId { get; set; }

    [BsonElement("rating")]
    public int Rating { get; set; }

    [BsonElement("comment")]
    public string Comment { get; set; }

}

