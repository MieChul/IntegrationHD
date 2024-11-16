import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private apiUrl = environment.apiUrl + '/account';
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    constructor(private router: Router, private http: HttpClient) {
        this.userSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    registerUserInfo(id: string, params: any) {
        return this.http.post(`${environment.apiUrl}/users/registerUserInfo/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }
    uploadFile(model: any) {
        return this.http.post(`${environment.apiUrl}/users/uploadFile/`, model)
            .pipe(map(x => {
                return x;
            }));
    }
    registerPatientInfo(id: string, params: any) {
        return this.http.post(`${environment.apiUrl}/users/registerPatientInfo/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    savePhysicianInfo(id: string, params: any) {
        return this.http.post(`${environment.apiUrl}/physician/savePhysicianLetter/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }
}
