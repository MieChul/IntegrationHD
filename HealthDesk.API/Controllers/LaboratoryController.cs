using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LaboratoryController : ControllerBase
    {
        private IAccountService _accountService;
        private IPhysicianService _physicianService;
        private ILaboratoryService _laboratoryService;

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
            return Ok(labTests);
        }

        [HttpGet("{id}/lab-tests/{labTestId}")]
        public async Task<IActionResult> GetLabTestById(string id, string labTestId)
        {
            var labTest = await _laboratoryService.GetLabTestByIdAsync(id, labTestId);
            if (labTest == null)
                return NotFound("Lab test not found.");

            return Ok(labTest);
        }

        [HttpPost("{id}/lab-tests")]
        public async Task<IActionResult> SaveLabTest(string id, [FromBody] LabTestDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _laboratoryService.SaveLabTestAsync(id, dto);
            return Ok("Lab test saved successfully.");
        }

        [HttpDelete("{id}/lab-tests/{labTestId}")]
        public async Task<IActionResult> DeleteLabTest(string id, string labTestId)
        {
            await _laboratoryService.DeleteLabTestAsync(id, labTestId);
            return Ok("Lab test deleted successfully.");
        }
    }
}