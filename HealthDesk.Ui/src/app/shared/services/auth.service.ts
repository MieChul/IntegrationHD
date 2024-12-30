import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user$: Observable<User | null>; // Expose as observable for reactive subscriptions
  private apiUrl = environment.apiUrl + '/auth';

  constructor(private router: Router, private http: HttpClient) {
    const savedUser = sessionStorage.getItem('user');
    this.userSubject = new BehaviorSubject<User | null>(savedUser ? JSON.parse(savedUser) : null);
    this.user$ = this.userSubject.asObservable(); // Expose userSubject as observable
  }

  // Getter for synchronous access
  public get userData(): User | null {
    return this.userSubject.value;
  }

  // Login function
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      { username, password }, 
      { withCredentials: true } // Send cookies with the request
    ).pipe(
      tap((user: User) => {
        // Store user in sessionStorage after login
        sessionStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  // Logout function
  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        sessionStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
      },
      error: (error) => console.error('Logout failed', error),
    });
  }

  // Update user state after refreshing or modifying user details
  updateUserState(user: User): void {
    // Update sessionStorage
    sessionStorage.setItem('user', JSON.stringify(user));

    // Notify all subscribers of the updated user
    this.userSubject.next(user);
  }
}
