using HealthDesk.Core;
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

   public async Task<IEnumerable<BrandLibraryDto>> GetAllBrandLibrariesAsync(string pharmaceuticalId)
    {
        var pharmaceutical = await GetPharmaceuticalByIdAsync(pharmaceuticalId);
        return pharmaceutical.BrandLibrary.Select(bl => GenericMapper.Map<BrandLibrary, BrandLibraryDto>(bl));
    }

    public async Task SaveBrandLibraryAsync(string pharmaceuticalId, BrandLibraryDto dto)
    {
        var pharmaceutical = await GetPharmaceuticalByIdAsync(pharmaceuticalId);

        var brandLibrary = new BrandLibrary();
        GenericMapper.Map(dto, brandLibrary);

        if (string.IsNullOrEmpty(dto.Id))
        {
            // Add new BrandLibrary
            pharmaceutical.BrandLibrary.Add(brandLibrary);
        }
        else
        {
            // Update existing BrandLibrary
            var existing = pharmaceutical.BrandLibrary.FirstOrDefault(bl => bl.Id == dto.Id);
            if (existing == null)
                throw new ArgumentException("BrandLibrary not found.");

            GenericMapper.Map(dto, existing);
        }

        await _pharmaceuticalRepository.UpdateAsync(pharmaceutical);
    }

    public async Task DeleteBrandLibraryAsync(string pharmaceuticalId, string brandLibraryId)
    {
        var pharmaceutical = await GetPharmaceuticalByIdAsync(pharmaceuticalId);

        var brandLibraryToRemove = pharmaceutical.BrandLibrary.FirstOrDefault(bl => bl.Id == brandLibraryId);
        if (brandLibraryToRemove == null)
            throw new ArgumentException("BrandLibrary not found.");

        pharmaceutical.BrandLibrary.Remove(brandLibraryToRemove);
        await _pharmaceuticalRepository.UpdateAsync(pharmaceutical);
    }

    private async Task<Pharmaceutical> GetPharmaceuticalByIdAsync(string pharmaceuticalId)
    {
        var pharmaceutical = await _pharmaceuticalRepository.GetByIdAsync(pharmaceuticalId);
        if (pharmaceutical == null)
            throw new ArgumentException("Pharmaceutical not found.");

        return pharmaceutical;
    }
}