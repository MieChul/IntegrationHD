using HealthDesk.Application;
using HealthDesk.Application.DTO;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "HospitalLabPharm_Approved")]
    public class HospitalController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IPhysicianService _physicianService;
        private readonly IHospitalService _hospitalService;

        private readonly IWebHostEnvironment _env;

        public HospitalController(IAccountService accountService, IPhysicianService physicianService, IHospitalService hospitalService, IWebHostEnvironment env)
        {
            _accountService = accountService;
            _physicianService = physicianService;
            _hospitalService = hospitalService;
            _env = env;
        }

        // 1. Get all physicians for a hospital
        [HttpGet("{userId}/physicians")]
        public async Task<IActionResult> GetAllPhysicians(string userId)
        {
            var physicians = await _hospitalService.GetAllPhysiciansAsync(userId);
            return Ok(new { Success = true, Message = "Physicians retrieved successfully.", Data = physicians });
        }

        [HttpGet("{mobile}/get-by-mobile")]
        public async Task<IActionResult> GetPhysicianByMobile(string mobile)
        {
            var patient = await _hospitalService.GetPhysicanByMobileAsync(mobile);
            if (patient == null)
            {
                return Ok(new { Success = false, Message = "Patient not found." });
            }
            return Ok(new { Success = true, Data = patient });
        }


        // 2. Add a physician to a hospital
        [HttpPost("{userId}/physicians")]
        public async Task<IActionResult> SavePhysician(string userId, [FromBody] PhysicianRecordDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _hospitalService.SavePhysicianAsync(userId, dto);
            return Ok(new { Success = true, Message = "Physician added successfully." });
        }

        // 3. Delete a physician from a hospital
        [HttpDelete("{userId}/physicians/{physicianId}")]
        public async Task<IActionResult> DeletePhysician(string userId, string physicianId)
        {
            await _hospitalService.DeletePhysicianAsync(userId, physicianId);
            return Ok(new { Success = true, Message = "Physician deleted successfully." });
        }

        // 4. Get all services for a hospital
        [HttpGet("{userId}/services")]
        public async Task<IActionResult> GetAllServices(string userId)
        {
            var services = await _hospitalService.GetAllServicesAsync(userId);
            return Ok(new { Success = true, Message = "Services retrieved successfully.", Data = services });
        }

        // 5. Add or update a service
        [HttpPost("{userId}/services")]
        public async Task<IActionResult> SaveService(string userId, [FromBody] List<ServiceDto> dtos)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _hospitalService.SaveServiceAsync(userId, dtos);
            return Ok(new { Success = true, Message = "Service saved successfully." });
        }

        // 6. Delete a service
        [HttpDelete("{userId}/services/{serviceId}")]
        public async Task<IActionResult> DeleteService(string userId, string serviceId)
        {
            await _hospitalService.DeleteServiceAsync(userId, serviceId);
            return Ok(new { Success = true, Message = "Service deleted successfully." });
        }

        [HttpPost("{id}/medical-case")]
        public async Task<IActionResult> SaveMedicalCase(string id, [FromBody] MedicalCaseDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            var directoryPath = string.Empty;
            directoryPath = Path.Combine(_env.WebRootPath ?? "", "assets", "documents", dto.UserId, "cases");

            Directory.CreateDirectory(directoryPath);
            var images = await _hospitalService.SaveMedicalCaseAsync(dto);
            foreach (var img in images)
            {
                if (!string.IsNullOrEmpty(img.Image))
                    await CreateFile(directoryPath, img.ImageName, dto.UserId, img.Image);
            }

            return Ok(new { Success = true, Message = "Saved successfully." });
        }

        [HttpGet("{id}/medical-cases")]
        public async Task<IActionResult> GetAllMedicalCases(string id)
        {
            var medicalCases = await _hospitalService.GetAllMedicalCasesAsync(id);
            return Ok(new { Success = true, Message = "Medical cases retrieved successfully.", Data = medicalCases });
        }

        [HttpDelete("{id}/medical-cases/{caseId}")]
        public async Task<IActionResult> DeleteMedicalCase(string id, string caseId)
        {
            await _hospitalService.DeleteMedicalCaseAsync(id, caseId);
            return Ok(new { Success = true, Message = "Medical case deleted successfully." });
        }

        [HttpGet("{userId}/medical-case/{caseId}")]
        public async Task<IActionResult> GetMedicalCase(string userId, string caseId)
        {
            var medicalCase = await _hospitalService.GetMedicalCase(userId, caseId);
            return Ok(new { Success = true, Message = "Remedy retrieved successfully.", Data = medicalCase });
        }

        [HttpGet("{hospitalId}/info")]
        public async Task<IActionResult> GetHospitalInfo(string hospitalId) =>
           Ok(new { Success = true, Message = "Patient info retrieved successfully.", Data = await _hospitalService.GetHospitalInfoAsync(hospitalId) });

        [HttpPost("{userId}/comment/{caseId}")]
        public async Task<IActionResult> SaveComment(string userId, string caseId, [FromBody] CommentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _hospitalService.SaveComment(userId, caseId, dto);
            return Ok(new { Success = true, Message = "Comment saved." });

        }

        [HttpPost("{userId}/like/{caseId}/{likedUser}")]
        public async Task<IActionResult> ToggleLike(string userId, string caseId, string likedUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _hospitalService.ToggleLikeAsync(userId, caseId, likedUser);
            return Ok(new { Success = true });

        }

        [HttpPost("{userId}/preference")]
        public async Task<IActionResult> UpdatePreferences(string userId, [FromBody] List<string> preferences)
        {
            await _hospitalService.UpdatePreferencesAsync(userId, preferences);
            return Ok(new { Success = true, Message = "Preferences updated." });
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
