using HealthDesk.Core;

namespace HealthDesk.Application.Interfaces;
public interface IAccountService
{
    Task<User> GetById(string id);
    Task Update(string id, UpdateRequestDto model);
    Task RegisterUserInfo(string id, UpdateUserInfoRequestDto model);
    void RegisterPatientInfo(string id, RegisterPatientInfoDto model);
}