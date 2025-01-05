
using HealthDesk.Core;
using MongoDB.Driver;

namespace HealthDesk.Infrastructure;
public class LaboratoryRepository : GenericRepository<Laboratory>, ILaboratoryRepository
{
    private readonly IMongoCollection<Laboratory> _collection;
    public LaboratoryRepository(MongoDbContext context) : base(context, "Laboratories")
    {
        _collection = context.GetCollection<Laboratory>("Laboratories");
    }
}