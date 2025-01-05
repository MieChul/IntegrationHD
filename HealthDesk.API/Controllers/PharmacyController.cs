using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PharmacyController : ControllerBase
    {
        private IAccountService _accountService;
        private IPharmacyService _pharmacyService;

        public PharmacyController(IAccountService accountService, IPharmacyService pharmacyService)
        {
            _accountService = accountService;
            _pharmacyService = pharmacyService;
        }
         [HttpGet("{id}/medicines")]
        public async Task<IActionResult> GetAllMedicines(string id)
        {
            var medicines = await _pharmacyService.GetAllMedicinesAsync(id);
            return Ok(medicines);
        }

        [HttpGet("{id}/medicines/{medicineId}")]
        public async Task<IActionResult> GetMedicineById(string id, string medicineId)
        {
            var medicine = await _pharmacyService.GetMedicineByIdAsync(id, medicineId);
            if (medicine == null)
                return NotFound("Medicine not found.");

            return Ok(medicine);
        }

        [HttpPost("{id}/medicines")]
        public async Task<IActionResult> SaveMedicine(string id, [FromBody] MedicineDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _pharmacyService.SaveMedicineAsync(id, dto);
            return Ok("Medicine saved successfully.");
        }

        [HttpDelete("{id}/medicines/{medicineId}")]
        public async Task<IActionResult> DeleteMedicine(string id, string medicineId)
        {
            await _pharmacyService.DeleteMedicineAsync(id, medicineId);
            return Ok("Medicine deleted successfully.");
        }
    }
}