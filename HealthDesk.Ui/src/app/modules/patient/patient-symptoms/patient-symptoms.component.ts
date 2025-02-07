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
  selector: 'app-patient-symptoms',
  templateUrl: './patient-symptoms.component.html',
  styleUrls: ['./patient-symptoms.component.scss']
})
export class PatientSymptomsComponent implements OnInit {
  symptomsRecords: any[] = [];
  symptomForm!: FormGroup;
  isEditMode: boolean = false;
  selectedSymptom!: any;
  symptoms: string[] = [];
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  severityLevels: string[] = ['Mild', 'Moderate', 'Severe'];
  userData: any;
  filterForm!: FormGroup;
  submitted: boolean = true;

  symptomFilterCtrl = new FormControl();
  filteredSymptoms!: Observable<string[]>;
  filteredSymptomsData: any = [];


  @ViewChild('symptomModal') symptomModal!: ElementRef;

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
        this.symptoms = await this.databaseService.getSymptoms();

        // Load symptoms
        await this.loadSymptoms();
        await this.initializeSearch();

      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForms(): void {
    this.symptomForm = this.fb.group({
      id: this.fb.control(''),
      dateOfOnset: this.fb.control('', [
        Validators.required,
        this.futureDateValidator
      ]),
      endDate: this.fb.control('', this.futureDateValidator),
      timeOfOnset: this.fb.control('', Validators.required),
      symptomType: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.maxLength(100)),
      severity: this.fb.control('', Validators.required),
      comment: this.fb.control('', Validators.maxLength(100))
    },
      { validators: this.dateRangeValidator, updateOn: 'change' });

    this.filterForm = this.fb.group(
      {
        f_startDate: this.fb.control(null),
        f_endDate: this.fb.control(null)
      }
    );

    this.filterForm.valueChanges.subscribe(() => this.applyDateFilter());
  }

  initializeSearch(): void {
    this.filteredSymptoms = this.symptomFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.symptoms))
    );

  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  loadSymptoms(): void {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }

    this.patientService.getSymptoms(this.userData.id).subscribe({
      next: (data: any) => {
        this.symptomsRecords = data?.data.map((symptomsData: any) => ({
          ...symptomsData
        })).sort((a: any, b: any) => new Date(b.dateOfOnset).getTime() - new Date(a.dateOfOnset).getTime());;
        this.filteredSymptomsData = [...this.symptomsRecords];
      },
      error: (error) => {
        console.error('Error loading symptom:', error);
      }
    });
  }


  openSymptomModal(isEditMode: boolean, symptomRecord: any = null): void {
    this.isEditMode = isEditMode;

    if (isEditMode && symptomRecord) {
      this.selectedSymptom = symptomRecord;
      this.symptomForm.patchValue(symptomRecord);
    } else {
      this.selectedSymptom = null;
      this.symptomForm.reset();
    }

    const modal = new bootstrap.Modal(this.symptomModal.nativeElement);
    modal.show();
  }

  saveSymptom(): void {
    this.symptomForm.markAllAsTouched();
    if (this.symptomForm.invalid || !this.userData.id) return;

    if (this.isEditMode) {
      this.patientService.saveSymptom(this.userData.id, this.symptomForm.value).subscribe({
        next: (response: any) => {
          this.loadSymptoms();
        },
        error: (error: any) => {
          console.error('Error updating symptoms:', error);
        },
      });
    } else {
      // Add new medical symptom
      this.patientService
        .saveSymptom(this.userData.id, this.symptomForm.value)
        .subscribe({
          next: (response) => {
            this.loadSymptoms();
          },
          error: (error) => {
            console.error('Error adding symptoms:', error);
          },
        });
    }

    bootstrap.Modal.getInstance(this.symptomModal.nativeElement)?.hide();

  }


  deleteSymptom(symptom: any): void {
    if (!this.userData.id || !symptom.id) return;

    this.patientService.deleteSymptom(this.userData.id, symptom.id).subscribe({
      next: (response) => {
        console.log(response.message); // Success message from API
        this.loadSymptoms(); // Reload the list after successful deletion
      },
      error: (error) => {
        console.error('Error deleting symptom:', error); // Handle errors
      }
    });
  }

  applyDateFilter(): void {
    const { f_startDate, f_endDate } = this.filterForm.value;

    // Apply the date filter using the filtering service
    this.filteredSymptomsData = this.filteringService.filter(
      this.symptomsRecords,
      {},
      [
        {
          field: 'dateOfOnset',
          range: [f_startDate || null, f_endDate || null]
        }
      ]
    );
  }

  sortTable(column: string): void {
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    this.filteredSymptomsData = this.sortingService.sort(this.filteredSymptomsData, column, this.sortDirection[column]);
  }

  futureDateValidator(control: any): { [key: string]: boolean } | null {
    const currentDate = new Date();
    if (new Date(control.value) > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  dateRangeValidator(group: FormGroup): { [key: string]: any } | null {
    const startDateControl = group.get('dateOfOnset');
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
