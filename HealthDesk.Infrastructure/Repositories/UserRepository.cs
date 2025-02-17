using HealthDesk.Core;
using MongoDB.Bson;
using MongoDB.Driver;

namespace HealthDesk.Infrastructure;

public class UserRepository : GenericRepository<User>, IUserRepository
{
    private readonly IMongoCollection<User> _collection;
    public UserRepository(MongoDbContext context) : base(context, "Users")
    {
        _collection = context.GetCollection<User>("Users");
    }

    public async Task<User> GetByUsernameAsync(string username)
    {
        var filter = Builders<User>.Filter.And(
     Builders<User>.Filter.Regex(e => e.Username, new BsonRegularExpression(username, "i")),
     Builders<User>.Filter.Eq(e => e.DependentId, null)
 );

        return await _collection.Find(filter).FirstOrDefaultAsync();
    }
    public async Task<User> GetByEmailOrMobileAsync(string emailOrMobile, bool isEmail = false) =>
        await GetByDynamicPropertyAsync(isEmail ? "email" : "mobile", emailOrMobile);
}
