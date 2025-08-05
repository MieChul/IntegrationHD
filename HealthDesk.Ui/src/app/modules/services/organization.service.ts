import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SurveyDto, SurveyResponse } from '../../shared/models/survey';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  db: any;
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }

  getAllLabTests(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/laboratory/${id}/lab-tests`);
  }

  getLabTestById(id: string, labTestId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/laboratory/${id}/lab-tests/${labTestId}`);
  }

  saveLabTest(id: string, labTests: any): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/laboratory/${id}/lab-tests`,
      labTests
    );
  }

  deleteLabTest(id: string, labTestId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/laboratory/${id}/lab-tests/${labTestId}`);
  }

  getAllMedicines(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pharmacy/${id}/medicines`);
  }

  getMedicineById(id: string, medicineId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pharmacy/${id}/medicines/${medicineId}`);
  }

  saveMedicine(id: string, medicine: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pharmacy/${id}/medicines`, medicine);
  }

  deleteMedicine(id: string, medicineId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/pharmacy/${id}/medicines/${medicineId}`);
  }

  getAllPhysicians(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hospital/${id}/physicians`);
  }

  getPhysicianByMobile(mobile: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hospital/${mobile}/get-by-mobile`);
  }

  deletePhysician(id: string, physicianId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/hospital/${id}/physicians/${physicianId}`);
  }

  getAllServices(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hospital/${id}/services`);
  }

  saveService(id: string, service: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/hospital/${id}/services`, service);
  }

  savePhysician(id: string, physician: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/hospital/${id}/physicians`, physician);
  }

  deleteService(id: string, serviceId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/hopital/services/${serviceId}`);
  }

  getAllBrandLibraries(pharmaceuticalId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pharmaceutical/${pharmaceuticalId}/brand-library`);
  }

  saveBrandLibrary(pharmaceuticalId: string, brandLibrary: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pharmaceutical/${pharmaceuticalId}/brand-library`, brandLibrary);
  }

  deleteBrandLibrary(pharmaceuticalId: string, brandLibraryId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pharmaceutical/${pharmaceuticalId}/brand-library/${brandLibraryId}`);
  }

  getSurveysmain(pharmaId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${pharmaId}/surveys`);
  }

  saveSurveymain(pharmaId: string, survey: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${pharmaId}/surveys`, survey);
  }

  deleteSurveymain(pharmaId: string, surveyId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${pharmaId}/surveys/${surveyId}`);
  }

  getMedicalCaseById(userId: string, caseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hospital/${userId}/medical-case/${caseId}`);
  }

  getMedicalCases(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hospital/${id}/medical-cases`);
  }

  saveMedicalCase(id: string, medicalCase: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/hospital/${id}/medical-case`, medicalCase);
  }

  deleteMedicalCase(id: string, caseId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/hospital/${id}/medical-cases/${caseId}`);
  }

  saveComment(userId: string, caseId: string, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/hospital/${userId}/comment/${caseId}`, comment);
  }

  toggleLike(userId: string, caseId: string, currentUserId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/hospital/${userId}/like/${caseId}/${currentUserId}`, {});
  }

  updatePreferences(userId: string, preferences: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/hospital/${userId}/preference`, preferences);
  }

  getHospitalInfo(hospitalId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hospital/${hospitalId}/info`);
  }

  getSurveys(pharmaId: string): Observable<SurveyResponse[]> {
    return this.http.get<any>(`${this.apiUrl}/Pharmaceutical/${pharmaId}/surveys`)
      .pipe(map((response: any) => response.data));
  }


  getSurveyById(pharmaId: string, surveyId: string): Observable<SurveyResponse> {
    return this.http.get<any>(`${this.apiUrl}/Pharmaceutical/${pharmaId}/surveys/${surveyId}`)
      .pipe(map((response: any) => response.data));
  }


  saveSurvey(pharmaId: string, survey: SurveyDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Pharmaceutical/${pharmaId}/surveys`, survey);
  }

  deleteSurvey(pharmaId: string, surveyId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Pharmaceutical/${pharmaId}/surveys/${surveyId}`);
  }

  addSharedWith(pharmaId: string, surveyId: string, sharedWith: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Pharmaceutical/${pharmaId}/surveys/${surveyId}/shared-with`, sharedWith);
  }

  getSharedWith(pharmaId: string, surveyId: string): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/Pharmaceutical/${pharmaId}/surveys/${surveyId}/shared-with`)
      .pipe(map((response: any) => response.data));
  }


  saveResponse(surveyId: string, response: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Pharmaceutical/${surveyId}/responses`, response);
  }
}
