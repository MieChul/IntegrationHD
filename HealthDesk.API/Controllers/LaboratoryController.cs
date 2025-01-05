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
    }
}