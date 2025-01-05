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

    [BsonElement("shared_surveys")]
    public List<SharedSurvey> SharedSurveys { get; set; } = new(); // Added to support shared surveys
}

public class BrandLibrary : BaseEntity
{
    [BsonElement("brand_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string BrandId { get; set; } // Reference from Pharmacy

    [BsonElement("packshot_url")]
    public string PackShotUrl { get; set; }

    [BsonElement("approval_agency")]
    public string ApprovalAgency { get; set; }

    [BsonElement("comment")]
    public string Comment { get; set; }
}

public class Survey : BaseEntity
{
    [BsonElement("header_image_url")]
    public string HeaderImageUrl { get; set; }

    [BsonElement("title")]
    public string Title { get; set; }

    [BsonElement("author_name")]
    public string AuthorName { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("questions")]
    public List<Question> Questions { get; set; } = new();
}

public class Question : BaseEntity
{
    [BsonElement("question_text")]
    public string QuestionText { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("type")]
    public string Type { get; set; } // E.g., "MCQ", "Text", etc.

    [BsonElement("from_date")]
    public DateTime FromDate { get; set; }

    [BsonElement("to_date")]
    public DateTime ToDate { get; set; }

    [BsonElement("validations")]
    public string Validations { get; set; } // E.g., "Required", "MaxLength:100", etc.
}

public class SharedSurvey : BaseEntity
{
    [BsonElement("survey_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string SurveyId { get; set; } // Reference from Survey

    [BsonElement("physician_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string PhysicianId { get; set; } // Reference from Physician

    [BsonElement("is_shared")]
    public bool IsShared { get; set; } // Indicates if the survey is shared
}
