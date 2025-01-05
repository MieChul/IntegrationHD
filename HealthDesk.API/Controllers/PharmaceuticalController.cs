
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

    }
}