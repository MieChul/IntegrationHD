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
    }
}