using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers;

[ApiController]
[Authorize(Policy = "AnyAuthenticated")]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private IAccountService _accountService;
    private readonly IWebHostEnvironment _env;

    public AccountController(IAccountService accountService, IWebHostEnvironment env)
    {
        _accountService = accountService;
        _env = env;
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
    public async Task<IActionResult> UploadFile([FromForm] IFormFile file, [FromForm] string id, [FromForm] string propName)
    {
        if (file == null || file.Length == 0)
            return BadRequest("Invalid or empty file.");

        if (string.IsNullOrWhiteSpace(id) || string.IsNullOrWhiteSpace(propName))
            return BadRequest("Invalid ID or property name.");

        string extension = Path.GetExtension(file.FileName);
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".pdf" };
        if (!allowedExtensions.Contains(extension, StringComparer.OrdinalIgnoreCase))
            return BadRequest("Invalid file type.");

        var filename = $"{propName}{extension}";

        string folderPath;

        folderPath = Path.Combine(_env.WebRootPath, "assets", "documents", id);

        Directory.CreateDirectory(folderPath);

        var filePath = Path.Combine(folderPath, filename);

        if (System.IO.File.Exists(filePath))
        {
            System.IO.File.Delete(filePath);
        }

        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(fileStream);
        }

        var res = $@"/assets/documents/{id}/{filename}";

        return Ok(new { fileName = res });

    }

    [HttpPost("switch/{id}")]
    public async Task<IActionResult> Switch(string id, [FromQuery] string role)
    {
        var data = await _accountService.SwithRole(id, role);

        return Ok(new { data });
    }

    [HttpPost("refreshUserDetails/{id}")]
    public async Task<IActionResult> RefreshUserDetails(string id, [FromQuery] string role)
    {
        var user = await _accountService.RefreshUserDetails(id, role);
        return Ok(new { role = role, username = user.Username, id = user.Id, profImage = user.ProfImage, status = user.Status, canswitch = user.CanSwitch, dependentId = user.DependentId, dependentName = user.DependentName, hasDependent = user.HasDependent, isMainApproved = user.IsMainApproved, dateOfBirth = user.DateOfBirth, gender = user.Gender });
    }

    [HttpPost("addDependent/{id}")]
    public async Task<IActionResult> AddDependent(string id)
    {
        var user = await _accountService.AddDependent(id);
        return Ok(new { role = "patient", username = user.Username, id = user.Id, profImage = user.ProfImage, status = user.Status, canswitch = user.CanSwitch, dependentId = user.DependentId, dependentName = user.DependentName, hasDependent = user.HasDependent, isMainApproved = user.IsMainApproved, dateOfBirth = user.DateOfBirth, gender = user.Gender });
    }
}
