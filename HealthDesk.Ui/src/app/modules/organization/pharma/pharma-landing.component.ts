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

interface Product {
  brandName: string;
  genericName: string;
  drugClass: string;
  dosageForm: string;
  strength: string;
  packShot: string;
  approvalAgency: string;
  comment: string;
}
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
  selector: 'app-pharma',
  templateUrl: './pharma-landing.component.html',
  styleUrls: ['./pharma-landing.component.scss']
})
export class PharmaLandingComponent implements OnInit, AfterViewInit {
  @ViewChild('productModal') productModal!: any;

  selectedTab: string = 'productList';

  // Data arrays
  products: Product[] = [];

  // Filtered arrays for display
  filteredProducts: Product[] = [];


  // Search texts
  productSearchText: string = '';

  // Forms
  productForm!: FormGroup;

  // Modal references
  productModalRef!: NgbModalRef;


  // Flags
  isEditProduct: boolean = false;

  isOtherProductBrand: boolean = false;

  // Dropdown options
  brands: Brand[] = [];
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
    this.filterProducts();
  }

  initForms(): void {
    this.productForm = this.fb.group({
      brandName: [''],
      otherBrandName: [''],
      genericName: [''],
      drugClass: [''],
      dosageForm: [''],
      strength: [''],
      packShot: [''],
      approvalAgency: [''],
      comment: ['']
    });
  }

  loadInitialData(): void {
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
    // Populate products with some dummy data
    this.products = [
      {
        brandName: 'Cipmol Paracetamol',
        genericName: 'Paracetamol',
        drugClass: 'Antipyretic',
        dosageForm: 'Tablet',
        strength: '500 mg',
        packShot: '',
        approvalAgency: 'CDSCO',
        comment: 'Effective for fever'
      },
      {
        brandName: 'Volini Gel',
        genericName: 'Diclofenac',
        drugClass: 'Analgesic',
        dosageForm: 'Ointment',
        strength: '1% w/w',
        packShot: '',
        approvalAgency: 'CDSCO',
        comment: 'Quick relief from pain'
      },
      {
        brandName: 'Omez',
        genericName: 'Omeprazole',
        drugClass: 'Antacid',
        dosageForm: 'Capsule',
        strength: '20 mg',
        packShot: '',
        approvalAgency: 'CDSCO',
        comment: 'Reduces stomach acid'
      }
    ];

    // Filter the data to initialize filtered arrays
    this.filterProducts();
  }


  openProductDialog(product?: Product): void {
    this.isEditProduct = !!product;
    this.isOtherProductBrand = false;
    this.productForm.reset();
    this.selectedPackShotFile = null;

    if (product) {
      this.productForm.patchValue(product);
      if (!this.brandNames.includes(product.brandName)) {
        this.isOtherProductBrand = true;
        this.productForm.patchValue({
          brandName: 'Other',
          otherBrandName: product.brandName
        });
      }
    }

    const modal = new Modal(this.productModal.nativeElement);
    modal.show();
    
  }

  closeProductDialog(): void {
    const modal = Modal.getInstance(this.productModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }

  onProductBrandNameChange(): void {
    const selectedBrand = this.productForm.get('brandName')!.value;
    this.isOtherProductBrand = selectedBrand === 'Other';

    if (!this.isOtherProductBrand && selectedBrand) {
      // Auto-populate fields from Brand Details
      const brandDetails = this.brands.find(
        brand => brand.brandName === selectedBrand
      );
      if (brandDetails) {
        this.productForm.patchValue({
          genericName: brandDetails.genericName,
          drugClass: brandDetails.drugClass,
          dosageForm: brandDetails.dosageForm,
          strength: brandDetails.strength
        });
      }
    } else {
      this.productForm.patchValue({
        genericName: '',
        drugClass: '',
        dosageForm: '',
        strength: ''
      });
    }
  }

  onPackShotChange(event: any): void {
    this.selectedPackShotFile = event.target.files[0];
  }

  saveProduct(): void {
    const formValues = this.productForm.value;
    const brandName = this.isOtherProductBrand
      ? formValues.otherBrandName
      : formValues.brandName;

    const product: Product = {
      brandName: brandName,
      genericName: formValues.genericName,
      drugClass: formValues.drugClass,
      dosageForm: formValues.dosageForm,
      strength: formValues.strength,
      packShot: this.selectedPackShotFile
        ? URL.createObjectURL(this.selectedPackShotFile)
        : '',
      approvalAgency: formValues.approvalAgency,
      comment: formValues.comment
    };

    if (this.isEditProduct) {
      const index = this.products.findIndex(
        p => p.brandName === product.brandName
      );
      if (index !== -1) {
        this.products[index] = product;
      }
    } else {
      this.products.push(product);

      if (
        this.isOtherProductBrand &&
        !this.brandNames.includes(product.brandName)
      ) {
        this.brandNames.push(product.brandName);
      }
    }

    this.filterProducts();
    this.closeProductDialog();
  }

  deleteProduct(product: Product): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products = this.products.filter(p => p !== product);
      this.filterProducts();
    }
  }

  filterProducts(): void {
    if (this.productSearchText) {
      this.filteredProducts = this.products.filter(p =>
        p.brandName
          .toLowerCase()
          .includes(this.productSearchText.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.products];
    }
  }

  viewPackShot(packShotUrl: string): void {
    window.open(packShotUrl, '_blank');
  }

  sortProductTable(column: keyof Product): void {
    //Implement sorting logic for products
    this.filteredProducts.sort((a, b) =>
      a[column] > b[column] ? 1 : -1
    );
  }

  exportToExcel(): void {
    // Define the headers matching the HTML table
    const headers = [
      'Brand Name',
      'Generic Name',
      'Drug Class',
      'Dosage Form',
      'Strength',
      'Pack Shot',
      'Approval Agency',
      'Comment'
    ];
  
    // Map the data to include headers
    const dataToExport = this.filteredProducts.map(product => ({
      'Brand Name': product.brandName,
      'Generic Name': product.genericName,
      'Drug Class': product.drugClass,
      'Dosage Form': product.dosageForm,
      'Strength': product.strength,
      'Pack Shot': product.packShot ? 'View Available' : 'Not Available',
      'Approval Agency': product.approvalAgency,
      'Comment': product.comment
    }));
  
    // Add headers as the first row
    const worksheet = XLSX.utils.json_to_sheet(dataToExport, { header: headers });
  
    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Brand Library');
  
    // Write workbook to an Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the file
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `Brand_Library_${new Date().toISOString()}.xlsx`);
  }  
}
