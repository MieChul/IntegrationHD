import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Update this path to reflect your actual file structure
})
export class HeaderComponent implements OnInit {
  userData: any = {};
  isMenuOpen : boolean = false;
  profImg : string = '/assets/defaultProfile.jpg'
  switchRole: string = '';
  constructor(public router: Router, private authService: AuthService) { 

  }

  ngOnInit(): void {
    this.userData = this.authService.userValue;
    this.profImg =this.userData.profImage || '/assets/defaultProfile.jpg'
    this.setSwitchRoleText();
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.body.classList.add('dark-mode');
      this.updateDarkModeLabel(true);
    }
  }

  toggleDarkMode(): void {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode.toString());
    this.updateDarkModeLabel(isDarkMode);
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
    } else if (['laboratory', 'nutraceutical', 'hospital'].includes(this.userData.role.toLowerCase())) {
      this.switchRole = 'Switch Role';
    } else {
      this.switchRole = '';
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

  updateSessionAndNavigate(role: string) {
    this.userData.role = role;
    this.userData.isConfirm = true;
    sessionStorage.setItem('user', JSON.stringify(this.userData));
    this.router.navigate(['account/']);
  }

  openRoleSelectionPopup() {
    const modal = document.getElementById('roleSelectionPopup')!;
    modal.style.display = 'block';
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
    this.authService.logout();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
