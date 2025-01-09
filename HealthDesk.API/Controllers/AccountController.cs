using HealthDesk.Application;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers;
[ApiController]
//[Authorize]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private IAccountService _accountService;

    public AccountController(IAccountService accountService)
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
        var folderPath = Path.Combine("..", "HealthDesk.UI", "src", "assets", "documents", id);

        try
        {
            // Ensure the folder exists
            Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, filename);

            // Delete existing file if needed
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            // Save the new file
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            var res = $@"assets/documents/{id}/{filename}";
            var model = new UpdateRequestDto();

            var propertyMap = new Dictionary<string, Action<string>>
        {
            { "profileImage", value => model.ProfImage = value },
            { "clinicImage", value => model.ClinicImage = value },
            { "graduation", value => model.GDoc = value },
            { "postGraduation", value => model.PDoc = value },
            { "superSpecialization", value => model.SDoc = value },
            { "additionalQualification", value => model.ADoc = value },
            { "medicalRegistration", value => model.MDoc = value }
        };

            if (propertyMap.TryGetValue(propName, out var setter))
            {
                setter(res);
            }
            else
            {
                return BadRequest("Invalid property name.");
            }

            return Ok(new { fileName = res });
        }
        catch (Exception ex)
        {
            // Log the error (if logging mechanism exists)
            return StatusCode(500, "An error occurred while uploading the file.");
        }
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
        return Ok(new { role = role, username = user.Username, id = user.Id, profImage = user.ProfImage, status = user.Status, canswitch = user.CanSwitch, dependentId = user.DependentId, dependentName = user.DependentName, hasDependent = user.HasDependent });
    }

    [HttpPost("addDependent/{id}")]
    public async Task<IActionResult> AddDependent(string id)
    {
        var user = await _accountService.AddDependent(id);
        return Ok(new { role = "patient", username = user.Username, id = user.Id, profImage = user.ProfImage, status = user.Status, canswitch = user.CanSwitch, dependentId = user.DependentId, dependentName = user.DependentName, hasDependent = user.HasDependent });
    }
}
