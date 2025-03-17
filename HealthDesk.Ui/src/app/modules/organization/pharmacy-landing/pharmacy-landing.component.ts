import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { OrganizationService } from '../../services/organization.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { FilteringService } from '../../../shared/services/filter.service';


@Component({
  selector: 'app-pharmacy-landing',
  templateUrl: './pharmacy-landing.component.html',
  styleUrls: ['./pharmacy-landing.component.scss']
})
export class PharmacyLandingComponent implements OnInit {
  @ViewChild('brandModal') brandModal: any;

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
    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        if (this.userData.status === 'Approved') {
          this.initForms();
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
    this.brandModalRef = this.modalService.open(this.brandModal, { centered: true, backdrop: 'static' });
  }


  saveBrand(): void {
    if (this.brandForm.invalid) return;
    this.organizationService.saveMedicine(this.userData.id, this.brandForm.value).subscribe({
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

  exportToExcel(): void {
    // Implementation for exporting to Excel can be added here.
  }
}
