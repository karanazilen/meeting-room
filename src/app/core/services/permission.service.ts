import { Injectable } from '@angular/core';
import { UserRole } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  
  constructor(private authService: AuthService) {}

  // Check if user has permission for a specific action
  hasPermission(permission: string): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) return false;

    const role = user.role;
    return this.getPermissionsForRole(role).includes(permission);
  }

  // Check if user can access a specific feature
  canAccessFeature(feature: string): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) return false;

    const role = user.role;
    const features = this.getFeaturesForRole(role);
    return features.includes(feature);
  }

  // Get all permissions for a specific role
  private getPermissionsForRole(role: UserRole): string[] {
    const permissions: Record<UserRole, string[]> = {
      [UserRole.Employee]: [
        'booking.create',
        'booking.view.own',
        'booking.update.own',
        'booking.cancel.own',
        'room.view',
        'room.search',
        'profile.view',
        'profile.update'
      ],
      [UserRole.FacilityAdmin]: [
        // All employee permissions
        'booking.create',
        'booking.view.own',
        'booking.update.own',
        'booking.cancel.own',
        'room.view',
        'room.search',
        'profile.view',
        'profile.update',
        // Additional admin permissions
        'booking.view.all',
        'booking.update.all',
        'booking.cancel.all',
        'room.create',
        'room.update',
        'room.delete',
        'room.manage',
        'user.view.all',
        'user.create',
        'user.update',
        'user.delete',
        'user.manage',
        'group.view.all',
        'group.create',
        'group.update',
        'group.delete',
        'group.manage',
        'location.view.all',
        'location.create',
        'location.update',
        'location.delete',
        'dashboard.admin',
        'reports.view'
      ]
    };

    return permissions[role] || [];
  }

  // Get all features accessible by a specific role
  private getFeaturesForRole(role: UserRole): string[] {
    const features: Record<UserRole, string[]> = {
      [UserRole.Employee]: [
        'dashboard',
        'booking',
        'room-browser',
        'profile'
      ],
      [UserRole.FacilityAdmin]: [
        'dashboard',
        'booking',
        'room-browser',
        'profile',
        'user-management',
        'room-management',
        'group-management',
        'location-management',
        'reports'
      ]
    };

    return features[role] || [];
  }

  // Navigation menu permissions
  getNavigationPermissions(): {
    showDashboard: boolean;
    showBookings: boolean;
    showRooms: boolean;
    showUserManagement: boolean;
    showRoomManagement: boolean;
    showReports: boolean;
    showProfile: boolean;
  } {
    const user = this.authService.getCurrentUser();
    if (!user) {
      return {
        showDashboard: false,
        showBookings: false,
        showRooms: false,
        showUserManagement: false,
        showRoomManagement: false,
        showReports: false,
        showProfile: false
      };
    }

    const isAdmin = user.role === UserRole.FacilityAdmin;
    
    return {
      showDashboard: true,
      showBookings: true,
      showRooms: true,
      showUserManagement: isAdmin,
      showRoomManagement: isAdmin,
      showReports: isAdmin,
      showProfile: true
    };
  }

  // Component-level permission checks
  canCreateBooking(): boolean {
    return this.hasPermission('booking.create');
  }

  canViewAllBookings(): boolean {
    return this.hasPermission('booking.view.all');
  }

  canManageUsers(): boolean {
    return this.hasPermission('user.manage');
  }

  canManageRooms(): boolean {
    return this.hasPermission('room.manage');
  }

  canViewReports(): boolean {
    return this.hasPermission('reports.view');
  }

  canCancelBooking(bookingUserId: number): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) return false;

    // Users can cancel their own bookings
    if (user.userId === bookingUserId && this.hasPermission('booking.cancel.own')) {
      return true;
    }

    // Admins can cancel any booking
    return this.hasPermission('booking.cancel.all');
  }

  canEditBooking(bookingUserId: number): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) return false;

    // Users can edit their own bookings
    if (user.userId === bookingUserId && this.hasPermission('booking.update.own')) {
      return true;
    }

    // Admins can edit any booking
    return this.hasPermission('booking.update.all');
  }

  // Check if user can access room based on group membership
  canAccessRoom(roomGroupAccess: any[], userGroupId?: number): boolean {
    // If no group restrictions, room is accessible to all
    if (!roomGroupAccess || roomGroupAccess.length === 0) {
      return true;
    }

    // If user has no group, they can't access group-restricted rooms
    if (!userGroupId) {
      return false;
    }

    // Check if user's group has access to this room
    return roomGroupAccess.some(access => access.groupId === userGroupId);
  }
}
