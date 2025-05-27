
using HealthDesk.Core;

namespace HealthDesk.Infrastructure;
public interface IHospitalRepository : IGenericRepository<Hospital>
{
    List<MedicalCase> GetAllCases();

}
