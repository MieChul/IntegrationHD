import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import { Appointment } from '../../../shared/models/appointment';
import { IndexedDbService } from '../../../shared/services/indexed.service';

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
  clinics: string[] = ['Apollo', 'Sigma', 'Medi Health'];
  sortDirection: { [key: string]: string } = {};

  constructor(private fb: FormBuilder, config: NgbTooltipConfig, private indexedDbService: IndexedDbService) {
    config.placement = 'top';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.initializeForms();
    this.loadAppointments();
  }

  private initializeForms(): void {
    this.appointmentsForm = this.fb.group({
      startDate: [''],
      endDate: [''],
    });

    this.proposeTimeForm = this.fb.group({
      newDate: [''],
      newTime: [''],
      clinicName: [''],
    });

    this.rejectReasonForm = this.fb.group({
      reason: [''],
    });
  }

  async loadAppointments(): Promise<void> {
    const appointments = await this.indexedDbService.getAppointments();
  
    const now = new Date();
  
    // Map appointments to conform to the `Appointment` interface
    const mappedAppointments = appointments.map((appointment) => ({
      ...appointment,
      appointmentDate: new Date(appointment.appointmentDate), // Convert string to Date
      newDate: appointment.proposedDate ? new Date(appointment.proposedDate) : undefined,
    })) as Appointment[];
  
    // Filter appointments into categories
    this.pendingAppointments = mappedAppointments.filter(
      (a) =>
        // Future appointments
        (a.status === 'pending' || a.status === 'proposed') // Include pending and proposed
    );
  
    this.acceptedAppointments = mappedAppointments.filter(
      (a) =>
        // Future appointments
        (a.status === 'accepted') // Include pending and proposed
    );
  
    this.rejectedAppointments = mappedAppointments.filter(
      (a) => a.status === 'rejected' // Include only rejected appointments
    );
  
    // Default to showing pending appointments in the filtered list
    this.filteredPendingAppointments = [...this.pendingAppointments];
  }

  filterAppointmentsByDate(): void {
    const startDate = this.appointmentsForm.get('startDate')?.value;
    const endDate = this.appointmentsForm.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      this.filteredPendingAppointments = this.pendingAppointments.filter((appointment) => {
        const appointmentDate = appointment.appointmentDate;
        return appointmentDate >= start && appointmentDate <= end;
      });
    } else {
      this.filteredPendingAppointments = [...this.pendingAppointments];
    }
  }

  async acceptAppointment(appointment: Appointment): Promise<void> {
    await this.indexedDbService.updateAppointment(appointment.id, {
      status: 'accepted',
    });
    await this.loadAppointments();
  }

  proposeNewTime(appointment: Appointment): void {
    this.selectedAppointment = { ...appointment };
    this.proposeTimeForm.patchValue({
      newDate: this.selectedAppointment.newDate
        ? this.selectedAppointment.newDate.toISOString().substring(0, 10)
        : '',
      newTime: this.selectedAppointment.newTime || '',
      clinicName: this.selectedAppointment.clinicName || '',
    });
  
    const modal = new Modal(this.proposeTimeModal.nativeElement);
    modal.show();
  }

  async confirmReject(): Promise<void> {
    const reason = this.rejectReasonForm.value.reason;
    if (this.selectedAppointment) {
      await this.indexedDbService.updateAppointment(this.selectedAppointment.id, {
        status: 'rejected',
        reason,
      });
      await this.loadAppointments();
    }

    const rejectReasonModalInstance = Modal.getInstance(this.rejectReasonModal.nativeElement);
    rejectReasonModalInstance?.hide();
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
    return appointment.appointmentDate >= today;
  }

  async saveProposedTime(): Promise<void> {
    if (this.selectedAppointment) {
      const proposedDate = this.proposeTimeForm.get('newDate')?.value;
      const proposedTime = this.proposeTimeForm.get('newTime')?.value;
      const proposedClinicName = this.proposeTimeForm.get('clinicName')?.value;
  
      if (proposedDate && proposedTime && proposedClinicName) {
        await this.indexedDbService.updateAppointment(this.selectedAppointment.id, {
          status: 'proposed',
          proposedDate,
          proposedTime,
          proposedClinicName,
        });
        await this.loadAppointments();
  
        const modal = Modal.getInstance(this.proposeTimeModal.nativeElement);
        modal?.hide();
      } else {
        alert('All fields are required to propose a new time.');
      }
    }
  }
}
