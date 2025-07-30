using HealthDesk.Core;
using HealthDesk.Infrastructure;

namespace HealthDesk.Application;

public class PharmacyService : IPharmacyService
{

    private readonly IPharmacyRepository _pharmacyRepository;
    private readonly IMessageService _messageService;
    public PharmacyService(IPharmacyRepository pharmacyRepository, IMessageService messageService)
    {
        _pharmacyRepository = pharmacyRepository;
        _messageService = messageService;
    }
    public async Task<IEnumerable<MedicineDto>> GetAllMedicinesAsync(string id)
    {
        var pharmacy = await GetPharmacyByUserIdAsync(id);
        return pharmacy.Medicines.Select(med => GenericMapper.Map<Medicine, MedicineDto>(med));
    }

    public async Task<MedicineDto> GetMedicineByIdAsync(string id, string medicineId)
    {
        var pharmacy = await GetPharmacyByUserIdAsync(id);
        var medicine = pharmacy.Medicines.FirstOrDefault(m => m.BrandName == medicineId);

        if (medicine == null)
            throw new ArgumentException("Medicine not found.");

        return GenericMapper.Map<Medicine, MedicineDto>(medicine);
    }

    public async Task SaveMedicineAsync(string id, List<MedicineDto> dtos)
    {
        var pharmacy = await GetPharmacyByUserIdAsync(id);
foreach(var dto in dtos)
{
 var medicine = new Medicine();
        GenericMapper.Map(dto, medicine);

        if (string.IsNullOrEmpty(dto.Id))
        {
            // Adding a new medicine
            pharmacy.Medicines.Add(medicine);
        }
        else
        {
            // Updating an existing medicine
            var existingMedicine = pharmacy.Medicines.FirstOrDefault(m => m.Id == dto.Id);
            if (existingMedicine == null)
                throw new ArgumentException("Medicine not found.");

            GenericMapper.Map(dto, existingMedicine);
        }

        await _pharmacyRepository.UpdateAsync(pharmacy);
}
       
    }

    public async Task DeleteMedicineAsync(string id, string medicineId)
    {
        var pharmacy = await GetPharmacyByUserIdAsync(id);
        RemoveIfNotExpired(pharmacy.Medicines, h => h.Id == medicineId);
        await _pharmacyRepository.UpdateAsync(pharmacy);
    }

    private async Task<Pharmacy> GetPharmacyByUserIdAsync(string id)
    {
        var pharmacy = await _pharmacyRepository.GetByDynamicPropertyAsync("UserId", id);
        if (pharmacy == null)
            throw new ArgumentException("Pharmacy not found.");

        return pharmacy;
    }

    private void RemoveIfNotExpired<T>(List<T> items, Func<T, bool> predicate) where T : class
    {
        var currentTime = DateTime.UtcNow;
        var toRemove = items
            .Where(item => predicate(item) &&
                           (item.GetType().GetProperty("CreateDate")?.GetValue(item) is DateTime createDate) &&
                           (currentTime - createDate).TotalHours <= 1)
            .ToList();

        if (toRemove.Any())
        {
            items.RemoveAll(i => toRemove.Contains(i));
        }
        else
        {
            throw new InvalidOperationException("Upon confirmation, data can be deleted only by Admin.");
        }
    }
}