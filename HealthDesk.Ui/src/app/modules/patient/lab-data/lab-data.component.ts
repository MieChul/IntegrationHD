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
  selector: 'app-lab-data',
  templateUrl: './lab-data.component.html',
  styleUrls: ['./lab-data.component.scss']
})
export class LabDataComponent implements OnInit {
  labDataRecords: any = [];
  filteredLabDataRecords: any = [];
  labDataForm!: FormGroup;
  isEditMode: boolean = false;
  selectedLabData!: any;
  userData: any = [];

  diseaseFilterCtrl = new FormControl();
  strengthUnitFilterCtrl = new FormControl();

  filteredDiseases!: Observable<string[]>;
  filteredStrengthUnits!: Observable<string[]>;

  strengthUnits: string[] = [];
  diseases: string[] = [];
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  filterForm!: FormGroup;
  submitted: boolean = true;

  @ViewChild('labDataModal') labDataModal!: ElementRef;

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
        this.strengthUnits = await this.databaseService.getUnits();
        this.diseases = await this.databaseService.getInvestigations();

        // Load treatments
        await this.loadLabRecords();
        await this.initializeSearch();

      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForms(): void {
    this.labDataForm = this.fb.group({
      id: this.fb.control(''),
      laboratoryName: this.fb.control('', Validators.required),
      date: this.fb.control('', [
        Validators.required,
        this.futureDateValidator
      ]),
      time: this.fb.control('', Validators.required),
      labTest: this.fb.control('', Validators.required),
      value: this.fb.control('', Validators.required),
      unit: this.fb.control('', Validators.required),
      price: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^\d{1,9}(\.\d{1,2})?$/)
      ])
    });

    this.filterForm = this.fb.group(
      {
        f_startDate: this.fb.control(null),
        f_endDate: this.fb.control(null)
      }
    );

    this.filterForm.valueChanges.subscribe(() => this.applyDateFilter());
  }

  loadLabRecords(): void {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }

    this.patientService.getLabInvestigations(this.userData.id).subscribe({
      next: (data: any) => {
        this.labDataRecords = data?.data.map((symptomsData: any) => ({
          ...symptomsData
        })).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.dateOfDiagnosis).getTime());;
        this.filteredLabDataRecords = [...this.labDataRecords];
      },
      error: (error) => {
        console.error('Error loading lab data:', error);
      }
    });
  }

  initializeSearch(): void {
    this.filteredDiseases = this.diseaseFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.diseases))
    );

    this.filteredStrengthUnits = this.strengthUnitFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.strengthUnits))
    );


  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  openLabModal(isEditMode: boolean, record: any = null): void {
    this.isEditMode = isEditMode;

    if (isEditMode && record) {
      this.selectedLabData = record;
      this.labDataForm.patchValue(record);
    } else {
      this.selectedLabData = null;
      this.labDataForm.reset();
    }

    const modal = new bootstrap.Modal(this.labDataModal.nativeElement);
    modal.show();
  }

  saveLabData(): void {
    this.labDataForm.markAllAsTouched();
    if (this.labDataForm.invalid || !this.userData.id) return;

    if (this.isEditMode) {
      this.patientService.saveLabInvestigation(this.userData.id, this.labDataForm.value).subscribe({
        next: (response: any) => {
          this.loadLabRecords();
        },
        error: (error: any) => {
          console.error('Error updating symptoms:', error);
        },
      });
    } else {
      // Add new medical lab data
      this.patientService
        .saveLabInvestigation(this.userData.id, this.labDataForm.value)
        .subscribe({
          next: (response) => {
            this.loadLabRecords();
          },
          error: (error) => {
            console.error('Error adding symptoms:', error);
          },
        });
    }

    bootstrap.Modal.getInstance(this.labDataModal.nativeElement)?.hide();
  }


  deleteLabData(record: any): void {
    if (!this.userData.id || !record.id) return;

    this.patientService.deleteLabInvestigation(this.userData.id, record.id).subscribe({
      next: (response) => {
        console.log(response.message); // Success message from API
        this.loadLabRecords(); // Reload the list after successful deletion
      },
      error: (error) => {
        console.error('Error deleting lab data:', error); // Handle errors
      }
    });
  }

  applyDateFilter(): void {
    const { f_startDate, f_endDate } = this.filterForm.value;

    // Apply the date filter using the filtering service
    this.filteredLabDataRecords = this.filteringService.filter(
      this.labDataRecords,
      {},
      [
        {
          field: 'date',
          range: [f_startDate || null, f_endDate || null]
        }
      ]
    );
  }

  sortTable(column: string): void {
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    this.filteredLabDataRecords = this.sortingService.sort(this.filteredLabDataRecords, column, this.sortDirection[column]);
  }

  futureDateValidator(control: any): { [key: string]: boolean } | null {
    const currentDate = new Date();
    if (new Date(control.value) > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

}
