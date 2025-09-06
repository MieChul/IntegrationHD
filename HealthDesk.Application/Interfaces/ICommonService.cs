

using HealthDesk.Core;

namespace HealthDesk.Application;

public interface ICommonService
{
    Task<IEnumerable<Comment>> GetCommentsAsync();
    Task SaveCommentAsync(CommentDto dto);
    Task DeleteCommentAsync(string id);

    Task<IEnumerable<Rating>> GetRatingsAsync();
    Task SaveRatingAsync(RatingDto dto);
    Task DeleteRatingAsync(string id);

    Task<IEnumerable<BodySystem>> GetBodySystemsAsync();
    Task<IEnumerable<DosageForm>> GetDosageFormsAsync();
    Task<IEnumerable<DrugsFrequency>> GetDrugFrequenciesAsync();
    Task<IEnumerable<Investigation>> GetInvestigationsAsync();
    Task<IEnumerable<Symptoms>> GetSymptomsAsync();
    Task<IEnumerable<Vaccine>> GetVaccinesAsync();
    Task<IEnumerable<AdministrationRoute>> GetAdministrationRoutesAsync();
    Task<IEnumerable<BrandDto>> GetBrandsAsync();
    Task<IEnumerable<Advertisement>> GetAdvertisementsAsync();
}
