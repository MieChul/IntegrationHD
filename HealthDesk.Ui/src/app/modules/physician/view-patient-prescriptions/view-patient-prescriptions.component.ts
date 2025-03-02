import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhysicianService } from '../../services/physician.service';

@Component({
  selector: 'app-view-patient-prescriptions',
  templateUrl: './view-patient-prescriptions.component.html',
  styleUrls: ['./view-patient-prescriptions.component.scss']
})
export class ViewPatientPrescriptionsComponent implements OnInit {
  patientId!: string;
  physicianId!: string;
  prescriptions: any = [];
  filteredPrescriptions: any = [];
  searchDate: Date | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private physicianService: PhysicianService
  ) { }

  ngOnInit(): void {
    // Get patient id from navigation state or route parameter
    this.physicianId = this.route.snapshot.paramMap.get('physicianId')!;
    this.patientId = this.route.snapshot.paramMap.get('patientId')!;

    this.fetchPrescriptions();
  }

  fetchPrescriptions(): void {
    // Assume getPrescriptions accepts patientId and returns an observable of PrescriptionDto[]
    this.physicianService.getPrescriptions(this.physicianId, this.patientId).subscribe({
      next: (data: any) => {
        this.prescriptions = data?.data || [];
        this.filteredPrescriptions = [...this.prescriptions];
      },
      error: (err) => {
        console.error('Error fetching prescriptions:', err);
      }
    });
  }

  searchPrescriptions(): void {
    if (!this.searchDate) {
      this.filteredPrescriptions = [...this.prescriptions];
      return;
    }
    const searchDateString = new Date(this.searchDate).toDateString();
    this.filteredPrescriptions = this.prescriptions.filter((prescription: any) => {
      if (prescription.lastVisitedDate) {
        const lastVisited = new Date(prescription.lastVisitedDate).toDateString();
        return lastVisited === searchDateString;
      }
      return false;
    });
  }

  // Optionally, add a method to reset the search
  resetSearch(): void {
    this.searchDate = null;
    this.filteredPrescriptions = [...this.prescriptions];
  }
}
