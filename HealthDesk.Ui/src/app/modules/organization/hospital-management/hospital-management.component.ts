import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { PhysicianService } from '../../services/physician.service';
import { AccountService } from '../../services/account.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { OrganizationService } from '../../services/organization.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { FilteringService } from '../../../shared/services/filter.service';
import { map, Observable, startWith } from 'rxjs';
import { DatabaseService } from '../../../shared/services/database.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-hospital-management',
  templateUrl: './hospital-management.component.html',
  styleUrl: './hospital-management.component.scss'
})
export class HospitalManagementComponent implements OnInit {
  @ViewChild('serviceImportModal') serviceImportModal!: ElementRef;

  physicians: any[] = [];
  services: any[] = [];
  filteredPhysicians: any[] = [];
  filteredServices: any[] = [];
  physicianForm!: FormGroup;
  serviceForm!: FormGroup;
  userData: any;
  isEditPhysician: boolean = false;
  isEditService: boolean = false;
  selectedTab: string = 'physicianList';
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  // Search texts
  serviceSearchText: string = '';
  specialitySearchText: string = '';
  searchValue = '';

  specialities: any[] = [];
  graduations: any[] = [];
  postGraduations: any[] = [];
  superSpecializations: any[] = [];

  specialityFilterCtrl = new FormControl();
  graduationFilterCtrl = new FormControl();
  postGraduationFilterCtrl = new FormControl();
  superSpecializationFilterCtrl = new FormControl();

  filteredSpecialities!: Observable<string[]>;
  filteredGraduations!: Observable<string[]>;
  filteredPostGraduations!: Observable<string[]>;
  filteredSuperSpecializations!: Observable<string[]>;

  days = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S'];

