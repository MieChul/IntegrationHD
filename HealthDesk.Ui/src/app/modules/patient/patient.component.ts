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
  { 
    url: data.status === 'Approved' ? '/patient/history' : '/account', 
    tooltip: 'Medical History', 
    iconClass: 'bi bi-file-earmark-medical'  
  },
  { 
    url: data.status === 'Approved' ? '/patient/treatment' : '/account', 
    tooltip: 'Treatments', 
    iconClass: 'bi bi-heart-pulse' 
  },
  { 
    url: data.status === 'Approved' ? '/patient/appointments' : '/account', 
    tooltip: 'Appointments', 
    iconClass: 'bi bi-calendar2-check'  
  },
  { 
    url: data.status === 'Approved' ? '/patient/self-recording' : '/account', 
    tooltip: 'Self Records', 
    iconClass: 'bi bi-journal-plus' 
  },
  { 
    url: data.status === 'Approved' ? '/patient/refill' : '/account', 
    tooltip: 'Medicine Refill & Compliance', 
    iconClass: 'bi bi-capsule'  
  },
  { 
    url: data.status === 'Approved' ? '/patient/daily-activity' : '/account', 
    tooltip: 'Diet and Physical Activity', 
    iconClass: 'bi bi-activity' 
  },
  { 
    url: data.status === 'Approved' ? '/patient/rate' : '/account', 
    tooltip: 'Search and Rate', 
    iconClass: 'bi bi-search-heart'  
  },
  { 
    url: data.status === 'Approved' ? '/patient/remidies' : '/account', 
    tooltip: 'Home Remedies', 
    iconClass: 'bi bi-house-heart'  
  }
]
      }
    });
  }
}