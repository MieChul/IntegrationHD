import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export class PatientComponent implements OnInit {
  showSidebar: boolean = true;
  patientNavLinks = [
    { url: '/patient', tooltip: 'Home', iconClass: 'bi bi-house' },
    { url: '/patient/history', tooltip: 'Medical Hitory', iconClass: 'bi bi-file-medical' },
    { url: '/patient/treatment', tooltip: 'Current Treatment & Pill Remainder', iconClass: 'bi bi-people' },
    { url: '/patient/appointments', tooltip: 'Appointments', iconClass: 'bi bi-calendar' },
    { url: '/patient/self-recording', tooltip: 'Self Recording Data', iconClass: 'bi bi-journal-medical' },
    { url: '/patient/refill', tooltip: 'Medicine Refill & Complaince', iconClass: 'bi bi-folder2-open' },
    { url: '/patient/daily-activity', tooltip: 'Record Daily Activity', iconClass: 'bi bi-clipboard-data' },
    { url: '/patient/rate', tooltip: 'Search and Rate Doctors', iconClass: 'bi bi-clipboard-data' },
    { url: '/patient/remidies', tooltip: 'Home Remidies', iconClass: 'bi bi-clipboard-data' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['showSidebar'] !== undefined) {
        this.showSidebar = data['showSidebar'];
      }
    });
  }
}