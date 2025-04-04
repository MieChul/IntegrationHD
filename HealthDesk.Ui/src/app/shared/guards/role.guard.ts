// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'];
    const userRole = this.authService.userData?.role || ''; // Retrieve the role from sessionStorage

    // Check if the user is logged in (role is present)
    if (!userRole || !expectedRoles || !expectedRoles.includes(userRole)) {
      // Redirect to login if not authenticated
      this.authService.logout();
      return false;
    }

    // Allow access if user is authenticated and has a required role
    return true;
  }
}