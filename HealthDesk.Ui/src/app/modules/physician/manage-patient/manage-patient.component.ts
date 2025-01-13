import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { PhysicianService } from '../../services/physician.service';
import { AccountService } from '../../services/account.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { OtpService } from '../../services/otp.service';

@Component({
  selector: 'app-patient-records',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.scss'],
})
export class ManagePatientComponent implements OnInit {
  patients: any[] = [];
  filteredPatients: any[] = [];
  filteredPatientsHistory: any[] = [];
  patientForm!: FormGroup;
  showHistory = false;
  showModel = false;
  searchValue = '';
  searchValueDate: any;
  sortKey = '';
  sortDirection = 'asc';
  currentPatient: any;
  patientHistory: any[] = [];
  userData: any;
  isOtpPopupVisible = false;
  isOtpSent = false;
  contactNumber: string = '';
  otpToken: string = '';
  verifyOtpForm = this.fb.group({
    otp: this.fb.array(new Array(6).fill('').map(() => this.fb.control('', Validators.required))),
  });
  patientForView: any;

  constructor(
    private fb: FormBuilder,
    private physicianService: PhysicianService,
    private router: Router,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private otpService: OtpService
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

  get otpControls(): FormArray {
    return this.verifyOtpForm.get('otp') as FormArray;
  }

  openOtpPopUp(): void {
    const otpModal = new bootstrap.Modal(document.getElementById('otpModal')!);
    otpModal.show();
  }

  sendOtp(): void {
    if (!this.contactNumber) {
      this.notificationService.showError('Please enter a valid mobile number.');
      return;
    }

    this.otpService.sendOtp(this.contactNumber, false).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('OTP Sent successfully.');
        this.otpToken = response.otpToken; // Assuming the token is returned by the API
        this.isOtpSent = true;
      },
      error: () => {
        this.notificationService.showError('Failed to send OTP.');
      },
    });
  }

  resendOtp(): void {
    this.sendOtp();
  }

  verifyOtp(): void {
    const otp = this.otpControls.value.join('');
    this.otpService.verifyOtp(this.contactNumber, otp, this.otpToken).subscribe({
      next: (response) => {
        if (response.valid) {
          this.isOtpPopupVisible = false; // Close OTP modal
          this.viewHistory(this.patientForView, true); // Fetch full history
        } else {
          this.notificationService.showError('Invalid OTP.');
        }
      },
      error: () => {
        this.notificationService.showError('OTP verification failed.');
      },
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
      abhaid: ['', Validators.pattern(/^[a-zA-Z0-9]*$/)], // Optional with pattern validation
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

  searchPatientHistory(): void {

    const searchDate = this.searchValueDate ? new Date(this.searchValueDate).toDateString() : null;

    this.filteredPatientsHistory = this.patientHistory.filter((patient) => {

      const patientDate = patient.dateOfDiagnosis ? new Date(patient.dateOfDiagnosis).toDateString() : null;
      const matchesDate = searchDate ? patientDate === searchDate : true;

      return matchesDate;
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

  moveToNext(event: KeyboardEvent, index: number): void {
    const target = event.target as HTMLInputElement;

    // Handle number input and move to the next box
    if (event.key >= '0' && event.key <= '9') {
      const nextInput = target.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    if (event.key === 'Backspace') {
      const prevInput = target.previousElementSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        prevInput.value = ''; // Clear the previous input field
      }
    }
  }

  areAllOtpFilled(): boolean {
    return this.otpControls.controls.every(control => control.value.trim() !== '');
  }

  onEnterKey(): void {
    if (this.areAllOtpFilled()) {
      this.verifyOtp();
    } else {
      const firstEmptyField = this.otpControls.controls.findIndex(control => control.value.trim() === '');
      if (firstEmptyField !== -1) {
        const otpInput = document.querySelectorAll('.otp-input')[firstEmptyField] as HTMLInputElement;
        if (otpInput) {
          otpInput.focus();
        }
      }
    }
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


  backToMain(): void {
    this.showHistory = false;
    this.currentPatient = null;
  }



  createPrescription(patient: any): void {
    this.router.navigate(['physician/generate-prescription'], { state: { patient } });
  }

  createCertificate(patient: any): void {
    this.router.navigate(['physician/generate-certificate'], { state: { patient } });
  }

  viewHistory(patient: any, getAll: boolean = false): void {
    this.patientForView = patient;
    this.showHistory = true;
    this.currentPatient = patient;

    const physicianId = this.userData.id;
    const patientId = patient.userId;

    this.physicianService.getPrescriptions(physicianId, patientId, getAll).subscribe({
      next: (prescriptions: any) => {
        this.patientHistory = prescriptions?.data.map((patient: any) => ({
          ...patient
        }));
        this.filteredPatientsHistory = [...this.patientHistory];
      },
      error: (err) => {
        console.error('Error fetching history:', err);
      },
    });
  }

  viewPatient(patient: any): void {
    if (patient.prescriptionUrl) {
      window.open(patient.prescriptionUrl, '_blank');
    } else {
      console.warn('No prescription available for this patient.');
    }
  }

  viewPrescription(patient: any): void {
    const physicianId = this.userData.id;
    const patientId = patient.userId;

    this.physicianService.getLatestPrescription(physicianId, patientId).subscribe({
      next: (prescriptions: any) => {
        const latestPrescription = prescriptions.data;

        if (latestPrescription) {
          window.open(latestPrescription, '_blank');
        } else {
          console.warn('No prescription available for this patient.');
        }
      },
      error: (err) => {
        console.error('Error fetching latest prescription:', err);
      },
    });
  }
}
