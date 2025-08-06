import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { PermissionService } from '../../core/services/permission.service';
import { User, UserRole } from '../../core/models/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isLoading = true;
  private destroy$ = new Subject<void>();

  // Dashboard stats (will be implemented later with real data)
  stats = {
    upcomingBookings: 3,
    totalRooms: 12,
    totalUsers: 45,
    activeBookings: 7
  };

  constructor(
    private authService: AuthService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    // Check authentication first
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User | null) => {
        this.currentUser = user;
        this.isLoading = false;
        
        if (!user) {
          // Redirect to login if not authenticated
          this.authService.logout();
        } else {
          // Load dashboard data for the authenticated user
          this.loadDashboardData();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadDashboardData(): void {
    // TODO: Implement actual data loading from backend
    // For now, using mock data
    if (this.isFacilityAdmin()) {
      // Load admin-specific stats
      this.stats = {
        upcomingBookings: 15,
        totalRooms: 12,
        totalUsers: 45,
        activeBookings: 7
      };
    } else {
      // Load employee-specific stats
      this.stats = {
        upcomingBookings: 3,
        totalRooms: 0, // Employees don't see total rooms
        totalUsers: 0, // Employees don't see total users
        activeBookings: 1
      };
    }
  }

  getUserDisplayName(): string {
    if (this.currentUser) {
      return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    }
    return 'User';
  }

  getUserRole(): string {
    return this.currentUser?.role || '';
  }

  isFacilityAdmin(): boolean {
    const user = this.currentUser;
    return user ? user.role === UserRole.FacilityAdmin : false;
  }

  canViewReports(): boolean {
    return this.permissionService.canViewReports();
  }

  canManageUsers(): boolean {
    return this.permissionService.canManageUsers();
  }

  canManageRooms(): boolean {
    return this.permissionService.canManageRooms();
  }

  // Quick action methods
  navigateToBookings(): void {
    // TODO: Implement navigation to bookings
    console.log('Navigate to bookings');
  }

  navigateToRooms(): void {
    // TODO: Implement navigation to rooms
    console.log('Navigate to rooms');
  }

  navigateToUserManagement(): void {
    // TODO: Implement navigation to user management
    console.log('Navigate to user management');
  }

  navigateToReports(): void {
    // TODO: Implement navigation to reports
    console.log('Navigate to reports');
  }
}
