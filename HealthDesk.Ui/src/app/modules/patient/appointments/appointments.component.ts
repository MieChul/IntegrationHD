import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { PatientService } from '../../services/patient.service';
import { AccountService } from '../../services/account.service';
import { PhysicianService } from '../../services/physician.service';
import { catchError, forkJoin, of, tap, switchMap, Subscription, interval, Observable, startWith, map, concatMap } from 'rxjs';
import { FilteringService } from '../../../shared/services/filter.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  @ViewChild('appointmentModal') appointmentModal!: ElementRef;
  @ViewChild('cancelModal') cancelModal!: ElementRef;
  @ViewChild('acceptModal') acceptModal!: ElementRef;


  activeTab = 'pending';
  pendingAppointments: any = [];
  pastAppointments: any = [];
  cancelledAppointments: any = [];
  filteredAppointments: any = [];
  appointmentForm!: FormGroup;
  dateForm!: FormGroup;
  userData: any;
  submitted: boolean = false;
  selectedAppointment: any = {};
  isEditing: boolean = false;
  currentCarouselIndex: number = 0;
  physicians: any[] = [];
  clinics: any[] = [];
  clinicSubSlots: any = [];
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  availableDates: Date[] = [];
  selectedDate: Date | null = null;
  selectedSubSlot: any = null;
  selectedAppointmentTime: Date | null = null;
  selectedPhysician: any = null;
  selectedClinic: any = null;
  private slotRefreshSub!: Subscription;

  filteredPhysicians!: Observable<any[]>;
  filteredClinics!: Observable<any[]>;
  physicianFilterCtrl = new FormControl();
  clinicFilterCtrl = new FormControl();
  entityId: string | null = null;
  clinicName: string | null = null;


  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private accountService: AccountService,
    private physicianService: PhysicianService,
    private sortingService: SortingService,
    private filteringService: FilteringService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeAvailableDates();
    this.route.queryParams.subscribe(params => {
      this.entityId = params['entityId'];
      this.clinicName = params['clinicName'];
    });
    this.accountService.getUserData().pipe(
      tap((data) => (this.userData = data)),
      concatMap(() => this.loadAppointments()),
      concatMap(() => this.loadPhysicians()),
      concatMap(() => this.initializeSearch())
    ).subscribe({
      next: () => {
        console.log('All initialization calls completed successfully.');
        if (this.entityId && this.clinicName) {
          this.scheduleNewAppointment();
        }
      },
      error: (error: any) => {
        console.error('Error during initialization:', error);
      },
      complete: () => {
        console.log('Initialization sequence completed.');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.slotRefreshSub) {
      this.slotRefreshSub.unsubscribe();
    }
  }

  isEndDateInvalid(): boolean {
    return this.dateForm.get('endDate')?.hasError('invalidEndDate')!;
  }

  // Create available dates for the next 7 days (date carousel)
  initializeAvailableDates(): void {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      this.availableDates.push(new Date(d));
    }
    this.selectedDate = this.availableDates[0];
    this.appointmentForm.patchValue({ date: this.formatDateInput(this.selectedDate) });
  }


  initializeSearch() {
    this.filteredPhysicians = this.physicianFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.physicians))
    );

    this.filteredClinics = this.clinicFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.clinics))
    );
    return of([]);
  }

  filterOptions(search: string, options: any[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private initializeForm(): void {
    this.dateForm = this.fb.group({
      startDate: [''],
      endDate: ['', [this.endDateValidator.bind(this)]],
    });

    this.appointmentForm = this.fb.group({
      id: [''],
      physicianId: ['', Validators.required],
      patientId: [''],
      physicianName: [''],
      mobile: [''],
      date: ['', [Validators.required, this.dateValidator()]],  // Date cannot be in the past
      time: ['', Validators.required],
      clinicName: ['', Validators.required],
      status: [''],
      reason: [''],
      isPhysician: [false],
      patientName: [''],
      slotId: [''],
      slotName: ['']
    });

    this.dateForm.valueChanges.subscribe(() => this.applyDateFilter());
  }

  endDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const startDate = this.dateForm?.get('startDate')?.value;
    if (startDate && control.value && new Date(control.value) < new Date(startDate)) {
      return { invalidEndDate: true };
    }
    return null;
  }

  applyDateFilter(): void {
    const { startDate, endDate } = this.dateForm.value;
    var appointmentsToFilter: any = [];
    switch (this.activeTab) {
      case 'pending':
        appointmentsToFilter = [...this.pendingAppointments];
        break;
      case 'past':
        appointmentsToFilter = [...this.pastAppointments];
        break;
      case 'cancelled':
        appointmentsToFilter = [...this.cancelledAppointments];
        break;
    }

    this.filteredAppointments = this.filteringService.filter(
      appointmentsToFilter,
      {},
      [
        {
          field: 'date',
          range: [startDate || null, endDate || null], // Pass null for missing dates
        },
      ]
    );
  }

  private dateValidator(): Validators {
    return (control: FormControl) => {
      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (inputDate < today) {
        return { pastDate: true };
      }
      return null;
    };
  }

  loadAppointments() {
    return this.patientService.getAppointments(this.userData.id).pipe(
      tap((appointments: any) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        this.pendingAppointments = appointments.data.filter((a: any) =>
          new Date(a.date) >= today && a.status !== 'cancelled' && a.status !== 'rejected'
        );
        this.pastAppointments = appointments.data.filter((a: any) =>
          new Date(a.date) < today && a.status !== 'cancelled' && a.status !== 'rejected'
        );
        this.cancelledAppointments = appointments.data.filter((a: any) =>
          a.status === 'cancelled' || a.status === 'rejected'
        );
        this.filteredAppointments = [...this.pendingAppointments];
      }),
      catchError((error) => {
        console.error('Error loading appointments:', error);
        return of([]);
      })
    );
  }

  loadPhysicians() {
    return this.patientService.getPhysicians().pipe(
      tap((physicians: any) => (this.physicians = physicians.data)),
      catchError((error) => {
        console.error('Error loading physicians:', error);
        this.physicians = [];
        return of([]);
      })
    );
  }

  filterAppointments(status: 'pending' | 'past' | 'cancelled'): void {
    this.activeTab = status;
    switch (status) {
      case 'pending':
        this.filteredAppointments = [...this.pendingAppointments];
        break;
      case 'past':
        this.filteredAppointments = [...this.pastAppointments];
        break;
      case 'cancelled':
        this.filteredAppointments = [...this.cancelledAppointments];
        break;
    }
  }

  scheduleNewAppointment(): void {
    this.isEditing = false;
    this.appointmentForm.reset();
    this.selectedPhysician = null;
    this.selectedClinic = null;
    this.selectedSubSlot = null;
    this.selectedAppointmentTime = null;

    if (this.entityId && this.clinicName) {
      // Wait until physicians and clinics are loaded
      const selectedPhysician = this.physicians.find(p => p.id === this.entityId);

      if (selectedPhysician) {
        this.selectedPhysician = selectedPhysician;
        this.clinics = this.selectedPhysician.clinics;
        this.selectedClinic = this.clinics.find((c: any) => c.name === this.clinicName);

        // Patch form with the pre-selected values
        this.appointmentForm.patchValue({
          physicianId: this.selectedPhysician.id,
          physicianName: this.selectedPhysician.name,
          clinicName: this.selectedClinic ? this.selectedClinic.name : ''
        });

        // Trigger change detection for the filtered dropdowns
        this.physicianFilterCtrl.setValue(this.selectedPhysician.name);
        this.clinicFilterCtrl.setValue(this.selectedClinic?.name);

        // Load available dates and slots for the selected clinic
        if (this.selectedClinic) {
          this.updateAvailableDates();

          const firstValidDate = this.availableDates.find((d, index) => index !== 0 && index !== this.availableDates.length - 1);

          if (firstValidDate) {
            this.selectedDate = firstValidDate;
            this.appointmentForm.patchValue({ date: this.formatDateInput(this.selectedDate) });

            this.fetchClinicSlots(this.selectedDate).subscribe();
          }

          this.startSlotAutoRefresh();
        }
      }
    }

    // Show the modal after all selections are patched
    const modal = new Modal(this.appointmentModal.nativeElement);
    modal.show();
  }


  // When a physician is selected, patch both the ID and name.
  onPhysicianChange(physicianId: string): void {
    this.selectedDate = null;
    this.clinicSubSlots = null;
    const selected = this.physicians.find(p => p.id === physicianId);
    if (selected) {
      this.appointmentForm.patchValue({
        physicianId: selected.id,
        physicianName: selected.name
      });
      this.selectedPhysician = selected;
      // Use the clinics from the physician object
      this.clinics = this.selectedPhysician.clinics;
    }
  }

  // When a clinic is selected, patch the clinic name.
  onClinicChange(clinicName: string): void {
    this.selectedClinic = this.clinics.find(c => c.name === clinicName);

    if (this.selectedClinic) {
      this.updateAvailableDates();

      const firstValidDate = this.availableDates.find((d, index) => index !== 0 && index !== this.availableDates.length - 1);

      if (firstValidDate) {
        this.selectedDate = firstValidDate;
        this.appointmentForm.patchValue({ date: this.formatDateInput(this.selectedDate) });

        this.fetchClinicSlots(this.selectedDate).subscribe();
      }

      this.startSlotAutoRefresh();
    }
  }

  fetchClinicSlots(selectedDate: Date): Observable<any> {
    if (!this.selectedPhysician || !this.selectedClinic) {
      console.warn("Physician or Clinic is not selected.");
      return of([]); // Return empty observable
    }

    const formattedDate = selectedDate.toISOString().split('T')[0];

    return this.physicianService.getClinicSlots(this.selectedPhysician.id, this.selectedClinic.id, formattedDate).pipe(
      tap((response: any) => {
        this.clinicSubSlots = response.data;
      }),
      catchError(error => {
        console.error('Error fetching clinic slots:', error);
        return of([]); // Return empty array in case of error
      })
    );
  }



  startSlotAutoRefresh(): void {
    if (this.slotRefreshSub) {
      this.slotRefreshSub.unsubscribe();
    }
    if (this.selectedDate) {
      this.slotRefreshSub = interval(15000).pipe(
        tap(() => this.fetchClinicSlots(this.selectedDate ?? new Date())),
        catchError(error => {
          console.error('Error auto-refreshing slots:', error);
          return of([]);
        })
      ).subscribe();
    }
  }

  // When a sub-slot is clicked, compute the appointment time.
  selectSubSlot(slot: any, subSlot: any): void {
    if (!this.selectedClinic) return;

    if (subSlot.availableCount <= 0) {
      console.warn('This slot is fully booked.');
      return;
    }

    const maxPatients = this.selectedClinic.maxNumberOfPatients;
    const booked = subSlot.bookedCount;
    const minutesPerPatient = 60 / maxPatients;

    // Ensure selectedDate is correctly initialized
    const appointmentTime = new Date(this.selectedDate!.toISOString());

    // Parse `subSlot.startTime` (Expected format: "10:30 AM", "02:00 PM")
    let timeParts = subSlot.startTime.match(/(\d+):(\d+) (\w{2})/);

    if (!timeParts) {
      console.error('Invalid startTime format:', subSlot.startTime);
      return;
    }

    let hours = parseInt(timeParts[1], 10);
    let minutes = parseInt(timeParts[2], 10);
    let period = timeParts[3]; // AM or PM

    // Convert to 24-hour format
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    // Set extracted hours & minutes
    appointmentTime.setHours(hours, minutes, 0);

    // Adjust appointment time dynamically based on booked count
    appointmentTime.setMinutes(appointmentTime.getMinutes() + Math.floor(booked * minutesPerPatient));

    // Update selected slot and appointment details
    this.selectedSubSlot = subSlot;
    this.selectedAppointmentTime = new Date(appointmentTime);  // ✅ Ensures correct format

    // Update form with properly formatted 12-hour time
    this.appointmentForm.patchValue({
      time: this.selectedAppointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      slotId: slot.id,
      slotName: slot.name
    });

    console.log('Selected Appointment Time:', this.selectedAppointmentTime); // Debugging output
  }





  // Save the appointment using the form values.
  saveAppointment(): void {
    this.submitted = true;
    if (this.appointmentForm.invalid) {
      Object.keys(this.appointmentForm.controls).forEach((key) => {
        const control = this.appointmentForm.get(key);
        if (control) { control.markAsTouched(); }
      });
      console.error('Form is invalid. Please fix the errors.');
      return;
    }
    const formData = this.appointmentForm.value;
    formData.patientId = this.userData.id;
    formData.date = new Date(formData.date);
    formData.status = 'pending';
    // Build payload using camelCase keys
    const appointmentPayload = this.isEditing
      ? { ...this.selectedAppointment, ...formData }
      : {
        id: formData.id,
        physicianId: formData.physicianId,
        patientId: formData.patientId,
        physicianName: formData.physicianName,
        clinicName: formData.clinicName,
        date: formData.date,
        time: formData.time,
        status: 'pending',
        patientName: formData.patientName,
        mobile: formData.mobile,
        reason: '',
        slotId: formData.slotId,
        slotName: formData.slotName
      };
    this.patientService.saveAppointment(this.userData.id, appointmentPayload)
      .pipe(
        switchMap(() => this.loadAppointments()),
        tap(() => {
          const modal = Modal.getInstance(this.appointmentModal.nativeElement);
          modal?.hide();
        }),
        catchError((error) => {
          console.error('Error saving appointment:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  editAppointment(appointment: any): void {
    if (appointment.status !== 'pending') {
      console.error('Rescheduling is allowed only for pending appointments.');
      return;
    }

    this.isEditing = true;
    this.selectedAppointment = appointment;

    // Convert date to the correct format
    const appointmentDate = new Date(appointment.date);
    const formattedDate = this.formatDateInput(appointmentDate);

    // Patch the form with existing appointment data
    this.appointmentForm.patchValue({
      id: appointment.id,
      physicianId: appointment.physicianId,
      patientId: this.userData.id,
      date: formattedDate,
      time: appointment.time,
      clinicName: appointment.clinicName,
      status: appointment.status,
      mobile: appointment.mobile,
      isPhysician: false,
      patientName: appointment.patientName,
      slotId: appointment.slotId || '',
      slotName: appointment.slotName || '',
      physicianName: appointment.physicianName
    });

    // Set the selected physician and clinic based on the appointment
    this.selectedPhysician = this.physicians.find(p => p.id === appointment.physicianId) || null;
    this.selectedClinic = this.selectedPhysician?.clinics.find((c: any) => c.name === appointment.clinicName) || null;

    if (this.selectedClinic) {
      // Ensure the correct date is selected and displayed in the carousel
      const dateIndex = this.availableDates.findIndex(d => d.toDateString() === appointmentDate.toDateString());

      if (dateIndex > 0 && dateIndex < this.availableDates.length - 1) {
        this.currentCarouselIndex = dateIndex;
        this.selectedDate = this.availableDates[this.currentCarouselIndex];
      } else {
        this.selectedDate = this.availableDates[1]; // Default to the first valid date
      }

      // ⏳ Use RxJS to fetch clinic slots before highlighting
      this.fetchClinicSlots(this.selectedDate).pipe(
        tap(() => this.highlightSelectedSubSlot(appointment))
      ).subscribe({
        next: () => {
          // Show the modal after everything is preloaded
          const modal = new Modal(this.appointmentModal.nativeElement);
          modal.show();
        },
        error: (err: any) => console.error('Error fetching clinic slots:', err)
      });
    }
  }

  highlightSelectedSubSlot(appointment: any): void {
    if (!this.selectedClinic || !this.selectedDate || !this.clinicSubSlots.length) return;

    for (let slot of this.clinicSubSlots) {
      if (slot.id === appointment.slotId) {
        const subSlot = slot.subSlots.find((s: any) => this.compareTime(s.startTime, appointment.time));

        if (subSlot) {
          this.selectedSubSlot = subSlot;
          this.selectedAppointmentTime = new Date(this.selectedDate);

          const [hours, minutes] = this.parseTime(subSlot.startTime);
          this.selectedAppointmentTime.setHours(hours, minutes, 0);

          // Update form with the correct slot details
          this.appointmentForm.patchValue({
            time: this.selectedAppointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            slotId: slot.id,
            slotName: slot.name
          });
        }
        break;
      }
    }
  }

  /** Compare time in 12-hour or 24-hour format */
  compareTime(slotTime: string, appointmentTime: string): boolean {
    return this.convertTo24Hour(slotTime) === this.convertTo24Hour(appointmentTime);
  }

  /** Convert any time format (12-hour or 24-hour) into a 24-hour time string */
  convertTo24Hour(time: string): string {
    let [hours, minutes] = time.split(':').map(Number);
    const isPM = time.toLowerCase().includes('pm');
    if (isPM && hours < 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  /** Parse time string to hours and minutes */
  parseTime(time: string): [number, number] {
    const [hours, minutes] = time.split(':').map(Number);
    return [hours, minutes];
  }

  openCancelModal(appointment: any): void {
    this.selectedAppointment = { ...appointment };
    const modal = new Modal(this.cancelModal.nativeElement);
    modal.show();
  }

  openAcceptModal(appointment: any): void {
    this.selectedAppointment = { ...appointment };
    const modal = new Modal(this.acceptModal.nativeElement);
    modal.show();
  }

  acceptAppointment(): void {
    const updatedAppointment = { ...this.selectedAppointment, status: 'accepted' };
    this.patientService.saveAppointment(this.userData.id, updatedAppointment)
      .pipe(
        switchMap(() => this.loadAppointments()),
        tap(() => console.log('Appointment accepted successfully')),
        catchError((error) => {
          console.error('Error accepting appointment:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  cancelAppointment(reason: string): void {

    if (!reason.trim()) {
      console.error('Reason for cancellation is required.');
      return;
    }

    const updatedAppointment = {
      ...this.selectedAppointment,
      status: 'cancelled',
      reason: reason,
    };

    this.patientService.saveAppointment(this.userData.id, updatedAppointment)
      .pipe(
        switchMap(() => this.loadAppointments()),
        tap(() => {
          const modal = Modal.getInstance(this.cancelModal.nativeElement);
          modal?.hide();
        }),
        catchError((error) => {
          console.error('Error cancelling appointment:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  getDayShort(date: Date): string {
    const days = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S'];
    return days[date.getDay()];
  }

  /** Format a Date to 'yyyy-mm-dd' for form binding. */
  formatDateInput(date: Date): string {
    return date.toISOString().substring(0, 10);
  }

  updateAvailableDates(): void {
    if (!this.selectedClinic || !this.selectedClinic.days) {
      this.availableDates = [];
      return;
    }

    this.availableDates = [];
    const today = new Date();
    let date = new Date(today);
    let count = 0;

    // Collect exactly 7 valid available dates from today onward based on clinic days
    while (this.availableDates.length < 7 && count < 30) {
      const dayShort = this.getDayShort(date);
      if (this.selectedClinic.days.includes(dayShort)) {
        this.availableDates.push(new Date(date));
      }
      date.setDate(date.getDate() + 1);
      count++;
    }

    // Add cushion dates
    if (this.availableDates.length > 0) {
      const firstCushionDate = new Date(this.availableDates[0]);
      firstCushionDate.setDate(firstCushionDate.getDate() - 1);
      this.availableDates.unshift(firstCushionDate);
    }

    if (this.availableDates.length > 1) {
      const lastCushionDate = new Date(this.availableDates[this.availableDates.length - 1]);
      lastCushionDate.setDate(lastCushionDate.getDate() + 1);
      this.availableDates.push(lastCushionDate);
    }

    // Set the default selection at the center of the first three visible dates
    this.currentCarouselIndex = 1; // Ensures 7th Feb (first valid date) is at the center
    this.selectedDate = this.availableDates[this.currentCarouselIndex];

    this.appointmentForm.patchValue({ date: this.formatDateInput(this.selectedDate) });

    console.log('Updated available dates:', this.availableDates);
  }

  /** Get only the 3 visible dates for the carousel */
  get visibleDates(): Date[] {
    return this.availableDates.slice(this.currentCarouselIndex - 1, this.currentCarouselIndex + 2);
  }

  /** Move to the previous date, ensuring the selected date remains at the center */
  previousDateCarousel(): void {
    if (this.currentCarouselIndex > 1) { // Ensure we don't move into the first cushion date
      this.currentCarouselIndex--;
      this.selectedDate = this.availableDates[this.currentCarouselIndex];
      this.appointmentForm.patchValue({ date: this.formatDateInput(this.selectedDate), slotId: '', slotName: '', time: '' });
      this.selectedSubSlot = null;
      this.selectedAppointmentTime = null;
      this.fetchClinicSlots(this.selectedDate).subscribe();
    }
  }

  /** Move to the next date, ensuring the selected date remains at the center */
  nextDateCarousel(): void {
    if (this.currentCarouselIndex < this.availableDates.length - 2) { // Prevent selecting last cushion date
      this.currentCarouselIndex++;
      this.selectedDate = this.availableDates[this.currentCarouselIndex];
      this.appointmentForm.patchValue({ date: this.formatDateInput(this.selectedDate), slotId: '', slotName: '', time: '' });
      this.selectedSubSlot = null;
      this.selectedAppointmentTime = null;
      this.fetchClinicSlots(this.selectedDate).subscribe();
    }
  }

  /** Directly set the selected date from the carousel, maintaining rolling effect */
  selectDate(date: Date): void {
    const index = this.availableDates.findIndex(d => d.toDateString() === date.toDateString());

    if (index > 1 && index < this.availableDates.length - 2) { // Ensure not selecting cushion dates
      this.currentCarouselIndex = index;
      this.selectedDate = this.availableDates[this.currentCarouselIndex];
      this.appointmentForm.patchValue({ date: this.formatDateInput(this.selectedDate), slotId: '', slotName: '', time: '' });
      this.selectedSubSlot = null;
      this.selectedAppointmentTime = null;
      this.fetchClinicSlots(this.selectedDate).subscribe();
    }
  }

  /** Compute carousel offset for smooth scrolling */
  getCarouselOffset(): number {
    const itemWidth = 100; // Width of each date-item in px
    const itemMargin = 10; // Margin (assumed total horizontal margin) in px
    const containerWidth = 140; // Fixed width of carousel-3d-wrapper in px

    // Offset so that the selected item (currentCarouselIndex) is centered
    return (this.currentCarouselIndex - 1) * (itemWidth + itemMargin) - (containerWidth / 2 - itemWidth / 2);
  }

  sortTable(column: string): void {
    // Toggle the sort direction
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const direction = this.sortDirection[column];

    // Use the sorting service to sort the data
    this.filteredAppointments = this.sortingService.sort(this.filteredAppointments, column, direction);
  }
}
