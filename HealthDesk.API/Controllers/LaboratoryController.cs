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
    public class LaboratoryController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IPhysicianService _physicianService;
        private readonly ILaboratoryService _laboratoryService;

        public LaboratoryController(IAccountService accountService, IPhysicianService physicianService, ILaboratoryService laboratoryService)
        {
            _accountService = accountService;
            _physicianService = physicianService;
            _laboratoryService = laboratoryService;
        }

        [HttpGet("{id}/lab-tests")]
        public async Task<IActionResult> GetAllLabTests(string id)
        {
            var labTests = await _laboratoryService.GetAllLabTestsAsync(id);
            return Ok(new { Success = true, Message = "Lab tests retrieved successfully.", Data = labTests });
        }

        [HttpGet("{id}/lab-tests/{labTestId}")]
        public async Task<IActionResult> GetLabTestById(string id, string labTestId)
        {
            var labTest = await _laboratoryService.GetLabTestByIdAsync(id, labTestId);
            if (labTest == null)
                return NotFound(new { Success = false, Message = "Lab test not found." });

            return Ok(new { Success = true, Message = "Lab test retrieved successfully.", Data = labTest });
        }

        [HttpPost("{id}/lab-tests")]
        public async Task<IActionResult> SaveLabTest(string id, [FromBody] List<LabTestDto> dtos)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _laboratoryService.SaveLabTestAsync(id, dtos);
            return Ok(new { Success = true, Message = "Lab test saved successfully." });
        }

        [HttpDelete("{id}/lab-tests/{labTestId}")]
        public async Task<IActionResult> DeleteLabTest(string id, string labTestId)
        {
            await _laboratoryService.DeleteLabTestAsync(id, labTestId);
            return Ok(new { Success = true, Message = "Lab test deleted successfully." });
        }
    }
}
