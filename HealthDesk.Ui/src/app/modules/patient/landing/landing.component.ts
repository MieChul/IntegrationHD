import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  showSidebar = true;
  constructor(private authService: AuthService) { }
  userData: any = {};

  ngOnInit(): void { 
    this.showSidebar = location.pathname !== 'patient/';
    this.userData = this.authService.userValue;
  }
}
