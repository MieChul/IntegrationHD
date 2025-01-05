using HealthDesk.Core;

namespace HealthDesk.Infrastructure;

public interface ILogRepository : IGenericRepository<Log>
{
    Task LogAsync(string message, string level);
}
