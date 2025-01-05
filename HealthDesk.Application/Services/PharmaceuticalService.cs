using HealthDesk.Infrastructure;

namespace HealthDesk.Application;

public class PharmaceuticalService : IPharmaceuticalService
{

    private readonly IPharmaceuticalRepository _pharmaceuticalRepository;
    private readonly IMessageService _messageService;
    public PharmaceuticalService(IPharmaceuticalRepository pharmaceuticalRepository, IMessageService messageService)
    {
        _pharmaceuticalRepository = pharmaceuticalRepository;
        _messageService = messageService;
    }
}
