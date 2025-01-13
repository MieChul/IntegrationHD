import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import { Appointment } from '../../../shared/models/appointment';
import { AccountService } from '../../services/account.service';
import { catchError, forkJoin, Observable, of, switchMap, tap } from 'rxjs';
import { PhysicianService } from '../../services/physician.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.scss'],
  providers: [NgbTooltipConfig],
})
export class ManageAppointmentsComponent implements OnInit {
  @ViewChild('proposeTimeModal') proposeTimeModal!: ElementRef;
  @ViewChild('rejectReasonModal') rejectReasonModal!: ElementRef;

  appointmentsForm!: FormGroup;
  proposeTimeForm!: FormGroup;
  rejectReasonForm!: FormGroup;

  pendingAppointments: Appointment[] = [];
  filteredPendingAppointments: Appointment[] = [];
  acceptedAppointments: Appointment[] = [];
  rejectedAppointments: Appointment[] = [];

  selectedAppointment!: Appointment;
  clinics: any[] = [];
  sortDirection: { [key: string]: string } = {};
  userData: any;
  today: Date = new Date();

  constructor(private fb: FormBuilder, config: NgbTooltipConfig, private accountService: AccountService, private physicianService: PhysicianService, private patientService: PatientService) {
    config.placement = 'top';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.initializeForms();
    this.accountService.getUserData().pipe(
      tap((data) => (this.userData = data)),
      switchMap(() => forkJoin([this.loadAppointments(), this.loadClinics()])),
      catchError((error) => {
        console.error('Error during initialization:', error);
        return of([]);
      })
    ).subscribe();
  }


  private initializeForms(): void {
    this.appointmentsForm = this.fb.group({
      startDate: [''],
      endDate: ['', [this.endDateValidator.bind(this)]],
    });

    this.proposeTimeForm = this.fb.group({
      date: ['', [Validators.required, this.pastDateValidator()]],
      time: ['', Validators.required],
      clinicName: ['', Validators.required],
      physicianId: [''], // Optional if required
      patientId: [''], // Optional if required
      physicianName: [''], // Optional if required
      mobile: [''], // Optional if required
      patientName: ['']
    });

    this.rejectReasonForm = this.fb.group({
      reason: ['', Validators.required], // Ensure reason is required
    });

    this.appointmentsForm.valueChanges.subscribe(() => this.filterAppointments());
  }

  pastDateValidator() {
    return (control: any) => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Remove time part for comparison
      return selectedDate >= today ? null : { pastDate: true };
    };
  }

  filterAppointments(): void {
    const { startDate, endDate } = this.appointmentsForm.value;

    this.filteredPendingAppointments = this.pendingAppointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return (
        (!startDate || appointmentDate >= new Date(startDate)) &&
        (!endDate || appointmentDate <= new Date(endDate))
      );
    });
  }

  // Custom Validator: Ensures endDate is not earlier than startDate
  endDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const startDate = this.appointmentsForm?.get('startDate')?.value;
    if (startDate && control.value && new Date(control.value) < new Date(startDate)) {
      return { invalidEndDate: true };
    }
    return null;
  }

  futureDateValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && new Date(control.value) < new Date(this.today)) {
      return { invaliddate: true };
    }
    return null;
  }

  // Helper: Check for invalid endDate
  isEndDateInvalid(): boolean {
    return this.appointmentsForm.get('endDate')?.hasError('invalidEndDate')!;
  }

  // Helper: Check for invalid date
  isdateInvalid(): boolean {
    return this.proposeTimeForm.get('date')?.hasError('invaliddate')!;
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

        this.pendingAppointments = appointments.data.filter(
          (a: any) =>
            new Date(a.date) >= today && a.status !== 'cancelled' && a.status !== 'rejected'
        );

        this.acceptedAppointments = appointments.data.filter(
          (a: any) =>
            new Date(a.date) < today && a.status !== 'cancelled' && a.status !== 'rejected'
        );

        this.rejectedAppointments = appointments.data.filter(
          (a: any) => a.status === 'cancelled' || a.status === 'rejected'
        );

        this.filteredPendingAppointments = [...this.pendingAppointments];
      }),
      catchError((error) => {
        console.error('Error loading appointments:', error);
        return of({ data: [] }); // Return empty data on error
      })
    );
  }


  filterAppointmentsByDate(): void {
    const startDate = this.appointmentsForm.get('startDate')?.value;
    const endDate = this.appointmentsForm.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      this.filteredPendingAppointments = this.pendingAppointments.filter((appointment) => {
        const date = appointment.date;
        return date >= start && date <= end;
      });
    } else {
      this.filteredPendingAppointments = [...this.pendingAppointments];
    }
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

  proposetime(appointment: Appointment): void {
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

  sortAppointments(column: keyof Appointment): void {
    const direction = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    this.sortDirection[column] = direction;

    this.filteredPendingAppointments.sort((a, b) => this.compareValues(a[column], b[column], direction));
  }

  private compareValues(a: unknown, b: unknown, direction: string): number {
    if (a instanceof Date && b instanceof Date) {
      return direction === 'asc' ? a.getTime() - b.getTime() : b.getTime() - a.getTime();
    } else if (typeof a === 'string' && typeof b === 'string') {
      return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
    } else if (typeof a === 'boolean' && typeof b === 'boolean') {
      return direction === 'asc' ? Number(a) - Number(b) : Number(b) - Number(a);
    } else {
      return 0;
    }
  }

  isUpcoming(appointment: Appointment): boolean {
    const today = new Date();
    return appointment.date >= today;
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

}

