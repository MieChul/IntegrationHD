
namespace HealthDesk.Application;
public interface ILaboratoryService
{
    Task<IEnumerable<LabTestDto>> GetAllLabTestsAsync(string id);
    Task<LabTestDto> GetLabTestByIdAsync(string id, string labTestId);
    Task SaveLabTestAsync(string id, LabTestDto dto);
    Task DeleteLabTestAsync(string id, string labTestId);
}
