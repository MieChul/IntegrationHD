import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  showSidebar = true;
  constructor(private accountService: AccountService) { }
  userData: any = {};

  ngOnInit(): void {
    this.showSidebar = location.pathname !== 'patient/';
    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data; // Assign the result to a variable
      }
    });
  }
}
