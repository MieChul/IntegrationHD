using HealthDesk.Core;

namespace HealthDesk.Infrastructure;

public interface IPhysicianRepository : IGenericRepository<Physician>
{
    List<MedicalCase> GetAllCases();
}

