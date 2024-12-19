import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface Brand {
  brandOwner: string;
  brandName: string;
  genericName: string;
  drugClass: string;
  dosageForm: string;
  strength: string;
  price: number;
  discount: number;
  comment: string;
}

@Component({
  selector: 'app-pharmacy-landing.component',
  templateUrl: './pharmacy-landing.component.html',
  styleUrl: './pharmacy-landing.component.scss'
})
export class PharmacyLandingComponent implements OnInit, AfterViewInit{
  @ViewChild('brandModal') brandModal!: any;

  brands: Brand[] = [];
  filteredBrands: Brand[] = [];
  brandSearchText: string = '';
  isOtherProductBrand: boolean = false;
  brandForm!: FormGroup;
  brandModalRef!: NgbModalRef;
  isEditBrand: boolean = false;
  brandNames: string[] = []; // Populated from brands array
  brandOwners: string[] = ['Cipla', 'Sun Pharma', 'Dr. Reddy\'s', 'Lupin', 'Aurobindo Pharma'];
  drugClasses: string[] = ['Antipyretic', 'Analgesic', 'Antibiotic', 'Antacid', 'Antihypertensive'];
  dosageForms: string[] = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment'];
  approvalAgencies: string[] = ['CDSCO', 'FDA', 'EMA'];

    // Pack Shot file
    selectedPackShotFile: File | null = null;

    constructor(private fb: FormBuilder, private modalService: NgbModal) {}

    ngOnInit(): void {
      this.initForms();
      this.loadInitialData();
    }

    
  ngAfterViewInit(): void {
    this.filterBrands();
  }

  initForms(): void {
    this.brandForm = this.fb.group({
      brandOwner: [''],
      brandName: [''],
      genericName: [''],
      drugClass: [''],
      dosageForm: [''],
      strength: [''],
      price: [''],
      discount: [''],
      comment: ['']
    });
  }

  loadInitialData(): void {
    // Populate brands with dummy data
    this.brands = [
      {
        brandOwner: 'Cipla',
        brandName: 'Cipmol Paracetamol',
        genericName: 'Paracetamol',
        drugClass: 'Antipyretic',
        dosageForm: 'Tablet',
        strength: '500 mg',
        price: 20,
        discount: 5,
        comment: 'Commonly used for fever'
      },
      {
        brandOwner: 'Sun Pharma',
        brandName: 'Volini Gel',
        genericName: 'Diclofenac',
        drugClass: 'Analgesic',
        dosageForm: 'Ointment',
        strength: '1% w/w',
        price: 100,
        discount: 10,
        comment: 'Topical pain relief'
      },
      {
        brandOwner: 'Dr. Reddy\'s',
        brandName: 'Omez',
        genericName: 'Omeprazole',
        drugClass: 'Antacid',
        dosageForm: 'Capsule',
        strength: '20 mg',
        price: 50,
        discount: 8,
        comment: 'Used for acidity'
      },
      {
        brandOwner: 'Lupin',
        brandName: 'Hypertensionex',
        genericName: 'Amlodipine',
        drugClass: 'Antihypertensive',
        dosageForm: 'Tablet',
        strength: '5 mg',
        price: 30,
        discount: 7,
        comment: 'Controls high blood pressure'
      },
      {
        brandOwner: 'Aurobindo Pharma',
        brandName: 'Azithrocin',
        genericName: 'Azithromycin',
        drugClass: 'Antibiotic',
        dosageForm: 'Tablet',
        strength: '500 mg',
        price: 120,
        discount: 12,
        comment: 'Antibiotic for infections'
      },
      {
        brandOwner: 'Cipla',
        brandName: 'Cetrizine',
        genericName: 'Cetirizine',
        drugClass: 'Antihistamine',
        dosageForm: 'Tablet',
        strength: '10 mg',
        price: 15,
        discount: 5,
        comment: 'Used for allergies'
      }
    ];

    this.filterBrands();
    // Update brandNames array based on brands
  }


  onPackShotChange(event: any): void {
    this.selectedPackShotFile = event.target.files[0];
  }
  viewPackShot(packShotUrl: string): void {
    window.open(packShotUrl, '_blank');
  }

  openBrandDialog(brand?: Brand): void {
    this.isEditBrand = !!brand;
    this.brandForm.reset();

    if (brand) {
      this.brandForm.patchValue(brand);
    }

    const modal = new Modal(this.brandModal.nativeElement);
    modal.show();
  }

  closeBrandDialog(): void {
    // const modal = new Modal(this.brandModal.nativeElement);
    // if (modal) {
    //   modal.hide();
    // }
  }

  saveBrand(): void {
    const formValues = this.brandForm.value;

    const brand: Brand = {
      brandOwner: formValues.brandOwner,
      brandName: formValues.brandName,
      genericName: formValues.genericName,
      drugClass: formValues.drugClass,
      dosageForm: formValues.dosageForm,
      strength: formValues.strength,
      price: formValues.price,
      discount: formValues.discount,
      comment: formValues.comment
    };

    if (this.isEditBrand) {
      const index = this.brands.findIndex(
        b => b.brandName === brand.brandName
      );
      if (index !== -1) {
        this.brands[index] = brand;
      }
    } else {
      this.brands.push(brand);
    }
    this.filterBrands();
  }

  deleteBrand(brand: Brand): void {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.brands = this.brands.filter(b => b !== brand);
      this.filterBrands();
    }
  }

  filterBrands(): void {
    if (this.brandSearchText) {
      this.filteredBrands = this.brands.filter(b =>
        b.brandName
          .toLowerCase()
          .includes(this.brandSearchText.toLowerCase())
      );
    } else {
      this.filteredBrands = [...this.brands];
    }
  }

  sortBrandTable(column: keyof Brand): void {
    // Implement sorting logic for brands
    this.filteredBrands.sort((a, b) =>
      a[column] > b[column] ? 1 : -1
    );
  }

  exportToExcel(): void {
    // Define the headers matching the HTML table
    const headers = [
      'Brand Owner',
      'Brand Name',
      'Generic Name',
      'Drug Class',
      'Dosage Form',
      'Strength',
      'Price',
      '% Discount',
      'Comment'
    ];
  
    // Map the data to include headers
    const dataToExport = this.filteredBrands.map(brand => ({
      'Brand Owner': brand.brandOwner,
      'Brand Name': brand.brandName,
      'Generic Name': brand.genericName,
      'Drug Class': brand.drugClass,
      'Dosage Form': brand.dosageForm,
      'Strength': brand.strength,
      'Price': brand.price,
      '% Discount': brand.discount,
      'Comment': brand.comment
    }));
  
    // Add headers as the first row
    const worksheet = XLSX.utils.json_to_sheet(dataToExport, { header: headers });
  
    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pharmacy Brands');
  
    // Write workbook to an Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the file
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `Pharmacy_Brands_${new Date().toISOString()}.xlsx`);
  }  
}
