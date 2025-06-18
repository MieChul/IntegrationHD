import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../modules/services/account.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Update this path to reflect your actual file structure
})
export class HeaderComponent implements OnInit {
  userData: any = {};
  isMenuOpen: boolean = false;
  profImg: string = '/assets/defaultProfile.jpg'
  switchRole: string = '';
  currRole: string = '';
  dependentText: string = '';
  isDarkMode: boolean = false;
  constructor(public router: Router, private authService: AuthService, private accountService: AccountService, private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        this.currRole = this.userData.role;
        this.profImg = this.userData.profImage || '/assets/defaultProfile.jpg';
        this.setSwitchRoleText();
        this.setDependentText();

        // Set dark mode state from localStorage
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.applyDarkModeClass(this.isDarkMode);
      }
    });
  }

  updateDarkModeLabel(isDarkMode: boolean): void {
    const darkModeLabel = document.getElementById('darkModeLabel');
    if (darkModeLabel) {
      darkModeLabel.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    }
  }

  setSwitchRoleText() {
    if (this.userData.role === 'physician') {
      this.switchRole = 'Switch to Patient';
    } else if (this.userData.role === 'patient') {
      this.switchRole = 'Switch to Physician';
    } else if (['laboratory', 'pharmacy', 'hospital'].includes(this.userData.role.toLowerCase())) {
      this.switchRole = 'Switch Role';
    } else {
      this.switchRole = '';
    }
  }

  setDependentText() {
    if (this.userData.hasDependent || this.userData.dependentId) {
      this.dependentText = 'Use App as ' + (this.userData.dependentName.trim() ? this.userData.dependentName : 'Dependent');
    } else {
      this.dependentText = 'Add Dependant';
    }
  }


  handleSwitchRole() {
    if (this.switchRole === 'Switch to Patient') {
      this.updateSessionAndNavigate('patient');
    } else if (this.switchRole === 'Switch to Physician') {
      this.updateSessionAndNavigate('physician');
    } else if (this.switchRole === 'Switch Role') {
      this.openRoleSelectionPopup();
    } else {
      alert('Switch Role not allowed for your current role.');
    }
  }

  updateSessionAndNavigate(role: string): void {
    this.accountService.switchRole(this.userData.id, role).subscribe({
      next: (u) => {
        this.currRole = role;
        if (u.data.status === 'Approved') {
          role === 'patient' || role === 'physician' ? this.router.navigate([`${role}/`]) : this.router.navigate([`organization/${role}`]);
        } else {
          this.router.navigate(['account/']);
        }
      },
      error: (err) => {
        this.notificationService.showError('Something went wrong. Please try again.');
      }
    });
  }


  openRoleSelectionPopup() {
    const modal = document.getElementById('roleSelectionPopup')!;
    modal.style.display = 'flex';
  }

  closeRoleSelectionPopup() {
    const modal = document.getElementById('roleSelectionPopup')!;
    modal.style.display = 'none';
  }

  selectRole(role: string) {
    this.updateSessionAndNavigate(role.toLowerCase());
    this.closeRoleSelectionPopup();
  }


  logout(): void {
    localStorage.removeItem('darkMode');
    this.isDarkMode = false;
    this.applyDarkModeClass(false);
    this.authService.logout();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getDashboardLink(role: string): string {
    if (role === 'physician' || role === 'patient') {
      return `/${role}`;
    } else {
      return `/organization/${role}`;
    }
  }

  addDependent() {

    this.accountService.addDependent(this.userData.id).subscribe({
      next: (u) => {
        if (u.status === 'Approved') {
          this.router.navigate([`patient/`]);
          window.location.reload();
        } else {
          this.router.navigate(['account/']);
        }
      },
      error: (err) => {
        this.notificationService.showError('Something went wrong. Please try again.');
      }
    });
  }

  navigateToUsers() {
    return `/admin/`;
  }

  navigateToBrands() {
    return `/admin/brands`;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyDarkModeClass(this.isDarkMode);
  }

  applyDarkModeClass(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
