
using HealthDesk.Infrastructure;

namespace HealthDesk.Application;
public class PhysicianService : IPhysicianService
{
    private readonly IPhysicianRepository _physicianRepository;
    private readonly IMessageService _messageService;
    public PhysicianService(IPhysicianRepository physicianRepository, IMessageService messageService)
    {
        _physicianRepository = physicianRepository;
        _messageService = messageService;
    }

}
