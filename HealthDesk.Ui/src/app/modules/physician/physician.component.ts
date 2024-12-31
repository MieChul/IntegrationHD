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
          { url: data.status === 'Approved' ? '/physician/manage-clinic' : '/account', tooltip: 'Manage Clinic', iconClass: 'bi bi-house' },
          { url: data.status === 'Approved' ? '/physician/design-prescription' : '/account', tooltip: 'Design Prescription', iconClass: 'bi bi-file-medical' },
          { url: data.status === 'Approved' ? '/physician/patient-record' : '/account', tooltip: 'Patient Record', iconClass: 'bi bi-people' },
          { url: data.status === 'Approved' ? '/physician/appointments' : '/account', tooltip: 'Appointments', iconClass: 'bi bi-calendar' },
          { url: data.status === 'Approved' ? '/physician/medical-journal' : '/account', tooltip: 'Medical Journal', iconClass: 'bi bi-journal-medical' },
          { url: data.status === 'Approved' ? '/physician/medical-cases' : '/account', tooltip: 'Medical Cases', iconClass: 'bi bi-folder2-open' },
          { url: data.status === 'Approved' ? '/physician/survey' : '/account', tooltip: 'Survey', iconClass: 'bi bi-clipboard-data' }
        ];
      }
    });
  }
}
