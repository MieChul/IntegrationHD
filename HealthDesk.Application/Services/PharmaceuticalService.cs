using HealthDesk.Core;
using HealthDesk.Infrastructure;
using MongoDB.Bson.Serialization;

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

    public async Task SaveBrandLibraryAsync(string pharmaceuticalId, List<BrandLibraryDto> dtos)
    {
        var pharmaceutical = await GetPharmaceuticalByIdAsync(pharmaceuticalId);
        foreach (var dto in dtos)
        {
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
        var pharmaceutical = await _pharmaceuticalRepository.GetByDynamicPropertyAsync("UserId", pharmaceuticalId);
        if (pharmaceutical == null)
            throw new ArgumentException("Pharmaceutical not found.");

        return pharmaceutical;
    }
    
    public async Task<IEnumerable<SurveyDto>> GetSurveysAsync(string pharmaId)
    {
        var pharmaceutical = await GetPharmaceuticalByIdAsync(pharmaId);
        return pharmaceutical.Surveys.Select(s => GenericMapper.Map<Survey, SurveyDto>(s));
    }

    public async Task<SurveyDto> GetSurveyByIdAsync(string pharmaId, string surveyId)
    {
        var pharmaceutical = await GetPharmaceuticalByIdAsync(pharmaId);
        var survey = pharmaceutical.Surveys.FirstOrDefault(s => s.Id == surveyId);

        if (survey == null)
            throw new ArgumentException($"Survey with ID '{surveyId}' not found for Pharmaceutical '{pharmaId}'.");

        var surveyDto = new SurveyDto
        {
            Id = survey.Id,
            Name = survey.Name,
            Author = survey.Author,
            Date = survey.Date,
            IsActive = survey.IsActive,
            HeaderImageUrl = survey.HeaderImageUrl,
            Title = survey.Title,
            Description = survey.Description,
            SharedWith = survey.SharedWith,
            Questions = survey.Questions.Select(q => new QuestionDto
            {
                Id = q.Id,
                Text = q.Text,
                Description = q.Description,
                Type = q.Type,
                Required = q.Required,
                NumbersOnly = q.NumbersOnly,
                MinDate = q.MinDate,
                MaxDate = q.MaxDate,
                Options = q.Options.Select(o => new QuestionOptionDto { Text = o.Text }).ToList()
            }).ToList(),
            Responses = survey.Responses.Select(r => new SurveyResponseDto
            {
                UserDetails = r.UserDetails,
                UserId = r.UserId,
                SubmittedAt = r.SubmittedAt,
                ResponsesData = BsonSerializer.Deserialize<Dictionary<string, object>>(r.ResponsesData)
            }).ToList()
        };

        return surveyDto;
    }


    public async Task<string> AddOrUpdateSurveyAsync(string pharmaId, SurveyDto dto)
    {
        var pharmaceutical = await GetPharmaceuticalByIdAsync(pharmaId);
        Survey? survey;

        if (string.IsNullOrEmpty(dto.Id))
        {
            survey = new Survey
            {
                Date = DateTime.UtcNow,
                IsActive = dto.IsActive,
                Author = dto.Author
            };
            GenericMapper.Map(dto, survey);
            pharmaceutical.Surveys.Add(survey);
        }
        else
        {
            // Update existing survey
            survey = pharmaceutical.Surveys.FirstOrDefault(s => s.Id == dto.Id);
            if (survey == null)
                throw new ArgumentException($"Survey with ID '{dto.Id}' not found for Pharmaceutical '{pharmaId}'.");

            var existingResponses = survey.Responses;
            var existingDate = survey.Date;

            GenericMapper.Map(dto, survey);

            survey.Responses = existingResponses;
            survey.Date = existingDate;
        }


        survey.Questions.Clear();
        foreach (var qDto in dto.Questions)
        {
            var question = new Question { Id = qDto.Id };
            GenericMapper.Map(qDto, question);

            question.Options.Clear();
            foreach (var optDto in qDto.Options)
            {
                var option = new QuestionOption();
                GenericMapper.Map(optDto, option);
                question.Options.Add(option);
            }
            survey.Questions.Add(question);
        }

        await _pharmaceuticalRepository.UpdateAsync(pharmaceutical);
        return survey.Id;
    }

    public async Task UpdateSurveyHeaderUrlAsync(string pharmaId, string surveyId, string headerUrl)
    {
        var pharmaceutical = await GetPharmaceuticalByIdAsync(pharmaId);
        var survey = pharmaceutical.Surveys.FirstOrDefault(s => s.Id == surveyId);

        if (survey == null)
        {
            throw new ArgumentException($"Survey with ID '{surveyId}' not found for update.");
        }

        survey.HeaderImageUrl = headerUrl;
        await _pharmaceuticalRepository.UpdateAsync(pharmaceutical);
    }

    public async Task DeleteSurveyAsync(string pharmaId, string surveyId)
    {
        var pharmaceutical = await GetPharmaceuticalByIdAsync(pharmaId);
        var initialCount = pharmaceutical.Surveys.Count;
        pharmaceutical.Surveys.RemoveAll(s => s.Id == surveyId);

        if (pharmaceutical.Surveys.Count == initialCount)
        {
            throw new ArgumentException($"Survey with ID '{surveyId}' not found for Pharmaceutical '{pharmaId}'.");
        }
        await _pharmaceuticalRepository.UpdateAsync(pharmaceutical);
    }

    public async Task<List<string>> GetSharedWithAsync(string pharmaId, string surveyId)
    {
        var pharmaceutical = await GetPharmaceuticalByIdAsync(pharmaId);
        var survey = pharmaceutical.Surveys.FirstOrDefault(s => s.Id == surveyId);

        if (survey == null)
            throw new ArgumentException($"Survey with ID '{surveyId}' not found.");

        return survey.SharedWith;
    }

    public async Task AddSharedWithAsync(string pharmaId, string surveyId, List<string> sharedWith)
    {
        var pharmaceutical = await GetPharmaceuticalByIdAsync(pharmaId);
        var survey = pharmaceutical.Surveys.FirstOrDefault(s => s.Id == surveyId);

        if (survey == null)
            throw new ArgumentException($"Survey with ID '{surveyId}' not found.");

        survey.SharedWith = sharedWith ?? new List<string>(); // Ensure it's not null
        await _pharmaceuticalRepository.UpdateAsync(pharmaceutical);
    }

    public async Task AddSurveyResponseAsync(string pharmaId, string surveyId, SurveyResponseDto responseDto)
    {
        var pharmaceutical = await GetPharmaceuticalByIdAsync(pharmaId); // Fetch pharmaceutical to update its embedded survey
        var survey = pharmaceutical.Surveys.FirstOrDefault(s => s.Id == surveyId);

        if (survey == null)
            throw new ArgumentException($"Survey with ID '{surveyId}' not found.");


        if (survey.Responses == null)
        {
            survey.Responses = new List<SurveyResponse>();
        }

        var newResponse = new SurveyResponse();
        GenericMapper.Map(responseDto, newResponse);
        newResponse.SubmittedAt = DateTime.UtcNow;

        survey.Responses.Add(newResponse);
        await _pharmaceuticalRepository.UpdateAsync(pharmaceutical);
    }
}