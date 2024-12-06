import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl =  environment.apiUrl + '/user';

  constructor(private http: HttpClient) { }


  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  resetPassword(contact: string, newPassword: string, isEmail: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { contact, newPassword, isEmail });
  }

  getUsername(contact: string) {
    return this.http.get(`${this.apiUrl}/get-username/${contact}`, { withCredentials: true });
}
}
