import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {
  private apiUrl = `${environment.apiUrl}/physician`;

  constructor(private http: HttpClient) { }

  getClinics(physicianId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${physicianId}/clinics`);
  }


  addUpdateClinic(userId: string, clinic: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/clinics`, clinic);
  }

  deleteClinic(physicianId: string, clinicId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${physicianId}/clinics/${clinicId}`);
  }

  loadPrescription(id: string, prescriptionId: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/design-prescriptions/${prescriptionId}`;
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

  getPatientByMobile(physicianId: string, mobile: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${physicianId}/patients/by-mobile/${mobile}`);
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

  getDefaultPrescriptionHeaderFooter(id: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/header-footer`);
  }

  getPrescriptions(physicianId: string, patientId: string, getAll : boolean): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${physicianId}/prescriptions/${patientId}`);
  }

  getLatestPrescription(physicianId: string, patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${physicianId}/latest-prescription/${patientId}`);
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

  getProfiles(physicianId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${physicianId}/profiles`);
  }

  saveProfiles(physicianId: string, profiles: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${physicianId}/profiles`, profiles);
  }

  uploadPrescription(data: { pdfBlob: Blob; patientId: string; illness: string; physicianId: string }): Observable<any> {
    // Convert Blob to Base64
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as string; // Base64 string
        const payload = {
          PhysicianId: data.physicianId,
          PatientId: data.patientId,
          Illness: data.illness,
          PdfBase64: base64Data.split(',')[1], // Remove metadata prefix
        };
        // Send the payload as JSON
        this.http.post<any>(`${this.apiUrl}/${data.physicianId}/prescriptions`, payload).subscribe(
          (response) => observer.next(response),
          (error) => observer.error(error),
          () => observer.complete()
        );
      };
      reader.onerror = (error) => observer.error(error);
      reader.readAsDataURL(data.pdfBlob); // Convert Blob to Base64
    });
  }
}