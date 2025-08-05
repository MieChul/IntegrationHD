using System.ComponentModel.DataAnnotations;

namespace HealthDesk.Application;

public class BrandLibraryDto
{
    public string? Id { get; set; }
    public string BrandName { get; set; }

    public string GenericName { get; set; }

    public string DrugClass { get; set; }
    public string DosageForm { get; set; }

    public string Strength { get; set; }

    public string? PackShotUrl { get; set; }

    public string ApprovalAgency { get; set; }
    public string? Comment { get; set; }
}

public class SurveyDto
{
    public string? Id { get; set; }

    [Required]
    public string Name { get; set; }

    public string? Author { get; set; }
    public DateTime? Date { get; set; }
    public bool IsActive { get; set; } = true;

    public string? HeaderImageUrl { get; set; }
    public string? HeaderImage { get; set; }

    [Required]
    public string Title { get; set; }

    public string? Description { get; set; }

    [Required]
    public List<QuestionDto> Questions { get; set; } = new();

    public List<string> SharedWith { get; set; } = new();

    public List<SurveyResponseDto> Responses { get; set; } = new();
}

public class QuestionDto
{
    public string? Id { get; set; }

    [Required]
    public string Text { get; set; }

    public string? Description { get; set; }

    [Required]
    public string Type { get; set; }

    public List<QuestionOptionDto> Options { get; set; } = new();

    public bool Required { get; set; } = false;
    public bool NumbersOnly { get; set; } = false;
    public DateTime? MinDate { get; set; }
    public DateTime? MaxDate { get; set; }
}

public class QuestionOptionDto
{
    [Required]
    public string Text { get; set; }
}

public class SurveyResponseDto
{
    public string? UserDetails { get; set; }
    public string UserId { get; set; }
    public DateTime? SubmittedAt { get; set; }

    public Dictionary<string, object> ResponsesData { get; set; } = new Dictionary<string, object>();
}
