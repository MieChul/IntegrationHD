namespace HealthDesk.Application;

public interface IPharmaceuticalService
{
    Task<IEnumerable<BrandLibraryDto>> GetAllBrandLibrariesAsync(string pharmaceuticalId);
    Task SaveBrandLibraryAsync(string pharmaceuticalId, List<BrandLibraryDto> dtos);
    Task DeleteBrandLibraryAsync(string pharmaceuticalId, string brandLibraryId);
    Task<IEnumerable<SurveyDto>> GetSurveysAsync(string pharmaId);
    Task<SurveyDto> GetSurveyByIdAsync(string pharmaId, string surveyId);
    Task<string> AddOrUpdateSurveyAsync(string pharmaId, SurveyDto dto);
    Task UpdateSurveyHeaderUrlAsync(string pharmaId, string surveyId, string headerUrl);
    Task DeleteSurveyAsync(string pharmaId, string surveyId);
    Task<List<string>> GetSharedWithAsync(string pharmaId, string surveyId);
    Task AddSharedWithAsync(string pharmaId, string surveyId, List<string> sharedWith);
    Task AddSurveyResponseAsync(string pharmaId, string surveyId, SurveyResponseDto responseDto);
}
