using HealthDesk.Application.Interfaces;
using HealthDesk.Core;
using HealthDesk.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HealthDesk.Application.Extensions;
public static class ServiceCollectionExtensions
{

  public static IServiceCollection RegisterServices(this IServiceCollection services, IConfiguration configuration)
  {
    #region Context
    services.AddSingleton<MongoDbContext>();
    #endregion

    #region Services
    services.AddScoped<IOtpService, OtpService>();
    services.AddScoped<IMessageService, MessageService>();
    services.AddScoped<IUserService, UserService>();
    services.AddScoped<IAuthService, AuthService>();
    services.AddScoped<IAccountService, AccountService>();
    services.AddScoped<IAdminService, AdminService>();
    services.AddScoped<IHospitalService, HospitalService>();
    services.AddScoped<ILaboratoryService, LaboratoryService>();
    services.AddScoped<IPharmacyService, PharmacyService>();
    services.AddScoped<IPharmaceuticalService, PharmaceuticalService>();
    services.AddScoped<IPhysicianService, PhysicianService>();
    services.AddScoped<IPatientService, PatientService>();
    services.AddScoped<ICommonService, CommonService>();
    #endregion

    #region Repositories
    services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
    services.AddScoped<ILogRepository, LogRepository>();
    services.AddScoped<IUserRepository, UserRepository>();
    services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
    services.AddScoped<IPatientRepository, PatientRepository>();
    services.AddScoped<IPhysicianRepository, PhysicianRepository>();
    services.AddScoped<IHospitalRepository, HospitalRepository>();
    services.AddScoped<ILaboratoryRepository, LaboratoryRepository>();
    services.AddScoped<IPharmacyRepository, PharmacyRepository>();
    services.AddScoped<IPharmaceuticalRepository, PharmaceuticalRepository>();
    services.AddScoped<ICommonRepository, CommonRepository>();
    #endregion

    return services;
  }
}
