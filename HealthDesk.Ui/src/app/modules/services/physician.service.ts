import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {
  private apiUrl = `${environment.apiUrl}/physician`;

  constructor(private http: HttpClient) {}

  getClinics(physicianId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${physicianId}/clinics`);
  }
  
  
  addUpdateClinic(userId: string , clinic: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/clinics`, clinic);
  }

  deleteClinic(physicianId: string, clinicId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${physicianId}/clinics/${clinicId}`);
  }

  loadPrescription(id: string, prescriptionId: string): Observable<any> {
    const url = `${this.apiUrl}/physicians/${id}/prescriptions/${prescriptionId}`;
    return this.http.get<any>(url);
  }
  getUserDetails(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/user-details`);
  }

  getDesignPrescriptions(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/design-prescriptions`);
  }

  saveDesignPrescription(id: string, prescription: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/design-prescriptions`, prescription);
  }

  deleteDesignPrescription(id: string, prescriptionId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/design-prescriptions/${prescriptionId}`);
  }

  getPatients(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/patients`);
  }

  savePatient(id: string, patient: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/patients`, patient);
  }

  deletePatient(id: string, patientId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/patients/${patientId}`);
  }

  getPrescriptions(id: string, patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/prescriptions/${patientId}`);
  }

  addPrescription(physicianId: string, prescription: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${physicianId}/prescriptions`, prescription);
  }

  getMedicalCases(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/medical-cases`);
  }

  saveMedicalCase(id: string, medicalCase: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/medical-cases`, medicalCase);
  }

  deleteMedicalCase(id: string, caseId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/medical-cases/${caseId}`);
  }

  incrementLikes(id: string, caseId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/medical-cases/${caseId}/increment-likes`, {});
  }
}
