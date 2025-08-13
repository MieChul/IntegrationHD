using HealthDesk.Core;

namespace HealthDesk.Application.Interfaces;

public interface IAdminService
{
      Task AdminAction(string id, string userRole, string value, string comments);
      Task ApproveRejectBrand(string pharmaId, string brandId, bool approve = true, string comment = null);
      Task<List<dynamic>> GetAll();
      Task<List<dynamic>> GetAllBrands();
}