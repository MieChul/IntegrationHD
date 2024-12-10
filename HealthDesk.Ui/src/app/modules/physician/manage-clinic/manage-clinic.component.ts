import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-manage-clinic',
  templateUrl: './manage-clinic.component.html',
  styleUrls: ['./manage-clinic.component.scss']
})
export class ManageClinicComponent implements OnInit {
  clinics: any[] = []; // All clinics
  filteredClinics: any[] = []; // Filtered clinics for display
  searchValue: string = ''; // Search term
  sortKey: string = ''; // Current sort column
  sortDirection: string = 'asc'; // Current sort direction

  currentClinic: any = {}; // Clinic currently being added/edited
  isEditMode: boolean = false; // Whether we're editing or adding

  constructor() {}

  ngOnInit(): void {
    // Mock initial data
    this.clinics = [
      { id: 1, name: 'Clinic A', address: '123 Main St', timing: '9 AM - 5 PM', isActive: true },
      { id: 2, name: 'Clinic B', address: '456 Market Rd', timing: '10 AM - 6 PM', isActive: false }
    ];
    this.filteredClinics = [...this.clinics];
  }

  // Search clinics by name
  searchClinic(): void {
    const searchTerm = this.searchValue.toLowerCase();
    this.filteredClinics = this.clinics.filter(clinic =>
      clinic.name.toLowerCase().includes(searchTerm)
    );
  }

  // Sort clinics
  sortTable(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.filteredClinics.sort((a, b) => {
      if (a[key] < b[key]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Open Add Clinic modal
  openAddClinicPopup(): void {
    this.currentClinic = { name: '', address: '', timing: '', isActive: true }; // Reset form
    this.isEditMode = false;
    const modal = new bootstrap.Modal(document.getElementById('clinicModal')!);
    modal.show();
  }

  // Open Edit Clinic modal
  editClinic(clinic: any): void {
    this.currentClinic = { ...clinic }; // Copy clinic data
    this.isEditMode = true;
    const modal = new bootstrap.Modal(document.getElementById('clinicModal')!);
    modal.show();
  }

  // Save clinic (add or edit)
  saveClinic(): void {
    if (this.isEditMode) {
      const index = this.clinics.findIndex(c => c.id === this.currentClinic.id);
      if (index !== -1) this.clinics[index] = { ...this.currentClinic };
    } else {
      this.currentClinic.id = this.clinics.length + 1;
      this.clinics.push({ ...this.currentClinic });
    }
    this.filteredClinics = [...this.clinics];
    bootstrap.Modal.getInstance(document.getElementById('clinicModal')!)?.hide();
  }

  // Delete clinic
  deleteClinic(id: number): void {
    if (confirm('Are you sure you want to delete this clinic?')) {
      this.clinics = this.clinics.filter(c => c.id !== id);
      this.filteredClinics = this.filteredClinics.filter(c => c.id !== id);
    }
  }
}
