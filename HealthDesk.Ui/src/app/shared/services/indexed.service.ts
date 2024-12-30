import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';

interface Appointment {
  id: string;
  patientName: string;
  physicianName: string;
  clinicName: string;
  appointmentDate: string; // ISO string for Date
  appointmentTime: string; // HH:mm format
  status: 'pending' | 'accepted' | 'rejected' | 'proposed' | 'cancelled';
  proposedDate?: string; // ISO string for proposed date
  proposedTime?: string; // HH:mm format for proposed time
  proposedClinicName?: string; // Clinic name for proposed changes
  reason?: string; // Reason for rejection, if applicable
  mobileNumber?: string; // Patient's mobile number
}

interface MyDB extends DBSchema {
  physicians: {
    key: string;
    value: { name: string; clinics: string[] };
  };
  patients: {
    key: string;
    value: { name: string; mobile: string };
  };
  appointments: {
    key: string;
    value: Appointment;
  };
}

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbPromise = openDB<MyDB>('AppointmentsDB', 1, {
    upgrade(db) {
      db.createObjectStore('physicians', { keyPath: 'name' });
      db.createObjectStore('patients', { keyPath: 'mobile' });
      db.createObjectStore('appointments', { keyPath: 'id' });
    },
  });

  // Add a physician
  async addPhysician(physician: { name: string; clinics: string[] }): Promise<void> {
    const db = await this.dbPromise;
    await db.put('physicians', physician);
  }

  // Add a patient
  async addPatient(patient: { name: string; mobile: string }): Promise<void> {
    const db = await this.dbPromise;
    await db.put('patients', patient);
  }

  // Add an appointment
  async addAppointment(appointment: Appointment): Promise<void> {
    const db = await this.dbPromise;
    await db.put('appointments', appointment);
  }

  // Get all physicians
  async getPhysicians(): Promise<{ name: string; clinics: string[] }[]> {
    const db = await this.dbPromise;
    return db.getAll('physicians');
  }

  // Get all patients
  async getPatients(): Promise<{ name: string; mobile: string }[]> {
    const db = await this.dbPromise;
    return db.getAll('patients');
  }

  // Get all appointments
  async getAppointments(): Promise<Appointment[]> {
    const db = await this.dbPromise;
    return db.getAll('appointments');
  }

  // Update an appointment based on its ID
  async updateAppointment(id: string, updatedData: Partial<Appointment>): Promise<Appointment | null> {
    const db = await this.dbPromise;
    const existingAppointment = await db.get('appointments', id);
    if (existingAppointment) {
      const updatedAppointment = { ...existingAppointment, ...updatedData };
      await db.put('appointments', updatedAppointment);
      return updatedAppointment;
    }
    return null;
  }

  // Delete an appointment by its ID
  async deleteAppointment(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('appointments', id);
  }
}
