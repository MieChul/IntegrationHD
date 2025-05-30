using HealthDesk.Core;
using MongoDB.Driver;

namespace HealthDesk.Infrastructure;
public class PatientRepository : GenericRepository<Patient>, IPatientRepository
{
    private readonly IMongoCollection<Patient> _collection;
    public PatientRepository(MongoDbContext context) : base(context, "Patients")
    {
        _collection = context.GetCollection<Patient>("Patients");
    }

    public List<Remedy> GetAllRemedies()
    {
        return _collection
            .Find(Builders<Patient>.Filter.Empty)
            .Project(p => p.HomeRemedies)
            .ToList()
            .SelectMany(r => r)
            .ToList();
    }
}
