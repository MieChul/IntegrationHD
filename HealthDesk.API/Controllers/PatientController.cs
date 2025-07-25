using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using HealthDesk.Core.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "PatientPhysician_Approved")]
    public class PatientController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IPhysicianService _physicianService;
        private readonly IPatientService _patientService;
        private readonly IWebHostEnvironment _env;

        public PatientController(IAccountService accountService, IPhysicianService physicianService, IPatientService patientService, IWebHostEnvironment env)
        {
            _accountService = accountService;
            _physicianService = physicianService;
            _patientService = patientService;
            _env = env;
        }

        // 1. Medical History
        [HttpGet("{patientId}/medical-history")]
        public async Task<IActionResult> GetMedicalHistory(string patientId) =>
            Ok(new { Success = true, Message = "Medical history retrieved successfully.", Data = await _patientService.GetMedicalHistoryAsync(patientId) });

        [HttpPost("{patientId}/medical-history")]
        public async Task<IActionResult> SaveMedicalHistory(string patientId, [FromBody] MedicalHistoryDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.SaveMedicalHistoryAsync(patientId, dto);
            return Ok(new { Success = true, Message = "Medical history saved successfully." });
        }

        [HttpDelete("{patientId}/medical-history/{historyId}")]
        public async Task<IActionResult> DeleteMedicalHistory(string patientId, string historyId)
        {
            await _patientService.DeleteMedicalHistoryAsync(patientId, historyId);
            return Ok(new { Success = true, Message = "Medical history deleted successfully." });
        }

        // 2. Current Treatments
        [HttpGet("{patientId}/current-treatments")]
        public async Task<IActionResult> GetCurrentTreatments(string patientId) =>
            Ok(new { Success = true, Message = "Current treatments retrieved successfully.", Data = await _patientService.GetCurrentTreatmentsAsync(patientId) });

        [HttpPost("{patientId}/current-treatments")]
        public async Task<IActionResult> SaveCurrentTreatment(string patientId, [FromBody] CurrentTreatmentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.SaveCurrentTreatmentAsync(patientId, dto);
            return Ok(new { Success = true, Message = "Current treatment saved successfully." });
        }

        [HttpPost("{patientId}/current-treatments-rx")]
        public async Task<IActionResult> SaveCurrentTreatmentRx(string patientId, [FromBody] List<CurrentTreatmentDto> dtos)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.SaveCurrentTreatmentRxAsync(patientId, dtos);
            return Ok(new { Success = true, Message = "Current treatment saved successfully." });
        }

        [HttpDelete("{patientId}/current-treatments/{treatmentId}")]
        public async Task<IActionResult> DeleteCurrentTreatment(string patientId, string treatmentId)
        {
            await _patientService.DeleteCurrentTreatmentAsync(patientId, treatmentId);
            return Ok(new { Success = true, Message = "Current treatment deleted successfully." });
        }

        // 3. Appointments
        [HttpGet("{patientId}/appointments")]
        public async Task<IActionResult> GetAppointments(string patientId, [FromQuery] bool isPhysician = false) =>
            Ok(new { Success = true, Message = "Appointments retrieved successfully.", Data = await _patientService.GetAppointmentsAsync(patientId, isPhysician) });

        [HttpPost("{patientId}/appointments")]
        public async Task<IActionResult> SaveAppointment(string patientId, [FromBody] AppointmentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.SaveAppointmentAsync(patientId, dto);
            return Ok(new { Success = true, Message = "Appointment saved successfully." });
        }

        [HttpPost("{patientId}/update-appointment-status/{appointmentId}")]
        public async Task<IActionResult> UpdateAppointmentStatus(string patientId, string appointmentId, string status)
        {
            await _patientService.UpdateAppointmentStatus(patientId, appointmentId, status);
            return Ok(new { Success = true, Message = "Appointment status updated successfully." });
        }

        // 4. Self Records
        [HttpGet("{patientId}/self-records")]
        public async Task<IActionResult> GetSelfRecords(string patientId) =>
            Ok(new { Success = true, Message = "Self records retrieved successfully.", Data = await _patientService.GetSelfRecordsAsync(patientId) });

        [HttpPost("{patientId}/self-records")]
        public async Task<IActionResult> SaveSelfRecord(string patientId, [FromBody] SelfRecordDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.SaveSelfRecordAsync(patientId, dto);
            return Ok(new { Success = true, Message = "Self record saved successfully." });
        }

        [HttpDelete("{patientId}/self-records/{recordId}")]
        public async Task<IActionResult> DeleteSelfRecord(string patientId, string recordId)
        {
            await _patientService.DeleteSelfRecordAsync(patientId, recordId);
            return Ok(new { Success = true, Message = "Self record deleted successfully." });
        }

        // 5. Symptoms
        [HttpGet("{patientId}/symptoms")]
        public async Task<IActionResult> GetSymptoms(string patientId) =>
            Ok(new { Success = true, Message = "Symptoms retrieved successfully.", Data = await _patientService.GetSymptomsAsync(patientId) });

        [HttpPost("{patientId}/symptoms")]
        public async Task<IActionResult> SaveSymptom(string patientId, [FromBody] SymptomDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.SaveSymptomAsync(patientId, dto);
            return Ok(new { Success = true, Message = "Symptom saved successfully." });
        }

        [HttpDelete("{patientId}/symptoms/{symptomId}")]
        public async Task<IActionResult> DeleteSymptom(string patientId, string symptomId)
        {
            await _patientService.DeleteSymptomAsync(patientId, symptomId);
            return Ok(new { Success = true, Message = "Symptom deleted successfully." });
        }

        // 6. Lab Investigations
        [HttpGet("{patientId}/lab-investigations")]
        public async Task<IActionResult> GetLabInvestigations(string patientId) =>
            Ok(new { Success = true, Message = "Lab investigations retrieved successfully.", Data = await _patientService.GetLabInvestigationsAsync(patientId) });

        [HttpPost("{patientId}/lab-investigations")]
        public async Task<IActionResult> SaveLabInvestigation(
     string patientId,
     [FromForm] ReportDto dto,
     IFormFile? file)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            // Save and get back both patient and investigation reference
            var (patient, investigation) = await _patientService.GetPatientAndPreparedInvestigationAsync(patientId, dto);

            // Handle file upload, now that we have the real `investigation.Id`
            if (file != null && file.Length > 0)
            {
                var basePath = Path.Combine("wwwroot/assets/documents", patientId, "investigations");
                Directory.CreateDirectory(basePath);

                var fileName = $"{investigation.Id}_report{Path.GetExtension(file.FileName)}";
                var fullPath = Path.Combine(basePath, fileName);

                using var fs = new FileStream(fullPath, FileMode.Create);
                await file.CopyToAsync(fs);

                var relativePath = Path.Combine("assets/documents", patientId, "investigations", fileName).Replace("\\", "/");
                investigation.FilePath = relativePath;
            }

            // Save patient once — this includes updated investigation with FilePath
            await _patientService.SavePatientAsync(patient);

            return Ok(new { Success = true, Message = "Lab investigation saved successfully." });
        }

        [HttpDelete("{patientId}/lab-investigations/{investigationId}")]
        public async Task<IActionResult> DeleteLabInvestigation(string patientId, string investigationId)
        {
            await _patientService.DeleteLabInvestigationAsync(patientId, investigationId);
            return Ok(new { Success = true, Message = "Lab investigation deleted successfully." });
        }

        // 7. Reports
        [HttpGet("{patientId}/reports")]
        public async Task<IActionResult> GetReports(string patientId) =>
            Ok(new { Success = true, Message = "Reports retrieved successfully.", Data = await _patientService.GetReportsAsync(patientId) });

        [HttpPost("{patientId}/reports")]
        public async Task<IActionResult> SaveReport(string patientId, [FromBody] ReportDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.SaveReportAsync(patientId, dto);
            return Ok(new { Success = true, Message = "Report saved successfully." });
        }

        [HttpDelete("{patientId}/reports/{reportId}")]
        public async Task<IActionResult> DeleteReport(string patientId, string reportId)
        {
            await _patientService.DeleteReportAsync(patientId, reportId);
            return Ok(new { Success = true, Message = "Report deleted successfully." });
        }

        // 8. Immunizations
        [HttpGet("{patientId}/immunizations")]
        public async Task<IActionResult> GetImmunizations(string patientId) =>
            Ok(new { Success = true, Message = "Immunizations retrieved successfully.", Data = await _patientService.GetImmunizationsAsync(patientId) });

        [HttpPost("{patientId}/immunizations")]
        public async Task<IActionResult> SaveImmunization(string patientId, [FromBody] ImmunizationDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.SaveImmunizationAsync(patientId, dto);
            return Ok(new { Success = true, Message = "Immunization saved successfully." });
        }

        [HttpDelete("{patientId}/immunizations/{immunizationId}")]
        public async Task<IActionResult> DeleteImmunization(string patientId, string immunizationId)
        {
            await _patientService.DeleteImmunizationAsync(patientId, immunizationId);
            return Ok(new { Success = true, Message = "Immunization deleted successfully." });
        }

        // 9. Patient Info
        [HttpGet("{patientId}/info")]
        public async Task<IActionResult> GetPatientInfo(string patientId) =>
            Ok(new { Success = true, Message = "Patient info retrieved successfully.", Data = await _patientService.GetPatientInfoAsync(patientId) });

        [HttpPost("{patientId}/info")]
        public async Task<IActionResult> UpdatePatientInfo(string patientId, [FromBody] PatientInfoDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.UpdatePatientInfoAsync(patientId, dto);
            return Ok(new { Success = true, Message = "Patient info updated successfully." });
        }


        [HttpGet("{patientId}/activities")]
        public async Task<IActionResult> GetActivities(string patientId)
        {
            var activities = await _patientService.GetActivitiesAsync(patientId);
            return Ok(new { Success = true, Message = "Activities retrieved successfully.", Data = activities });
        }

        [HttpPost("{patientId}/activities")]
        public async Task<IActionResult> AddOrUpdateActivity(string patientId, [FromBody] ActivityDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.AddOrUpdateActivityAsync(patientId, dto);
            return Ok(new { Success = true, Message = "Activity saved successfully." });
        }


        [HttpDelete("{patientId}/activities/{activityId}")]
        public async Task<IActionResult> DeleteActivity(string patientId, string activityId)
        {
            await _patientService.DeleteActivityAsync(patientId, activityId);
            return Ok(new { Success = true, Message = "Activity deleted successfully." });
        }

        [HttpGet("{patientId}")]
        public async Task<IActionResult> GetCompliance(string patientId)
        {
            IEnumerable<PatientComplianceDto> compliances = await _patientService.GetComplianceAsync(patientId);
            return Ok(compliances);
        }


        [HttpPost("medicineinfo/{patientId}/{treatmentId}")]
        public async Task<IActionResult> AddOrUpdateMedicalInfo(string patientId, string treatmentId, [FromBody] PatientMedicineInfoDto dto)
        {
            await _patientService.AddOrUpdateMedicalInfoAsync(patientId, treatmentId, dto);
            return Ok();
        }


        [HttpPost("confirmintake/{patientId}/{treatmentId}")]
        public async Task<IActionResult> ConfirmIntake(string patientId, string treatmentId, [FromQuery] bool isTaken)
        {
            await _patientService.ConfirmIntake(patientId, treatmentId, isTaken);
            return Ok();
        }

        [HttpGet("physicians")]
        public async Task<IActionResult> GetPhysicians() =>
           Ok(new { Success = true, Message = "Physicians retrieved successfully.", Data = await _patientService.GetPhysicians() });

        [HttpGet("entities")]
        public async Task<IActionResult> GetEntities()
        {
            var entities = await _patientService.GetEntities();
            return Ok(entities);
        }

        // POST: api/patient/review
        [HttpPost("review")]
        public async Task<IActionResult> AddOrUpdateReview([FromBody] ReviewRequestDto request)
        {
            if (request == null || string.IsNullOrEmpty(request.UserId) || string.IsNullOrEmpty(request.EntityId))
            {
                return BadRequest("Invalid request data.");
            }

            // Convert string to Role enum
            if (!Enum.TryParse(typeof(Role), request.EntityType, true, out var roleEnum) || roleEnum == null)
            {
                return BadRequest("Invalid entity type.");
            }

            // Call the service method with the converted enum
            await _patientService.AddOrUpdateReview(request.UserId, request.EntityId, (Role)roleEnum, request.Rating, request.Comment);
            return Ok(new { Success = true, Message = "Review added or updated successfully." });
        }

        [HttpGet("{patientId}/remedies")]
        public async Task<IActionResult> GetRemedies(string patientId)
        {
            var remedies = await _patientService.GetRemedies(patientId);
            return Ok(new { Success = true, Message = "Remedies retrieved successfully.", Data = remedies });
        }

        [HttpGet("{userId}/remedy/{id}")]
        public async Task<IActionResult> GetRemedy(string userId, string id)
        {
            var remedy = await _patientService.GetRemedy(userId, id);
            return Ok(new { Success = true, Message = "Remedy retrieved successfully.", Data = remedy });
        }

        [HttpPost("{patientId}/remedy")]
        public async Task<IActionResult> SaveRemedy(string patientId, [FromBody] RemedyDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            var directoryPath = string.Empty;
            directoryPath = Path.Combine(_env.WebRootPath ?? "", "assets", "documents", dto.UserId, "remedies");

            Directory.CreateDirectory(directoryPath);
            var images = await _patientService.SaveRemedyAsync(dto);
            foreach (var img in images)
            {
                if (!string.IsNullOrEmpty(img.Image))
                    await CreateFile(directoryPath, img.ImageName, dto.UserId, img.Image);
            }

            return Ok(new { Success = true, Message = "Remedy saved successfully." });

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


        [HttpPost("{userId}/comment/{remedyId}")]
        public async Task<IActionResult> SaveComment(string userId, string remedyId, [FromBody] CommentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.SaveComment(userId, remedyId, dto);
            return Ok(new { Success = true, Message = "Comment saved." });

        }

        [HttpPost("{userId}/like/{remedyId}/{likedUser}")]
        public async Task<IActionResult> ToggleLike(string userId, string remedyId, string likedUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.ToggleLikeAsync(userId, remedyId, likedUser);
            return Ok(new { Success = true });

        }

        [HttpPost("{userId}/preference")]
        public async Task<IActionResult> UpdatePreferences(string userId, [FromBody] List<string> preferences)
        {
            await _patientService.UpdatePreferencesAsync(userId, preferences);
            return Ok(new { Success = true, Message = "Preferences updated." });
        }

    }
}