export interface Appointment {
  id: string;
  patientName: string;
  physicianName: string;
  clinicName: string;
  appointmentDate: Date; // Stored as Date in the application
  appointmentTime: string; // HH:mm format
  status: 'pending' | 'accepted' | 'rejected' | 'proposed'| 'cancelled';
  proposed?: boolean; // Indicates if new date/time is proposed
  newDate?: Date; // Proposed new date
  newTime?: string; // Proposed new time
  reason?: string; // Reason for rejection
  mobileNumber?: string; // Patient's mobile number
}
