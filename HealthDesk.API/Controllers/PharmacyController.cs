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
    }
}