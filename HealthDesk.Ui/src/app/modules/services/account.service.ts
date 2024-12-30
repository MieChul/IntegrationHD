import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, switchMap, take, tap } from 'rxjs';
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

    switchRole(id: string, role: string): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/switch/${id}?role=${encodeURIComponent(role)}`, {},
            { withCredentials: true }
        ).pipe(
            tap((updatedUser: any) => {
                // Update sessionStorage and userSubject in AuthService
                this.authService.updateUserState(updatedUser.data);
                return updatedUser.data;
            })
        );
    }

    getUserData(): Observable<any> {
        return this.authService.user$.pipe( // Use the observable exposed by AuthService
            filter((user) => user !== null && !!user?.id), // Ensure user is not null and has an ID
            take(1), // Take the first emitted value
            switchMap((user) => {
                const role = encodeURIComponent(user!.role || ''); // Use non-null assertion as filter ensures user is non-null
                return this.http.post(
                    `${this.apiUrl}/refreshUserDetails/${user!.id}?role=${role}`,
                    {},
                    { withCredentials: true }
                ).pipe(
                    tap((updatedUser: any) => {
                        // Update sessionStorage and userSubject in AuthService
                        this.authService.updateUserState(updatedUser);
                    })
                );
            })
        );
    }

    addDependent(id: string): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/addDependent/${id}`, {},
            { withCredentials: true }
        ).pipe(
            tap((updatedUser: any) => {
                // Update sessionStorage and userSubject in AuthService
                this.authService.updateUserState(updatedUser);
                return updatedUser;
            })
        );
    }
}
