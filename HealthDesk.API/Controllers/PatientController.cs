using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {

        private IAccountService _accountService;
        private IPhysicianService _physicianService;
        private IPatientService _patientService;

        public PatientController(IAccountService accountService, IPhysicianService physicianService, IPatientService patientService)
        {
            _accountService = accountService;
            _physicianService = physicianService;
            _patientService = patientService;
        }
        [HttpGet("{patientId}/medical-history")]
        public async Task<IActionResult> GetMedicalHistory(string patientId) =>
               Ok(await _patientService.GetMedicalHistoryAsync(patientId));

        [HttpPost("{patientId}/medical-history")]
        public async Task<IActionResult> SaveMedicalHistory(string patientId, [FromBody] MedicalHistoryDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _patientService.SaveMedicalHistoryAsync(patientId, dto);
            return Ok("Medical history saved successfully.");
        }

        [HttpDelete("{patientId}/medical-history/{historyId}")]
        public async Task<IActionResult> DeleteMedicalHistory(string patientId, string historyId)
        {
            await _patientService.DeleteMedicalHistoryAsync(patientId, historyId);
            return Ok("Medical history deleted successfully.");
        }

        // 2. List Current Treatment
        [HttpGet("{patientId}/current-treatments")]
        public async Task<IActionResult> GetCurrentTreatments(string patientId) =>
            Ok(await _patientService.GetCurrentTreatmentsAsync(patientId));

        [HttpPost("{patientId}/current-treatments")]
        public async Task<IActionResult> SaveCurrentTreatment(string patientId, [FromBody] CurrentTreatmentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _patientService.SaveCurrentTreatmentAsync(patientId, dto);
            return Ok("Current treatment saved successfully.");
        }

        [HttpDelete("{patientId}/current-treatments/{treatmentId}")]
        public async Task<IActionResult> DeleteCurrentTreatment(string patientId, string treatmentId)
        {
            await _patientService.DeleteCurrentTreatmentAsync(patientId, treatmentId);
            return Ok("Current treatment deleted successfully.");
        }

        // 3. List Appointments
        [HttpGet("{patientId}/appointments")]
        public async Task<IActionResult> GetAppointments(string patientId) =>
            Ok(await _patientService.GetAppointmentsAsync(patientId));

        [HttpPost("{patientId}/appointments")]
        public async Task<IActionResult> SaveAppointment(string patientId, [FromBody] AppointmentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _patientService.SaveAppointmentAsync(patientId, dto);
            return Ok("Appointment saved successfully.");
        }

        [HttpDelete("{patientId}/appointments/{appointmentId}")]
        public async Task<IActionResult> DeleteAppointment(string patientId, string appointmentId)
        {
            await _patientService.DeleteAppointmentAsync(patientId, appointmentId);
            return Ok("Appointment deleted successfully.");
        }

        // 4. List Self Records
        [HttpGet("{patientId}/self-records")]
        public async Task<IActionResult> GetSelfRecords(string patientId) =>
            Ok(await _patientService.GetSelfRecordsAsync(patientId));

        [HttpPost("{patientId}/self-records")]
        public async Task<IActionResult> SaveSelfRecord(string patientId, [FromBody] SelfRecordDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _patientService.SaveSelfRecordAsync(patientId, dto);
            return Ok("Self record saved successfully.");
        }

        [HttpDelete("{patientId}/self-records/{recordId}")]
        public async Task<IActionResult> DeleteSelfRecord(string patientId, string recordId)
        {
            await _patientService.DeleteSelfRecordAsync(patientId, recordId);
            return Ok("Self record deleted successfully.");
        }

        // 5. List Symptoms
        [HttpGet("{patientId}/symptoms")]
        public async Task<IActionResult> GetSymptoms(string patientId) =>
            Ok(await _patientService.GetSymptomsAsync(patientId));

        [HttpPost("{patientId}/symptoms")]
        public async Task<IActionResult> SaveSymptom(string patientId, [FromBody] SymptomDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _patientService.SaveSymptomAsync(patientId, dto);
            return Ok("Symptom saved successfully.");
        }

        [HttpDelete("{patientId}/symptoms/{symptomId}")]
        public async Task<IActionResult> DeleteSymptom(string patientId, string symptomId)
        {
            await _patientService.DeleteSymptomAsync(patientId, symptomId);
            return Ok("Symptom deleted successfully.");
        }

        // 6. List Lab Investigations
        [HttpGet("{patientId}/lab-investigations")]
        public async Task<IActionResult> GetLabInvestigations(string patientId) =>
            Ok(await _patientService.GetLabInvestigationsAsync(patientId));

        [HttpPost("{patientId}/lab-investigations")]
        public async Task<IActionResult> SaveLabInvestigation(string patientId, [FromBody] LabInvestigationDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _patientService.SaveLabInvestigationAsync(patientId, dto);
            return Ok("Lab investigation saved successfully.");
        }

        [HttpDelete("{patientId}/lab-investigations/{investigationId}")]
        public async Task<IActionResult> DeleteLabInvestigation(string patientId, string investigationId)
        {
            await _patientService.DeleteLabInvestigationAsync(patientId, investigationId);
            return Ok("Lab investigation deleted successfully.");
        }

        // 7. List Reports
        [HttpGet("{patientId}/reports")]
        public async Task<IActionResult> GetReports(string patientId) =>
            Ok(await _patientService.GetReportsAsync(patientId));

        [HttpPost("{patientId}/reports")]
        public async Task<IActionResult> SaveReport(string patientId, [FromBody] ReportDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _patientService.SaveReportAsync(patientId, dto);
            return Ok("Report saved successfully.");
        }

        [HttpDelete("{patientId}/reports/{reportId}")]
        public async Task<IActionResult> DeleteReport(string patientId, string reportId)
        {
            await _patientService.DeleteReportAsync(patientId, reportId);
            return Ok("Report deleted successfully.");
        }

        // 8. List Immunizations
        [HttpGet("{patientId}/immunizations")]
        public async Task<IActionResult> GetImmunizations(string patientId) =>
            Ok(await _patientService.GetImmunizationsAsync(patientId));

        [HttpPost("{patientId}/immunizations")]
        public async Task<IActionResult> SaveImmunization(string patientId, [FromBody] ImmunizationDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _patientService.SaveImmunizationAsync(patientId, dto);
            return Ok("Immunization saved successfully.");
        }

        [HttpDelete("{patientId}/immunizations/{immunizationId}")]
        public async Task<IActionResult> DeleteImmunization(string patientId, string immunizationId)
        {
            await _patientService.DeleteImmunizationAsync(patientId, immunizationId);
            return Ok("Immunization deleted successfully.");
        }

        // 9. Patient Info
        [HttpGet("{patientId}/info")]
        public async Task<IActionResult> GetPatientInfo(string patientId) =>
            Ok(await _patientService.GetPatientInfoAsync(patientId));

        [HttpPut("{patientId}/info")]
        public async Task<IActionResult> UpdatePatientInfo(string patientId, [FromBody] PatientInfoDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _patientService.UpdatePatientInfoAsync(patientId, dto);
            return Ok("Patient info updated successfully.");
        }
    }
}