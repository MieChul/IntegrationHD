import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import { Appointment } from '../../../shared/models/appointment';
import { AccountService } from '../../services/account.service';
import { catchError, forkJoin, Observable, of, switchMap, tap } from 'rxjs';
import { PhysicianService } from '../../services/physician.service';
import { PatientService } from '../../services/patient.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { FilteringService } from '../../../shared/services/filter.service';
import { Tooltip } from 'bootstrap';

@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.scss'],
  providers: [NgbTooltipConfig],
})
export class ManageAppointmentsComponent implements OnInit {
  @ViewChild('proposeTimeModal') proposeTimeModal!: ElementRef;
  @ViewChild('rejectReasonModal') rejectReasonModal!: ElementRef;

  ngAfterViewInit(): void {
    this.setupModalEventListeners();
  }

  /** ✅ Attach Event Listeners for Modal Close Events */
  setupModalEventListeners(): void {
    const proposeModalEl = this.proposeTimeModal.nativeElement;
    const rejectModalEl = this.rejectReasonModal.nativeElement;

    proposeModalEl.addEventListener('hidden.bs.modal', () => {
      this.onModalClose();
    });

    rejectModalEl.addEventListener('hidden.bs.modal', () => {
      this.onModalClose();
    });
  }

  proposeTimeForm!: FormGroup;
  rejectReasonForm!: FormGroup;
  isMultipleAction: boolean = false;
  toggleAllChecked: boolean = false;

  filteredAppointments: any = [];
  appointments: any = [];
  currentCarouselIndex: number = 0;
  availableDates: Date[] = [];
  selectedDate: Date | null = null;
  selectedAppointment!: any;
  clinics: any[] = [];
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  userData: any;
  today: Date = new Date();
  status = ''
  multipleSelectedAppointments: any[] = [];



  constructor(private fb: FormBuilder, config: NgbTooltipConfig, private accountService: AccountService, private physicianService: PhysicianService, private patientService: PatientService, private sortingService: SortingService, private filteringService: FilteringService) {
    config.placement = 'top';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.initializeTooltips();
    this.initializeForms();
    this.updateAvailableDates();
    this.accountService.getUserData().pipe(
      tap((data) => (this.userData = data)),
      switchMap(() => forkJoin([this.loadAppointments(), this.loadClinics()])),
      catchError((error) => {
        console.error('Error during initialization:', error);
        return of([]);
      })
    ).subscribe();
  }

  initializeTooltips(): void {
    setTimeout(() => {
      const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipElements.forEach(el => new Tooltip(el));
    }, 500);
  }

  private initializeForms(): void {

    this.proposeTimeForm = this.fb.group({
      date: ['', [Validators.required, this.pastDateValidator()]],
      time: ['', Validators.required],
      clinicName: ['', Validators.required],
      physicianId: [''],
      patientId: [''],
      physicianName: [''],
      mobile: [''],
      patientName: ['']
    });

    this.rejectReasonForm = this.fb.group({
      reason: ['', Validators.required],
    });
  }

