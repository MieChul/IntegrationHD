using HealthDesk.Application;
using HealthDesk.Application.DTO;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HospitalController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IPhysicianService _physicianService;
        private readonly IHospitalService _hospitalService;

        public HospitalController(IAccountService accountService, IPhysicianService physicianService, IHospitalService hospitalService)
        {
            _accountService = accountService;
            _physicianService = physicianService;
            _hospitalService = hospitalService;
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
    }
}
