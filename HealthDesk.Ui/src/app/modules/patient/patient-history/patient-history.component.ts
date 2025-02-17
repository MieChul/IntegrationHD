import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { map, Observable, startWith } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { PatientService } from '../../services/patient.service';
import { FilteringService } from '../../../shared/services/filter.service';
import { SortingService } from '../../../shared/services/sorting.service';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent implements OnInit {
  patientHistories: any[] = [];
  historyForm!: FormGroup;

  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  filterForm!: FormGroup<{
    startDate: FormControl<string | null>;
    endDate: FormControl<string | null>;
  }>;
  isEditMode = false;
  selectedHistory!: any;
  diseases: any = [];
  userData: any = [];

  diseaseFilterCtrl = new FormControl();

  // Filtered Observables
  filteredDiseases!: Observable<string[]>;

  filteredHistories: any;


  @ViewChild('historyModal') historyModal!: ElementRef;

  constructor(private fb: FormBuilder, private accountService: AccountService, private databaseService: DatabaseService, private patientService: PatientService, private sortingService: SortingService, private filteringService: FilteringService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        this.diseases = await this.databaseService.getSymptoms();
        await this.loadHistory();
        await this.initializeSearch();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForm(): void {
    this.historyForm = this.fb.group({
      id: this.fb.control(''),
      dateOfDiagnosis: this.fb.control('', [Validators.required, this.futureDateValidator]),
      disease: this.fb.control('', Validators.required),
      start: this.fb.control('', [Validators.required, this.futureDateValidator]),
      end: this.fb.control('', [this.futureDateValidator])
    }, { validators: this.dateOrderValidator });  // Attach cross-field validator


    this.filterForm = this.fb.group(
      {
        startDate: this.fb.control('', Validators.required),
        endDate: this.fb.control('', Validators.required),
      },
      { updateOn: 'change', validators: this.dateRangeValidator }
    );

    this.filterForm.valueChanges.subscribe(() => {
      this.applyDateFilter();
    });
  }

  dateOrderValidator(formGroup: AbstractControl): ValidationErrors | null {
    const start = formGroup.get('start')?.value;
    const diag = formGroup.get('dateOfDiagnosis')?.value;
    const end = formGroup.get('end')?.value;
    const errors: any = {};
  
    if (start && diag) {
      if (new Date(diag) < new Date(start)) {
        errors.dateDiagnosisBeforeStart = true;
      }
    }
    if (start && end) {
      if (new Date(end) < new Date(start)) {
        errors.endBeforeStart = true;
      }
    }
    if (diag && end) {
      if (new Date(end) < new Date(diag)) {
        errors.endBeforeDiagnosis = true;
      }
    }
  
    return Object.keys(errors).length ? errors : null;
  }
  initializeSearch(): void {
    this.filteredDiseases = this.diseaseFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.diseases))
    );
  }

  dateRangeValidator(group: FormGroup): void {
    const startDateControl = group.get('startDate');
    const endDateControl = group.get('endDate');

    if (startDateControl && endDateControl) {
      const startDate = startDateControl.value;
      const endDate = endDateControl.value;

      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        endDateControl.setErrors({ invalidDateRange: true });
      } else {
        endDateControl.setErrors(null); // Clear the error if valid
      }
    }
  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  futureDateValidator(control: any): { [key: string]: boolean } | null {
    const currentDate = new Date();
    if (new Date(control.value) > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  loadHistory(): void {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }

    this.patientService.getMedicalHistory(this.userData.id).subscribe({
      next: (data: any) => {
        this.patientHistories = data?.data.map((history: any) => ({
          ...history
        })).sort((a: any, b: any) => new Date(b.dateOfDiagnosis).getTime() - new Date(a.dateOfDiagnosis).getTime());
        this.filteredHistories = [...this.patientHistories];
      },
      error: (error) => {
        console.error('Error loading history:', error);
      }
    });
  }

  openHistoryModal(isEditMode: boolean, history: any = null): void {
    this.isEditMode = isEditMode;

    if (isEditMode && history) {
      this.selectedHistory = history;
      this.historyForm.patchValue(history); // Populate the form with existing data
    } else {
      this.selectedHistory = null;
      this.historyForm.reset(); // Clear the form for a new entry
    }

    const modal = new bootstrap.Modal(document.getElementById('historyModal')!);
    modal.show();
  }


  deleteHistory(history: any): void {
    this.patientService.deleteMedicalHistory(this.userData.id, history.id).subscribe({
      next: (response) => {
        console.log(response.message); // Success message from API
        this.loadHistory(); // Reload the list after successful deletion
      },
      error: (error) => {
        console.error('Error deleting clinic:', error); // Handle errors
      }
    });
  }

  saveHistory(): void {
    this.historyForm.markAllAsTouched();
    this.historyForm.updateValueAndValidity(); 
    if (this.historyForm.invalid) return;

    const historyData = this.historyForm.value;

    if (this.isEditMode) {
      // Update existing medical history
      historyData.id = this.selectedHistory?.id; // Attach the existing history ID for update
      this.patientService
        .saveMedicalHistory(this.userData.id, historyData)
        .subscribe({
          next: (response) => {
            const index = this.patientHistories.findIndex(
              (h) => h.id === this.selectedHistory?.id
            );
            if (index !== -1) {
              this.patientHistories[index] = { ...historyData };
            }
            this.filteredHistories = [...this.patientHistories];
          },
          error: (error) => {
            console.error('Error updating medical history:', error);
          },
        });
    } else {
      // Add new medical history
      this.patientService
        .saveMedicalHistory(this.userData.id, historyData)
        .subscribe({
          next: (response) => {
            this.loadHistory();
          },
          error: (error) => {
            console.error('Error adding medical history:', error);
          },
        });
    }

    // Close the modal

    bootstrap.Modal.getInstance(document.getElementById('historyModal')!)?.hide();
  }

  sortTable(column: string): void {
    // Toggle the sort direction
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const direction = this.sortDirection[column];

    // Use the sorting service to sort the data
    this.filteredHistories = this.sortingService.sort(this.filteredHistories, column, direction);
  }

  applyDateFilter(): void {
    const { startDate, endDate } = this.filterForm.value;

    this.filteredHistories = this.filteringService.filter(
      this.patientHistories,
      {}, // Pass an empty object for generic filters as no other filters are applied
      [
        {
          field: 'dateOfDiagnosis',
          range: [startDate || null, endDate || null], // Pass null for missing dates
        },
      ]
    );
  }
}