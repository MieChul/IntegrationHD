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

  getPhysicianByMobile(mobile: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/physicians/by-mobile/${mobile}`);
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

  getPrescriptions(physicianId: string, patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${physicianId}/prescriptions/${patientId}`);
  }

  getPatientHistory(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/history/${patientId}`);
  }

  addPrescription(physicianId: string, prescription: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${physicianId}/prescriptions`, prescription);
  }

  getMedicalCaseById(userId: string, caseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/medical-case/${caseId}`);
  }

  getMedicalCases(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/medical-cases`);
  }

  saveMedicalCase(id: string, medicalCase: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/medical-case`, medicalCase);
  }

  deleteMedicalCase(id: string, caseId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/medical-cases/${caseId}`);
  }

  saveComment(userId: string, caseId: string, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}/comment/${caseId}`, comment);
  }

  toggleLike(userId: string, caseId: string, currentUserId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}/like/${caseId}/${currentUserId}`, {});
  }

  updatePreferences(userId: string, preferences: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}/preference`, preferences);
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

  deleteProfile(id: string, profileId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/profiles/${profileId}`);
  }

  uploadPrescription(data: { pdfBlob: Blob; patientId: string; illness: string; physicianId: string }): Observable<any> {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as string;
        const payload = {
          PhysicianId: data.physicianId,
          PatientId: data.patientId,
          Illness: data.illness,
          PdfBase64: base64Data.split(',')[1],
        };

        this.http.post<any>(`${this.apiUrl}/${data.physicianId}/prescriptions`, payload).subscribe(
          (response) => observer.next(response),
          (error) => observer.error(error),
          () => observer.complete()
        );
      };
      reader.onerror = (error) => observer.error(error);
      reader.readAsDataURL(data.pdfBlob);
    });
  }

  getClinicSlots(physicianId: string, clinicId: string, date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${physicianId}/clinic-slots`, {
      params: { clinicId, date }
    });
  }

  getPhysicianInfo(physiianId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${physiianId}/info`);
  }

  saveMultipleAppointments(
    status: string,
    date: Date | null,
    time: string | null,
    reason: string | null,
    appointments: any[]
  ): Observable<any> {
    const payload = {
      status: status,
      date: date ? date.toISOString() : null,
      time: time || null,
      reason: reason || null,
      dtos: appointments.map(a => ({
        id: a.id,
        patientId: a.patientId,
        physicianId: a.physicianId,
        date: a.date,
        time: a.time,
        status: status,
        reason: reason || a.reason,
        clinicName: a.clinicName,
        physicianName: a.physicianName,
        patientName: a.patientName,
        mobile: a.mobile,
        slotId: a.slotId,
        slotName: a.slotName
      }))
    };

    return this.http.post<any>(`${this.apiUrl}/multi-appointments`, payload);
  }
}