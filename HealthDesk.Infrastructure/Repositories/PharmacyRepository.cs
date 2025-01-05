
using HealthDesk.Core;
using MongoDB.Driver;

namespace HealthDesk.Infrastructure;
public class PharmacyRepository : GenericRepository<Pharmacy>, IPharmacyRepository
{
    private readonly IMongoCollection<Hospital> _collection;
    public PharmacyRepository(MongoDbContext context) : base(context, "Pharmacies")
    {
        _collection = context.GetCollection<Hospital>("Pharmacies");
    }
}