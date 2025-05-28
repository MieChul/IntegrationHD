import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { FilteringService } from '../../../shared/services/filter.service';
import { PatientService } from '../../services/patient.service';
import { AccountService } from '../../services/account.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { map, Observable, startWith } from 'rxjs';

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
  activeTab = 'ongoing'; // Default tab
  userData: any = [];

  diseaseFilterCtrl = new FormControl();
  drugFilterCtrl = new FormControl();
  dosageFormFilterCtrl = new FormControl();
  strengthUnitFilterCtrl = new FormControl();
  frequencyFilterCtrl = new FormControl();
  brandFilterCtrl = new FormControl();

  filteredDiseases!: Observable<string[]>;
  filteredDrugs!: Observable<string[]>;
  filteredDosageForms!: Observable<string[]>;
  filteredStrengthUnits!: Observable<string[]>;
  filteredFrequencies!: Observable<string[]>;
  filteredBrands!: Observable<string[]>;

  // Dropdowns
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
        this.drugs = await this.databaseService.getDrugs();
        this.frequencies = await this.databaseService.getFrequencies();
        this.diseases = await this.databaseService.getSymptoms();
        this.brands = await this.databaseService.getDrugBrands();

        // Load treatments
        await this.loadTreatments();
        await this.initializeSearch();

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
        treatmentDrug: this.fb.control('', Validators.required),
        dosageForm: this.fb.control('', Validators.required),
        strengthUnit: this.fb.control('', Validators.required),
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

  initializeSearch(): void {
    this.filteredDiseases = this.diseaseFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.diseases))
    );

    this.filteredDrugs = this.drugFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.drugs))
    );

    this.filteredDosageForms = this.dosageFormFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.dosageForms))
    );

    this.filteredStrengthUnits = this.strengthUnitFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.strengthUnits))
    );

    this.filteredFrequencies = this.frequencyFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.frequencies))
    );

    this.filteredBrands = this.brandFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.brands))
    );

  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  async onDrugChange() {
    const selectedDrug = this.treatmentForm.get('treatmentDrug')?.value;

    // Disable dependent dropdowns while data is loading
    this.treatmentForm.get('dosageForm')?.disable();
    this.treatmentForm.get('strengthUnit')?.disable();

    // Fetch new dosage forms
    this.dosageForms = [];
    this.strengthUnits = [];
    if (selectedDrug) {
      this.dosageForms = await this.databaseService.getForms(selectedDrug);
    }

    // Reset and enable dosage form dropdown if data is available
    this.treatmentForm.patchValue({ dosageForm: '', strengthUnit: '' });

    if (this.dosageForms.length > 0) {
      this.treatmentForm.get('dosageForm')?.enable();
    }
  }

  async onDosageFormChange() {
    const selectedDrug = this.treatmentForm.get('treatmentDrug')?.value;
    const selectedDosageForm = this.treatmentForm.get('dosageForm')?.value;

    // Disable strength unit dropdown while loading
    this.treatmentForm.get('strengthUnit')?.disable();

    // Fetch new strength units
    this.strengthUnits = [];
    if (selectedDrug && selectedDosageForm) {
      this.strengthUnits = await this.databaseService.getStrengths(selectedDrug, selectedDosageForm);
    }

    // Reset and enable strength unit dropdown if data is available
    this.treatmentForm.patchValue({ strengthUnit: '' });

    if (this.strengthUnits.length > 0) {
      this.treatmentForm.get('strengthUnit')?.enable();
    }
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
      error: (error) => {
        console.error('Error loading history:', error);
      }
    });
  }


  openTreatmentModal(isEditMode: boolean, treatment: any = null): void {
    this.isEditMode = isEditMode;

    if (isEditMode && treatment) {
      this.selectedTreatment = treatment;
      this.treatmentForm.patchValue(treatment);
    } else {
      this.selectedTreatment = null;
      this.treatmentForm.reset();
    }

    const modal = new bootstrap.Modal(this.treatmentModal.nativeElement);
    modal.show();
  }

  saveTreatment(): void {
    this.treatmentForm.markAllAsTouched();
    if (this.treatmentForm.invalid || !this.userData.id) return;

    const treatmentData = this.treatmentForm.value;
    if (this.isEditMode) {
      // Update existing medical history
      treatmentData.id = this.selectedTreatment?.id;

      this.patientService.saveCurrentTreatment(this.userData.id, treatmentData).subscribe({
        next: (response) => {
          this.loadTreatments();
        },
        error: (error) => {
          console.error('Error updating medical treatments:', error);
        },
      });
    } else {
      // Add new medical history
      this.patientService
        .saveCurrentTreatment(this.userData.id, treatmentData)
        .subscribe({
          next: (response) => {
            this.loadTreatments();
          },
          error: (error) => {
            console.error('Error adding medical treatments:', error);
          },
        });
    }

    bootstrap.Modal.getInstance(this.treatmentModal.nativeElement)?.hide();

  }

  deleteTreatment(treatment: any): void {
    if (!this.userData.id || !treatment.id) return;

    this.patientService.deleteCurrentTreatment(this.userData.id, treatment.id).subscribe({
      next: (response) => {
        console.log(response.message); // Success message from API
        this.loadTreatments(); // Reload the list after successful deletion
      },
      error: (error) => {
        console.error('Error deleting treatments:', error); // Handle errors
      }
    });
  }

  filterTreatments(tab: string): void {
    this.activeTab = tab;

    if (tab === 'ongoing') {
      this.filteredTreatments = this.patientTreatments.filter((t) => !t.endDate);
    } else if (tab === 'past') {
      this.filteredTreatments = this.patientTreatments.filter((t) => t.endDate);
    }
  }

  applyDateFilter(): void {
    const { f_startDate, f_endDate } = this.filterForm.value;

    // Apply the date filter using the filtering service
    let filteredResults = this.filteringService.filter(
      this.patientTreatments,
      {},
      [
        {
          field: 'startDate',
          range: [f_startDate || null, f_endDate || null]
        }
      ]
    );

    // Further filter the results based on the active tab
    if (this.activeTab === 'ongoing') {
      this.filteredTreatments = filteredResults.filter((t) => !t.endDate);
    } else if (this.activeTab === 'past') {
      this.filteredTreatments = filteredResults.filter((t) => t.endDate);
    } else {
      this.filteredTreatments = filteredResults; // Default case if no tab is active
    }
  }

  sortTable(column: string): void {
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    this.filteredTreatments = this.sortingService.sort(this.filteredTreatments, column, this.sortDirection[column]);
  }

  futureDateValidator(control: any): { [key: string]: boolean } | null {
    const currentDate = new Date();
    if (new Date(control.value) > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  dateRangeValidator(group: FormGroup): { [key: string]: any } | null {
    const startDateControl = group.get('startDate');
    const endDateControl = group.get('endDate');
    if (!endDateControl?.value) return null;

    if (startDateControl && endDateControl) {
      const startDate = new Date(startDateControl.value);
      const endDate = new Date(endDateControl.value);

      if (startDate && endDate && startDate > endDate) {
        endDateControl.setErrors({ invalidDateRange: true });
        startDateControl.setErrors({ invalidDateRange: true });
        return { invalidDateRange: true };
      } else {
        if (endDateControl.hasError('invalidDateRange')) {
          endDateControl.setErrors(null);
        }
        if (startDateControl.hasError('invalidDateRange')) {
          startDateControl.setErrors(null);
        }
      }
    }
    return null;
  }
}
