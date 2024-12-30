import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import { IndexedDbService } from '../../../shared/services/indexed.service';
import { Appointment } from '../../../shared/models/appointment';

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
  selectedAppointment: Appointment = {
    id: '',
    physicianName: '',
    clinicName: '',
    appointmentDate: new Date(),
    appointmentTime: '',
    status: 'pending',
    patientName: '',
    mobileNumber: '',
    reason: '',
  };
  isEditing: boolean = false;

  doctors: string[] = [];
  clinics: string[] = ['Apollo', 'Sigma', 'Medi Health'];

  constructor(private fb: FormBuilder, private indexedDbService: IndexedDbService) {}

  async ngOnInit(): Promise<void> {
    this.initializeForm();
    await this.seedData();
    await this.loadAppointments();
  }

  private initializeForm(): void {
    this.appointmentForm = this.fb.group({
      physicianName: [''],
      appointmentDate: [''], // Date in 'yyyy-MM-dd' format
      appointmentTime: [''],
      clinicName: [''],
    });
  }

  private async seedData(): Promise<void> {
    const physicians = [
      { name: 'Dr. Physician', clinics: ['Apollo', 'Sigma', 'Medi Health'] },
    ];
    const patient = { name: 'Patient', mobile: '9930506961' };

    for (const doc of physicians) {
      await this.indexedDbService.addPhysician(doc);
    }
    await this.indexedDbService.addPatient(patient);

    // Load doctors dynamically after seeding
    this.doctors = (await this.indexedDbService.getPhysicians()).map((doc) => doc.name);
  }

  async loadAppointments(): Promise<void> {
    const appointments = await this.indexedDbService.getAppointments();
  
    const now = new Date();
  
    this.pendingAppointments = appointments
      .filter(
        (a) =>
          a.status === 'pending' ||
          a.status === 'proposed' || // Include proposed appointments in pending
          (a.status === 'accepted' && new Date(a.appointmentDate) >= now)
      )
      .map(this.mapAppointmentDates);
  
    this.pastAppointments = appointments
      .filter((a) => new Date(a.appointmentDate) < now) // Filter by date for past appointments
      .map(this.mapAppointmentDates);
  
    this.cancelledAppointments = appointments
      .filter((a) => a.status === 'cancelled' || a.status==='rejected') // Include only cancelled appointments
      .map(this.mapAppointmentDates);
  
    this.filteredAppointments = [...this.pendingAppointments];
  }
  
  private mapAppointmentDates(appointment: any): Appointment {
    return {
      ...appointment,
      appointmentDate: new Date(appointment.appointmentDate), // Convert ISO string to Date
      newDate: appointment.newDate ? new Date(appointment.newDate) : undefined,
      reason: appointment.reason ?? '', // Ensure reason is initialized
    };
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

  async saveAppointment(): Promise<void> {
    const formData = this.appointmentForm.value;
  
    if (this.isEditing && this.selectedAppointment.id) {
      // Update existing appointment
      const updatedAppointment: Partial<Appointment> = {
        physicianName: formData.physicianName,
        clinicName: formData.clinicName,
        appointmentDate: new Date(formData.appointmentDate),
        appointmentTime: formData.appointmentTime,
      };
  
      const dbAppointment = this.convertToIndexedDBAppointment(updatedAppointment);
      await this.indexedDbService.updateAppointment(this.selectedAppointment.id, dbAppointment);
    } else {
      // Create new appointment
      const newAppointment: Appointment = {
        id: crypto.randomUUID(),
        physicianName: formData.physicianName,
        clinicName: formData.clinicName,
        appointmentDate: new Date(formData.appointmentDate),
        appointmentTime: formData.appointmentTime,
        status: 'pending',
        patientName: 'Patient',
        mobileNumber: '9930506961',
      };
  
      const dbAppointment = this.convertToIndexedDBAppointment(newAppointment);
      await this.indexedDbService.addAppointment(dbAppointment);
    }
  
    await this.loadAppointments();
  
    const modal = Modal.getInstance(this.appointmentModal.nativeElement);
    modal?.hide();
  }

  private convertToIndexedDBAppointment(appointment: Partial<Appointment>): any {
    return {
      ...appointment,
      appointmentDate: appointment.appointmentDate
        ? appointment.appointmentDate.toISOString()
        : undefined, // Convert Date to ISO string
      newDate: appointment.newDate ? appointment.newDate.toISOString() : undefined, // Convert Date to ISO string
    };
  }

  editAppointment(appointment: Appointment): void {
    this.isEditing = true;
    this.selectedAppointment = appointment;
    this.appointmentForm.patchValue({
      physicianName: appointment.physicianName,
      appointmentDate: appointment.appointmentDate.toISOString().substring(0, 10),
      appointmentTime: appointment.appointmentTime,
      clinicName: appointment.clinicName,
    });

    const modal = new Modal(this.appointmentModal.nativeElement);
    modal.show();
  }

  async cancelAppointment(reason: string): Promise<void> {
    if (this.selectedAppointment) {
      await this.indexedDbService.updateAppointment(this.selectedAppointment.id, {
        status: 'cancelled', // Ensure 'cancelled' is used here
        reason,
      });
      await this.loadAppointments();
  
      const modal = Modal.getInstance(this.cancelModal.nativeElement);
      modal?.hide();
    }
  }

  openCancelModal(appointment: Appointment): void {
    this.selectedAppointment = { ...appointment }; // Clone the object to avoid mutating the original
    const modal = new Modal(this.cancelModal.nativeElement);
    modal.show();
  }
  async acceptAppointment(appointment: Appointment): Promise<void> {
    await this.indexedDbService.updateAppointment(appointment.id, {
      status: 'accepted',
    });
    await this.loadAppointments();
  }
}
