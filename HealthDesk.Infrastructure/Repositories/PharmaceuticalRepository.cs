

using HealthDesk.Core;
using MongoDB.Driver;

namespace HealthDesk.Infrastructure;

public class PharmaceuticalRepository : GenericRepository<Pharmaceutical>, IPharmaceuticalRepository
{
    private readonly IMongoCollection<Hospital> _collection;
    public PharmaceuticalRepository(MongoDbContext context) : base(context, "Pharmaceuticals")
    {
        _collection = context.GetCollection<Hospital>("Pharmaceuticals");
    }
}
