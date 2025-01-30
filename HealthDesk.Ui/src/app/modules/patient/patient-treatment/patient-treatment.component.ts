import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  activeTab = 'ongoing'; // Default tab
  userData: any = [];

  // Dropdowns
  drugs: string[] = [];
  dosageForms: string[] = [];
  strengthUnits: string[] = [];
  frequencies: string[] = [];

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

        // Load treatments
        await this.loadTreatments();

        // Load dropdown data
        this.drugs = await this.databaseService.getDrugs();
        this.dosageForms = await this.databaseService.getForms();
        this.strengthUnits = await this.databaseService.getStrengths();
        this.frequencies = await this.databaseService.getFrequencies();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForms(): void {
    this.treatmentForm = this.fb.group({
      id: this.fb.control(''),
      treatmentDrug: this.fb.control('', Validators.required),
      dosageForm: this.fb.control('', Validators.required),
      strength: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
      strengthUnit: this.fb.control('', Validators.required),
      frequency: this.fb.control('', Validators.required),
      startDate: this.fb.control('', [Validators.required, this.futureDateValidator]),
      endDate: this.fb.control('', this.futureDateValidator),
      comment: this.fb.control('', Validators.maxLength(100)), // Added maxLength validation for comments
    });

    this.filterForm = this.fb.group(
      {
        f_startDate: this.fb.control(null),
        f_endDate: this.fb.control(null)
      },
      { validators: this.dateRangeValidator, updateOn: 'change' }
    );

    this.filterForm.valueChanges.subscribe(() => this.applyDateFilter());
  }

  async loadTreatments(): Promise<void> {
    if (!this.userData.id) return;

    try {
      const treatments = await this.patientService.getCurrentTreatments(this.userData.id).toPromise();
      this.patientTreatments = treatments?.sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      ) ?? [];
      this.filterTreatments(this.activeTab);
    } catch (error) {
      console.error('Error loading treatments:', error);
    }
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

  async saveTreatment(): Promise<void> {
    if (this.treatmentForm.invalid || !this.userData.id) return;

    const treatmentData = this.treatmentForm.value;

    try {
      await this.patientService.saveCurrentTreatment(this.userData.id, treatmentData).toPromise();
      await this.loadTreatments();
      bootstrap.Modal.getInstance(this.treatmentModal.nativeElement)?.hide();
    } catch (error) {
      console.error('Error saving treatment:', error);
    }
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

  dateRangeValidator(group: FormGroup): void {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      group.get('endDate')?.setErrors({ invalidDateRange: true });
    } else {
      group.get('endDate')?.setErrors(null);
    }
  }
}