  serviceFileName = '';
  serviceImportErrors: { row: number; errors: string[] }[] = [];
  importedServices: Array<{ name: string; specification: string; comment?: string }> = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private organizationService: OrganizationService,
    private notificationService: NotificationService,
    private sortingService: SortingService,
    private filteringService: FilteringService,
    private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.initForms();
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        if (this.userData.status == 'Approved') {
          this.specialities = await this.databaseService.getSpecialities();
          this.graduations = await this.databaseService.getGraduations();
          this.postGraduations = await this.databaseService.getPostGraduations();
          this.superSpecializations = await this.databaseService.getSpecializations();
          this.loadData();
          this.initializeSearch();
        }
        else
          this.router.navigate(['/account']);
      }
    });
  }

  initForms(): void {
    const daysGroup: { [key: string]: FormControl } = {};
    this.days.forEach((day) => {
      daysGroup[day] = new FormControl(false);
    });

    this.physicianForm = this.fb.group({
      id: [''],
      userId: [''],
      mobile: ['', [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z '-]{1,49}$/)]],
      middleName: ['', [Validators.pattern(/^[a-zA-Z][a-zA-Z '-]{1,49}$/)]], // Optional
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z '-]{1,49}$/)]],
      gender: [{ value: '', disabled: true }, Validators.required],
      dateOfBirth: [Validators.required, (control: AbstractControl) => this.validateAge(control)],
      speciality: [''],
      graduation: ['', [Validators.required]],
      postGraduation: [''],
      superSpecialization: [''],
      additionalQualification: [''],
      days: this.fb.group(daysGroup, { validators: this.validateDaysRequired } as AbstractControlOptions),
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      isActive: [true]
    });

    this.serviceForm = this.fb.group({
      id: [],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z '-]{1,49}$/)]],
      specification: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z '-]{1,49}$/)]],
      comment: ['']
    });
  }

  initializeSearch(): void {
    this.filteredSpecialities = this.specialityFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.specialities))
    );

    this.filteredGraduations = this.graduationFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.graduations))
    );

    this.filteredPostGraduations = this.postGraduationFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.postGraduations))
    );

    this.filteredSuperSpecializations = this.superSpecializationFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.superSpecializations))
    );
  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  loadData(): void {
    this.organizationService.getAllPhysicians(this.userData.id).subscribe({
      next: (physiciansData: any) => {
        this.physicians = physiciansData?.data.map((physician: any) => ({
          ...physician
        }));
        this.filteredPhysicians = [...this.physicians];

        // Fetch services after physicians are loaded
        this.organizationService.getAllServices(this.userData.id).subscribe({
          next: (servicesData: any) => {
            this.services = servicesData?.data.map((service: any) => ({
              ...service
            }));
            this.filteredServices = [...this.services];
          },
          error: (error) => {
            console.error('Error loading services:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error loading physicians:', error);
      }
    });
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }



  validateDaysRequired(daysGroup: FormGroup): { [key: string]: boolean } | null {
    const selected = Object.values(daysGroup.controls).some((control) => control.value === true);
    return selected ? null : { daysRequired: true };
  }

  getDayControl(day: string): FormControl {
    return this.physicianForm.get('days')?.get(day) as FormControl;
  }

  onMobileInputChange(): void {
    const mobile = this.physicianForm.get('mobile')?.value;
    if (mobile.length === 10) {
      this.checkPhysicianExists(mobile);
    }
  }

  checkPhysicianExists(mobile: string): void {
    this.organizationService.getPhysicianByMobile(mobile).subscribe((response: any) => {
      if (response.success && response.data) {
        const physician = response.data;
        this.physicianForm.patchValue({
          userId: physician.userId,
          firstName: physician.firstName,
          middleName: physician.middleName,
          lastName: physician.lastName,
          speciality: physician.speciality,
          gender: physician.gender,
          dateOfBirth: physician.dateOfBirth,
          graduation: physician.graduation,
          postGraduation: physician.postGraduation,
          superSpecialization: physician.superSpecialization,
          additionalQualification: physician.additionalQualification,
          isActive: true
        });
        this.physicianForm.get('firstName')?.disable();
        this.physicianForm.get('lastName')?.disable();
        this.physicianForm.get('middleName')?.disable();
        this.physicianForm.get('speciality')?.disable();
        this.physicianForm.get('gender')?.disable();
        this.physicianForm.get('dateOfBirth')?.disable();
        this.physicianForm.get('graduation')?.disable();
        this.physicianForm.get('postGraduation')?.disable();
        this.physicianForm.get('superSpecialization')?.disable();
        this.physicianForm.get('additionalQualification')?.disable();
      } else {
        this.physicianForm.reset({ mobile });
        this.physicianForm.get('mobile')?.disable();
        this.physicianForm.get('firstName')?.enable();
        this.physicianForm.get('middleName')?.enable();
        this.physicianForm.get('lastName')?.enable();
        this.physicianForm.get('speciality')?.disable();
        this.physicianForm.get('gender')?.enable();
        this.physicianForm.get('dateOfBirth')?.enable();
        this.physicianForm.get('graduation')?.enable();
        this.physicianForm.get('postGraduation')?.enable();
        this.physicianForm.get('superSpecialization')?.enable();
        this.physicianForm.get('additionalQualification')?.enable();
      }
    });
  }

  validateAge(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null; // Allow empty values (handled by required validator)

    const birthDate = new Date(control.value); // Directly parse the date
    const today = new Date(); // Get today's date

    let age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has passed in the current year
    const isBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!isBirthdayPassed) {
      age--; // Adjust if birthday hasn't occurred yet this year
    }

    // Validate if the user must be at least 18 years old (only if dependentId is NOT present)
    if (!this.userData?.dependentId && age < 18) {
      return { minAge: true }; // Validation fails
    }

    return null; // Validation passes
  }

  openPhysicianDialog(physician?: any): void {
    this.isEditPhysician = !!physician;
    if (physician) {
      this.physicianForm.patchValue({
        id: physician.id,
        userId: physician.userId,
        firstName: physician.firstName,
        middleName: physician.middleName || '',
        lastName: physician.lastName || '',
        gender: physician.gender,
        dateOfBirth: physician.dateOfBirth,
        mobile: physician.mobile,
        speciality: physician.speciality,
        graduation: physician.graduation,
        postGraduation: physician.postGraduation,
        superSpecialization: physician.superSpecialization,
        additionalQualification: physician.additionalQualification,
        from: physician.from,
        to: physician.to,
        days: physician.days,
        isActive: physician.isActive
      });
      this.physicianForm.get('firstName')?.disable();
      this.physicianForm.get('middleName')?.disable();
      this.physicianForm.get('lastName')?.disable();
      this.physicianForm.get('gender')?.disable();
      this.physicianForm.get('dateOfBirth')?.disable();
      this.physicianForm.get('mobile')?.disable();
      this.physicianForm.get('speciality')?.disable();
      this.physicianForm.get('graduation')?.disable();
      this.physicianForm.get('postGraduation')?.disable();
      this.physicianForm.get('superSpecialization')?.disable();
      this.physicianForm.get('additionalQualification')?.disable();
    }
    else {
      this.physicianForm.reset();
      this.physicianForm.get('mobile')?.enable();
      this.physicianForm.get('firstName')?.disable();
      this.physicianForm.get('middleName')?.disable();
      this.physicianForm.get('lastName')?.disable();
      this.physicianForm.get('gender')?.disable();
      this.physicianForm.get('dateOfBirth')?.disable();
      this.physicianForm.get('speciality')?.disable();
      this.physicianForm.get('graduation')?.disable();
      this.physicianForm.get('postGraduation')?.disable();
      this.physicianForm.get('superSpecialization')?.disable();
      this.physicianForm.get('additionalQualification')?.disable();
    }

    const modal = new bootstrap.Modal(document.getElementById('physicianModal')!);
    modal.show();
  }

  savePhysician(): void {
    this.physicianForm.markAllAsTouched();
    if (this.physicianForm.invalid) return;

    const formData = this.physicianForm.getRawValue();

    const daysObject = formData.days;
    const selectedDays = Object.entries(daysObject)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);

    // Replace the days property in your data with the selectedDays array
    const data = {
      ...formData,
      days: selectedDays
    };

    this.organizationService
      .savePhysician(this.userData.id, data)
      .subscribe({
        next: (response) => {
          this.loadData();
        },
        error: (error) => {
          console.error('Error updating  record:', error);
        },
      });

    bootstrap.Modal.getInstance(document.getElementById('physicianModal')!)?.hide();
  }


  openServiceDialog(service?: any): void {
    this.isEditService = !!service;
    this.serviceForm.reset();

    if (service) {
      this.serviceForm.patchValue(service);
    }

    const modal = new bootstrap.Modal(document.getElementById('serviceModal')!);
    modal.show();
  }


  saveService(): void {
    this.serviceForm.markAllAsTouched();
    if (this.serviceForm.invalid) return;

    const data = this.serviceForm.value;

    this.organizationService
      .saveService(this.userData.id, [data])
      .subscribe({
        next: (response) => {
          this.loadData();
        },
        error: (error) => {
          console.error('Error updating  record:', error);
        },
      });


    bootstrap.Modal.getInstance(document.getElementById('serviceModal')!)?.hide();
  }

  sortPhysicians(column: string): void {
    // Toggle the sort direction
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const direction = this.sortDirection[column];

    // Use the sorting service to sort the data
    this.filteredPhysicians = this.sortingService.sort(this.filteredPhysicians, column, direction);
  }

  applyPhysicianFilters(): void {
    this.filteredPhysicians = this.filteringService.filter(
      this.physicians,
      {
        firstName: this.searchValue,
        lastName: this.searchValue,
        speciality: this.specialitySearchText
      },
      []
    );
  }

  sortServices(column: string): void {
    // Toggle the sort direction
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const direction = this.sortDirection[column];

    // Use the sorting service to sort the data
    this.filteredServices = this.sortingService.sort(this.filteredServices, column, direction);
  }

  applyServicesFilters(): void {
    this.filteredServices = this.filteringService.filter(
      this.services,
      {
        service: this.serviceSearchText,

      },
      []
    );
  }

  deleteService(service: any): void {

  }

  deletePhysician(physician: any): void {

  }


  openServiceImportDialog(): void {
    this.serviceFileName = '';
    this.serviceImportErrors = [];
    this.importedServices = [];
    const modal = new bootstrap.Modal(this.serviceImportModal.nativeElement);
    modal.show();
  }
  
  // when user picks a file
  onServiceFileSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    this.serviceFileName = file.name;
  
    const reader = new FileReader();
    reader.onload = () => {
      const wb = XLSX.read(reader.result as ArrayBuffer, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const raw: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      this.processServiceRawRows(raw);
    };
    reader.readAsArrayBuffer(file);
  }
  
  // validate header + rows
  private processServiceRawRows(raw: any[][]) {
    this.serviceImportErrors = [];
    this.importedServices = [];
  
    if (!raw.length) {
      this.serviceImportErrors.push({ row: 0, errors: ['Excel is empty'] });
      return;
    }
  
    const header = raw[0].map(h => (h || '').toString().trim());
    const expected = ['Facility/Service', 'Specification', 'Comment'];
    // require at least the first two columns
    if (
      header.length < 2 ||
      header[0] !== expected[0] ||
      header[1] !== expected[1]
    ) {
      this.serviceImportErrors.push({
        row: 0,
        errors: [`Header must start with: ${expected[0]}, ${expected[1]}, [${expected[2]}]`]
      });
      return;
    }
  
    raw.slice(1).forEach((row, idx) => {
      const rowNum = idx + 2;
      const svc = {
        name: row[0].toString().trim(),
        specification: row[1].toString().trim(),
        comment: row[2]?.toString().trim() ?? ''
      };
      const errs: string[] = [];
      // same patterns as your form validators
      if (!svc.name) errs.push('name is required');
      else if (!/^[a-zA-Z][a-zA-Z \'-]{1,49}$/.test(svc.name))
        errs.push('name must start with a letter and be 2–50 chars');
  
      if (!svc.specification) errs.push('specification is required');
      else if (!/^[a-zA-Z][a-zA-Z \'-]{1,49}$/.test(svc.specification))
        errs.push('specification must start with a letter and be 2–50 chars');
  
      if (errs.length) {
        this.serviceImportErrors.push({ row: rowNum, errors: errs });
      } else {
        this.importedServices.push(svc);
      }
    });
  }
  

  submitServiceImport(): void {
    if (this.serviceImportErrors.length || !this.importedServices.length) return;
    if (!this.userData?.id) return;
  
    this.organizationService
      .saveService(this.userData.id, this.importedServices)
      .subscribe({
        next: () => {
          this.loadData();
          bootstrap.Modal.getInstance(this.serviceImportModal.nativeElement)!.hide();
        },
        error: (err) => console.error('Error importing services:', err)
      });
  }
}
