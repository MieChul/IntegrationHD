
using HealthDesk.Core;
using MongoDB.Driver;

namespace HealthDesk.Infrastructure;
public class HospitalRepository : GenericRepository<Hospital>, IHospitalRepository
{
    private readonly IMongoCollection<Hospital> _collection;
    public HospitalRepository(MongoDbContext context) : base(context, "Hospitals")
    {
        _collection = context.GetCollection<Hospital>("Hospitals");
    }

    public List<MedicalCase> GetAllCases()
    {
        return _collection
            .Find(Builders<Hospital>.Filter.Empty)
            .Project(p => p.MedicalCases)
            .ToList()
            .SelectMany(r => r)
            .ToList();
    }
}