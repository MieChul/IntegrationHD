import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private apiUrl = environment.apiUrl + '/account';
    constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
    }

    getById(id: string) {
        return this.http.get<User>(`${this.apiUrl}/${id}`, { withCredentials: true });
    }
    
    registerUserInfo(id: string, params: any) {
        return this.http.post(`${this.apiUrl}/registerUserInfo/${id}`, params, { withCredentials: true });
    }
    
    uploadFile(model: any) {
        return this.http.post(`${this.apiUrl}/uploadFile`, model, { withCredentials: true });
    }
}
