
using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PharmaceuticalController : ControllerBase
    {
        private IAccountService _accountService;
        private IPharmaceuticalService _pharmaceuticalService;

        public PharmaceuticalController(IAccountService accountService, IPharmaceuticalService pharmaceuticalService)
        {
            _accountService = accountService;
            _pharmaceuticalService = pharmaceuticalService;
        }

        [HttpGet("{pharmaceuticalId}/brand-library")]
        public async Task<IActionResult> GetAllBrandLibraries(string pharmaceuticalId) =>
           Ok(await _pharmaceuticalService.GetAllBrandLibrariesAsync(pharmaceuticalId));

        [HttpPost("{pharmaceuticalId}/brand-library")]
        public async Task<IActionResult> SaveBrandLibrary(string pharmaceuticalId, [FromBody] BrandLibraryDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _pharmaceuticalService.SaveBrandLibraryAsync(pharmaceuticalId, dto);
            return Ok("BrandLibrary saved successfully.");
        }

        [HttpDelete("{pharmaceuticalId}/brand-library/{brandLibraryId}")]
        public async Task<IActionResult> DeleteBrandLibrary(string pharmaceuticalId, string brandLibraryId)
        {
            await _pharmaceuticalService.DeleteBrandLibraryAsync(pharmaceuticalId, brandLibraryId);
            return Ok("BrandLibrary deleted successfully.");
        }
    }
}