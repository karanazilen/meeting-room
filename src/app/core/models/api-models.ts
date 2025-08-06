// Authentication Request/Response Models
export interface LoginRequest {
  email: string;
}

export interface OtpVerificationRequest {
  email: string;
  otpCode: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: any;
  message: string;
}

// API Response Models
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  errors?: string[];
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  message: string;
}

// Booking Request Models
export interface CreateBookingRequest {
  roomId: number;
  startTime: Date;
  endTime: Date;
  purpose: string;
}

export interface UpdateBookingRequest {
  bookingId: number;
  startTime?: Date;
  endTime?: Date;
  purpose?: string;
}

// Room Request Models
export interface CreateRoomRequest {
  roomName: string;
  locationId: number;
  capacity: number;
  equipment: string;
}

export interface UpdateRoomRequest {
  roomId: number;
  roomName?: string;
  locationId?: number;
  capacity?: number;
  equipment?: string;
  isActive?: boolean;
}

// User Request Models
export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  groupId?: number;
}

export interface UpdateUserRequest {
  userId: number;
  firstName?: string;
  lastName?: string;
  role?: string;
  groupId?: number;
  isActive?: boolean;
}

// Query Parameters
export interface BookingQueryParams {
  roomId?: number;
  userId?: number;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface RoomQueryParams {
  locationId?: number;
  groupId?: number;
  capacity?: number;
  isActive?: boolean;
  pageNumber?: number;
  pageSize?: number;
}
