using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HospitalController : ControllerBase
    {
        private IAccountService _accountService;
        private IPhysicianService _physicianService;
        private IHospitalService _hospitalService;

        public HospitalController(IAccountService accountService, IPhysicianService physicianService, IHospitalService hospitalService)
        {
            _accountService = accountService;
            _physicianService = physicianService;
            _hospitalService = hospitalService;
        }
        // 1. Get all physicians for a hospital
        [HttpGet("{userId}/physicians")]
        public async Task<IActionResult> GetAllPhysicians(string userId) =>
            Ok(await _hospitalService.GetAllPhysiciansAsync(userId));

        // 2. Add a physician to a hospital
        [HttpPost("{userId}/physicians")]
        public async Task<IActionResult> AddPhysician(string userId, [FromBody] PhysicianDto dto)
        {
            if (string.IsNullOrEmpty(dto.Id))
                return BadRequest("Physician ID is required.");

            await _hospitalService.AddPhysicianAsync(userId, dto.Id);
            return Ok("Physician added successfully.");
        }

        // 3. Delete a physician from a hospital
        [HttpDelete("{userId}/physicians/{physicianId}")]
        public async Task<IActionResult> DeletePhysician(string userId, string physicianId)
        {
            await _hospitalService.DeletePhysicianAsync(userId, physicianId);
            return Ok("Physician deleted successfully.");
        }

        // 4. Get all services for a hospital
        [HttpGet("{userId}/services")]
        public async Task<IActionResult> GetAllServices(string userId) =>
            Ok(await _hospitalService.GetAllServicesAsync(userId));

        // 5. Add or update a service
        [HttpPost("{userId}/services")]
        public async Task<IActionResult> SaveService(string userId, [FromBody] HospitalServiceDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _hospitalService.SaveServiceAsync(userId, dto);
            return Ok("Service saved successfully.");
        }

        // 6. Delete a service
        [HttpDelete("{userId}/services/{serviceId}")]
        public async Task<IActionResult> DeleteService(string userId, string serviceId)
        {
            await _hospitalService.DeleteServiceAsync(userId, serviceId);
            return Ok("Service deleted successfully.");
        }
    }
}