using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HealthDesk.Core;

public class Pharmaceutical : BaseEntity
{
    [BsonElement("user_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string UserId { get; set; }

    [BsonElement("brand_library")]
    public List<BrandLibrary> BrandLibrary { get; set; } = new();

    [BsonElement("surveys")]
    public List<Survey> Surveys { get; set; } = new();
}

public class BrandLibrary : BaseEntity
{

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


    [BsonElement("packshot_url")]
    public string PackShotUrl { get; set; }

    [BsonElement("approval_agency")]
    public string ApprovalAgency { get; set; }

    [BsonElement("comment")]
    public string Comment { get; set; }

    [BsonElement("is_approved")]
    public bool IsApproved { get; set; }

    [BsonElement("is_rejected")]
    public bool IsRejected { get; set; }

    [BsonElement("rejectedComment")]
    public string RejectedComment { get; set; }
}

public class Survey : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("author")]
    public string Author { get; set; }

    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("is_active")]
    public bool IsActive { get; set; }

    [BsonElement("header_image_url")]
    public string HeaderImageUrl { get; set; }

    [BsonElement("title")]
    public string Title { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("questions")]
    public List<Question> Questions { get; set; } = new();

    [BsonElement("shared_with")]
    public List<string> SharedWith { get; set; } = new();

    [BsonElement("responses")]
    public List<SurveyResponse> Responses { get; set; } = new();
}

public class Question : BaseEntity
{
    [BsonElement("text")]
    public string Text { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("type")]
    public string Type { get; set; }

    [BsonElement("options")]
    public List<QuestionOption> Options { get; set; } = new();

    [BsonElement("required")]
    public bool Required { get; set; } = false;

    [BsonElement("numbersOnly")]
    public bool NumbersOnly { get; set; } = false;

    [BsonElement("minDate")]
    [BsonRepresentation(BsonType.DateTime)]
    public DateTime? MinDate { get; set; }

    [BsonElement("maxDate")]
    [BsonRepresentation(BsonType.DateTime)]
    public DateTime? MaxDate { get; set; }
}

public class QuestionOption
{
    [BsonElement("text")]
    public string Text { get; set; }
}

public class SurveyResponse
{
    [BsonElement("user_details")]
    public string UserDetails { get; set; }

    [BsonElement("user_id")]
    public string UserId { get; set; }

    [BsonElement("submitted_at")]
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("responses_data")]
    public BsonDocument ResponsesData { get; set; }
}


