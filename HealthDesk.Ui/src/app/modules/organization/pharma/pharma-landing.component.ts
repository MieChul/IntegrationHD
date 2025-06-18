import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { OrganizationService } from '../../services/organization.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { FilteringService } from '../../../shared/services/filter.service';
import * as bootstrap from 'bootstrap';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pharma-landing',
  templateUrl: './pharma-landing.component.html',
  styleUrls: ['./pharma-landing.component.scss']
})
export class PharmaLandingComponent implements OnInit {
  @ViewChild('brandModal') brandModal!: ElementRef;
  @ViewChild('brandImportModal') brandImportModal!: ElementRef;

  brands: any[] = [];
  filteredBrands: any[] = [];
  brandSearchText: string = '';

  brandForm!: FormGroup;
  isEditBrand = false;
  selectedPackShotFile: File | null = null;

  drugClasses = ['Antipyretic', 'Analgesic', 'Antibiotic', 'Antacid', 'Antihypertensive'];
  dosageForms = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment'];
  approvalAgencies = ['CDSCO', 'FDA', 'EMA'];

  userData: any;
  brandFileName = '';
  importedBrands: any[] = [];
  importErrors: { row: number; errors: string[] }[] = [];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private organizationService: OrganizationService,
    private filteringService: FilteringService,
    private sortingService: SortingService
  ) { }

  ngAfterViewInit(): void {
    const tooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltips.forEach(el => new bootstrap.Tooltip(el));
  }

  ngOnInit(): void {
    this.initForm();
    this.accountService.getUserData().subscribe({
      next: data => {
        this.userData = data;
        if (data.status === 'Approved') {
          this.loadBrands();
        } else {
          // redirect to account or show a message
        }
      },
      error: err => console.error(err)
    });
  }

  initForm() {
    this.brandForm = this.fb.group({
      brandName: ['', Validators.required],
      genericName: ['', Validators.required],
      drugClass: ['', Validators.required],
      dosageForm: ['', Validators.required],
      strength: ['', Validators.required],
      packShot: [''],
      approvalAgency: ['', Validators.required],
      comment: ['']
    });
  }

  loadBrands() {
    this.organizationService.getAllBrandLibraries(this.userData.id).subscribe({
      next: (res: any) => {
        this.brands = this.sortingService.sort(res.data, 'brandName', 'asc');
        this.filteredBrands = [...this.brands];
      },
      error: err => console.error('Error loading brands', err)
    });
  }

  applyFilter() {
    if (this.brandSearchText) {
      this.filteredBrands = this.filteringService.filter(this.brands, {
        brandName: this.brandSearchText
      });
    } else {
      this.filteredBrands = [...this.brands];
    }
  }

  sortTable(col: string) {
    this.filteredBrands = this.sortingService.sort(this.filteredBrands, col, 'asc');
  }

  openBrandDialog(edit: boolean, brand?: any) {
    this.isEditBrand = edit;
    this.brandForm.reset();
    this.selectedPackShotFile = null;

    if (edit && brand) {
      this.brandForm.patchValue(brand);
    }

    const modal = new bootstrap.Modal(this.brandModal.nativeElement);
    modal.show();
  }

  onPackShotChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedPackShotFile = input.files?.[0] ?? null;
  }

  saveBrand() {
    if (this.brandForm.invalid) return;

    const payload = {
      ...this.brandForm.value,
      packShot: this.selectedPackShotFile
        ? URL.createObjectURL(this.selectedPackShotFile)
        : ''
    };
    // wrap in array to match API
    this.organizationService
      .saveBrandLibrary(this.userData.id, [payload])
      .subscribe({
        next: () => this.loadBrands(),
        error: err => console.error('Save failed', err)
      });
  }

  deleteBrand(brand: any) {
    this.organizationService
      .deleteBrandLibrary(this.userData.id, brand.brandName)
      .subscribe({
        next: () => this.loadBrands(),
        error: err => console.error('Delete failed', err)
      });
  }

  viewPackShot(url: string) {
    window.open(url, '_blank');
  }

  openBrandImportDialog(): void {
    this.brandFileName = '';
    this.importedBrands = [];
    this.importErrors = [];

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
    this.importErrors = [];
    this.importedBrands = [];

    if (!rows.length) {
      this.importErrors.push({ row: 0, errors: ['Excel is empty'] });
      return;
    }

    const expectedHeader = [
      'Brand Name', 'Generic Name', 'Drug Class', 'Dosage Form',
      'Strength', 'Pack Shot', 'Approval Agency', 'Comment'
    ];

    const header = rows[0].map(h => (h || '').toString().trim());

    if (expectedHeader.some((h, i) => h !== header[i])) {
      this.importErrors.push({
        row: 0,
        errors: [`Header must be exactly: ${expectedHeader.join(', ')}`]
      });
      return;
    }

    rows.slice(1).forEach((row, idx) => {
      const rowNum = idx + 2;
      const brand = {
        brandName: row[0]?.toString().trim(),
        genericName: row[1]?.toString().trim(),
        drugClass: row[2]?.toString().trim(),
        dosageForm: row[3]?.toString().trim(),
        strength: row[4]?.toString().trim(),
        packShot: row[5]?.toString().trim(),
        approvalAgency: row[6]?.toString().trim(),
        comment: row[7]?.toString().trim() || ''
      };

      const errors: string[] = [];

      if (!brand.brandName) errors.push('brandName is required');
      if (!brand.genericName) errors.push('genericName is required');
      if (!brand.drugClass) errors.push('drugClass is required');
      if (!brand.dosageForm) errors.push('dosageForm is required');
      if (!brand.strength) errors.push('strength is required');
      if (!brand.approvalAgency) errors.push('approvalAgency is required');

      if (errors.length) {
        this.importErrors.push({ row: rowNum, errors });
      } else {
        this.importedBrands.push(brand);
      }
    });
  }

  submitBrandImport(): void {
    if (!this.userData?.id || this.importErrors.length || !this.importedBrands.length) return;

    this.organizationService.saveBrandLibrary(this.userData.id, this.importedBrands)
      .subscribe({
        next: () => {
          this.loadBrands();
          bootstrap.Modal.getInstance(this.brandImportModal.nativeElement)?.hide();
        },
        error: (err) => console.error('Import failed', err)
      });
  }
  downloadBrandTemplate(): void {
    const link = document.createElement('a');
    link.href = 'assets/documents/import/brand_template.xlsx';
    link.download = 'brand_template.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
