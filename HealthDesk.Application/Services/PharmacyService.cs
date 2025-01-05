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

    public async Task SaveMedicineAsync(string id, MedicineDto dto)
    {
        var pharmacy = await GetPharmacyByUserIdAsync(id);

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
            var existingMedicine = pharmacy.Medicines.FirstOrDefault(m => m.BrandName == dto.BrandName);
            if (existingMedicine == null)
                throw new ArgumentException("Medicine not found.");

            GenericMapper.Map(dto, existingMedicine);
        }

        await _pharmacyRepository.UpdateAsync(pharmacy);
    }

    public async Task DeleteMedicineAsync(string id, string medicineId)
    {
        var pharmacy = await GetPharmacyByUserIdAsync(id);
        var medicineToRemove = pharmacy.Medicines.FirstOrDefault(m => m.BrandName == medicineId);

        if (medicineToRemove == null)
            throw new ArgumentException("Medicine not found.");

        pharmacy.Medicines.Remove(medicineToRemove);
        await _pharmacyRepository.UpdateAsync(pharmacy);
    }

    private async Task<Pharmacy> GetPharmacyByUserIdAsync(string id)
    {
        var pharmacy = await _pharmacyRepository.GetByIdAsync(id);
        if (pharmacy == null)
            throw new ArgumentException("Pharmacy not found.");

        return pharmacy;
    }
}