import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { map } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    private apiUrl = environment.apiUrl + '/admin';
    constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
    }

    adminAction(id: string, role: string, value: string, comments: string) {
        return this.http.post(`${this.apiUrl}/adminAction/${id}`, { role: role, status: value, comments: comments })
            .pipe(map(x => {
                return x;
            }));
    }

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`, {
            withCredentials: true // Ensures cookies are sent with the request
        });
    }

    getAllBrands() {
        return this.http.get<User[]>(`${this.apiUrl}/brands`, {
            withCredentials: true // Ensures cookies are sent with the request
        });
    }
}
