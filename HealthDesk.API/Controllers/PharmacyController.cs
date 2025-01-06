using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PharmacyController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IPharmacyService _pharmacyService;

        public PharmacyController(IAccountService accountService, IPharmacyService pharmacyService)
        {
            _accountService = accountService;
            _pharmacyService = pharmacyService;
        }

        [HttpGet("{id}/medicines")]
        public async Task<IActionResult> GetAllMedicines(string id)
        {
            var medicines = await _pharmacyService.GetAllMedicinesAsync(id);
            return Ok(new { Success = true, Message = "Medicines retrieved successfully.", Data = medicines });
        }

        [HttpGet("{id}/medicines/{medicineId}")]
        public async Task<IActionResult> GetMedicineById(string id, string medicineId)
        {
            var medicine = await _pharmacyService.GetMedicineByIdAsync(id, medicineId);
            if (medicine == null)
                return NotFound(new { Success = false, Message = "Medicine not found." });

            return Ok(new { Success = true, Message = "Medicine retrieved successfully.", Data = medicine });
        }

        [HttpPost("{id}/medicines")]
        public async Task<IActionResult> SaveMedicine(string id, [FromBody] MedicineDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid input.", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });

            await _pharmacyService.SaveMedicineAsync(id, dto);
            return Ok(new { Success = true, Message = "Medicine saved successfully." });
        }

        [HttpDelete("{id}/medicines/{medicineId}")]
        public async Task<IActionResult> DeleteMedicine(string id, string medicineId)
        {
            await _pharmacyService.DeleteMedicineAsync(id, medicineId);
            return Ok(new { Success = true, Message = "Medicine deleted successfully." });
        }
    }
}
