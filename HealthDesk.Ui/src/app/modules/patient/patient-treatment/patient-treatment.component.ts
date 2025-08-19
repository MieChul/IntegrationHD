import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { FilteringService } from '../../../shared/services/filter.service';
import { PatientService } from '../../services/patient.service';
import { AccountService } from '../../services/account.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { SortingService } from '../../../shared/services/sorting.service';

@Component({
  selector: 'app-patient-treatment',
  templateUrl: './patient-treatment.component.html',
  styleUrls: ['./patient-treatment.component.scss']
})
export class PatientTreatmentComponent implements OnInit {
  patientTreatments: any[] = [];
  filteredTreatments: any[] = [];
  treatmentForm!: FormGroup;
  filterForm!: FormGroup;
  isEditMode = false;
  selectedTreatment: any = null;
  activeTab = 'ongoing';
  userData: any = [];

  drugs: string[] = [];
  dosageForms: string[] = [];
  strengthUnits: string[] = [];
  frequencies: string[] = [];
  diseases: string[] = [];
  brands: string[] = [];

  sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  @ViewChild('treatmentModal') treatmentModal!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private sortingService: SortingService,
    private filteringService: FilteringService,
    private patientService: PatientService,
    private accountService: AccountService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.initializeForms();

    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        this.frequencies = await this.databaseService.getFrequencies();
        this.diseases = await this.databaseService.getSymptoms();
        this.brands = await this.databaseService.getBrands();
        await this.loadTreatments();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  ngAfterViewInit() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  initializeForms(): void {
    this.treatmentForm = this.fb.group(
      {
        id: this.fb.control(''),
        brand: this.fb.control('', Validators.required),
        treatmentDrug: this.fb.control({ value: '', disabled: true }, Validators.required),
        dosageForm: this.fb.control({ value: '', disabled: true }, Validators.required),
        strengthUnit: this.fb.control({ value: '', disabled: true }, Validators.required),
        frequency: this.fb.control('', Validators.required),
        startDate: this.fb.control('', [
          Validators.required,
          this.futureDateValidator
        ]),
        endDate: this.fb.control('', this.futureDateValidator),
        comment: this.fb.control('', Validators.maxLength(100)),
        price: this.fb.control('', [
          Validators.required,
          Validators.pattern(/^\d{1,9}(\.\d{1,2})?$/)
        ])
      },
      { validators: this.dateRangeValidator, updateOn: 'change' }
    );

    this.filterForm = this.fb.group(
      {
        f_startDate: this.fb.control(null),
        f_endDate: this.fb.control(null)
      },
      { validators: this.dateRangeValidator, updateOn: 'change' }
    );

    this.filterForm.valueChanges.subscribe(() => this.applyDateFilter());
  }

  async onBrandChange(brand: string) {
    this.treatmentForm.get('brand')?.setValue(brand);
    this.treatmentForm.get('treatmentDrug')?.reset({ value: '', disabled: true });
    this.treatmentForm.get('dosageForm')?.reset({ value: '', disabled: true });
    this.treatmentForm.get('strengthUnit')?.reset({ value: '', disabled: true });
    this.drugs = [];
    this.dosageForms = [];
    this.strengthUnits = [];

    if (brand) {
      this.drugs = await this.databaseService.getDrugs(brand);
      if (this.drugs.length > 0) {
        this.treatmentForm.get('treatmentDrug')?.enable();
      }
    }
  }

  async onDrugChange(drug: string) {
    this.treatmentForm.get('treatmentDrug')?.setValue(drug);
    const selectedBrand = this.treatmentForm.get('brand')?.value;
    this.treatmentForm.get('dosageForm')?.reset({ value: '', disabled: true });
    this.treatmentForm.get('strengthUnit')?.reset({ value: '', disabled: true });
    this.dosageForms = [];
    this.strengthUnits = [];

    if (selectedBrand && drug) {
      this.dosageForms = await this.databaseService.getForms(selectedBrand, drug);
      if (this.dosageForms.length > 0) {
        this.treatmentForm.get('dosageForm')?.enable();
      }
    }
  }

  async onDosageFormChange(form: string) {
    this.treatmentForm.get('dosageForm')?.setValue(form);
    const selectedBrand = this.treatmentForm.get('brand')?.value;
    const selectedDrug = this.treatmentForm.get('treatmentDrug')?.value;
    this.treatmentForm.get('strengthUnit')?.reset({ value: '', disabled: true });
    this.strengthUnits = [];

    if (selectedBrand && selectedDrug && form) {
      this.strengthUnits = await this.databaseService.getStrengths(selectedBrand, selectedDrug, form);
      if (this.strengthUnits.length > 0) {
        this.treatmentForm.get('strengthUnit')?.enable();
      }
    }
  }

  onStrengthChange(strength: string) {
    this.treatmentForm.get('strengthUnit')?.setValue(strength);
  }

