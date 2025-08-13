using HealthDesk.Application.DTO;
using HealthDesk.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthDesk.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Policy = "AdminOnly")]
public class AdminController : ControllerBase
{
    private IAdminService _adminService;
    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpPost("adminAction/{id}")]
    public async Task<IActionResult> AdminAction(string id, AdminActionDto model)
    {
        await _adminService.AdminAction(id, model.Role, model.Status, model.Comments);
        return Ok(new { message = "User updated successfully" });
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetAll()
    {
        var users = await _adminService.GetAll();
        return Ok(users);
    }

    [HttpGet("brands")]
    public async Task<IActionResult> GetAllBrands()
    {
        var users = await _adminService.GetAllBrands();
        return Ok(users);
    }

    [HttpPost("approveRejectBrand/{pharmaid}")]
    public async Task<IActionResult> ApproveRejectBrand(string pharmaId, BrandApprovalDto model)
    {
        await _adminService.ApproveRejectBrand(pharmaId, model.BrandId, model.Approved, model.Comment);
        return Ok(new { message = "Brand updated successfully" });
    }
}
