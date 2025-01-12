import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { PhysicianService } from '../../services/physician.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-patient-records',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.scss'],
})
export class ManagePatientComponent implements OnInit {
  patients: any[] = [];
  filteredPatients: any[] = [];
  patientForm!: FormGroup;
  showHistory = false;
  showModel = false;
  searchValue = '';
  sortKey = '';
  sortDirection = 'asc';
  currentPatient: any;
  patientHistory: any[] = [];
  userData: any;

  constructor(
    private fb: FormBuilder,
    private physicianService: PhysicianService,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.initForm();


    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        this.loadPatients();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }


  initForm(): void {
    this.patientForm = this.fb.group({
      id: [''],
      userId: [''],
      mobile: ['', [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      name: [{ value: '', disabled: true }, Validators.required],
      gender: [{ value: '', disabled: true }, Validators.required],
      dateOfBirth: [{ value: '', disabled: true }, Validators.required],
      abhaId: ['', Validators.pattern(/^[a-zA-Z0-9]*$/)], // Optional with pattern validation
      secondaryId: ['', Validators.pattern(/^[a-zA-Z0-9]*$/)], // Optional with pattern validation
    });
  }

  loadPatients(): void {
    this.physicianService.getPatients(this.userData.id).subscribe({
      next: (data: any) => {
        this.patients = data?.data.map((patient: any) => ({
          ...patient
        }));
        this.filteredPatients = [...this.patients];
      },
      error: (error) => {
        console.error('Error loading clinics:', error);
      }
    });
  }

  searchPatient(): void {
    const searchTerm = this.searchValue.toLowerCase();

    this.filteredPatients = this.patients.filter((patient) => {
      // Check if the search term matches the name or any part of the address
      return (
        patient.name.toLowerCase().includes(searchTerm)
      );
    });
  }

  sortTable(key: string): void {
    this.sortKey = key;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredPatients.sort((a, b) => {
      if (a[key] < b[key]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onMobileInputChange(): void {
    const mobile = this.patientForm.get('mobile')?.value;
    if (mobile.length === 10) {
      this.checkPatientExists(mobile);
    }
  }

  checkPatientExists(mobile: string): void {
    this.physicianService.getPatientByMobile('physicianId', mobile).subscribe((response: any) => {
      if (response.success && response.data) {
        const patient = response.data;
        this.patientForm.patchValue({
          userId: patient.userId,
          name: patient.name,
          gender: patient.gender,
          dateOfBirth: patient.dateOfBirth,
        });
        this.patientForm.get('name')?.disable();
        this.patientForm.get('gender')?.disable();
        this.patientForm.get('dateOfBirth')?.disable();
      } else {
        this.patientForm.reset({ mobile });
        this.patientForm.get('mobile')?.disable();
        this.patientForm.get('name')?.enable();
        this.patientForm.get('gender')?.enable();
        this.patientForm.get('dateOfBirth')?.enable();
      }
    });
  }

  openAddPatientPopup(): void {
    this.patientForm.reset();
    this.patientForm.get('mobile')?.enable();
    this.patientForm.get('name')?.disable();
    this.patientForm.get('gender')?.disable();
    this.patientForm.get('dateOfBirth')?.disable();
    this.showModel = true;
    const addPatientModal = new bootstrap.Modal(document.getElementById('addPatientModal')!);
    addPatientModal.show();
  }

  savePatient(): void {
    if (this.patientForm.invalid) {
      // Mark all controls as touched to trigger validation errors
      this.patientForm.markAllAsTouched();
      return;
    }
    const patient = this.patientForm.getRawValue();

    // Convert dateOfBirth to ISO string format if it exists
    if (patient.dateOfBirth) {
      patient.dateOfBirth = new Date(patient.dateOfBirth).toISOString();
    }

    this.physicianService.savePatient(this.userData.id, patient).subscribe(() => {
      this.loadPatients();
    });

    const addPatientModal = bootstrap.Modal.getInstance(document.getElementById('addPatientModal')!);
    addPatientModal?.hide();
  }

  editPatient(patient: any): void {
    this.patientForm.patchValue(patient);
    this.patientForm.get('name')?.enable();
    this.patientForm.get('gender')?.enable();
    this.patientForm.get('dateOfBirth')?.enable();
    this.showModel = true;
    const addPatientModal = new bootstrap.Modal(document.getElementById('addPatientModal')!);
    addPatientModal.show();
  }

  viewHistory(patient: any): void {
    this.showHistory = true;
    this.currentPatient = patient;
    // Fetch history logic here
  }

  backToMain(): void {
    this.showHistory = false;
    this.currentPatient = null;
  }

  viewPatient(patient: any): void {

  }

  createPrescription(patient: any): void {
    this.router.navigate(['physician/generate-prescription'], { state: { patient } });
  }

  createCertificate(patient: any): void {
    this.router.navigate(['physician/generate-certificate'], { state: { patient } });
  }
}
