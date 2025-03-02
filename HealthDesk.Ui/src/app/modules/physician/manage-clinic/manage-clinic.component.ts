import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, map, startWith } from 'rxjs';
import { PhysicianService } from '../../services/physician.service';
import { State, City } from 'country-state-city';
import * as bootstrap from 'bootstrap';
import { AccountService } from '../../services/account.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { FilteringService } from '../../../shared/services/filter.service';

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
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  stateFilterCtrl = new FormControl();
  cityFilterCtrl = new FormControl();
  days = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S'];
  submitted = false;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private physicianService: PhysicianService,
    private accountService: AccountService,
    private sortingService: SortingService,
    private filteringService: FilteringService
  ) { }

  ngOnInit(): void {
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
      name: ['', [Validators.required, Validators.maxLength(25), Validators.pattern(/^[a-zA-Z0-9@ ,\/\\'.-]+$/)]],
      flatNumber: ['', [Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9@ ,\/\\'.-]+$/)]],
      building: ['', [Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9@ ,\/\\'.-]+$/)]],
      area: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9@ ,\/\\'.-]+$/)]],
      pinCode: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      isActive: [],
      days: this.fb.group(daysGroup, { validators: this.validateDaysRequired } as AbstractControlOptions),
      maxNumberOfPatients: ['', [Validators.required, Validators.min(0)]],
      clinicSlots: this.fb.array([], this.validateSlotOverlap.bind(this))
    });
  }

  validateDaysRequired(daysGroup: FormGroup): { [key: string]: boolean } | null {
    const selected = Object.values(daysGroup.controls).some((control) => control.value === true);
    return selected ? null : { daysRequired: true };
  }

  getDayControl(day: string): FormControl {
    return this.clinicForm.get('days')?.get(day) as FormControl;
  }

  get clinicSlots(): FormArray<FormGroup> {
    return this.clinicForm.get('clinicSlots') as FormArray<FormGroup>;
  }

  addSlot(slotData?: any): void {
    const slotGroup = this.fb.group({
      id: [slotData ? slotData.id : ''],

      name: [
        slotData ? slotData.name : '',
        [Validators.required, Validators.maxLength(10), Validators.pattern('^[a-zA-Z0-9]+$')]
      ],

      timingFrom: [
        slotData ? slotData.timingFrom : '',
        [Validators.required]
      ],
      timingTo: [
        slotData ? slotData.timingTo : '',
        [Validators.required]
      ]
    }, { validators: this.validateTimeRange.bind(this) });

    // Subscribe to changes so that the custom validator updates immediately.
    slotGroup.get('timingFrom')?.valueChanges.subscribe(() => {
      slotGroup.updateValueAndValidity();
      this.clinicSlots.updateValueAndValidity();
    });
    slotGroup.get('timingTo')?.valueChanges.subscribe(() => {
      slotGroup.updateValueAndValidity();
      this.clinicSlots.updateValueAndValidity();
    });
    this.clinicSlots.push(slotGroup);
  }


  parseTime12(timeStr: string): number | null {
    const parts = timeStr.trim().split(' ');
    if (parts.length < 2) return null; // Expecting "hh:mm AM/PM"
    const timePart = parts[0]; // e.g. "1:15" or "01:15"
    const period = parts[1].toUpperCase(); // AM or PM
    const [hoursStr, minutesStr = '0'] = timePart.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    if (isNaN(hours) || isNaN(minutes)) return null;
    let adjustedHours = hours;
    if (period === 'PM' && hours < 12) {
      adjustedHours += 12;
    } else if (period === 'AM' && hours === 12) {
      adjustedHours = 0;
    }
    return adjustedHours * 60 + minutes;
  }


  validateTimeRange(group: FormGroup): ValidationErrors | null {
    const from = group.get('timingFrom')?.value;
    const to = group.get('timingTo')?.value;
    if (!from || !to) {
      return null;
    }
    const fromTotal = this.parseTime12(from);
    const toTotal = this.parseTime12(to);
    if (fromTotal === null || toTotal === null) {
      return { timeFormat: 'Invalid time format' };
    }
    if (toTotal < fromTotal) {
      return { timeRange: 'Time difference cannot exceed 12 hours' };
    }
    if (toTotal - fromTotal > 720) { // 9 hours = 540 minutes
      return { timeRange: 'Time difference cannot exceed 12 hours' };
    }
    return null;
  }

  // Update validateSlotOverlap:
  validateSlotOverlap(control: AbstractControl): ValidationErrors | null {
    const formArray = control as FormArray;
    const slots = formArray.controls;
    for (let i = 0; i < slots.length; i++) {
      const slot1 = slots[i];
      const from1 = slot1.get('timingFrom')?.value;
      const to1 = slot1.get('timingTo')?.value;
      if (!from1 || !to1) continue;
      const start1 = this.parseTime12(from1);
      const end1 = this.parseTime12(to1);
      if (start1 === null || end1 === null) continue;
      for (let j = i + 1; j < slots.length; j++) {
        const slot2 = slots[j];
        const from2 = slot2.get('timingFrom')?.value;
        const to2 = slot2.get('timingTo')?.value;
        if (!from2 || !to2) continue;
        const start2 = this.parseTime12(from2);
        const end2 = this.parseTime12(to2);
        if (start2 === null || end2 === null) continue;
        // Check overlap: if slot1 starts before slot2 ends and slot2 starts before slot1 ends
        if (start1 < end2 && start2 < end1) {
          return { overlap: 'Slot timings cannot overlap' };
        }
      }
    }
    return null;
  }

  removeSlot(index: number): void {
    this.clinicSlots.removeAt(index);
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
        this.clinics = data?.data.map((clinic: any) => ({ ...clinic }));
        this.filteredClinics = [...this.clinics];
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

    this.clinicSlots.clear();
    this.addSlot();
    // Open the modal
    const modal = new bootstrap.Modal(document.getElementById('clinicModal')!);
    modal.show();
  }

  openEditClinicPopup(clinic: any): void {
    this.isEditMode = true;
    this.currentClinicId = clinic.id;

    // Patch form values for other fields
    this.clinicForm.patchValue({
      id: clinic.id,
      name: clinic.name,
      flatNumber: clinic.flatNumber || '',
      building: clinic.building || '',
      area: clinic.area || '',
      state: clinic.state || '',
      city: clinic.city || '',
      isActive: clinic.isActive || false,
      pinCode: clinic.pinCode || '',
      maxNumberOfPatients: clinic.maxNumberOfPatients || ''
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
    const clinicDays = Array.isArray(clinic.days) ? clinic.days : [];
    this.days.forEach(day => daysGroup.get(day)?.setValue(clinicDays.includes(day)));

    // **Clear any existing slots and load the saved slot details**
    this.clinicSlots.clear();
    if (clinic.clinicSlots && clinic.clinicSlots.length) {
      clinic.clinicSlots.forEach((slot: any) => {
        this.addSlot(slot);
      });
    }
    else
      this.addSlot();

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('clinicModal')!);
    modal.show();
  }

  saveClinic(): void {
    this.submitted = true;
    this.clinicForm.markAllAsTouched();
    this.clinicForm.updateValueAndValidity();

    if (this.clinicForm.invalid) return;

    // Prepare the clinic data, including the days
    const clinicData = { ...this.clinicForm.value };

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

  sortTable(column: string): void {
    // Toggle the sort direction
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const direction = this.sortDirection[column];

    // Use the sorting service to sort the data
    this.filteredClinics = this.sortingService.sort(this.filteredClinics, column, direction);
  }

  applyFilters(): void {
    this.filteredClinics = this.filteringService.filter(
      this.clinics,
      {
        name: this.searchValue
      },
      []
    );
  }
}
