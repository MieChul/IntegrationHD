using HealthDesk.Core;
using HealthDesk.Infrastructure;

namespace HealthDesk.Application;

public class CommonService : ICommonService
{
    private readonly ICommonRepository _commonRepository;

    public CommonService(ICommonRepository commonRepository)
    {
        _commonRepository = commonRepository;
    }

    // Comments
    public async Task<IEnumerable<Comment>> GetCommentsAsync() =>
        await _commonRepository.GetAllAsync<Comment>("Comments");

    public async Task SaveCommentAsync(CommentDto dto)
    {
        var entity = new Comment
        {
            Id = string.IsNullOrEmpty(dto.Id) ? null : dto.Id,
            Text = dto.Text,
            UserId = dto.UserId,
            ItemType = dto.ItemType
        };

        if (string.IsNullOrEmpty(dto.Id))
            await _commonRepository.AddAsync("Comments", entity);
        else
            await _commonRepository.UpdateAsync("Comments", entity);
    }

    public async Task DeleteCommentAsync(string id) =>
        await _commonRepository.DeleteAsync("Comments", id);

    // Ratings
    public async Task<IEnumerable<Rating>> GetRatingsAsync() =>
        await _commonRepository.GetAllAsync<Rating>("Ratings");

    public async Task SaveRatingAsync(RatingDto dto)
    {
        var entity = new Rating
        {
            Id = string.IsNullOrEmpty(dto.Id) ? null : dto.Id,
            Score = dto.Score,
            UserId = dto.UserId,
            Role = dto.Role,
            EntityId = dto.EntityId
        };

        if (string.IsNullOrEmpty(dto.Id))
            await _commonRepository.AddAsync("Ratings", entity);
        else
            await _commonRepository.UpdateAsync("Ratings", entity);
    }

    public async Task DeleteRatingAsync(string id) =>
        await _commonRepository.DeleteAsync("Ratings", id);

    // Generic Get for simple entities
    public async Task<IEnumerable<BodySystem>> GetBodySystemsAsync() =>
        await _commonRepository.GetAllAsync<BodySystem>("BodySystem");

    public async Task<IEnumerable<DosageForm>> GetDosageFormsAsync() =>
        await _commonRepository.GetAllAsync<DosageForm>("DosageForm");

    public async Task<IEnumerable<DrugsFrequency>> GetDrugFrequenciesAsync() =>
        await _commonRepository.GetAllAsync<DrugsFrequency>("DrugsFrequency");

    public async Task<IEnumerable<Investigation>> GetInvestigationsAsync() =>
        await _commonRepository.GetAllAsync<Investigation>("Investigation");

    public async Task<IEnumerable<Symptoms>> GetSymptomsAsync() =>
        await _commonRepository.GetAllAsync<Symptoms>("Symptoms");

    public async Task<IEnumerable<Vaccine>> GetVaccinesAsync() =>
        await _commonRepository.GetAllAsync<Vaccine>("Vaccine");

    public async Task<IEnumerable<AdministrationRoute>> GetAdministrationRoutesAsync() =>
        await _commonRepository.GetAllAsync<AdministrationRoute>("AdministrationRoute");
}
