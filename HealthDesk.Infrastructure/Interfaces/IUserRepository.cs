using HealthDesk.Core;

namespace HealthDesk.Infrastructure;

public interface IUserRepository : IGenericRepository<User>
{
    Task<User> GetByUsernameAsync(string username);
    Task<User> GetByEmailOrMobileAsync(string emailOrMobile, bool isEmail = false);
}
