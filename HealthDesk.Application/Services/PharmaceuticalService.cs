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
    public async Task<IEnumerable<SurveyDto>> GetSurveysAsync(string pharmaId)
    {
        var pharmaceutical = await _pharmaceuticalRepository.GetByIdAsync(pharmaId);
        return pharmaceutical.Surveys.Select(s => GenericMapper.Map<Survey, SurveyDto>(s));
    }

    public async Task AddOrUpdateSurveyAsync(string pharmaId, SurveyDto dto)
    {
        var pharmaceutical = await _pharmaceuticalRepository.GetByIdAsync(pharmaId);
        var survey = pharmaceutical.Surveys.FirstOrDefault(s => s.Id == dto.Id) ?? new Survey { };

        GenericMapper.Map(dto, survey);

        if (!pharmaceutical.Surveys.Any(s => s.Id == survey.Id))
            pharmaceutical.Surveys.Add(survey);

        await _pharmaceuticalRepository.UpdateAsync(pharmaceutical);
    }

    public async Task DeleteSurveyAsync(string pharmaId, string surveyId)
    {
        var pharmaceutical = await _pharmaceuticalRepository.GetByIdAsync(pharmaId);
        pharmaceutical.Surveys.RemoveAll(s => s.Id == surveyId);
        await _pharmaceuticalRepository.UpdateAsync(pharmaceutical);
    }

    public async Task<List<string>> GetSharedWithAsync(string pharmaId, string surveyId)
    {
        var pharmaceutical = await _pharmaceuticalRepository.GetByIdAsync(pharmaId);
        var survey = pharmaceutical.Surveys.FirstOrDefault(s => s.Id == surveyId);

        if (survey == null)
            throw new ArgumentException("Survey not found.");

        return survey.SharedWith;
    }

    public async Task AddSharedWithAsync(string pharmaId, string surveyId, List<string> sharedWith)
    {
        var pharmaceutical = await _pharmaceuticalRepository.GetByIdAsync(pharmaId);
        var survey = pharmaceutical.Surveys.FirstOrDefault(s => s.Id == surveyId);

        if (survey == null)
            throw new ArgumentException("Survey not found.");

        survey.SharedWith = sharedWith;
        await _pharmaceuticalRepository.UpdateAsync(pharmaceutical);
    }
}