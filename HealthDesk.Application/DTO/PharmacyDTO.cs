
namespace HealthDesk.Application;
public class MedicineDto
{
    public string Id { get; set; }
    public string BrandOwner { get; set; }
    public string BrandName { get; set; }
    public string GenericName { get; set; }
    public string DrugClass { get; set; }
    public string DosageForm { get; set; }
    public string Strength { get; set; }
    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public string Comment { get; set; }
}
