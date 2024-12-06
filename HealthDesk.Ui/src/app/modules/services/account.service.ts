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
        return this.http.get<User>(`${this.apiUrl}/${id}`, { withCredentials: true });
    }
    
    registerUserInfo(id: string, params: any) {
        return this.http.post(`${this.apiUrl}/registerUserInfo/${id}`, params, { withCredentials: true });
    }
    
    uploadFile(model: any) {
        return this.http.post(`${this.apiUrl}/uploadFile`, model, { withCredentials: true });
    }

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }

    adminAction(id: string, value:string, comments:string){
        return this.http.post(`${this.apiUrl}/adminAction/${id}`, {status : value, comments: comments})
        .pipe(map(x => {
            return x;
        }));
    }
    
}
