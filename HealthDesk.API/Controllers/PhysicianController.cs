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
                var designCount = await _physicianService.GetDesignPrescriptionCountAsync(id);
                if (string.IsNullOrEmpty(dto.Id) || designCount == 0)
                    designCount++;
                var directoryPath = Path.Combine("..", "HealthDesk.UI", "src", "assets", "documents", id, "prescription");

                Directory.CreateDirectory(directoryPath);

                // Save Header Image
                var headerFileName = $"header{designCount}.png";
                if (!string.IsNullOrEmpty(dto.HeaderImage))
                {
                    dto.HeaderUrl = await CreateFile(directoryPath, headerFileName, dto.Id, dto.HeaderImage);
                }

                // Save Footer Image
                var footerFileName = $"footer{designCount}.png";
                if (!string.IsNullOrEmpty(dto.FooterImage))
                {
                    dto.FooterUrl = await CreateFile(directoryPath, footerFileName, dto.Id, dto.FooterImage);
                }

                // Save Logo Image
                var logoFileName = $"logo_image{designCount}.png";
                if (!string.IsNullOrEmpty(dto.LogoImage))
                {
                    dto.LogoUrl = await CreateFile(directoryPath, logoFileName, dto.Id, dto.LogoImage);
                }

                // Save design prescription data (excluding images)
                await _physicianService.SaveDesignPrescriptionAsync(id, dto);

                return Ok(new { Success = true, Message = "Design prescription saved successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Success = false, Message = "An error occurred while saving the design prescription.", Error = ex.Message });
            }
        }

        private async Task<string> CreateFile(string folderPath, string filename, string id, string base64Image)
        {
            // Construct the full file path
            var filePath = Path.Combine(folderPath, filename);

            try
            {
                // Validate and extract Base64 data
                if (string.IsNullOrWhiteSpace(base64Image))
                {
                    throw new ArgumentException("Base64 image string is null or empty.");
                }

                var base64Data = base64Image.Contains(",")
                    ? base64Image.Substring(base64Image.IndexOf(',') + 1)
                    : base64Image;

                // Convert Base64 string to byte array
                byte[] imageBytes = Convert.FromBase64String(base64Data);

                // Write the image bytes to the file
                await System.IO.File.WriteAllBytesAsync(filePath, imageBytes);
            }
            catch (FormatException)
            {
                throw new Exception("Invalid Base64 string format.");
            }
            catch (UnauthorizedAccessException)
            {
                throw new Exception("Access denied. Unable to write to the specified file path.");
            }
            catch (Exception ex)
            {
                throw new Exception($"Unexpected error while saving the image: {ex.Message}");
            }

            // Return the relative URL for the saved file
            return $@"assets/documents/{id}/prescription/{filename}";
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
    }
}