  pastDateValidator() {
    return (control: any) => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Remove time part for comparison
      return selectedDate >= today ? null : { pastDate: true };
    };
  }

  loadClinics(): Observable<any> {
    if (!this.userData?.id) {
      console.error('User data or user ID is undefined.');
      return of({ data: [] }); // Return an empty observable
    }

    return this.physicianService.getClinics(this.userData.id).pipe(
      tap((clinics: any) => {
        this.clinics = clinics.data || []; // Safely assign clinics
      }),
      catchError((error) => {
        console.error('Error loading clinics:', error);
        this.clinics = []; // Clear clinics on error
        return of({ data: [] }); // Return empty data on error
      })
    );
  }

  loadAppointments(): Observable<any> {
    if (!this.userData?.id) {
      console.error('User data or user ID is undefined.');
      return of({ data: [] }); // Return an empty observable to avoid breaking forkJoin
    }

    return this.patientService.getAppointments(this.userData.id, true).pipe(
      tap((appointments: any) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        this.appointments = appointments.data;
        this.applyFilters();
      }),
      catchError((error) => {
        console.error('Error loading appointments:', error);
        return of({ data: [] }); // Return empty data on error
      })
    );
  }


  acceptAppointment(appointment: Appointment): void {
    const updatedAppointment = {
      ...appointment,
      status: 'accepted', // Update the status to accepted
    };

    this.patientService.saveAppointment(appointment.patientId, updatedAppointment)
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

  proposetime(appointment: Appointment, isMultiple: boolean = false): void {
    this.selectedAppointment = { ...appointment };

    this.proposeTimeForm.reset(); // Reset the form before patching
    this.proposeTimeForm.patchValue({
      ...this.selectedAppointment
    });

    const modal = new Modal(this.proposeTimeModal.nativeElement);
    modal.show();
  }

  async confirmReject(): Promise<void> {
    if (this.rejectReasonForm.invalid) {
      Object.keys(this.rejectReasonForm.controls).forEach((key) => {
        this.rejectReasonForm.get(key)?.markAsTouched();
      });
      console.error('Form is invalid. Please fix the errors.');
      return;
    }

    const reason = this.rejectReasonForm.value.reason;
    if (this.selectedAppointment) {
      const updatedAppointment = {
        ...this.selectedAppointment,
        status: 'rejected', // Update the status to cancelled
        reason: reason,      // Add the cancellation reason
      };

      this.patientService.saveAppointment(updatedAppointment.patientId, updatedAppointment)
        .pipe(
          switchMap(() => this.loadAppointments()),
          tap(() => {
            const rejectReasonModalInstance = Modal.getInstance(this.rejectReasonModal.nativeElement);
            rejectReasonModalInstance?.hide();
          }),
          catchError((error) => {
            console.error('Error cancelling appointment:', error);
            return of(null);
          })
        )
        .subscribe();
    }
  }

  rejectAppointment(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    const modalInstance = new Modal(this.rejectReasonModal.nativeElement);
    modalInstance.show();
  }


  saveProposedTime(): void {

    if (this.proposeTimeForm.invalid) {
      // Mark all controls as touched to show validation errors
      Object.keys(this.proposeTimeForm.controls).forEach((key) => {
        const control = this.proposeTimeForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      console.error('Form is invalid. Please fix the errors.');
      return;
    }

    const formData = this.proposeTimeForm.value;
    formData.status = 'proposed';
    const appointmentObservable = this.patientService.saveAppointment(this.selectedAppointment.patientId, {
      ...this.selectedAppointment,
      ...formData,
    });

    appointmentObservable
      .pipe(
        switchMap(() => this.loadAppointments()),
        tap(() => {
          const modal = Modal.getInstance(this.proposeTimeModal.nativeElement);
          modal?.hide();
        }),
        catchError((error) => {
          console.error('Error saving appointment:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  sortTable(column: string): void {
    // Toggle the sort direction
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const direction = this.sortDirection[column];
    // Use the sorting service to sort the data
    this.filteredAppointments = this.sortingService.sort(this.filteredAppointments, column, direction);
  }

  applyFilters(): void {
    this.filteredAppointments = this.filteringService.filter(
      this.appointments,
      {
        status: this.status
      },
      [
        {
          field: 'date',
          range: [this.selectedDate?.toISOString() || null, null], // Pass null for missing dates
        },
      ],
      true
    );
  }

  // Helper: Check for invalid date
  isdateInvalid(): boolean {
    return this.proposeTimeForm.get('date')?.hasError('invaliddate')!;
  }


  /** Format a Date to 'yyyy-mm-dd' for form binding. */
  formatDateInput(date: Date): string {
    return date.toISOString().substring(0, 10);
  }

  updateAvailableDates(): void {

    this.availableDates = [];
    const today = new Date();

    for (let i = 7; i > 0; i--) {
      let pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);
      this.availableDates.push(pastDate);
    }

    this.availableDates.push(new Date(today));

    for (let i = 1; i <= 7; i++) {
      let futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      this.availableDates.push(futureDate);
    }

    const firstCushionDate = new Date(this.availableDates[0]);
    firstCushionDate.setDate(firstCushionDate.getDate() - 1);
    this.availableDates.unshift(firstCushionDate);

    const lastCushionDate = new Date(this.availableDates[this.availableDates.length - 1]);
    lastCushionDate.setDate(lastCushionDate.getDate() + 1);
    this.availableDates.push(lastCushionDate);

    const todayIndex = this.availableDates.findIndex(d => d.toDateString() === today.toDateString());
    if (todayIndex !== -1) {
      this.currentCarouselIndex = todayIndex;
    } else {
      this.currentCarouselIndex = 8;
    }

    this.selectedDate = this.availableDates[this.currentCarouselIndex];
  }

  get visibleDates(): Date[] {
    return this.availableDates.slice(this.currentCarouselIndex - 1, this.currentCarouselIndex + 2);
  }

  previousDateCarousel(): void {
    if (this.currentCarouselIndex > 1) {
      this.currentCarouselIndex--;
      this.selectedDate = this.availableDates[this.currentCarouselIndex];
      this.applyFilters();
    }
  }


  nextDateCarousel(): void {
    if (this.currentCarouselIndex < this.availableDates.length - 2) {
      this.currentCarouselIndex++;
      this.selectedDate = this.availableDates[this.currentCarouselIndex];
      this.applyFilters();
    }
  }


  selectDate(date: Date): void {
    const index = this.availableDates.findIndex(d => d.toDateString() === date.toDateString());

    if (index > 1 && index < this.availableDates.length - 2) {
      this.currentCarouselIndex = index;
      this.selectedDate = this.availableDates[this.currentCarouselIndex];
    }
  }


  getCarouselOffset(): number {
    const itemWidth = 100;
    const itemMargin = 10;
    const containerWidth = 140;

    return (this.currentCarouselIndex - 1) * (itemWidth + itemMargin) - (containerWidth / 2 - itemWidth / 2);
  }

  canShowAppointmentAction(appointment: any): boolean {
    if (!appointment?.date || !appointment?.time || appointment?.status === 'accepted' || appointment?.status === 'rejected' || appointment?.status === 'cancelled') return false;

    const appointmentDateTime = this.combineDateAndTime(appointment.date, appointment.time);
    const currentDateTime = new Date();
    const thresholdDateTime = new Date(currentDateTime.getTime() + 30 * 60 * 1000); // 30 minutes from now

    return appointmentDateTime >= thresholdDateTime;
  }

  private combineDateAndTime(date: string, time: string): Date {
    const timeParts = time.match(/(\d+):(\d+)\s?(AM|PM)/i);
    if (!timeParts) return new Date(NaN); // Invalid time format

    let hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    const period = timeParts[3].toUpperCase();

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes, 0, 0);
    return combinedDate;
  }


  acceptMultipleAppointments(): void {
    const updatedAppointments = this.multipleSelectedAppointments.map(appointment => ({
      ...appointment,
      status: 'accepted',
    }));

    this.physicianService.saveMultipleAppointments('accepted', null, null, null, updatedAppointments)
      .pipe(
        switchMap(() => this.loadAppointments()),
        tap(() => {
          this.resetSelection(); 
          console.log('Multiple appointments accepted successfully');
        }),
        catchError((error) => {
          console.error('Error accepting multiple appointments:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  toggleAllSelection(event: any): void {
    this.toggleAllChecked = event.target.checked;
    const isChecked = event.target.checked;
    this.multipleSelectedAppointments = [];

    this.filteredAppointments.forEach((appointment: any) => {
      if (this.canShowAppointmentAction(appointment)) {
        appointment.isChecked = isChecked; // Ensures UI reflects the selection
        if (isChecked) {
          this.multipleSelectedAppointments.push(appointment);
        }
      }
    });
  }

  toggleSelection(appointment: any, event: any): void {
    appointment.isChecked = event.target.checked;

    if (event.target.checked) {
      this.multipleSelectedAppointments.push(appointment);
    } else {
      this.multipleSelectedAppointments = this.multipleSelectedAppointments.filter(a => a.id !== appointment.id);
    }
  }

  resetSelection(): void {
    this.toggleAllChecked = false; // Uncheck "Select All"
    this.multipleSelectedAppointments = [];
    this.filteredAppointments.forEach((appointment: any) => {
      appointment.isChecked = false; // Uncheck all individual checkboxes
    });
  }

  isAnyAppointmentSelected(): boolean {
    return this.multipleSelectedAppointments.length > 0;
  }

  multipleAction(action: string): void {

    if (!this.isAnyAppointmentSelected()) {
      return;
    }
    this.isMultipleAction = true;
    switch (action) {
      case 'accept':
        this.acceptMultipleAppointments();
        break;
      case 'reject':
        this.openRejectMultipleModal(); // Open modal before rejecting
        break;
      case 'propose':
        this.openProposeTimeModal(); // Open modal before proposing
        break;
    }
  }


  openRejectMultipleModal(): void {
    if (!this.isAnyAppointmentSelected()) {
      return;
    }
    const modalInstance = new Modal(this.rejectReasonModal.nativeElement);
    modalInstance.show();
  }

  /** ✅ Confirms Rejection After Modal */
  confirmRejectMultiple(): void {
    if (this.rejectReasonForm.invalid) {
      Object.keys(this.rejectReasonForm.controls).forEach((key) => {
        this.rejectReasonForm.get(key)?.markAsTouched();
      });
      return;
    }

    const reason = this.rejectReasonForm.value.reason;
    const updatedAppointments = this.multipleSelectedAppointments.map(appointment => ({
      ...appointment,
      status: 'rejected',
      reason: reason
    }));

    this.physicianService.saveMultipleAppointments('rejected', null, null, reason, updatedAppointments)
      .pipe(
        switchMap(() => this.loadAppointments()),
        tap(() => {
          this.resetSelection(); 
          const rejectReasonModalInstance = Modal.getInstance(this.rejectReasonModal.nativeElement);
          rejectReasonModalInstance?.hide();
        }),
        catchError((error) => {
          console.error('Error rejecting multiple appointments:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  /** ✅ Opens Propose New Time Modal Before Proposing Multiple */
  openProposeTimeModal(): void {
    if (!this.isAnyAppointmentSelected()) {
      return;
    }

    this.proposeTimeForm.reset();
    const modalInstance = new Modal(this.proposeTimeModal.nativeElement);
    modalInstance.show();
  }

  /** ✅ Confirms Proposed Time After Modal */
  confirmProposeNewTime(): void {
    if (this.proposeTimeForm.invalid) {
      Object.keys(this.proposeTimeForm.controls).forEach((key) => {
        const control = this.proposeTimeForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }

    const formData = this.proposeTimeForm.value;
    const updatedAppointments = this.multipleSelectedAppointments.map(appointment => ({
      ...appointment,
      status: 'proposed',
      date: formData.date,
      time: formData.time,
    }));

    this.physicianService.saveMultipleAppointments('proposed', formData.date, formData.time, null, updatedAppointments)
      .pipe(
        switchMap(() => this.loadAppointments()),
        tap(() => {
          this.resetSelection(); 
          const modal = Modal.getInstance(this.proposeTimeModal.nativeElement);
          modal?.hide();
        }),
        catchError((error) => {
          console.error('Error proposing new time for multiple appointments:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  onModalClose(): void {
    this.isMultipleAction = false;
  }
}

