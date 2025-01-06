namespace HealthDesk.Application;

public class BrandLibraryDto
{
    public string Id { get; set; }
    public string BrandId { get; set; }
    public string PackShotUrl { get; set; }
    public string ApprovalAgency { get; set; }
    public string Comment { get; set; }
}

public class SurveyDto
{
    public string Id { get; set; }
    public string HeaderImageUrl { get; set; }
    public string Title { get; set; }
    public string AuthorName { get; set; }
    public string Description { get; set; }
    public List<QuestionDto> Questions { get; set; } = new();
    public List<string> SharedWith { get; set; } = new();
}

public class QuestionDto
{
    public string Id { get; set; }
    public string QuestionText { get; set; }
    public string Description { get; set; }
    public string Type { get; set; } // E.g., "MCQ", "Text", etc.
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public string Validations { get; set; } // E.g., "Required", "MaxLength:100", etc.
}

