using HealthDesk.Core;
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
        // 1. Get all lab tests for a specific laboratory
    public async Task<IEnumerable<LabTestDto>> GetAllLabTestsAsync(string id)
    {
        var laboratory = await GetLaboratoryByIdAsync(id);
        return laboratory.LabTests.Select(test => GenericMapper.Map<LabTest, LabTestDto>(test));
    }

    // 2. Get a specific lab test by ID
    public async Task<LabTestDto> GetLabTestByIdAsync(string id, string labTestId)
    {
        var laboratory = await GetLaboratoryByIdAsync(id);
        var labTest = laboratory.LabTests.FirstOrDefault(test => test.Id == labTestId);

        if (labTest == null)
            throw new ArgumentException("Lab test not found.");

        return GenericMapper.Map<LabTest, LabTestDto>(labTest);
    }

    // 3. Save or update a lab test
    public async Task SaveLabTestAsync(string id, LabTestDto dto)
    {
        var laboratory = await GetLaboratoryByIdAsync(id);

        var labTest = new LabTest();
        GenericMapper.Map(dto, labTest);

        if (string.IsNullOrEmpty(dto.Id))
        {
            // Add a new lab test
            laboratory.LabTests.Add(labTest);
        }
        else
        {
            // Update an existing lab test
            var existingTest = laboratory.LabTests.FirstOrDefault(test => test.Id == dto.Id);
            if (existingTest == null)
                throw new ArgumentException("Lab test not found.");

            GenericMapper.Map(dto, existingTest);
        }

        await _laboratoryRepository.UpdateAsync(laboratory);
    }

    // 4. Delete a lab test
    public async Task DeleteLabTestAsync(string id, string labTestId)
    {
        var laboratory = await GetLaboratoryByIdAsync(id);

        var labTestToRemove = laboratory.LabTests.FirstOrDefault(test => test.Id == labTestId);
        if (labTestToRemove == null)
            throw new ArgumentException("Lab test not found.");

        laboratory.LabTests.Remove(labTestToRemove);
        await _laboratoryRepository.UpdateAsync(laboratory);
    }

    // Helper method to get laboratory by UserId
    private async Task<Laboratory> GetLaboratoryByIdAsync(string id)
    {
        var laboratory = await _laboratoryRepository.GetByIdAsync(id);
        if (laboratory == null)
            throw new ArgumentException("Laboratory not found.");

        return laboratory;
    }
}