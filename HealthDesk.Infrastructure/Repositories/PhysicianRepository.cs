using HealthDesk.Core;
using MongoDB.Driver;

namespace HealthDesk.Infrastructure;
public class PhysicianRepository : GenericRepository<Physician>, IPhysicianRepository
{
    private readonly IMongoCollection<Physician> _collection;
    public PhysicianRepository(MongoDbContext context) : base(context, "Physicians")
    {
        _collection = context.GetCollection<Physician>("Physicians");
    }

    public List<MedicalCase> GetAllCases()
    {
        return _collection
            .Find(Builders<Physician>.Filter.Empty)
            .Project(p => p.MedicalCases)
            .ToList()
            .SelectMany(r => r)
            .ToList();
    }
}
