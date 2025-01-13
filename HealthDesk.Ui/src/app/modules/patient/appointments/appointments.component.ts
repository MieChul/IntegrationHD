import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Appointment } from '../../../shared/models/appointment';
import { PatientService } from '../../services/patient.service';
import { AccountService } from '../../services/account.service';
import { PhysicianService } from '../../services/physician.service';
import { catchError, forkJoin, of, tap, switchMap } from 'rxjs';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  @ViewChild('appointmentModal') appointmentModal!: ElementRef;
  @ViewChild('cancelModal') cancelModal!: ElementRef;

  pendingAppointments: Appointment[] = [];
  pastAppointments: Appointment[] = [];
  cancelledAppointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  appointmentForm!: FormGroup;
  dateForm!: FormGroup;
  userData: any;
  submitted: boolean = false;
  selectedAppointment: Appointment = {
    id: '',
    physicianId: '',
    patientId: '',
    physicianName: '',
    clinicName: '',
    date: new Date(),
    time: '',
    status: 'pending',
    patientName: '',
    mobile: '',
    reason: '',
    isPhysician: false
  };
  isEditing: boolean = false;

  physicians: any[] = [];
  clinics: any[] = [];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private accountService: AccountService,
    private physicianService: PhysicianService
  ) { }

  ngOnInit(): void {
    this.initializeForm();

    this.accountService.getUserData().pipe(
      tap((data) => (this.userData = data)),
      switchMap(() => forkJoin([this.loadAppointments(), this.loadPhysicians()])),
      catchError((error) => {
        console.error('Error during initialization:', error);
        return of([]);
      })
    ).subscribe();
  }

  isEndDateInvalid(): boolean {
    return this.dateForm.get('endDate')?.hasError('invalidEndDate')!;
  }


  private initializeForm(): void {
    this.dateForm = this.fb.group({
      startDate: [''],
      endDate: ['', [this.endDateValidator.bind(this)]],
    });

    this.appointmentForm = this.fb.group({
      id: [''],
      physicianId: ['', Validators.required],
      patientId: [],
      physicianName: [''],
      mobile: [''],
      date: [
        '',
        [Validators.required, this.dateValidator()] // Date is required and cannot be in the past
      ],
      time: ['', Validators.required], // Time is required
      clinicName: ['', Validators.required],
      status: [''],
      reason: [''],
      isPhysician: [false],
      patientName: ['']
    });

    this.dateForm.valueChanges.subscribe(() => this.filterAppointmentsByDate());
  }

  filterAppointmentsByDate(): void {
    const { startDate, endDate } = this.dateForm.value;

    this.filteredAppointments = this.pendingAppointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return (
        (!startDate || appointmentDate >= new Date(startDate)) &&
        (!endDate || appointmentDate <= new Date(endDate))
      );
    });
  }

  endDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const startDate = this.dateForm?.get('startDate')?.value;
    if (startDate && control.value && new Date(control.value) < new Date(startDate)) {
      return { invalidEndDate: true };
    }
    return null;
  }

  private dateValidator(): Validators {
    return (control: FormControl) => {
      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize to start of the day
      if (inputDate < today) {
        return { pastDate: true }; // Date is in the past
      }
      return null; // Date is valid
    };
  }

  onPhysicianChange(physicianId: string): void {
    this.physicianService.getClinics(physicianId)
      .pipe(
        tap((clinics: any) => {
          this.clinics = clinics.data; // Update clinics list
        }),
        catchError((error) => {
          console.error('Error loading clinics:', error);
          this.clinics = []; // Clear clinics if there's an error
          return of([]); // Return an empty observable
        })
      )
      .subscribe();
  }

  loadAppointments() {
    return this.patientService.getAppointments(this.userData.id).pipe(
      tap((appointments: any) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        this.pendingAppointments = appointments.data.filter(
          (a: any) =>
            (new Date(a.date) >= today) && // Future or today
            a.status !== 'cancelled' &&
            a.status !== 'rejected'
        );

        // Filter past appointments: Dates in the past, excluding cancelled/rejected
        this.pastAppointments = appointments.data.filter(
          (a: any) =>
            (new Date(a.date) < today) && // Past dates
            a.status !== 'cancelled' &&
            a.status !== 'rejected'
        );
        this.cancelledAppointments = appointments.data.filter(
          (a: any) => a.status === 'cancelled' || a.status === 'rejected'
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
    const modal = new Modal(this.appointmentModal.nativeElement);
    modal.show();
  }

  saveAppointment(): void {
    this.submitted = true; // Mark the form as submitted to trigger validation errors

    if (this.appointmentForm.invalid) {
      // Mark all controls as touched to show validation errors
      Object.keys(this.appointmentForm.controls).forEach((key) => {
        const control = this.appointmentForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      console.error('Form is invalid. Please fix the errors.');
      return;
    }

    const formData = this.appointmentForm.value;
    // Dynamically update physicianId based on physicianName
    const selectedPhysician = this.physicians.find(
      (physician) => physician.id === formData.physicianId
    );

    if (!selectedPhysician) {
      console.error('Physician not found.');
      return;
    }

    formData.physicianName = selectedPhysician.name; // Set physicianId from selectedPhysician

    // Dynamically update mobile from userData
    formData.patientId = this.userData.id;

    const appointmentObservable = this.isEditing
      ? this.patientService.saveAppointment(this.userData.id, {
        ...this.selectedAppointment,
        ...formData,
      })
      : this.patientService.saveAppointment(this.userData.id, {
        physicianId: formData.physicianId,
        patientId: formData.patientId,
        physicianName: formData.physicianName,
        clinicName: formData.clinicName,
        date: new Date(formData.date),
        time: formData.time,
        status: 'pending',
        patientName: formData.patientName,
        mobile: formData.mobile,
        reason: '',
        isPhysician: [false]// Use updated mobile
      });

    appointmentObservable
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

  acceptAppointment(appointment: Appointment): void {
    const updatedAppointment = {
      ...appointment,
      status: 'accepted', // Update the status to accepted
    };

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
      status: 'cancelled', // Update the status to cancelled
      reason: reason,      // Add the cancellation reason
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

  editAppointment(appointment: Appointment): void {
    this.isEditing = true;
    this.selectedAppointment = appointment;
    this.onPhysicianChange(appointment.physicianId);
    this.appointmentForm.patchValue({
      id: appointment.id,
      physicianId: appointment.physicianId,
      patientId: this.userData.id,
      date: new Date(appointment.date).toISOString().substring(0, 10),
      time: appointment.time,
      clinicName: appointment.clinicName,
      status: appointment.status,
      mobile: appointment.mobile,
      isPhysician: false,
      patientName: appointment.patientName
    });

    const modal = new Modal(this.appointmentModal.nativeElement);
    modal.show();
  }

  openCancelModal(appointment: Appointment): void {
    this.selectedAppointment = { ...appointment }; // Clone the object to avoid mutating the original
    const modal = new Modal(this.cancelModal.nativeElement);
    modal.show();
  }
}
