using HealthDesk.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Policy = "AnyAuthenticated")]
public class CommonController : ControllerBase
{
    private readonly ICommonService _commonService;

    public CommonController(ICommonService commonService)
    {
        _commonService = commonService;
    }

    // Comments
    [HttpGet("comments")]
    public async Task<IActionResult> GetComments() =>
        Ok(new { Success = true, Message = "Comments retrieved successfully.", Data = await _commonService.GetCommentsAsync() });

    [HttpPost("comments")]
    public async Task<IActionResult> SaveComment([FromBody] CommentDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors) });

        await _commonService.SaveCommentAsync(dto);
        return Ok(new { Success = true, Message = "Comment saved successfully." });
    }

    [HttpDelete("comments/{id}")]
    public async Task<IActionResult> DeleteComment(string id)
    {
        await _commonService.DeleteCommentAsync(id);
        return Ok(new { Success = true, Message = "Comment deleted successfully." });
    }

    // Ratings
    [HttpGet("ratings")]
    public async Task<IActionResult> GetRatings() =>
        Ok(new { Success = true, Message = "Ratings retrieved successfully.", Data = await _commonService.GetRatingsAsync() });

    [HttpPost("ratings")]
    public async Task<IActionResult> SaveRating([FromBody] RatingDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors) });

        await _commonService.SaveRatingAsync(dto);
        return Ok(new { Success = true, Message = "Rating saved successfully." });
    }

    [HttpDelete("ratings/{id}")]
    public async Task<IActionResult> DeleteRating(string id)
    {
        await _commonService.DeleteRatingAsync(id);
        return Ok(new { Success = true, Message = "Rating deleted successfully." });
    }

    // Generic Get for other entities
    [HttpGet("bodysystem")]
    public async Task<IActionResult> GetBodySystems() =>
        Ok(new { Success = true, Message = "Body Systems retrieved successfully.", Data = await _commonService.GetBodySystemsAsync() });

    [HttpGet("dosageform")]
    public async Task<IActionResult> GetDosageForms() =>
        Ok(new { Success = true, Message = "Dosage Forms retrieved successfully.", Data = await _commonService.GetDosageFormsAsync() });

    [HttpGet("drugsfrequency")]
    public async Task<IActionResult> GetDrugFrequencies() =>
        Ok(new { Success = true, Message = "Drug Frequencies retrieved successfully.", Data = await _commonService.GetDrugFrequenciesAsync() });

    [HttpGet("investigation")]
    public async Task<IActionResult> GetInvestigations() =>
        Ok(new { Success = true, Message = "Investigations retrieved successfully.", Data = await _commonService.GetInvestigationsAsync() });

    [HttpGet("symptoms")]
    public async Task<IActionResult> GetSymptoms() =>
        Ok(new { Success = true, Message = "Symptoms retrieved successfully.", Data = await _commonService.GetSymptomsAsync() });

    [HttpGet("vaccine")]
    public async Task<IActionResult> GetVaccines() =>
        Ok(new { Success = true, Message = "Vaccines retrieved successfully.", Data = await _commonService.GetVaccinesAsync() });

    [HttpGet("administrationroute")]
    public async Task<IActionResult> GetAdministrationRoutes() =>
        Ok(new { Success = true, Message = "Administration Routes retrieved successfully.", Data = await _commonService.GetAdministrationRoutesAsync() });
}
