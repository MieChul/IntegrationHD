// src/app/components/verify-otp/verify-otp.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthStateService } from '../../../shared/guards/auth-state.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { OtpService } from '../../services/otp.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit, OnDestroy {
  verifyOtpForm!: FormGroup;
  isOtpSent = false;
  isResendAvailable = false;
  countdown: number = 60;
  countdownSubscription!: Subscription;
  selectedRole = '';
  captchaVerified = false;
  otpToken: string = '';
  isEmail: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private otpService: OtpService,
    private authStateService: AuthStateService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedRole = params['role'] || null;
    });
    this.verifyOtpForm = this.fb.group({
      contact: ['', this.getContactValidator()],
      otp: this.fb.array(new Array(6).fill('').map(() => new FormControl('', Validators.required)))
    });
  }

  get otpControls(): FormArray {
    return this.verifyOtpForm.get('otp') as FormArray;
  }

  private getContactValidator() {
    return this.selectedRole === 'Physician' || this.selectedRole === 'Patient'
      ? [Validators.required, Validators.pattern(/^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/)] // Mobile validation
      : [Validators.required, Validators.email]; // Email validation
  }

  onCaptchaResolved(captchaResponse: string | null) {
    this.captchaVerified = !!captchaResponse;
  }

  getControl(controlName: string) {
    return this.verifyOtpForm.get(controlName);
  }

  sendOtp() {
    this.isEmail = !(this.selectedRole === 'Physician' || this.selectedRole === 'Patient');
    if (this.verifyOtpForm.get('contact')?.value && this.captchaVerified) {
      this.otpService.sendOtp(this.verifyOtpForm.get('contact')?.value, this.isEmail).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('OTP Sent successfully')
          this.otpToken = response.otpToken;
          this.isOtpSent = true;
          this.startCountdown();
        },
        error: (e) => {
          if (e.error)
            this.notificationService.showError(e.error);
          else
            this.notificationService.showError('OTP sending failed. Try again after sometime.');
        }
      });
    }
  }

  startCountdown() {
    this.isResendAvailable = false;
    this.countdown = 60;
    this.countdownSubscription = interval(1000)
      .pipe(take(this.countdown))
      .subscribe({
        next: (value) => {
          this.countdown = 60 - value - 1;
        },
        complete: () => {
          this.isResendAvailable = true;
        }
      });
  }

  resendOtp() {
    if (this.isResendAvailable) {
      this.sendOtp();
    }
  }

  verifyOtp() {
    const contact = this.verifyOtpForm.get('contact')?.value;
    const otp = this.otpControls.value.join(''); // Combine OTP input values

    this.otpService.verifyOtp(contact, otp, this.otpToken).subscribe({
      next: (response) => {
        if (response.valid) {
          this.authStateService.setOtpVerified(true);
          this.router.navigate(['/register'], { queryParams: { role: this.selectedRole, contact: this.verifyOtpForm.get('contact')?.value, isEmail: this.isEmail } });
        } else {
          this.notificationService.showError('Invalid OTP');
        }
      },
      error: (e) => {
        if (e.error)
          this.notificationService.showError(e.error);
        else
          this.notificationService.showError('OTP verification failed. Try again after sometime.');
      }
    });
  }

  ngOnDestroy() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateVerifyPassword() {
    this.router.navigate(['/verify-forgot-password']);
  }

  moveToNext(event: KeyboardEvent, index: number) {
    const target = event.target as HTMLInputElement;

    // Move focus to the next box if a number is entered
    if (event.key >= '0' && event.key <= '9') {
      const nextInput = target.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Handle Backspace: Move focus to the previous box
    if (event.key === 'Backspace') {
      const prevInput = target.previousElementSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  areAllOtpFilled(): boolean {
    return this.otpControls.controls.every(control => control.value.trim() !== '');
  }

  onEnterKey() {
    if (this.areAllOtpFilled()) {
      this.verifyOtp();
    }
  }
}
