import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PatientComponent implements OnInit {
  patientNavLinks: any = [];

  constructor(private router: Router, private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.patientNavLinks = [
          { url: data.status === 'Approved' ? '/patient/history' : '/account', tooltip: 'Medical Hitory', iconClass: 'bi bi-file-medical' },
          { url: data.status === 'Approved' ? '/patient/treatment' : '/account', tooltip: 'Current Treatment & Pill Remainder', iconClass: 'bi bi-people' },
          { url: data.status === 'Approved' ? '/patient/appointments' : '/account', tooltip: 'Appointments', iconClass: 'bi bi-calendar' },
          { url: data.status === 'Approved' ? '/patient/self-recording' : '/account', tooltip: 'Self Recording Data', iconClass: 'bi bi-journal-medical' },
          { url: data.status === 'Approved' ? '/patient/refill' : '/account', tooltip: 'Medicine Refill & Complaince', iconClass: 'bi bi-folder2-open' },
          { url: data.status === 'Approved' ? '/patient/daily-activity' : '/account', tooltip: 'Record Daily Activity', iconClass: 'bi bi-clipboard-data' },
          { url: data.status === 'Approved' ? '/patient/rate' : '/account', tooltip: 'Search and Rate Doctors', iconClass: 'bi bi-clipboard-data' },
          { url: data.status === 'Approved' ? '/patient/remidies' : '/account', tooltip: 'Home Remidies', iconClass: 'bi bi-clipboard-data' }
        ]
      }
    });
  }
}