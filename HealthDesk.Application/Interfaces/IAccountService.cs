using HealthDesk.Core;

namespace HealthDesk.Application.Interfaces;
public interface IAccountService
{
    Task<User> GetById(string id);
    Task Update(string id, UpdateRequestDto model);
    Task RegisterUserInfo(string id, UpdateUserInfoRequestDto model);
    Task<dynamic> SwithRole(string id, string role);
    Task<UserDto> RefreshUserDetails(string id, string role);
    Task<UserDto> AddDependent(string id);
}