import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  db: any;
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
    this.initDB();
  }

  getAllLabTests(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/lab-tests`);
  }

  getLabTestById(id: string, labTestId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/lab-tests/${labTestId}`);
  }

  saveLabTest(id: string, labTest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/lab-tests`, labTest);
  }

  deleteLabTest(id: string, labTestId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/lab-tests/${labTestId}`);
  }

  getAllMedicines(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/medicines`);
  }

  getMedicineById(id: string, medicineId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/medicines/${medicineId}`);
  }

  saveMedicine(id: string, medicine: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/medicines`, medicine);
  }

  deleteMedicine(id: string, medicineId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/medicines/${medicineId}`);
  }

  getAllPhysicians(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/physicians`);
  }

  addPhysician(id: string, physicianId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/physicians`, { id: physicianId });
  }

  deletePhysician(id: string, physicianId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/physicians/${physicianId}`);
  }

  getAllServices(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/services`);
  }

  saveService(id: string, service: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/services`, service);
  }

  deleteService(id: string, serviceId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/services/${serviceId}`);
  }

  getAllBrandLibraries(pharmaceuticalId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${pharmaceuticalId}/brand-library`);
  }

  saveBrandLibrary(pharmaceuticalId: string, brandLibrary: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${pharmaceuticalId}/brand-library`, brandLibrary);
  }

  deleteBrandLibrary(pharmaceuticalId: string, brandLibraryId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${pharmaceuticalId}/brand-library/${brandLibraryId}`);
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

  getSharedWith(pharmaId: string, surveyId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${pharmaId}/surveys/${surveyId}/shared-with`);
  }

  addSharedWith(pharmaId: string, surveyId: string, sharedWith: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${pharmaId}/surveys/${surveyId}/shared-with`, sharedWith);
  }

  async initDB() {
    this.db = await openDB('surveyDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('surveys')) {
          db.createObjectStore('surveys', { keyPath: 'id', autoIncrement: true });
        }
      }
    });
  }

  async saveSurvey(survey: any) {
    await this.initDB();
    const tx = await this.db.transaction('surveys', 'readwrite');
    await tx.store.add(survey);
    await tx.done;
  }

  async getSurveyById(id: string) {
    await this.initDB();
    const tx = await this.db.transaction('surveys', 'readonly');
    const survey = await tx.store.get(Number(id));
    return survey;
  }

  async saveResponse(surveyId: string, response: any) {
    await this.initDB();
    const tx = await this.db.transaction('surveys', 'readwrite');
    const survey = await tx.store.get(Number(surveyId));
    survey.responses = survey.responses || [];
    survey.responses.push(response);
    await tx.store.put(survey);
  }

  async getSurveys() {
    await this.initDB();
    const tx = await this.db.transaction('surveys', 'readonly');
    return await tx.store.getAll();
  }

  async deleteSurvey(surveyId: string) {
    await this.initDB();
    const tx = await this.db.transaction('surveys', 'readwrite');
    await tx.store.delete(Number(surveyId));
    await tx.done;
  }

  async updateSurvey(id: string, updatedSurvey: any) {
    await this.initDB();
    const tx = await this.db.transaction('surveys', 'readwrite');
    await tx.store.put(updatedSurvey);  // Update the survey
    await tx.done;
  }
}
