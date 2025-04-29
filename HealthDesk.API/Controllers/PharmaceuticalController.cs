
using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PharmaceuticalController : ControllerBase
    {
        private IAccountService _accountService;
        private IPharmaceuticalService _pharmaceuticalService;

        public PharmaceuticalController(IAccountService accountService, IPharmaceuticalService pharmaceuticalService)
        {
            _accountService = accountService;
            _pharmaceuticalService = pharmaceuticalService;
        }

        [HttpGet("{pharmaceuticalId}/brand-library")]
        public async Task<IActionResult> GetAllBrandLibraries(string pharmaceuticalId)
        {
            var brandLibraries = await _pharmaceuticalService.GetAllBrandLibrariesAsync(pharmaceuticalId);
            return Ok(new { Success = true, Message = "Brand libraries retrieved successfully.", Data = brandLibraries });
        }

        [HttpPost("{pharmaceuticalId}/brand-library")]
        public async Task<IActionResult> SaveBrandLibrary(string pharmaceuticalId, [FromBody] List<BrandLibraryDto> dtos)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _pharmaceuticalService.SaveBrandLibraryAsync(pharmaceuticalId, dtos);
            return Ok(new { Success = true, Message = "Brand library saved successfully." });
        }

        [HttpDelete("{pharmaceuticalId}/brand-library/{brandLibraryId}")]
        public async Task<IActionResult> DeleteBrandLibrary(string pharmaceuticalId, string brandLibraryId)
        {
            await _pharmaceuticalService.DeleteBrandLibraryAsync(pharmaceuticalId, brandLibraryId);
            return Ok(new { Success = true, Message = "Brand library deleted successfully." });
        }

        [HttpGet("{pharmaId}/surveys")]
        public async Task<IActionResult> GetSurveys(string pharmaId)
        {
            var surveys = await _pharmaceuticalService.GetSurveysAsync(pharmaId);
            return Ok(new { Success = true, Message = "Surveys retrieved successfully.", Data = surveys });
        }

        [HttpPost("{pharmaId}/surveys")]
        public async Task<IActionResult> AddOrUpdateSurvey(string pharmaId, [FromBody] SurveyDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _pharmaceuticalService.AddOrUpdateSurveyAsync(pharmaId, dto);
            return Ok(new { Success = true, Message = "Survey saved successfully." });
        }

        [HttpDelete("{pharmaId}/surveys/{surveyId}")]
        public async Task<IActionResult> DeleteSurvey(string pharmaId, string surveyId)
        {
            await _pharmaceuticalService.DeleteSurveyAsync(pharmaId, surveyId);
            return Ok(new { Success = true, Message = "Survey deleted successfully." });
        }

        [HttpGet("{pharmaId}/surveys/{surveyId}/shared-with")]
        public async Task<IActionResult> GetSharedWith(string pharmaId, string surveyId)
        {
            var sharedWithList = await _pharmaceuticalService.GetSharedWithAsync(pharmaId, surveyId);
            return Ok(new { Success = true, Message = "Shared with list retrieved successfully.", Data = sharedWithList });
        }

        [HttpPost("{pharmaId}/surveys/{surveyId}/shared-with")]
        public async Task<IActionResult> AddSharedWith(string pharmaId, string surveyId, [FromBody] List<string> sharedWith)
        {
            if (sharedWith == null || !sharedWith.Any())
                return BadRequest(new { Success = false, Message = "Shared with list cannot be empty." });

            await _pharmaceuticalService.AddSharedWithAsync(pharmaId, surveyId, sharedWith);
            return Ok(new { Success = true, Message = "Shared with list updated successfully." });
        }
    }
}