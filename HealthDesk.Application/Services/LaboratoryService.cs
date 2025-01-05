using HealthDesk.Infrastructure;

namespace HealthDesk.Application;

public class LaboratoryService : ILaboratoryService
{

    private readonly ILaboratoryRepository _laboratoryRepository;
    private readonly IMessageService _messageService;
    public LaboratoryService(ILaboratoryRepository laboratoryRepository, IMessageService messageService)
    {
        _laboratoryRepository = laboratoryRepository;
        _messageService = messageService;
    }
}
