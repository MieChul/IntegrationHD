

namespace HealthDesk.Application;

public class CommentDto
{
    public string? Id { get; set; }
    public string Text { get; set; }
    public string UserId { get; set; }
    public string? ItemType { get; set; }
    public string? SubmittedBy { get; set; }
}


public class RatingDto
{
    public string Id { get; set; }
    public int Score { get; set; }
    public string UserId { get; set; }
    public int Role { get; set; }
    public string EntityId { get; set; }
}

public class BrandDto
{
    public string BrandName { get; set; }
    public string GenericName { get; set; }
    public string DosageForm { get; set; }
    public string Strength { get; set; }
}