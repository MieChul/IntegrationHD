using HealthDesk.Infrastructure;

namespace HealthDesk.Application;

public class HospitalService : IHospitalService
{

    private readonly IHospitalRepository _hospitalRepository;
    private readonly IMessageService _messageService;
    public HospitalService(IHospitalRepository hospitalRepository, IMessageService messageService)
    {
        _hospitalRepository = hospitalRepository;
        _messageService = messageService;
    }
}
