namespace HealthDesk.Application.DTO;

public class AdminActionDto
{
    public string Role { get; set; }
    public string Status { get; set; }
    public string Comments { get; set; }
}

public class BrandApprovalDto
{
    public bool Approved { get; set; }
    public string BrandId { get; set; }
    public string? Comment { get; set; } = string.Empty;

}

