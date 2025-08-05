
using HealthDesk.Api.Helpers;
using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "Pharmaceutical_Approved")]
    public class PharmaceuticalController : ControllerBase
    {
        private IAccountService _accountService;
        private IPharmaceuticalService _pharmaceuticalService;
        private readonly IWebHostEnvironment _env;

        public PharmaceuticalController(IAccountService accountService, IPharmaceuticalService pharmaceuticalService, IWebHostEnvironment env)
        {
            _accountService = accountService;
            _pharmaceuticalService = pharmaceuticalService;
            _env = env;
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
            if (surveys == null || !surveys.Any())
            {
                return NotFound(new { Success = false, Message = "No surveys found for this pharmaceutical ID." });
            }
            return Ok(new { Success = true, Message = "Surveys retrieved successfully.", Data = surveys });
        }

        [HttpGet("{pharmaId}/surveys/{surveyId}")]
        public async Task<IActionResult> GetSurveyById(string pharmaId, string surveyId)
        {

            var survey = await _pharmaceuticalService.GetSurveyByIdAsync(pharmaId, surveyId);
            return Ok(new { Success = true, Message = "Survey retrieved successfully.", Data = survey });

        }

        [HttpPost("{pharmaId}/surveys")]
        public async Task<IActionResult> AddOrUpdateSurvey(string pharmaId, [FromBody] SurveyDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });
            }

            string surveyId = await _pharmaceuticalService.AddOrUpdateSurveyAsync(pharmaId, dto);

            if (!string.IsNullOrEmpty(dto.HeaderImage))
            {

                string assetRootPath = PathHelper.GetAssetRootPath(_env);

                var directoryPath = Path.Combine(assetRootPath, "documents", pharmaId, "survey");

                Directory.CreateDirectory(directoryPath);

                var fileName = $"survey_header_{surveyId}.png";
                var publicUrl = $@"/assets/documents/{pharmaId}/survey/{fileName}";

                await CreateFile(directoryPath, fileName, pharmaId, dto.HeaderImage);

                await _pharmaceuticalService.UpdateSurveyHeaderUrlAsync(pharmaId, surveyId, publicUrl);
            }

            return Ok(new { Success = true, Message = "Survey saved successfully.", SurveyId = surveyId });
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

        [HttpPost("{surveyId}/responses")]
        [AllowAnonymous]
        public async Task<IActionResult> SubmitSurveyResponse(string surveyId, [FromBody] SurveyResponseDto responseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });
            }



            var survey = await _pharmaceuticalService.GetSurveyByIdAsync(null, surveyId);
            if (survey == null || string.IsNullOrEmpty(survey.Author))
            {
                return NotFound(new { Success = false, Message = "Survey not found or owning pharmaceutical ID is missing." });
            }

            await _pharmaceuticalService.AddSurveyResponseAsync(survey.Author, surveyId, responseDto);
            return Ok(new { Success = true, Message = "Response submitted successfully." });
        }

        private async Task CreateFile(string folderPath, string filename, string id, string base64Image)
        {
            var filePath = Path.Combine(folderPath, filename);

            if (string.IsNullOrWhiteSpace(base64Image))
            {
                throw new ArgumentException("Base64 image string is null or empty.");
            }

            var base64Data = base64Image.Contains(",")
                ? base64Image.Substring(base64Image.IndexOf(',') + 1)
                : base64Image;

            byte[] imageBytes = Convert.FromBase64String(base64Data);

            await System.IO.File.WriteAllBytesAsync(filePath, imageBytes);
        }
    }
}