using HealthDesk.Core;
using MongoDB.Driver;

namespace HealthDesk.Infrastructure;

public class CommonRepository : ICommonRepository
{
    private readonly MongoDbContext _context;

    public CommonRepository(MongoDbContext context)
    {
        _context = context;
    }

    private IMongoCollection<T> GetCollection<T>(string entityName) where T : BaseEntity
    {
        return _context.GetCollection<T>(entityName);
    }

    public async Task<IEnumerable<T>> GetAllAsync<T>(string entityName) where T : BaseEntity
    {
        var collection = GetCollection<T>(entityName);
        return await collection.Find(_ => true).ToListAsync();
    }

    public async Task<T> GetByIdAsync<T>(string entityName, string id) where T : BaseEntity
    {
        var collection = GetCollection<T>(entityName);
        return await collection.Find(e => e.Id == id).FirstOrDefaultAsync();
    }

    public async Task AddAsync<T>(string entityName, T entity) where T : BaseEntity
    {
        var collection = GetCollection<T>(entityName);
        await collection.InsertOneAsync(entity);
    }

    public async Task UpdateAsync<T>(string entityName, T entity) where T : BaseEntity
    {
        var collection = GetCollection<T>(entityName);
        await collection.ReplaceOneAsync(e => e.Id == entity.Id, entity);
    }

    public async Task DeleteAsync(string entityName, string id)
    {
        var collection = GetCollection<BaseEntity>(entityName);
        await collection.DeleteOneAsync(e => e.Id == id);
    }
}
