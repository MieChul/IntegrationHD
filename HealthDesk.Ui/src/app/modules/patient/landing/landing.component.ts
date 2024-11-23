import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  showSidebar = true;
  constructor() { }

  ngOnInit(): void { 
    this.showSidebar = location.pathname !== 'patient/';
  }
}
