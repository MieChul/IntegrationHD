using HealthDesk.Core;

namespace HealthDesk.Infrastructure;

public interface ICommonRepository
{
    Task<IEnumerable<T>> GetAllAsync<T>(string entityName) where T : BaseEntity;
    Task<T> GetByIdAsync<T>(string entityName, string id) where T : BaseEntity;
    Task AddAsync<T>(string entityName, T entity) where T : BaseEntity;
    Task UpdateAsync<T>(string entityName, T entity) where T : BaseEntity;
    Task DeleteAsync(string entityName, string id);
}
