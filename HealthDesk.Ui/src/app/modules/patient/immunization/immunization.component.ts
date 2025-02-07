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
  selector: 'app-immunization',
  templateUrl: './immunization.component.html',
  styleUrls: ['./immunization.component.scss']
})
export class ImmunizationComponent implements OnInit {
  immunizationRecords: any = [];
  filteredimmunizationRecords: any = [];
  immunizationForm!: FormGroup;
  isEditMode: boolean = false;
  selectedImmunization!: any;
  userData: any = [];
  filterForm!: FormGroup;
  submitted: boolean = true;
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  diseaseFilterCtrl = new FormControl();
  vaccineFilterCtrl = new FormControl();
  dosageFormFilterCtrl = new FormControl();
  routetFilterCtrl = new FormControl();

  filteredDiseases!: Observable<string[]>;
  filteredvaccines!: Observable<string[]>;
  filteredDosageForms!: Observable<string[]>;
  filteredroutes!: Observable<string[]>;
  filteredFrequencies!: Observable<string[]>;

  // Dropdowns
  vaccines: string[] = [];
  dosageForms: string[] = [];
  routes: string[] = [];
  frequencies: string[] = [];
  diseases: string[] = [];

  @ViewChild('immunizationModal') immunizationModal!: ElementRef;

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
        this.vaccines = await this.databaseService.getVaccines();
        this.dosageForms = await this.databaseService.getForms();
        this.routes = await this.databaseService.getRoutes();
        this.diseases = await this.databaseService.getSymptoms();

        // Load treatments
        await this.loadImmunization();
        await this.initializeSearch();

      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForms(): void {
      this.immunizationForm = this.fb.group({
        id: this.fb.control(''),
        date: this.fb.control('', [
          Validators.required,
          this.futureDateValidator
        ]),
        vaccine: this.fb.control('', Validators.required),
        disease: this.fb.control('', Validators.required),
        route: this.fb.control('', Validators.required),
        dosageForm: this.fb.control('', Validators.required),
        details: this.fb.control('', Validators.required),
      });

    this.filterForm = this.fb.group(
      {
        f_startDate: this.fb.control(null),
        f_endDate: this.fb.control(null)
      }
    );

    this.filterForm.valueChanges.subscribe(() => this.applyDateFilter());
  }

  loadImmunization(): void {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }

    this.patientService.getImmunizations(this.userData.id).subscribe({
      next: (data: any) => {
        this.immunizationRecords = data?.data.map((immunizationData: any) => ({
          ...immunizationData
        })).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());;
        this.filteredimmunizationRecords = [...this.immunizationRecords];
      },
      error: (error) => {
        console.error('Error loading symptom:', error);
      }
    });
  }

  initializeSearch(): void {
    this.filteredDiseases = this.diseaseFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.diseases))
    );

    this.filteredvaccines = this.vaccineFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.vaccines))
    );

    this.filteredDosageForms = this.dosageFormFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.dosageForms))
    );

    this.filteredroutes = this.routetFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.routes))
    );
  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  openImmunizationModal(isEditMode: boolean, record: any = null): void {
    this.isEditMode = isEditMode;

    if (isEditMode && record) {
      this.selectedImmunization = record;
      this.immunizationForm.patchValue(record);
    } else {
      this.selectedImmunization = null;
      this.immunizationForm.reset();
    }

    const modal = new bootstrap.Modal(this.immunizationModal.nativeElement);
    modal.show();
  }

  saveImmunization(): void {
    this.immunizationForm.markAllAsTouched();
    if (this.immunizationForm.invalid || !this.userData.id) return;

    if (this.isEditMode) {
      this.patientService.saveImmunization(this.userData.id, this.immunizationForm.value).subscribe({
        next: (response: any) => {
          this.loadImmunization();
        },
        error: (error: any) => {
          console.error('Error updating symptoms:', error);
        },
      });
    } else {
      // Add new medical symptom
      this.patientService
        .saveImmunization(this.userData.id, this.immunizationForm.value)
        .subscribe({
          next: (response) => {
            this.loadImmunization();
          },
          error: (error) => {
            console.error('Error adding symptoms:', error);
          },
        });
    }

    bootstrap.Modal.getInstance(this.immunizationModal.nativeElement)?.hide();
  }



  deleteImmunization(immunization: any): void {
    if (!this.userData.id || !immunization.id) return;

    this.patientService.deleteImmunization(this.userData.id, immunization.id).subscribe({
      next: (response) => {
        console.log(response.message); // Success message from API
        this.loadImmunization(); // Reload the list after successful deletion
      },
      error: (error) => {
        console.error('Error deleting symptom:', error); // Handle errors
      }
    });
  }
  applyDateFilter(): void {
    const { f_startDate, f_endDate } = this.filterForm.value;

    // Apply the date filter using the filtering service
    this.filteredimmunizationRecords = this.filteringService.filter(
      this.immunizationRecords,
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
    this.filteredimmunizationRecords = this.sortingService.sort(this.filteredimmunizationRecords, column, this.sortDirection[column]);
  }

  futureDateValidator(control: any): { [key: string]: boolean } | null {
    const currentDate = new Date();
    if (new Date(control.value) > currentDate) {
      return { futureDate: true };
    }
    return null;
  }
}
