import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, map, startWith } from 'rxjs';
import { PhysicianService } from '../../services/physician.service';
import { State, City } from 'country-state-city';
import * as bootstrap from 'bootstrap';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-manage-clinic',
  templateUrl: './manage-clinic.component.html',
  styleUrls: ['./manage-clinic.component.scss']
})
export class ManageClinicComponent implements OnInit {
  clinics: any[] = [];
  filteredClinics: any[] = [];
  searchValue: string = '';
  clinicForm: FormGroup = new FormGroup({});
  states = State.getStatesOfCountry('IN');
  cities: any[] = [];
  filteredStates = new BehaviorSubject<any[]>([]);
  filteredCities = new BehaviorSubject<any[]>([]);
  isEditMode: boolean = false;
  currentClinicId: number | null = null;
  sortKey: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  stateFilterCtrl = new FormControl();
  cityFilterCtrl = new FormControl();
  days = ['M', 'T', 'W', 'Th', 'F', 'S'];
  submitted = false;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private physicianService: PhysicianService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    // Initialize form first
    this.initForm();

    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        this.filteredStates.next(this.states);
        this.setupSearchFilters();
        this.loadClinics();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initForm(): void {
    const daysGroup: { [key: string]: FormControl } = {};
    this.days.forEach((day) => {
      daysGroup[day] = new FormControl(false);
    });

    this.clinicForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(25), Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      flatNumber: ['', [Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      building: ['', [Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      area: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      pinCode: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      timing: ['', Validators.required],
      isActive: [false],
      days: this.fb.group(daysGroup, { validators: this.validateDaysRequired })
    });
  }

  validateDaysRequired(daysGroup: FormGroup): { [key: string]: boolean } | null {
    const selected = Object.values(daysGroup.controls).some((control) => control.value === true);
    return selected ? null : { daysRequired: true };
  }

  getDayControl(day: string): FormControl {
    return this.clinicForm.get('days')?.get(day) as FormControl;
  }

  setupSearchFilters(): void {
    this.stateFilterCtrl.valueChanges
      .pipe(
        debounceTime(200),
        startWith(''),
        map((searchTerm) => this.states.filter((state) => state.name.toLowerCase().includes(searchTerm.toLowerCase())))
      )
      .subscribe(this.filteredStates);

    this.cityFilterCtrl.valueChanges
      .pipe(
        debounceTime(200),
        startWith(''),
        map((searchTerm) => this.cities.filter((city) => city.name.toLowerCase().includes(searchTerm.toLowerCase())))
      )
      .subscribe(this.filteredCities);
  }

  onStateChange(event: any): void {
    const stateCode = event?.value;
    if (stateCode) {
      this.cities = City.getCitiesOfState('IN', stateCode);
      this.filteredCities.next(this.cities);
    } else {
      this.cities = [];
      this.filteredCities.next([]);
    }
  }

  loadClinics(): void {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }

    this.physicianService.getClinics(this.userData.id).subscribe({
      next: (data: any) => {
        this.clinics = data?.data.map((clinic: any) => ({
          ...clinic
        }));
        this.filteredClinics = [...this.clinics];
      },
      error: (error) => {
        console.error('Error loading clinics:', error);
      }
    });
  }

  combineAddress(clinic: any): string {
    return [clinic.flatNumber, clinic.building, clinic.area, clinic.city, clinic.state, clinic.pinCode]
      .filter(Boolean)
      .join(', ');
  }

  openAddClinicPopup(): void {
    this.isEditMode = false;
    this.currentClinicId = null;
    this.submitted = false;
  
    // Reset the form
    this.clinicForm.reset();
  
    // Reset the days FormGroup explicitly
    const daysGroup = this.clinicForm.get('days') as FormGroup;
    this.days.forEach((day) => daysGroup.get(day)?.setValue(false));
  
  
    // Open the modal
    const modal = new bootstrap.Modal(document.getElementById('clinicModal')!);
    modal.show();
  }

  openEditClinicPopup(clinic: any): void {
    this.isEditMode = true;
    this.currentClinicId = clinic.id;
  
    // Patch form values
    this.clinicForm.patchValue({
      id: clinic.id,
      name: clinic.name,
      flatNumber: clinic.flatNumber || '',
      building: clinic.building || '',
      area: clinic.area || '',
      state: clinic.state || '',
      city: clinic.city || '',
      timing: clinic.timing || '',
      isActive: clinic.isActive || false,
      pinCode: clinic.pinCode || ''
    });
  
    // Load cities if the state is present
    if (clinic.state) {
      this.cities = City.getCitiesOfState('IN', clinic.state);
      this.filteredCities.next(this.cities);
    } else {
      this.cities = [];
      this.filteredCities.next([]);
    }
  
    // Map days to the form
    const daysGroup = this.clinicForm.get('days') as FormGroup;
    const clinicDays = Array.isArray(clinic.days) ? clinic.days : []; // Ensure clinic.days is an array
    this.days.forEach(day => daysGroup.get(day)?.setValue(clinicDays.includes(day)));
  
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('clinicModal')!);
    modal.show();
  }

  saveClinic(): void {
    this.submitted = true;
    this.clinicForm.markAllAsTouched();
    if (this.clinicForm.invalid) return;
  
    // Prepare the clinic data, including the days
    const clinicData = { ...this.clinicForm.value};
  
    // Add the selected days
    clinicData.days = this.days.filter((day) => this.clinicForm.get('days')?.get(day)?.value);
  
    if (this.isEditMode && this.currentClinicId) {
      this.physicianService.addUpdateClinic(this.userData.id, { ...clinicData, id: this.currentClinicId }).subscribe(() => this.loadClinics());
    } else {
      this.physicianService.addUpdateClinic(this.userData.id, clinicData).subscribe(() => this.loadClinics());
    }
  
    // Close the modal
    bootstrap.Modal.getInstance(document.getElementById('clinicModal')!)?.hide();
  }

  deleteClinic(id: string): void {
    this.physicianService.deleteClinic(this.userData.id, id).subscribe({
      next: (response) => {
        console.log(response.message); // Success message from API
        this.loadClinics(); // Reload the list after successful deletion
      },
      error: (error) => {
        console.error('Error deleting clinic:', error); // Handle errors
      }
    });
  }

  searchClinic(): void {
    const searchTerm = this.searchValue.toLowerCase();
  
    this.filteredClinics = this.clinics.filter((clinic) => {
      // Combine all address fields into a single string
      const address = [
        clinic.flatNumber,
        clinic.building,
        clinic.area,
        clinic.city,
        clinic.state,
        clinic.pinCode,
      ]
        .filter(Boolean) // Exclude undefined or null values
        .join(' ')
        .toLowerCase();
  
      // Check if the search term matches the name or any part of the address
      return (
        clinic.name.toLowerCase().includes(searchTerm) ||
        address.includes(searchTerm)
      );
    });
  }
  
  sortTable(key: string): void {
    if (this.sortKey === key) {
      // Toggle the sort direction if the same column is clicked
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the new sort key and default sort direction
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
  
    this.filteredClinics.sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];
  
      // Handle null or undefined values
      valueA = valueA === undefined || valueA === null ? '' : valueA;
      valueB = valueB === undefined || valueB === null ? '' : valueB;
  
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        // String comparison (case-insensitive)
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
  
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0; // Equal values
    });
  }
}
