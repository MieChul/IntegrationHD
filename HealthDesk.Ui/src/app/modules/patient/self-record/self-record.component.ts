import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { AccountService } from '../../services/account.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { PatientService } from '../../services/patient.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { FilteringService } from '../../../shared/services/filter.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-self-record',
  templateUrl: './self-record.component.html',
  styleUrls: ['./self-record.component.scss']
})
export class SelfRecordComponent implements OnInit {
  selfRecords: any = [];
  selfRecordForm!: FormGroup;
  isEditMode: boolean = false;
  selectedRecord!: any;
  userData: any;
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  filteredSelfRecords: any;
  units: any = [];
  filteredUnits!: Observable<string[]>;
  unitFilterCtrl = new FormControl();
  submitted: boolean = false;
  filterForm!: FormGroup<{
    startDate: FormControl<string | null>;
    endDate: FormControl<string | null>;
  }>;

  @ViewChild('selfRecordModal') selfRecordModal!: ElementRef;

  constructor(private fb: FormBuilder, private accountService: AccountService, private databaseService: DatabaseService, private patientService: PatientService, private sortingService: SortingService, private filteringService: FilteringService) { }


  ngOnInit(): void {
    this.initializeForm();
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;

        this.units = await this.databaseService.getStrengths();

        await this.loadSelfRecords();
        await this.initializeSearch();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForm() {
    this.selfRecordForm = this.fb.group({
      id: this.fb.control(''),
      date: this.fb.control('', [Validators.required, this.futureDateValidator]),
      type: this.fb.control('', [Validators.required, Validators.max(50)]),
      value: this.fb.control('', [Validators.required, Validators.min(0)]),
      unit: this.fb.control('', Validators.required)
    });

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

  futureDateValidator(control: any): { [key: string]: boolean } | null {
    const currentDate = new Date();
    if (new Date(control.value) > currentDate) {
      return { futureDate: true };
    }
    return null;
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

  loadSelfRecords(): void {
    this.patientService.getSelfRecords(this.userData.id).subscribe({
      next: (selfRecord: any) => {
        this.selfRecords = selfRecord?.data.map((records: any) => ({
          ...records
        })).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.filteredSelfRecords = [...this.selfRecords];
      }
    });
  }

  initializeSearch() {
    this.filteredUnits = this.unitFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search: any) => this.filterOptions(search, this.units))
    );
  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }


  addSelfRecord(): void {
    this.selfRecordForm.reset();
    this.isEditMode = false;
    const modal = new bootstrap.Modal(document.getElementById('selfRecordModal')!);
    modal.show();
  }

  saveSelfRecord(): void {
    this.selfRecordForm.markAllAsTouched();
    if (this.selfRecordForm.invalid) return;

    const selfRecordata = this.selfRecordForm.value;

    if (this.isEditMode) {
      this.patientService
        .saveSelfRecord(this.userData.id, selfRecordata)
        .subscribe({
          next: (response) => {
            this.loadSelfRecords();
          },
          error: (error) => {
            console.error('Error updating  record:', error);
          },
        });
    } else {

      this.patientService
        .saveSelfRecord(this.userData.id, selfRecordata)
        .subscribe({
          next: (response) => {
            this.loadSelfRecords();
          },
          error: (error) => {
            console.error('Error adding reord:', error);
          },
        });
    }

    bootstrap.Modal.getInstance(document.getElementById('selfRecordModal')!)?.hide();
  }

  editSelfRecord(record: any): void {
    this.isEditMode = true;
    this.selfRecordForm.patchValue(record);
    const modal = new bootstrap.Modal(document.getElementById('selfRecordModal')!);
    modal.show();
  }

  deleteSelfRecord(record: any): void {
    this.patientService.deleteSelfRecord(this.userData.id, record.id).subscribe({
      next: (response) => {
        this.loadSelfRecords(); // Reload the list after successful deletion
      },
      error: (error) => {
        console.error('Error deleting clinic:', error); // Handle errors
      }
    });
  }

  sortTable(column: string): void {
    // Toggle the sort direction
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const direction = this.sortDirection[column];

    // Use the sorting service to sort the data
    this.filteredSelfRecords = this.sortingService.sort(this.filteredSelfRecords, column, direction);
  }

  applyDateFilter(): void {
    const { startDate, endDate } = this.filterForm.value;

    this.filteredSelfRecords = this.filteringService.filter(
      this.selfRecords,
      {}, // Pass an empty object for generic filters as no other filters are applied
      [
        {
          field: 'date',
          range: [startDate || null, endDate || null], // Pass null for missing dates
        },
      ]
    );
  }
}
