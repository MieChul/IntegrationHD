import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private baseUrl = `${environment.apiUrl}/common`;

  constructor(private http: HttpClient) {}
  getComments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments`);
  }

  saveComment(comment: any): Observable<any> {
    if (comment.id) {
      return this.http.put(`${this.baseUrl}/comments/${comment.id}`, comment);
    } else {
      return this.http.post(`${this.baseUrl}/comments`, comment);
    }
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/comments/${id}`);
  }

  // Ratings
  getRatings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ratings`);
  }

  saveRating(rating: any): Observable<any> {
    if (rating.id) {
      return this.http.put(`${this.baseUrl}/ratings/${rating.id}`, rating);
    } else {
      return this.http.post(`${this.baseUrl}/ratings`, rating);
    }
  }

  deleteRating(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ratings/${id}`);
  }

  // Generic Fetch for Simple Entities
  getBodySystems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/body-systems`);
  }

  getDosageForms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dosage-forms`);
  }

  getDrugFrequencies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/drug-frequencies`);
  }

  getInvestigations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/investigations`);
  }

  getSymptoms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/symptoms`);
  }

  getVaccines(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vaccines`);
  }

  getAdministrationRoutes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/administration-routes`);
  }
}