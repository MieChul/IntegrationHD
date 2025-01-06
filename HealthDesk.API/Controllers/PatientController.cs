using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IPhysicianService _physicianService;
        private readonly IPatientService _patientService;

        public PatientController(IAccountService accountService, IPhysicianService physicianService, IPatientService patientService)
        {
            _accountService = accountService;
            _physicianService = physicianService;
            _patientService = patientService;
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

        [HttpDelete("{patientId}/current-treatments/{treatmentId}")]
        public async Task<IActionResult> DeleteCurrentTreatment(string patientId, string treatmentId)
        {
            await _patientService.DeleteCurrentTreatmentAsync(patientId, treatmentId);
            return Ok(new { Success = true, Message = "Current treatment deleted successfully." });
        }

        // 3. Appointments
        [HttpGet("{patientId}/appointments")]
        public async Task<IActionResult> GetAppointments(string patientId) =>
            Ok(new { Success = true, Message = "Appointments retrieved successfully.", Data = await _patientService.GetAppointmentsAsync(patientId) });

        [HttpPost("{patientId}/appointments")]
        public async Task<IActionResult> SaveAppointment(string patientId, [FromBody] AppointmentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.SaveAppointmentAsync(patientId, dto);
            return Ok(new { Success = true, Message = "Appointment saved successfully." });
        }

        [HttpDelete("{patientId}/appointments/{appointmentId}")]
        public async Task<IActionResult> DeleteAppointment(string patientId, string appointmentId)
        {
            await _patientService.DeleteAppointmentAsync(patientId, appointmentId);
            return Ok(new { Success = true, Message = "Appointment deleted successfully." });
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
        public async Task<IActionResult> SaveLabInvestigation(string patientId, [FromBody] LabInvestigationDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.SaveLabInvestigationAsync(patientId, dto);
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

        [HttpPut("{patientId}/info")]
        public async Task<IActionResult> UpdatePatientInfo(string patientId, [FromBody] PatientInfoDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.UpdatePatientInfoAsync(patientId, dto);
            return Ok(new { Success = true, Message = "Patient info updated successfully." });
        }

        [HttpGet("{patientId}/compliance")]
        public async Task<IActionResult> GetCompliance(string patientId)
        {
            var compliance = await _patientService.GetComplianceAsync(patientId);
            return Ok(new { Success = true, Message = "Compliance retrieved successfully.", Data = compliance });
        }

        [HttpPost("{patientId}/compliance")]
        public async Task<IActionResult> AddOrUpdateCompliance(string patientId, [FromBody] PatientComplianceDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.AddOrUpdateComplianceAsync(patientId, dto);
            return Ok(new { Success = true, Message = "Compliance saved successfully." });
        }

        [HttpDelete("{patientId}/compliance/{complianceId}")]
        public async Task<IActionResult> DeleteCompliance(string patientId, string complianceId)
        {
            await _patientService.DeleteComplianceAsync(patientId, complianceId);
            return Ok(new { Success = true, Message = "Compliance deleted successfully." });
        }

        [HttpPatch("{patientId}/compliance/{complianceId}/pills-count")]
        public async Task<IActionResult> UpdatePillsCount(string patientId, string complianceId, [FromBody] int count)
        {
            if (count < 0)
                return BadRequest(new { Success = false, Message = "Count cannot be negative." });

            await _patientService.UpdatePillsCountAsync(patientId, complianceId, count);
            return Ok(new { Success = true, Message = "Pills count updated successfully." });
        }

        [HttpGet("{patientId}/compliance-percentage")]
        public async Task<IActionResult> GetCompliancePercentage(string patientId)
        {
            var percentage = await _patientService.GetCompliancePercentageAsync(patientId);
            return Ok(new { Success = true, Message = "Compliance percentage calculated successfully.", Data = percentage });
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

        [HttpGet("{patientId}/compliance-details/{complianceId}")]
        public async Task<IActionResult> GetComplianceDetails(string patientId, string complianceId)
        {
            var complianceDetails = await _patientService.GetComplianceDetailsAsync(patientId, complianceId);
            return Ok(new { Success = true, Message = "Compliance details retrieved successfully.", Data = complianceDetails });
        }

        [HttpPost("{patientId}/compliance-details/{complianceId}")]
        public async Task<IActionResult> AddOrUpdateComplianceDetail(string patientId, string complianceId, [FromBody] ComplianceDetailDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _patientService.AddOrUpdateComplianceDetailAsync(patientId, complianceId, dto);
            return Ok(new { Success = true, Message = "Compliance detail saved successfully." });
        }
    }
}