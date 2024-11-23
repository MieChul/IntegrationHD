import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Update this path to reflect your actual file structure
})
export class HeaderComponent implements OnInit {
  userData: any = {};
  isMenuOpen : boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userData = this.authService.userValue;
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

  logout(): void {
    this.authService.logout();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
