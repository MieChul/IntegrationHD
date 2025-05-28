import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrl: './physician.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PhysicianComponent {
  physicianNavLinks: any = [];
  constructor(private router: Router, private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.physicianNavLinks = [
          {
            url: data.status === 'Approved' ? '/physician/manage-clinic' : '/account',
            tooltip: 'Clinic Management',
            iconClass: 'bi bi-building'  
          },
          {
            url: data.status === 'Approved' ? '/physician/design-prescription' : '/account',
            tooltip: 'Prescription Format',
            iconClass: 'bi bi-prescription2'  
          },
          {
            url: data.status === 'Approved' ? '/physician/lab-profile' : '/account',
            tooltip: 'Laboratory Profile',
            iconClass: 'bi bi-droplet-half' 
          },
          {
            url: data.status === 'Approved' ? '/physician/patient-record' : '/account',
            tooltip: 'Patient Management',
            iconClass: 'bi bi-person-vcard'  
          },
          {
            url: data.status === 'Approved' ? '/physician/appointments' : '/account',
            tooltip: 'Appointments',
            iconClass: 'bi bi-calendar-check'  
          },
          {
            url: data.status === 'Approved' ? '/physician/medical-journal' : '/account',
            tooltip: 'Medical Journals',
            iconClass: 'bi bi-journal-text'  
          },
          {
            url: data.status === 'Approved' ? '/physician/medical-cases' : '/account',
            tooltip: 'Medical Cases',
            iconClass: 'bi bi-file-earmark-medical'  
          },
          {
            url: data.status === 'Approved' ? '/physician/survey' : '/account',
            tooltip: 'Surveys',
            iconClass: 'bi bi-clipboard2-pulse'  
          }
        ]
      }
    });
  }
}
