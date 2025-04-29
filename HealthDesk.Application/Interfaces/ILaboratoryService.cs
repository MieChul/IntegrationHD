
namespace HealthDesk.Application;
public interface ILaboratoryService
{
    Task<IEnumerable<LabTestDto>> GetAllLabTestsAsync(string id);
    Task<LabTestDto> GetLabTestByIdAsync(string id, string labTestId);
    Task SaveLabTestAsync(string id, List<LabTestDto> dtos);
    Task DeleteLabTestAsync(string id, string labTestId);
}
