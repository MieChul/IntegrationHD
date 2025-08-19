using HealthDesk.Core;

namespace HealthDesk.Infrastructure;

public interface IRefreshTokenRepository : IGenericRepository<RefreshToken>
{
    Task<RefreshToken> GetByTokenAsync(string token);
    Task RevokeTokenAsync(string token);
    Task DeleteByUserIdAsync(string userId);
    Task UpdateAsync(RefreshToken token);
}
