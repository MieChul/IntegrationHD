using HealthDesk.Core;

namespace HealthDesk.Application.Interfaces;
public interface IAdminService
{
     Task AdminAction(string id, string userRole, string value, string comments);
     Task<List<dynamic>> GetAll();
}