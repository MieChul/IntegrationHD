import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  patientForm!: FormGroup;
  dependentForm!: FormGroup;
  showModel = false;
  searchValue = '';
  searchValueDate: any;
  sortKey = '';
  sortDirection = 'asc';
  currentPatient: any;
  patientHistory: any[] = [];
  userData: any;
  isOtpSent = false;
  contactNumber: string = '';
  otpToken: string = '';
  verifyOtpForm !: FormGroup;
  patientForView: any;
  isEditMode = false;

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
    this.initOtpForm();

    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        this.loadPatients();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initOtpForm(): void {
    this.verifyOtpForm = this.fb.group({
      contact: [{ value: '', disabled: true }], // Prefilled and disabled
      otp: this.fb.array(new Array(6).fill('').map(() => new FormControl('', Validators.required)))
    });
  }

  get otpControls(): FormArray {
    return this.verifyOtpForm.get('otp') as FormArray;
  }

  openOtpPopUp(): void {
    const otpModal = new bootstrap.Modal(document.getElementById('otpModal')!);
    otpModal.show();
  }


  initForm(): void {
    this.patientForm = this.fb.group({
      id: [''],
      userId: [''],
      mobile: ['', [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      firstName: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z .'’-]{1,25}$/), Validators.minLength(2)]],
      middleName: [{ value: '', disabled: true }, [Validators.pattern(/^[a-zA-Z][a-zA-Z .'’-]{1,25}$/)],],
      lastName: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z .'’-]{1,25}$/)]],
      gender: [{ value: '', disabled: true }, Validators.required],
      dateOfBirth: [Validators.required, (control: AbstractControl) => this.validateAge(control)],
      abhaid: ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
      secondaryId: ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
    });

    this.dependentForm = this.fb.group({
      id: [''],
      userId: [''],
      mobile: ['', [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      firstName: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z .'’-]{1,25}$/), Validators.minLength(2)]],
      middleName: [{ value: '', disabled: true }, [Validators.pattern(/^[a-zA-Z][a-zA-Z .'’-]{1,25}$/)],],
      lastName: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z .'’-]{1,25}$/)]],
      gender: [{ value: '', disabled: true }, Validators.required],
      dateOfBirth: [Validators.required, (control: AbstractControl) => this.validateAge(control)],
      abhaid: ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
      secondaryId: ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
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

    onDependentMobileInputChange(): void {
    const mobile = this.dependentForm.get('mobile')?.value;
    if (mobile.length === 10) {
      this.checkDependentExists(mobile);
    }
  }

  checkPatientExists(mobile: string): void {
    this.physicianService.getPatientByMobile('physicianId', mobile).subscribe((response: any) => {
      if (response.success && response.data) {
        const patient = response.data;
        this.patientForm.patchValue({
          userId: patient.userId,
          firstName: patient.firstName,
          middleName: patient.middleName,
          lastName: patient.lastName,
          gender: patient.gender,
          dateOfBirth: patient.dateOfBirth,
        });
        this.patientForm.get('firstName')?.disable();
        this.patientForm.get('lastName')?.disable();
        this.patientForm.get('middleName')?.disable();
        this.patientForm.get('gender')?.disable();
        this.patientForm.get('dateOfBirth')?.disable();
      } else {
        this.patientForm.reset({ mobile });
        this.patientForm.get('mobile')?.disable();
        this.patientForm.get('firstName')?.enable();
        this.patientForm.get('middleName')?.enable();
        this.patientForm.get('lastName')?.enable();
        this.patientForm.get('gender')?.enable();
        this.patientForm.get('dateOfBirth')?.enable();
      }
    });
  }

   checkDependentExists(mobile: string): void {
    this.physicianService.getDependentByMobile(mobile).subscribe((response: any) => {
      if (response.success && response.data) {
        const patient = response.data;
        this.dependentForm.patchValue({
          userId: patient.userId,
          firstName: patient.firstName,
          middleName: patient.middleName,
          lastName: patient.lastName,
          gender: patient.gender,
          dateOfBirth: patient.dateOfBirth,
        });
        this.dependentForm.get('firstName')?.disable();
        this.dependentForm.get('lastName')?.disable();
        this.dependentForm.get('middleName')?.disable();
        this.dependentForm.get('gender')?.disable();
        this.dependentForm.get('dateOfBirth')?.disable();
      } else {
        this.dependentForm.reset({ mobile });
        this.dependentForm.get('mobile')?.disable();
        this.dependentForm.get('firstName')?.enable();
        this.dependentForm.get('middleName')?.enable();
        this.dependentForm.get('lastName')?.enable();
        this.dependentForm.get('gender')?.enable();
        this.dependentForm.get('dateOfBirth')?.enable();
      }
    });
  }

  openAddPatientPopup(): void {
    this.isEditMode = false;
    this.patientForm.reset();
    this.patientForm.get('mobile')?.enable();
    this.patientForm.get('firstName')?.disable();
    this.patientForm.get('middleName')?.disable();
    this.patientForm.get('lastName')?.disable();
    this.patientForm.get('gender')?.disable();
    this.patientForm.get('dateOfBirth')?.disable();
    this.patientForm.get('gender')?.disable();
    this.patientForm.get('dateOfBirth')?.disable();
    this.showModel = true;
    const addPatientModal = new bootstrap.Modal(document.getElementById('addPatientModal')!);
    addPatientModal.show();
  }

  openAddDependentPopup(): void {
    this.isEditMode = false;
    this.dependentForm.reset();
    this.dependentForm.get('mobile')?.enable();
    this.dependentForm.get('firstName')?.disable();
    this.dependentForm.get('middleName')?.disable();
    this.dependentForm.get('lastName')?.disable();
    this.dependentForm.get('gender')?.disable();
    this.dependentForm.get('dateOfBirth')?.disable();
    this.dependentForm.get('gender')?.disable();
    this.dependentForm.get('dateOfBirth')?.disable();
    this.showModel = true;
    const addDependentModal = new bootstrap.Modal(document.getElementById('addDependentModal')!);
    addDependentModal.show();
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
    this.isEditMode = true;
    this.patientForm.patchValue({
      id: patient.id,
      userId: patient.userId,
      firstName: patient.firstName || patient.name,
      middleName: patient.middleName || '',
      lastName: patient.lastName || '',
      gender: patient.gender,
      dateOfBirth: patient.dateOfBirth,
      abhaid: patient.abhaid,
      secondaryId: patient.secondaryId,
      mobile: patient.mobile
    });
    this.patientForm.get('firstName')?.disable();
    this.patientForm.get('middleName')?.disable();
    this.patientForm.get('lastName')?.disable();
    this.patientForm.get('gender')?.disable();
    this.patientForm.get('dateOfBirth')?.disable();
    this.patientForm.get('mobile')?.disable();
    this.showModel = true;
    const addPatientModal = new bootstrap.Modal(document.getElementById('addPatientModal')!);
    addPatientModal.show();
  }

    saveDependent(): void {
    if (this.dependentForm.invalid) {
      // Mark all controls as touched to trigger validation errors
      this.dependentForm.markAllAsTouched();
      return;
    }
    const dependent = this.dependentForm.getRawValue();

    // Convert dateOfBirth to ISO string format if it exists
    if (dependent.dateOfBirth) {
      dependent.dateOfBirth = new Date(dependent.dateOfBirth).toISOString();
    }

    this.physicianService.saveDependent(this.userData.id, dependent).subscribe(() => {
      this.loadPatients();
    });

    const addPatientModal = bootstrap.Modal.getInstance(document.getElementById('addPatientModal')!);
    addPatientModal?.hide();
  }


  createPrescription(patient: any): void {
    this.router.navigate(['physician/generate-prescription'], { state: { patient } });
  }

  createCertificate(patient: any): void {
    this.router.navigate(['physician/generate-certificate'], { state: { patient } });
  }




  validateAge(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null; // Allow empty values (handled by required validator)

    const birthDate = new Date(control.value); // Directly parse the date
    const today = new Date(); // Get today's date

    let age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has passed in the current year
    const isBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!isBirthdayPassed) {
      age--; // Adjust if birthday hasn't occurred yet this year
    }

    // Validate if the user must be at least 18 years old (only if dependentId is NOT present)
    if (!this.userData?.dependentId && age < 18) {
      return { minAge: true }; // Validation fails
    }

    return null; // Validation passes
  }


  viewPrescriptions(patient: any): void {
    this.router.navigate(['physician/view-patient-prescription', this.userData.id, patient.userId]);
  }

  openOtpPopup(patient: any): void {
    this.currentPatient = patient;

    if (!this.verifyOtpForm) {
      this.initOtpForm(); // Ensure form is initialized
    }

    console.log('Opening OTP popup for:', patient);

    if (patient?.mobile) {
      this.verifyOtpForm.patchValue({ contact: patient.mobile }); // ✅ Prefill Mobile
    } else {
      console.warn('Patient mobile is missing:', patient);
    }

    // Reset OTP fields
    this.otpControls.controls.forEach(control => control.setValue(''));

    // Send OTP automatically after UI updates
    setTimeout(() => this.sendOtp());

    // Open Bootstrap modal
    const otpModal = new bootstrap.Modal(document.getElementById('otpModal')!);
    otpModal.show();
  }



  sendOtp(): void {
    if (!this.currentPatient?.mobile) {
      this.notificationService.showError('Invalid mobile number.');
      return;
    }

    this.otpService.sendOtpMessage(this.currentPatient.mobile, false).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('OTP Sent successfully.');
        this.otpToken = response.otpToken;
        this.isOtpSent = true;
      },
      error: () => {
        this.notificationService.showError('Failed to send OTP.');
      },
    });
  }

  areAllOtpFilled(): boolean {
    return this.otpControls.controls.every(control => control.value.trim() !== '');
  }

  onEnterKey(): void {
    if (this.areAllOtpFilled()) {
      this.verifyOtp();
    }
  }

  verifyOtp(): void {
    const otp = this.otpControls.value.join(''); // Combine OTP values

    this.otpService.verifyOtp(this.currentPatient.mobile, otp, this.otpToken).subscribe({
      next: (response) => {
        if (response.valid) {
          const otpModal = bootstrap.Modal.getInstance(document.getElementById('otpModal')!);
          otpModal?.hide();

          // Navigate to patient history after successful verification
          this.router.navigate(['physician/view-patient-history', this.currentPatient.userId]);
        } else {
          this.notificationService.showError('Invalid OTP.');
        }
      },
      error: () => {
        this.notificationService.showError('OTP verification failed.');
      },
    });
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
}
