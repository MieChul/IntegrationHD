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
  clinicForm!: FormGroup;
  states = State.getStatesOfCountry('IN');
  cities: any[] = [];
  filteredStates = new BehaviorSubject<any[]>([]);
  filteredCities = new BehaviorSubject<any[]>([]);
  isEditMode: boolean = false;
  currentClinicId: number | null = null; // Store clinic ID if editing
  sortKey: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  stateFilterCtrl = new FormControl();
  cityFilterCtrl = new FormControl();
  days = ['M', 'T', 'W', 'Th', 'F', 'S'];
  submitted = false;
  userData: any;

  constructor(private fb: FormBuilder, private physicianService: PhysicianService, private accountService: AccountService) { }

  ngOnInit(): void {

    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        this.initForm();
        this.filteredStates.next(this.states);
        this.setupSearchFilters();
        //this.loadClinics();// Assign the result to a variable
      }
    });
  }

  initForm(): void {
    const daysGroup: { [key: string]: FormControl } = {};
    this.days.forEach(day => {
      daysGroup[day] = new FormControl(false);
    });

    this.clinicForm = this.fb.group({
      userId: [this.userData.id],
      clinicId:[''],
      name: ['', [Validators.required, Validators.maxLength(25), Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      houseNumber: ['', [Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      building: ['', [Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      area: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      pincode: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      timing: ['', Validators.required],
      isActive: [true],
      days: this.fb.group(daysGroup, { validators: this.validateDaysRequired })
    });
  }

  validateDaysRequired(daysGroup: FormGroup): { [key: string]: boolean } | null {
    const selected = Object.values(daysGroup.controls).some(control => control.value === true);
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
        map(searchTerm => this.states.filter(state => state.name.toLowerCase().includes(searchTerm.toLowerCase())))
      )
      .subscribe(this.filteredStates);

    this.cityFilterCtrl.valueChanges
      .pipe(
        debounceTime(200),
        startWith(''),
        map(searchTerm => this.cities.filter(city => city.name.toLowerCase().includes(searchTerm.toLowerCase())))
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
    this.physicianService.getClinics().subscribe(data => {
      this.clinics = data.map(clinic => ({
        ...clinic,
        fullAddress: this.combineAddress(clinic)
      }));
      this.filteredClinics = [...this.clinics];
    });
  }

  combineAddress(clinic: any): string {
    return [clinic.houseNumber, clinic.building, clinic.area, clinic.city, clinic.state, clinic.pincode]
      .filter(Boolean)
      .join(', ');
  }

  openAddClinicPopup(): void {
    this.isEditMode = false;
    this.currentClinicId = null;
    this.submitted = false;
    this.clinicForm.reset();
    const modal = new bootstrap.Modal(document.getElementById('clinicModal')!);
    modal.show();
  }

  openEditClinicPopup(clinic: any): void {
    this.isEditMode = true;
    this.currentClinicId = clinic.id;
    this.clinicForm.patchValue({
      name: clinic.name,
      houseNumber: clinic.houseNumber || '',
      building: clinic.building || '',
      area: clinic.area || '',
      state: clinic.state || '',
      city: clinic.city || '',
      timing: clinic.timing || '',
      isActive: clinic.isActive || false
    });
    const daysGroup = this.clinicForm.get('days') as FormGroup;
    this.days.forEach(day => daysGroup.get(day)?.setValue(clinic.days.includes(day)));
    const modal = new bootstrap.Modal(document.getElementById('clinicModal')!);
    modal.show();
  }

  saveClinic(): void {
    this.submitted = true;
    if (this.clinicForm.invalid) return;

    const clinicData = { ...this.clinicForm.value, fullAddress: this.combineAddress(this.clinicForm.value) };
    clinicData.days = this.days.filter(day => this.clinicForm.get('days')?.get(day)?.value);

    if (this.isEditMode && this.currentClinicId) {
      this.physicianService.updateClinic({ ...clinicData, id: this.currentClinicId }).subscribe(() => this.loadClinics());
    } else {
      this.physicianService.addClinic(clinicData).subscribe(() => this.loadClinics());
    }

    bootstrap.Modal.getInstance(document.getElementById('clinicModal')!)?.hide();
  }

  deleteClinic(id: number): void {
    this.physicianService.deleteClinic(id).subscribe(() => this.loadClinics());
  }

  searchClinic(): void {
    const searchTerm = this.searchValue.toLowerCase();
    this.filteredClinics = this.clinics.filter(
      clinic =>
        clinic.name.toLowerCase().includes(searchTerm) ||
        clinic.fullAddress.toLowerCase().includes(searchTerm)
    );
  }

  sortTable(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
  }
}
