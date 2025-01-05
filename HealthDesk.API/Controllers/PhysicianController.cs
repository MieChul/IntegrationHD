using HealthDesk.Application;
using HealthDesk.Application.DTO;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PhysicianController : ControllerBase
    {
        private IAccountService _accountService;
        private IPhysicianService _physicianService;
        private IPatientService _patientService;

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
            return Ok(clinics);
        }

        [HttpPost("{physicianId}/clinics")]
        public async Task<IActionResult> AddOrUpdateClinic(string physicianId, [FromBody] PhysicianClinicDto clinicDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _physicianService.AddOrUpdateClinicAsync(physicianId, clinicDto);
            return Ok("Clinic saved successfully.");
        }

        [HttpDelete("{physicianId}/clinics/{clinicId}")]
        public async Task<IActionResult> DeleteClinic(string physicianId, string clinicId)
        {
            await _physicianService.DeleteClinicAsync(physicianId, clinicId);
            return Ok("Clinic deleted successfully.");
        }
    }
}