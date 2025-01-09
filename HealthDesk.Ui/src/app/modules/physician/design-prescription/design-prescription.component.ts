import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tooltip } from 'bootstrap';

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
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  editPrescription(prescription: any) {
    this.router.navigate(['/physician/customize-prescription'], { queryParams: { id: prescription.id } });
  }

  addDesignPrescription() {
    // Redirect to the CustomizePrescriptionComponent for adding a new prescription
    this.router.navigate(['/physician/select-template']);
  }

  

  filterPrescriptions() {
    const filterValue = (document.getElementById('filterName') as HTMLInputElement).value.toLowerCase();
    this.filteredPrescriptions = this.prescriptions.filter(p => p.name.toLowerCase().includes(filterValue));
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

  async viewPrescription(prescription: any) {
    
  }

  deletePrescription(prescription: any)
  {
    
  }
}