  onFrequencyChange(frequency: string) {
    this.treatmentForm.get('frequency')?.setValue(frequency);
  }

  async populateDropdownsForEdit(treatment: any) {
    if (!treatment.brand) return;
    this.drugs = await this.databaseService.getDrugs(treatment.brand);
    this.treatmentForm.get('treatmentDrug')?.enable();

    if (!treatment.treatmentDrug) return;
    this.dosageForms = await this.databaseService.getForms(treatment.brand, treatment.treatmentDrug);
    this.treatmentForm.get('dosageForm')?.enable();

    if (!treatment.dosageForm) return;
    this.strengthUnits = await this.databaseService.getStrengths(treatment.brand, treatment.treatmentDrug, treatment.dosageForm);
    this.treatmentForm.get('strengthUnit')?.enable();
  }

  loadTreatments(): void {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }
    this.patientService.getCurrentTreatments(this.userData.id).subscribe({
      next: (data: any) => {
        this.patientTreatments = data?.data.map((treatments: any) => ({
          ...treatments
        })).sort((a: any, b: any) => new Date(b.dateOfDiagnosis).getTime() - new Date(a.dateOfDiagnosis).getTime());
        this.filteredTreatments = [...this.patientTreatments];
        this.filterTreatments('ongoing');
      },
      error: (error) => console.error('Error loading history:', error),
    });
  }

  async openTreatmentModal(isEditMode: boolean, treatment: any = null): Promise<void> {
    this.isEditMode = isEditMode;
    this.treatmentForm.reset();

    this.drugs = [];
    this.dosageForms = [];
    this.strengthUnits = [];

    if (isEditMode && treatment) {
      this.selectedTreatment = treatment;
      this.treatmentForm.patchValue(treatment);
      await this.populateDropdownsForEdit(treatment);
    } else {
      this.selectedTreatment = null;
      this.treatmentForm.get('treatmentDrug')?.disable();
      this.treatmentForm.get('dosageForm')?.disable();
      this.treatmentForm.get('strengthUnit')?.disable();
    }

    const modal = new bootstrap.Modal(this.treatmentModal.nativeElement);
    modal.show();
  }

  saveTreatment(): void {
    this.treatmentForm.markAllAsTouched();
    if (this.treatmentForm.invalid || !this.userData.id) return;

    const treatmentData = this.treatmentForm.getRawValue();

    const serviceCall = this.isEditMode
      ? this.patientService.saveCurrentTreatment(this.userData.id, treatmentData)
      : this.patientService.saveCurrentTreatment(this.userData.id, treatmentData);

    serviceCall.subscribe({
      next: (response) => {
        this.loadTreatments();
        bootstrap.Modal.getInstance(this.treatmentModal.nativeElement)?.hide();
      },
      error: (error) => console.error('Error saving treatment:', error),
    });
  }

  deleteTreatment(treatment: any): void {
    if (!this.userData.id || !treatment.id) return;

    this.patientService.deleteCurrentTreatment(this.userData.id, treatment.id).subscribe({
      next: (response) => {
        console.log(response.message);
        this.loadTreatments();
      },
      error: (error) => console.error('Error deleting treatments:', error),
    });
  }

  filterTreatments(tab: string): void {
    this.activeTab = tab;
    this.applyDateFilter();
  }

  applyDateFilter(): void {
    const { f_startDate, f_endDate } = this.filterForm.value;

    let dateFiltered = this.filteringService.filter(
      this.patientTreatments, {}, [{
        field: 'startDate',
        range: [f_startDate || null, f_endDate || null]
      }]
    );

    if (this.activeTab === 'ongoing') {
      this.filteredTreatments = dateFiltered.filter((t) => !t.endDate);
    } else if (this.activeTab === 'past') {
      this.filteredTreatments = dateFiltered.filter((t) => t.endDate);
    } else {
      this.filteredTreatments = dateFiltered;
    }
  }

  sortTable(column: string): void {
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    this.filteredTreatments = this.sortingService.sort(this.filteredTreatments, column, this.sortDirection[column]);
  }

  futureDateValidator(control: any): { [key: string]: boolean } | null {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (new Date(control.value) > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  dateRangeValidator(group: FormGroup): { [key: string]: any } | null {
    const startDateControl = group.get('startDate');
    const endDateControl = group.get('endDate');

    if (!startDateControl?.value || !endDateControl?.value) {
      if (endDateControl?.hasError('invalidDateRange')) {
        endDateControl.setErrors(null);
      }
      return null;
    }

    const startDate = new Date(startDateControl.value);
    const endDate = new Date(endDateControl.value);

    if (startDate > endDate) {
      endDateControl.setErrors({ invalidDateRange: true });
      return { invalidDateRange: true };
    }

    if (endDateControl.hasError('invalidDateRange')) {
      endDateControl.setErrors(null);
    }

    return null;
  }
}