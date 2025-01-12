import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhysicianService } from '../../services/physician.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-design-prescription',
  templateUrl: './design-prescription.component.html',
  styleUrls: ['./design-prescription.component.scss']
})
export class DesignPrescriptionComponent implements OnInit {
  prescriptions: any[] = [];
  filteredPrescriptions: any[] = [];
  sortKey: string = '';
  sortAscending: boolean = true;// Replace 'any' with proper type
  userData: any;
  searchValue: string = '';
  constructor(private router: Router, private physicianService: PhysicianService, private accountService: AccountService) { }

  ngOnInit(): void {

    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        this.physicianService.getDesignPrescriptions(this.userData.id).subscribe({
          next: (data: any) => {
            this.prescriptions = data?.data.map((prescription: any) => ({
              ...prescription
            }));
            this.filteredPrescriptions = [...this.prescriptions];
          },
          error: (err) => console.error('Error fetching user data:', err)
        });
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  editPrescription(prescription: any) {
    this.router.navigate(['/physician/customize-prescription'], { queryParams: { id: prescription.id } });
  }

  addDesignPrescription() {
    // Redirect to the CustomizePrescriptionComponent for adding a new prescription
    this.router.navigate(['/physician/select-template']);
  }



  filterPrescriptions() {
    const searchTerm = this.searchValue.toLowerCase();

    this.filteredPrescriptions = this.prescriptions.filter((prescription) => {
      // Check if the search term matches the name or any part of the address
      return (
        prescription.name.toLowerCase().includes(searchTerm) ||
        prescription.clinic.includes(searchTerm)
      );
    });
  }

  sortPrescriptions(key: string) {
    if (this.sortKey === key) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortKey = key;
      this.sortAscending = true;
    }
    this.filteredPrescriptions.sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      if (this.sortAscending) {
        return valA < valB ? -1 : valA > valB ? 1 : 0;
      } else {
        return valA > valB ? -1 : valA < valB ? 1 : 0;
      }
    });
  }

  deletePrescription(prescription: any) {
    this.physicianService.deleteDesignPrescription(this.userData.id, prescription.id).subscribe({
      next: (response) => {
        console.log('Prescription deleted successfully:', response);
        window.location.reload(); 
      },
      error: (error) => {
        console.error('Error deleting prescription:', error);
      },
    });
  }
}
