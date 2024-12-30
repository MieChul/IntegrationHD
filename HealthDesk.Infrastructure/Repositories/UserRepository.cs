using HealthDesk.Core;
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
        return await _collection.Find(entity => entity.Username == username && string.IsNullOrEmpty(entity.DependentId)).FirstOrDefaultAsync();
    }
    public async Task<User> GetByEmailOrMobileAsync(string emailOrMobile, bool isEmail = false) =>
        await GetByDynamicPropertyAsync(isEmail ? "email" : "mobile", emailOrMobile);
}
