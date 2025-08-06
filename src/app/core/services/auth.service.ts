import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { User, UserRole } from '../models';
import { LoginRequest, OtpVerificationRequest, AuthResponse } from '../models/api-models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('currentUser');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.setCurrentUser(user);
      } catch (error) {
        this.logout();
      }
    }
  }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Send OTP to email
  sendOtp(request: LoginRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('auth/send-otp', request)
      .pipe(
        map(response => response.data!),
        catchError(error => throwError(() => error))
      );
  }

  // Verify OTP and complete login
  verifyOtp(request: OtpVerificationRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('auth/verify-otp', request)
      .pipe(
        map(response => {
          const authData = response.data!;
          if (authData.success && authData.token && authData.user) {
            localStorage.setItem('authToken', authData.token);
            this.setCurrentUser(authData.user);
          }
          return authData;
        }),
        catchError(error => throwError(() => error))
      );
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Get user role
  getUserRole(): UserRole | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  // Check if user has specific role
  hasRole(role: UserRole): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  // Check if user is facility admin
  isFacilityAdmin(): boolean {
    return this.hasRole(UserRole.FacilityAdmin);
  }

  // Check if user is employee
  isEmployee(): boolean {
    return this.hasRole(UserRole.Employee);
  }

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Refresh token (if needed)
  refreshToken(): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('auth/refresh-token', {})
      .pipe(
        map(response => {
          const authData = response.data!;
          if (authData.success && authData.token) {
            localStorage.setItem('authToken', authData.token);
          }
          return authData;
        }),
        catchError(error => throwError(() => error))
      );
  }
}
