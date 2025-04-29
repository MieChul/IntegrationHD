import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { OrganizationService } from '../../services/organization.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { FilteringService } from '../../../shared/services/filter.service';
import * as bootstrap from 'bootstrap';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-pharmacy-landing',
  templateUrl: './pharmacy-landing.component.html',
  styleUrls: ['./pharmacy-landing.component.scss']
})
export class PharmacyLandingComponent implements OnInit {
  @ViewChild('brandImportModal') brandImportModal!: ElementRef;
  brands: any[] = [];
  filteredBrands: any[] = [];
  brandSearchText: string = '';
  brandForm!: FormGroup;
  brandModalRef!: NgbModalRef;
  isEditBrand: boolean = false;
  brandOwners: string[] = ['Cipla', 'Sun Pharma', 'Dr. Reddy\'s', 'Lupin', 'Aurobindo Pharma'];
  drugClasses: string[] = ['Antipyretic', 'Analgesic', 'Antibiotic', 'Antacid', 'Antihypertensive'];
  dosageForms: string[] = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment'];
  userData: any;
  brandImportErrors: { row: number; errors: string[] }[] = [];
  importedBrands: any[] = [];
  brandFileName = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private accountService: AccountService,
    private organizationService: OrganizationService,
    private filteringService: FilteringService,
    private sortingService: SortingService
  ) { }

  ngOnInit(): void {
    this.initForms();
    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        if (this.userData.status === 'Approved') {

          this.loadBrands();
        } else {
          this.router.navigate(['/account']);
        }
      },
      error: (err) => console.error(err)
    });
  }

  initForms(): void {
    this.brandForm = this.fb.group({
      brandOwner: ['', Validators.required],
      brandName: ['', Validators.required],
      genericName: ['', Validators.required],
      drugClass: ['', Validators.required],
      dosageForm: ['', Validators.required],
      strength: ['', Validators.required],
      price: [null, Validators.required],
      discount: [null, Validators.required],
      comment: ['']
    });
  }

  loadBrands(): void {
    this.organizationService.getAllMedicines(this.userData.id).subscribe({
      next: (response: any) => {
        // Assume API response structure: { data: Brand[] }
        this.brands = response.data;
        // Apply sorting if needed; here we sort by brandName ascending.
        this.brands = this.sortingService.sort(this.brands, 'brandName', 'asc');
        this.filteredBrands = [...this.brands];
      },
      error: (error) => {
        console.error('Error fetching pharmacy brands', error);
      }
    });
  }

  applyFilter(): void {
    if (this.brandSearchText) {
      // Using FilteringService to filter by brandName
      this.filteredBrands = this.filteringService.filter(this.brands, { brandName: this.brandSearchText });
    } else {
      this.filteredBrands = [...this.brands];
    }
  }

  sortTable(column: string): void {
    this.filteredBrands = this.sortingService.sort(this.filteredBrands, column, 'asc');
  }

  openBrandDialog(isEditMod: boolean, brand?: any): void {
    this.isEditBrand = isEditMod;

    if (this.isEditBrand) {
      this.brandForm.patchValue(brand);
    }
    else {
      this.brandForm.reset();
    }
    const modal = new bootstrap.Modal(document.getElementById('brandModal')!);
    modal.show();
  }


  saveBrand(): void {
    if (this.brandForm.invalid) return;
    this.organizationService.saveMedicine(this.userData.id, [this.brandForm.value]).subscribe({
      next: (response: any) => {
        this.loadBrands();
      },
      error: (error) => console.error('Error updating brand:', error)
    });
  }

  deleteBrand(brand: any): void {
    this.organizationService.deleteMedicine(this.userData.id, brand.brandName).subscribe({
      next: (response: any) => {
        this.loadBrands();
      },
      error: (error) => console.error('Error deleting brand:', error)
    });
  }

  openBrandImportDialog(): void {
    this.brandImportErrors = [];
    this.importedBrands = [];
    this.brandFileName = '';
  
    const modal = new bootstrap.Modal(this.brandImportModal.nativeElement);
    modal.show();
  }

  onBrandFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    
    const file = input.files[0];
    this.brandFileName = file.name;
  
    const reader = new FileReader();
    reader.onload = () => {
      const wb = XLSX.read(reader.result as ArrayBuffer, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      this.processBrandRows(rows);
    };
    reader.readAsArrayBuffer(file);
  }

  private processBrandRows(rows: any[][]): void {
    this.brandImportErrors = [];
    this.importedBrands = [];
  
    if (!rows.length) {
      this.brandImportErrors.push({ row: 0, errors: ['Excel is empty'] });
      return;
    }
  
    const header = rows[0].map(h => (h || '').toString().trim());
    const expectedHeader = [
      'Brand Owner', 'Brand Name', 'Generic Name', 
      'Drug Class', 'Dosage Form', 'Strength', 
      'Price', 'Discount', 'Comment'
    ];
  
    if (expectedHeader.some((h, i) => h !== header[i])) {
      this.brandImportErrors.push({
        row: 0,
        errors: [`Header must match exactly: ${expectedHeader.join(', ')}`]
      });
      return;
    }
  
    rows.slice(1).forEach((row, idx) => {
      const rowNum = idx + 2;
      const brand = {
        brandOwner: row[0]?.toString().trim(),
        brandName: row[1]?.toString().trim(),
        genericName: row[2]?.toString().trim(),
        drugClass: row[3]?.toString().trim(),
        dosageForm: row[4]?.toString().trim(),
        strength: row[5]?.toString().trim(),
        price: Number(row[6]),
        discount: Number(row[7]),
        comment: row[8]?.toString().trim() || ''
      };
  
      const errors: string[] = [];
  
      if (!brand.brandOwner) errors.push('brandOwner is required');
      if (!brand.brandName) errors.push('brandName is required');
      if (!brand.genericName) errors.push('genericName is required');
      if (!brand.drugClass) errors.push('drugClass is required');
      if (!brand.dosageForm) errors.push('dosageForm is required');
      if (!brand.strength) errors.push('strength is required');
      if (isNaN(brand.price)) errors.push('price must be a number');
      if (isNaN(brand.discount)) errors.push('discount must be a number');
  
      if (errors.length) {
        this.brandImportErrors.push({ row: rowNum, errors });
      } else {
        this.importedBrands.push(brand);
      }
    });
  }

  submitBrandImport(): void {
    if (!this.userData?.id || this.brandImportErrors.length || !this.importedBrands.length) return;
  
    this.organizationService.saveMedicine(this.userData.id, this.importedBrands)
      .subscribe({
        next: () => {
          this.loadBrands();
          bootstrap.Modal.getInstance(this.brandImportModal.nativeElement)?.hide();
        },
        error: (error) => console.error('Error importing brands:', error)
      });
  }
  
  
}
