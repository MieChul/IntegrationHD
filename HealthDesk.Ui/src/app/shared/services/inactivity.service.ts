import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class InactivityService {
  private inactivityTimer: any;
  private readonly inactivityLimit = 10 * 60 * 1000; // 10 minutes

  constructor(private authService: AuthService, private router: Router) {
    this.initializeInactivityTracking();
  }

  private initializeInactivityTracking(): void {
    this.resetInactivityTimer();

    // Add global event listeners for user activity
    ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll'].forEach(event => {
      document.addEventListener(event, () => this.resetInactivityTimer());
    });
  }

  private resetInactivityTimer(): void {
    // Clear the previous timer
    clearTimeout(this.inactivityTimer);

    // Start a new timer
    this.inactivityTimer = setTimeout(() => this.handleInactivity(), this.inactivityLimit);
  }

  private handleInactivity(): void {
    // Call logout and redirect to login page
    this.authService.logout();
  }
}
