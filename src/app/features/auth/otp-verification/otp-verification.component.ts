import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
  standalone: false
})
export class OtpVerificationComponent implements OnDestroy {
  otpForm!: FormGroup;
  isLoading = false;
  email = '';
  canResend = false;
  resendCountdown = 30;
  private destroy$ = new Subject<void>();
  private countdownInterval?: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.email = this.route.snapshot.queryParams['email'] || '';
    
    if (!this.email) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.otpForm = this.fb.group({
      otpCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    this.startResendCountdown();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private startResendCountdown(): void {
    this.canResend = false;
    this.resendCountdown = 30;
    
    this.countdownInterval = setInterval(() => {
      this.resendCountdown--;
      if (this.resendCountdown <= 0) {
        this.canResend = true;
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  onSubmit(): void {
    if (this.otpForm.valid && !this.isLoading) {
      this.isLoading = true;
      const otpCode = this.otpForm.get('otpCode')?.value;

      this.authService.verifyOtp({ email: this.email, otpCode })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            if (response.success) {
              this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
              this.router.navigate([returnUrl]);
            } else {
              this.snackBar.open(response.message || 'Invalid OTP', 'Close', { duration: 5000 });
              this.otpForm.get('otpCode')?.setErrors({ 'invalid': true });
            }
          },
          error: (error) => {
            this.isLoading = false;
            console.error('OTP verification error:', error);
            this.snackBar.open('Verification failed. Please try again.', 'Close', { duration: 5000 });
            this.otpForm.get('otpCode')?.setErrors({ 'invalid': true });
          }
        });
    }
  }

  resendOtp(): void {
    if (this.canResend && !this.isLoading) {
      this.isLoading = true;
      
      this.authService.sendOtp({ email: this.email })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            if (response.success) {
              this.snackBar.open('New OTP sent to your email', 'Close', { duration: 3000 });
              this.startResendCountdown();
              this.otpForm.get('otpCode')?.setValue('');
              this.otpForm.get('otpCode')?.setErrors(null);
            } else {
              this.snackBar.open(response.message || 'Failed to send OTP', 'Close', { duration: 5000 });
            }
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Resend OTP error:', error);
            this.snackBar.open('Failed to resend OTP. Please try again.', 'Close', { duration: 5000 });
          }
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/auth/login']);
  }

  getErrorMessage(): string {
    const otpField = this.otpForm.get('otpCode');
    if (otpField?.hasError('required')) {
      return 'OTP is required';
    }
    if (otpField?.hasError('pattern')) {
      return 'OTP must be 6 digits';
    }
    if (otpField?.hasError('invalid')) {
      return 'Invalid OTP. Please try again.';
    }
    return '';
  }
}
