// User Roles Enum
export enum UserRole {
  Employee = 'Employee',
  FacilityAdmin = 'FacilityAdmin'
}

// User Model
export interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  groupId?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Navigation Properties
  group?: Group;
  bookings?: Booking[];
}

// Location Model
export interface Location {
  locationId: number;
  locationName: string;
  address: string;
  isActive: boolean;
  createdAt: Date;
  
  // Navigation Properties
  rooms?: Room[];
}

// Room Model
export interface Room {
  roomId: number;
  roomName: string;
  locationId: number;
  capacity: number;
  equipment: string;
  isActive: boolean;
  createdAt: Date;
  
  // Navigation Properties
  location?: Location;
  groupAccess?: RoomGroupAccess[];
  bookings?: Booking[];
}

// Group Model
export interface Group {
  groupId: number;
  groupName: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  
  // Navigation Properties
  users?: User[];
  roomAccess?: RoomGroupAccess[];
}

// RoomGroupAccess Model
export interface RoomGroupAccess {
  roomGroupAccessId: number;
  roomId: number;
  groupId: number;
  createdAt: Date;
  
  // Navigation Properties
  room?: Room;
  group?: Group;
}

// Booking Status Enum
export enum BookingStatus {
  Active = 'Active',
  Cancelled = 'Cancelled'
}

// Booking Model
export interface Booking {
  bookingId: number;
  roomId: number;
  userId: number;
  startTime: Date;
  endTime: Date;
  purpose: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
  
  // Navigation Properties
  room?: Room;
  user?: User;
}
