using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PhysicianController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IPhysicianService _physicianService;
        private readonly IPatientService _patientService;

        public PhysicianController(IAccountService accountService, IPhysicianService physicianService, IPatientService patientService)
        {
            _accountService = accountService;
            _physicianService = physicianService;
            _patientService = patientService;
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

            try
            {
                // Get the design prescription count for naming the images
                var designCount = await _physicianService.GetDesignPrescriptionCountAsync(id);

                // Create directory structure if not exists
                var directoryPath = Path.Combine("assets", "documents", id, "prescription");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                // Save Header Image
                var headerFileName = $"header{designCount}.png";
                var headerFilePath = Path.Combine(directoryPath, headerFileName);
                if (!string.IsNullOrEmpty(dto.HeaderImage))
                {
                    SaveBase64ImageToFile(dto.HeaderImage, headerFilePath);
                }
                dto.HeaderUrl = $"/assets/documents/{id}/prescription/{headerFileName}";

                // Save Footer Image
                var footerFileName = $"footer{designCount}.png";
                var footerFilePath = Path.Combine(directoryPath, footerFileName);
                if (!string.IsNullOrEmpty(dto.FooterImage))
                {
                    SaveBase64ImageToFile(dto.FooterImage, footerFilePath);
                }
                dto.FooterUrl = $"/assets/documents/{id}/prescription/{footerFileName}";

                // Save Logo Image
                var logoFileName = $"logo_image{designCount}.png";
                var logoFilePath = Path.Combine(directoryPath, logoFileName);
                if (!string.IsNullOrEmpty(dto.LogoImage))
                {
                    SaveBase64ImageToFile(dto.LogoImage, logoFilePath);
                }
                dto.LogoUrl = $"/assets/documents/{id}/prescription/{logoFileName}";

                // Save design prescription data (excluding images)
                await _physicianService.SaveDesignPrescriptionAsync(id, dto);

                return Ok(new { Success = true, Message = "Design prescription saved successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Success = false, Message = "An error occurred while saving the design prescription.", Error = ex.Message });
            }
        }

        private void SaveBase64ImageToFile(string base64Image, string filePath)
        {
            var imageBytes = Convert.FromBase64String(base64Image.Split(",")[1]); // Assumes Base64 includes metadata
            System.IO.File.WriteAllBytes(filePath, imageBytes);
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

        [HttpGet("{id}/prescriptions/{patientId}")]
        public async Task<IActionResult> GetPrescriptions(string id, string patientId)
        {
            var prescriptions = await _physicianService.GetPrescriptionsAsync(id, patientId);
            return Ok(new { Success = true, Message = "Prescriptions retrieved successfully.", Data = prescriptions });
        }

        [HttpPost("{id}/prescriptions")]
        public async Task<IActionResult> AddPrescription(string id, [FromBody] PrescriptionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            var prescriptionId = await _physicianService.AddPrescriptionAsync(id, dto);
            return Ok(new { Success = true, Message = "Prescription added successfully.", Id = prescriptionId });
        }

        [HttpPost("{id}/medical-cases")]
        public async Task<IActionResult> SaveMedicalCase(string id, [FromBody] MedicalCaseDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _physicianService.SaveMedicalCaseAsync(id, dto);
            return Ok(new { Success = true, Message = "Medical case saved successfully." });
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

        [HttpPost("{id}/medical-cases/{caseId}/increment-likes")]
        public async Task<IActionResult> IncrementLikes(string id, string caseId)
        {
            await _physicianService.IncrementLikesAsync(id, caseId);
            return Ok(new { Success = true, Message = "Likes incremented successfully." });
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
            try
            {
                var prescription = await _physicianService.LoadPrescriptionAsync(physicianId, prescriptionId);
                if (prescription == null)
                {
                    return NotFound(new { Success = false, Message = "Prescription not found." });
                }

                return Ok(new { Success = true, Data = prescription });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Success = false, Message = "An error occurred while loading the prescription.", Error = ex.Message });
            }
        }
    }
}
