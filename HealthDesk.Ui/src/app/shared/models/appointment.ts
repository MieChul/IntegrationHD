export interface Appointment {
  id: string;
  physicianId: string;
  patientName: string;
  physicianName: string;
  clinicName: string;
  date: Date; // Stored as Date in the application
  time: string; // HH:mm format
  status: 'pending' | 'accepted' | 'rejected' | 'proposed' | 'cancelled';
  proposed?: boolean; // Indicates if new date/time is proposed
  newDate?: Date; // Proposed new date
  newTime?: string; // Proposed new time
  reason?: string; // Reason for rejection
  mobile?: string;
  patientId: string,
  isPhysician:boolean,// Patient's mobile number
}
