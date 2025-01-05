namespace HealthDesk.Application;
public interface IPharmaceuticalService
{
    Task<IEnumerable<BrandLibraryDto>> GetAllBrandLibrariesAsync(string pharmaceuticalId);
    Task SaveBrandLibraryAsync(string pharmaceuticalId, BrandLibraryDto dto);
    Task DeleteBrandLibraryAsync(string pharmaceuticalId, string brandLibraryId);

}
