using HealthDesk.Infrastructure;

namespace HealthDesk.Application;

public class PatientService : IPatientService
{

    private readonly IPatientRepository _patientRepository;
    private readonly IMessageService _messageService;
    public PatientService(IPatientRepository patientRepository, IMessageService messageService)
    {
        _patientRepository = patientRepository;
        _messageService = messageService;
    }
}
