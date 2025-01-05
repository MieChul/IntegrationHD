using HealthDesk.Infrastructure;

namespace HealthDesk.Application;

public class PharmacyService : IPharmacyService
{

    private readonly IPharmacyRepository _pharmacyRepository;
    private readonly IMessageService _messageService;
    public PharmacyService(IPharmacyRepository pharmacyRepository, IMessageService messageService)
    {
        _pharmacyRepository = pharmacyRepository;
        _messageService = messageService;
    }
}
