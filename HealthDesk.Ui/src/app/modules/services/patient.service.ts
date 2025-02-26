import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = `${environment.apiUrl}/patient`;

  constructor(private http: HttpClient) { }

  // Medical History
  getMedicalHistory(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${patientId}/medical-history`);
  }

  saveMedicalHistory(patientId: string, history: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${patientId}/medical-history`, history);
  }

  deleteMedicalHistory(patientId: string, historyId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${patientId}/medical-history/${historyId}`);
  }

  // Current Treatments
  getCurrentTreatments(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${patientId}/current-treatments`);
  }

  saveCurrentTreatment(patientId: string, treatment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${patientId}/current-treatments`, treatment);
  }

  deleteCurrentTreatment(patientId: string, treatmentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${patientId}/current-treatments/${treatmentId}`);
  }

  // Appointments
  getAppointments(patientId: string, isPhysician: boolean = false): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/${patientId}/appointments`,
      {
        params: { isPhysician: isPhysician.toString() }, // Send as query parameter
      }
    );
  }

  saveAppointment(patientId: string, appointment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${patientId}/appointments`, appointment);
  }

  updateAppointmentStatus(patientId: string, appointmentId: string, status: string, reason: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${patientId}/update-appointment-status/${appointmentId}`);
  }

  // Self Records
  getSelfRecords(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${patientId}/self-records`);
  }

  saveSelfRecord(patientId: string, record: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${patientId}/self-records`, record);
  }

  deleteSelfRecord(patientId: string, recordId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${patientId}/self-records/${recordId}`);
  }

  // Symptoms
  getSymptoms(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${patientId}/symptoms`);
  }

  saveSymptom(patientId: string, symptom: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${patientId}/symptoms`, symptom);
  }

  deleteSymptom(patientId: string, symptomId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${patientId}/symptoms/${symptomId}`);
  }

  // Lab Investigations
  getLabInvestigations(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${patientId}/lab-investigations`);
  }

  saveLabInvestigation(patientId: string, investigation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${patientId}/lab-investigations`, investigation);
  }

  deleteLabInvestigation(patientId: string, investigationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${patientId}/lab-investigations/${investigationId}`);
  }

  // Reports
  getReports(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${patientId}/reports`);
  }

  saveReport(patientId: string, report: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${patientId}/reports`, report);
  }

  deleteReport(patientId: string, reportId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${patientId}/reports/${reportId}`);
  }

  // Immunizations
  getImmunizations(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${patientId}/immunizations`);
  }

  saveImmunization(patientId: string, immunization: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${patientId}/immunizations`, immunization);
  }

  deleteImmunization(patientId: string, immunizationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${patientId}/immunizations/${immunizationId}`);
  }

  // Patient Info
  getPatientInfo(patientId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${patientId}/info`);
  }

  updatePatientInfo(patientId: string, info: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${patientId}/info`, info);
  }


  getActivities(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${patientId}/activities`);
  }

  saveActivity(patientId: string, activity: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/activities`, activity);
  }


  deleteActivity(patientId: string, activityId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${patientId}/activities/${activityId}`);
  }


  getReminders(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${patientId}/reminders`);
  }

  saveReminder(patientId: string, reminder: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/reminders`, reminder);
  }

  deleteReminder(patientId: string, reminderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${patientId}/reminders/${reminderId}`);
  }

  getPhysicians(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/physicians`);
  }

  getCompliance(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${patientId}/compliance`);
  }

  addOrUpdateMedicalInfo(patientId: string, treatmentId: string, dto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/compliance/medicineinfo/${treatmentId}`, dto);
  }


  confirmIntake(patientId: string, treatmentId: string, isTaken: boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/compliance/confirmintake/${treatmentId}?isTaken=${isTaken}`, {});
  }

  getEntities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/entities`);
  }

  // Add or Update Review
  addOrUpdateReview(review: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/review`, review);
  }

}
