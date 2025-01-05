
namespace HealthDesk.Application;
public interface IPharmacyService
{
    // Medicine Management within Pharmacy
    Task<IEnumerable<MedicineDto>> GetAllMedicinesAsync(string id);
    Task<MedicineDto> GetMedicineByIdAsync(string id, string medicineId);
    Task SaveMedicineAsync(string id, MedicineDto dto);
    Task DeleteMedicineAsync(string id, string medicineId);
}
