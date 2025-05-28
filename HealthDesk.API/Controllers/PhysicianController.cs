using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PhysicianController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IPhysicianService _physicianService;
        private readonly IPatientService _patientService;
        private readonly IWebHostEnvironment _env;


        public PhysicianController(IAccountService accountService, IPhysicianService physicianService, IPatientService patientService, IWebHostEnvironment env)
        {
            _accountService = accountService;
            _physicianService = physicianService;
            _patientService = patientService;
            _env = env;
        }

        [HttpGet("{physicianId}/clinics")]
        public async Task<IActionResult> GetClinics(string physicianId)
        {
            var clinics = await _physicianService.GetClinicsAsync(physicianId);
            return Ok(new { Success = true, Message = "Clinics retrieved successfully.", Data = clinics });
        }

        [HttpPost("{physicianId}/clinics")]
        public async Task<IActionResult> AddOrUpdateClinic(string physicianId, [FromBody] PhysicianClinicDto clinicDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _physicianService.AddOrUpdateClinicAsync(physicianId, clinicDto);
            return Ok(new { Success = true, Message = "Clinic saved successfully." });
        }

        [HttpDelete("{physicianId}/clinics/{clinicId}")]
        public async Task<IActionResult> DeleteClinic(string physicianId, string clinicId)
        {
            await _physicianService.DeleteClinicAsync(physicianId, clinicId);
            return Ok(new { Success = true, Message = "Clinic deleted successfully." });
        }

        [HttpGet("{id}/design-prescriptions")]
        public async Task<IActionResult> GetAllDesignPrescriptions(string id)
        {
            var prescriptions = await _physicianService.GetAllDesignPrescriptionsAsync(id);
            return Ok(new { Success = true, Message = "Design prescriptions retrieved successfully.", Data = prescriptions });
        }

        [HttpPost("{id}/design-prescriptions")]
        public async Task<IActionResult> SaveDesignPrescription(string id, [FromBody] DesignPrescriptionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided." });

            if (string.IsNullOrEmpty(dto.TemplateName))
                return BadRequest(new { Success = false, Message = "Template name is required." });

            var designCount = await _physicianService.GetDesignPrescriptionCountAsync(id);
            if (string.IsNullOrEmpty(dto.Id) || designCount == 0)
                designCount++;
            var directoryPath = string.Empty;


            directoryPath = Path.Combine(_env.WebRootPath, "assets", "documents", id, "prescription");

            Directory.CreateDirectory(directoryPath);

            var headerFileName = $"header{designCount}.png";
            if (!string.IsNullOrEmpty(dto.HeaderImage))
            {
                await CreateFile(directoryPath, headerFileName, id, dto.HeaderImage);
                dto.HeaderUrl = $@"/assets/documents/{id}/prescription/{headerFileName}";
            }

            var footerFileName = $"footer{designCount}.png";
            if (!string.IsNullOrEmpty(dto.FooterImage))
            {
                await CreateFile(directoryPath, footerFileName, id, dto.FooterImage);
                dto.FooterUrl = $@"/assets/documents/{id}/prescription/{footerFileName}";
            }

            var logoFileName = $"logo_image{designCount}.png";
            if (!string.IsNullOrEmpty(dto.LogoImage))
            {
                await CreateFile(directoryPath, logoFileName, id, dto.LogoImage);
                dto.LogoUrl = $@"/assets/documents/{id}/prescription/{logoFileName}";
            }

            await _physicianService.SaveDesignPrescriptionAsync(id, dto);

            return Ok(new { Success = true, Message = "Design prescription saved successfully." });
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

        [HttpDelete("{id}/design-prescriptions/{prescriptionId}")]
        public async Task<IActionResult> DeleteDesignPrescription(string id, string prescriptionId)
        {
            await _physicianService.DeleteDesignPrescriptionAsync(id, prescriptionId);
            return Ok(new { Success = true, Message = "Design prescription deleted successfully." });
        }

        [HttpGet("{id}/patients")]
        public async Task<IActionResult> GetAllPatients(string id)
        {
            var patients = await _physicianService.GetAllPatientsAsync(id);
            return Ok(new { Success = true, Message = "Patients retrieved successfully.", Data = patients });
        }

        [HttpPost("{id}/patients")]
        public async Task<IActionResult> SavePatient(string id, [FromBody] PatientRecordDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _physicianService.SavePatientAsync(id, dto);
            return Ok(new { Success = true, Message = "Patient saved successfully." });
        }

        [HttpDelete("{id}/patients/{patientId}")]
        public async Task<IActionResult> DeletePatient(string id, string patientId)
        {
            await _physicianService.DeletePatientAsync(id, patientId);
            return Ok(new { Success = true, Message = "Patient deleted successfully." });
        }

        [HttpGet("{id}/header-footer")]
        public async Task<IActionResult> GetDefaultPrescriptionHeaderFooter(string id)
        {
            var details = await _physicianService.GetDefaultPrescriptionHeaderFooter(id);
            return Ok(new { Success = true, Message = "Prescriptions retrieved successfully.", Data = details });
        }



        [HttpGet("{physicianId}/prescriptions/{patientId}")]
        public async Task<IActionResult> GetPrescriptions(string physicianId, string patientId)
        {
            var prescriptions = await _physicianService.GetPrescriptionsAsync(physicianId, patientId);
            return Ok(new { Success = true, Message = "Prescriptions retrieved successfully.", Data = prescriptions });
        }

        [HttpGet("history/{patientId}")]
        public async Task<IActionResult> GetPatientHistory(string patientId)
        {
            var prescriptions = await _physicianService.GetPatientHistoryAsync(patientId);
            return Ok(new { Success = true, Message = "Prescriptions retrieved successfully.", Data = prescriptions });
        }



        [HttpPost("{physicianId}/prescriptions")]
        public async Task<IActionResult> AddPrescription([FromBody] PrescriptionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new
                {
                    Success = false,
                    Message = "Invalid data provided.",
                    Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage))
                });

            var fileData = Convert.FromBase64String(dto.PdfBase64);
            var prescriptionCount = await _physicianService.GetPrescriptionCountAsync(dto.PhysicianId, dto.PatientId);
            prescriptionCount++;

            var directoryPath = string.Empty;

            directoryPath = Path.Combine(_env.WebRootPath, "assets", "documents", dto.PatientId, "prescription");


            Directory.CreateDirectory(directoryPath);

            var pdfFileName = $"p_{prescriptionCount}.pdf";
            var pdfFilePath = Path.Combine(directoryPath, pdfFileName);
            await System.IO.File.WriteAllBytesAsync(pdfFilePath, fileData);

            var pdfUrl = $@"/assets/documents/{dto.PatientId}/prescription/{pdfFileName}";

            dto.PrescriptionUrl = pdfUrl;
            var prescriptionId = await _physicianService.AddPrescriptionAsync(dto);

            return Ok(new { Success = true, Message = "Prescription added successfully." });
        }

        [HttpPost("{id}/medical-case")]
        public async Task<IActionResult> SaveMedicalCase(string id, [FromBody] MedicalCaseDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            var directoryPath = string.Empty;
            directoryPath = Path.Combine(_env.WebRootPath ?? "", "assets", "documents", dto.UserId, "cases");

            Directory.CreateDirectory(directoryPath);
            var images = await _physicianService.SaveMedicalCaseAsync(dto);
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
            var medicalCases = await _physicianService.GetAllMedicalCasesAsync(id);
            return Ok(new { Success = true, Message = "Medical cases retrieved successfully.", Data = medicalCases });
        }

        [HttpDelete("{id}/medical-cases/{caseId}")]
        public async Task<IActionResult> DeleteMedicalCase(string id, string caseId)
        {
            await _physicianService.DeleteMedicalCaseAsync(id, caseId);
            return Ok(new { Success = true, Message = "Medical case deleted successfully." });
        }

        [HttpGet("{userId}/medical-case/{caseId}")]
        public async Task<IActionResult> GetMedicalCase(string userId, string caseId)
        {
            var medicalCase = await _physicianService.GetMedicalCase(userId, caseId);
            return Ok(new { Success = true, Message = "Remedy retrieved successfully.", Data = medicalCase });
        }

        [HttpGet("{id}/user-details")]
        public async Task<IActionResult> GetUserDetails(string id)
        {
            var userDetails = await _physicianService.GetUserDetailsAsync(id);

            return Ok(new { Success = true, Data = userDetails });
        }

        [HttpGet("{physicianId}/design-prescriptions/{prescriptionId}")]
        public async Task<IActionResult> LoadPrescription(string physicianId, string prescriptionId)
        {
            var prescription = await _physicianService.LoadPrescriptionAsync(physicianId, prescriptionId);
            if (prescription == null)
            {
                return NotFound(new { Success = false, Message = "Prescription not found." });
            }

            return Ok(new { Success = true, Data = prescription });
        }

        [HttpGet("{id}/patients/by-mobile/{mobile}")]
        public async Task<IActionResult> GetPatientByMobile(string id, string mobile)
        {
            var patient = await _physicianService.GetPatientByMobileAsync(id, mobile);
            if (patient == null)
            {
                return Ok(new { Success = false, Message = "Patient not found." });
            }
            return Ok(new { Success = true, Data = patient });
        }

        [HttpGet("physicians/by-mobile/{mobile}")]
        public async Task<IActionResult> GetPhysicianByMobile(string id, string mobile)
        {
            var patient = await _physicianService.GetPhysicianByMobileAsync(mobile);
            if (patient == null)
            {
                return Ok(new { Success = false, Message = "Patient not found." });
            }
            return Ok(new { Success = true, Data = patient });
        }

        [HttpGet("{physicianId}/profiles")]
        public async Task<IActionResult> GetProfiles(string physicianId)
        {
            var profiles = await _physicianService.GetProfilesAsync(physicianId);
            return Ok(new { Success = true, Message = "Profiles retrieved successfully.", Data = profiles });
        }

        [HttpPost("{physicianId}/profiles")]
        public async Task<IActionResult> SaveProfiles(string physicianId, [FromBody] ProfileDTO profileDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _physicianService.SaveProfilesAsync(physicianId, profileDto);
            return Ok(new { Success = true, Message = "Profiles saved successfully." });
        }

        [HttpDelete("{id}/profiles/{profileId}")]
        public async Task<IActionResult> DeleteProfile(string id, string profileId)
        {
            await _physicianService.DeleteProfileAsync(id, profileId);
            return Ok(new { Success = true, Message = "Profile deleted successfully." });
        }

        [HttpGet("{physicianId}/clinic-slots")]
        public async Task<IActionResult> GetClinicSlots(string physicianId, [FromQuery] string clinicId, [FromQuery] string date)
        {
            if (string.IsNullOrEmpty(clinicId))
                return BadRequest(new { Success = false, Message = "ClinicId is required." });

            var slots = await _physicianService.GetClinicSlotsAsync(physicianId, clinicId, Convert.ToDateTime(date));
            return Ok(new { Success = true, Data = slots });
        }

        [HttpPost("multi-appointments")]
        public async Task<IActionResult> SaveMultipleAppointment([FromBody] SaveMultipleAppointmentsRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    Success = false,
                    Message = "Invalid input."
                });
            }

            await _physicianService.SaveMultipleAppointment(request.Status, request.Date, request.Time, request.Reason, request.Dtos);
            return Ok(new { Success = true, Message = "Appointments saved successfully." });
        }

        [HttpGet("{physicianId}/info")]
        public async Task<IActionResult> GetPhysicianInfo(string physicianId) =>
            Ok(new { Success = true, Message = "Patient info retrieved successfully.", Data = await _physicianService.GetPhysicianInfoAsync(physicianId) });

        [HttpPost("{userId}/comment/{caseId}")]
        public async Task<IActionResult> SaveComment(string userId, string caseId, [FromBody] CommentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _physicianService.SaveComment(userId, caseId, dto);
            return Ok(new { Success = true, Message = "Comment saved." });

        }

        [HttpPost("{userId}/like/{caseId}/{likedUser}")]
        public async Task<IActionResult> ToggleLike(string userId, string caseId, string likedUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _physicianService.ToggleLikeAsync(userId, caseId, likedUser);
            return Ok(new { Success = true });

        }

        [HttpPost("{userId}/preference")]
        public async Task<IActionResult> UpdatePreferences(string userId, [FromBody] List<string> preferences)
        {
            await _physicianService.UpdatePreferencesAsync(userId, preferences);
            return Ok(new { Success = true, Message = "Preferences updated." });
        }
    }
}


