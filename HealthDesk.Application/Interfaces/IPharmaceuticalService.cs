namespace HealthDesk.Application;
public interface IPharmaceuticalService
{
    Task<IEnumerable<BrandLibraryDto>> GetAllBrandLibrariesAsync(string pharmaceuticalId);
    Task SaveBrandLibraryAsync(string pharmaceuticalId, BrandLibraryDto dto);
    Task DeleteBrandLibraryAsync(string pharmaceuticalId, string brandLibraryId);
    Task<IEnumerable<SurveyDto>> GetSurveysAsync(string pharmaId);
    Task AddOrUpdateSurveyAsync(string pharmaId, SurveyDto dto);
    Task DeleteSurveyAsync(string pharmaId, string surveyId);

    Task<List<string>> GetSharedWithAsync(string pharmaId, string surveyId);
    Task AddSharedWithAsync(string pharmaId, string surveyId, List<string> sharedWith);
}
