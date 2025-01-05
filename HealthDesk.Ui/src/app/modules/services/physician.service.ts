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

  getClinics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  addClinic(clinic: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, clinic);
  }

  updateClinic(clinic: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${clinic.id}`, clinic);
  }

  deleteClinic(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
