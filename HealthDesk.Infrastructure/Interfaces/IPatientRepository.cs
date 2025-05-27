using HealthDesk.Core;

namespace HealthDesk.Infrastructure;

public interface IPatientRepository : IGenericRepository<Patient>
{
    List<Remedy> GetAllRemedies();
}
