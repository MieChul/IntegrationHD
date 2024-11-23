import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';

interface Appointment {
  doctorName: string;
  appointmentDate: Date;
  appointmentTime: string;
  clinicName: string;
  status: 'pending' | 'past' | 'cancelled';
  cancelledBy?: 'doctor' | 'patient';
  reason?: string;
  proposedNewTime?: string;
  proposedNewDate?: Date;
  appointmentStatus: string
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})

export class AppointmentsComponent implements OnInit {
  @ViewChild('appointmentModal') appointmentModal!: ElementRef;
  @ViewChild('infoModal') infoModal!: ElementRef;
  @ViewChild('cancelModal') cancelModal!: ElementRef;

  pendingAppointments: Appointment[] = [];
  pastAppointments: Appointment[] = [];
  cancelledAppointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  appointmentForm!: FormGroup;
  selectedAppointment: Appointment = {doctorName:'', appointmentDate: new Date(), appointmentTime: '', clinicName:'', status:'pending', appointmentStatus :'Accepted'};
  isEditing: boolean = false;

  // Lists for doctors and clinics
  doctors: string[] = ['Dr. Arjun Mehta', 'Dr. Priya Sharma', 'Dr. Rahul Desai'];
  clinics: string[] = ['Apollo Clinic', 'Fortis Hospital', 'Max Healthcare'];

  

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadDummyData();
  }

  initializeForm(): void {
    this.appointmentForm = this.fb.group({
      doctorName: [''],
      appointmentDate: [''],
      appointmentTime: [''],
      clinicName: ['']
    });
  }

  loadDummyData(): void {
    this.pendingAppointments = [
      {
        doctorName: 'Dr. Arjun Mehta',
        appointmentDate: new Date('2024-08-01'),
        appointmentTime: '10:00 AM',
        clinicName: 'Apollo Clinic',
        status: 'pending',
        appointmentStatus :'Accepted'
      },
      {
        doctorName: 'Dr. Priya Sharma',
        appointmentDate: new Date('2024-07-15'),
        appointmentTime: '02:00 PM',
        clinicName: 'Fortis Hospital',
        status: 'pending',
        appointmentStatus :'Pending'
      },
      {
        doctorName: 'Dr. Rahul Desai',
        appointmentDate: new Date('2024-08-05'),
        appointmentTime: '11:30 AM',
        clinicName: 'Max Healthcare',
        status: 'pending',
        proposedNewDate:new Date(),
        proposedNewTime:'10:30 am',
        appointmentStatus :'New Time Proposed'
      }
    ];

    this.pastAppointments = [
      {
        doctorName: 'Dr. Arjun Mehta',
        appointmentDate: new Date('2024-08-01'),
        appointmentTime: '10:00 AM',
        clinicName: 'Apollo Clinic',
        status: 'past',
        appointmentStatus :'Accepted'
      },
      {
        doctorName: 'Dr. Priya Sharma',
        appointmentDate: new Date('2024-07-15'),
        appointmentTime: '02:00 PM',
        clinicName: 'Fortis Hospital',
        status: 'past',
        appointmentStatus :'Accepted'
      }
    ];

    this.cancelledAppointments = [
      {
        doctorName: 'Dr. Rahul Desai',
        appointmentDate: new Date('2024-08-05'),
        appointmentTime: '11:30 AM',
        clinicName: 'Max Healthcare',
        cancelledBy:'doctor',
        reason:'Appointment full',
        status: 'cancelled',
        appointmentStatus :'Cancelled'
      }
    ];

    this.filteredAppointments = [...this.pendingAppointments];
  }

  filterAppointments(status: 'pending' | 'past' | 'cancelled'): void {
    if(status === 'pending')
      this.filteredAppointments = [...this.pendingAppointments];
    else if(status === 'past')
      this.filteredAppointments = [...this.pastAppointments];
    else if(status === 'cancelled')
      this.filteredAppointments = [...this.cancelledAppointments];
  } 

  scheduleNewAppointment(): void {
    this.isEditing = false;
    this.appointmentForm.reset();
    if (this.appointmentModal) {
      const modal = new Modal(this.appointmentModal.nativeElement);
      modal.show();
    }
  }

  saveAppointment(): void {
    if (this.isEditing) {
      // Update existing appointment
      Object.assign(this.selectedAppointment, this.appointmentForm.value);
    } else {
      // Add new appointment
      this.pendingAppointments.push({ ...this.appointmentForm.value, status: 'pending' });
    }

    this.filterAppointments('pending');
    if (this.appointmentModal) {
      const modal = Modal.getInstance(this.appointmentModal.nativeElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  editAppointment(appointment: Appointment): void {
    this.isEditing = true;
    this.selectedAppointment = appointment;
    this.appointmentForm.patchValue(appointment);
    if (this.appointmentModal) {
      const modal = new Modal(this.appointmentModal.nativeElement);
      modal.show();
    }
  }

  deleteAppointment(appointment: Appointment): void {
    this.pendingAppointments = this.pendingAppointments.filter(a => a !== appointment);
    this.filterAppointments('pending');
  }

  openCancelModal(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    if (this.cancelModal) {
      const modal = new Modal(this.cancelModal.nativeElement);
      modal.show();
    }
  }

  cancelAppointment(reason: string): void {
    if (this.selectedAppointment) {
      this.selectedAppointment.status = 'cancelled';
      this.selectedAppointment.reason = reason;
      this.selectedAppointment.cancelledBy = 'patient'; // Assume the patient is cancelling
      this.cancelledAppointments.push(this.selectedAppointment);
      this.pendingAppointments = this.pendingAppointments.filter(a => a !== this.selectedAppointment);
      this.filterAppointments('pending');
      if (this.cancelModal) {
        const modal = Modal.getInstance(this.cancelModal.nativeElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }

  openInfoModal(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    if (this.infoModal) {
      const modal = new Modal(this.infoModal.nativeElement);
      modal.show();
    }
  }
}
