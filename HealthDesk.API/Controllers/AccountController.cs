using HealthDesk.Application;
using HealthDesk.Application.DTO;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers;
[ApiController]
//[Authorize]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private IAccountService _accountService;

    public AccountController(
IAccountService accountService
)
    {
        _accountService = accountService;
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var user = await _accountService.GetById(id);
        return Ok(user);
    }

    [HttpPost("{id}")]
    public IActionResult Update(string id, UpdateRequestDto model)
    {
        _accountService.Update(id, model);
        return Ok(new { message = "User updated successfully" });
    }

    [HttpPost("registerUserInfo/{id}")]
    public IActionResult RegisterUserInfo(string id, UpdateUserInfoRequestDto model)
    {
        _accountService.RegisterUserInfo(id, model);
        return Ok(new { message = "User updated successfully" });
    }

    [HttpPost("uploadFile")]
    public async Task<object> UploadFile([FromForm] IFormFile file, [FromForm] string id, [FromForm] string propName)
    {
        string extension = Path.GetExtension(file.FileName);
        var filename = id + '_' + propName + extension;
        var tempFilename = $@"..\HealthDesk.UI\src\assets\documents\{filename}";

        using (var fileStream = new FileStream(tempFilename, FileMode.Create))
        {
            await file.CopyToAsync(fileStream);
        }
        var res = $@"/assets/documents/{filename}";
        var model = new UpdateRequestDto();

        if (propName.Equals("profileImage"))
            model.ProfImage = res;
        else if (propName.Equals("graduation"))
            model.GDoc = res;
        else if (propName.Equals("postGraduation"))
            model.PDoc = res;
        else if (propName.Equals("superSpecialization"))
            model.SDoc = res;
        else if (propName.Equals("additionalQualification"))
            model.ADoc = res;
        else if (propName.Equals("medicalRegistration"))
            model.MDoc = res;

        _accountService.Update(id, model);
        return Ok(new { fileName = res });
    }
}
