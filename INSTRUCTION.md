# Angular Frontend Development Plan - Meeting Room Booking Application (Role-Based Simplified)

### Core Product Goals
- **Unified Interface**: Single application interface with role-based feature visibility
- **Role-Based Access**: Facility Admin users see additional management options
- **Simplified Architecture**: No separate admin modules, just enhanced permissions
- **Learning-Focused**: Clean implementation following Angular best practices
- **Backend Integration**: Direct alignment with .NET API structure and OTP authentication[1]

### Success Metrics
- **Phase 1**: 100% authentication flow with role detection working
- **Phase 2**: Role-based UI components showing/hiding correctly  
- **Phase 3**: All management features accessible through unified interface

## 📋 Phase 1: Foundation & Role-Based Authentication (Week 1-2)

### 🎯 Phase Goals
- Set up Angular project with Material Design
- Implement passwordless OTP authentication matching backend[1]
- Create role-based navigation and component visibility
- Establish unified service architecture

### 📊 Success Criteria
- ✅ Users authenticate via email OTP system as per backend design[1]
- ✅ Role detection works automatically upon login
- ✅ Navigation menu adapts based on user role (Employee vs Facility Admin)[2]
- ✅ JWT token handling matches backend implementation[1]

### 🔧 Development Tasks

#### Week 1: Project Setup & Structure
1. **Initial Angular Setup**
   - Create Angular project with routing and Material Design
   - Install required dependencies (Angular Material, Flex Layout)
   - Set up project structure with feature-based modules
   - Configure environment files for API integration[1]

2. **Core Architecture**
   - Create shared module for common components
   - Set up core module with singleton services
   - Implement lazy-loaded feature modules
   - Configure Angular Material theme

3. **Models & Interfaces**
   - Create User model with role property matching backend[1][2]
   - Define Room, Booking, Group, and Location interfaces[1]
   - Set up response models for API communication
   - Create enums for user roles (Employee, FacilityAdmin)[2]

#### Week 2: Authentication & Role System
4. **Authentication Service**
   - Implement OTP-based authentication matching backend flow[1]
   - Create JWT token management with role extraction
   - Build user service with role-based permission checking
   - Set up HTTP interceptors for token attachment[1]

5. **Role-Based Components**
   - Create authentication guard with role checking
   - Implement role-based directive for conditional rendering
   - Build unified navigation component with role-based menu items
   - Set up permission service for component-level access control

### 📱 Key Components Structure
- **Auth Service**: OTP authentication with role detection[1]
- **Permission Service**: Centralized role-based access control
- **Navigation Component**: Unified menu with role-based items[2]
- **Role Directive**: Show/hide components based on user role
- **Route Guards**: Protect routes based on authentication and role

### 📦 Deliverables
- ✅ Angular project with unified architecture
- ✅ OTP authentication matching backend implementation[1]
- ✅ Role-based navigation and component visibility
- ✅ HTTP services configured for backend integration[1]
- ✅ Permission system working for Employee and Facility Admin roles[2]

## 📋 Phase 2: Unified User Interface with Role-Based Features (Week 3-4)

### 🎯 Phase Goals
- Build unified booking interface for all users
- Implement role-based management features within main interface  
- Create room discovery with group-based access control[1][2]
- Establish dashboard with role-appropriate content

### 📊 Success Criteria
- ✅ All users use same booking interface with appropriate permissions
- ✅ Facility Admins see additional management options in same views[2]
- ✅ Group-based room access working as per requirements[2]
- ✅ Dashboard adapts content based on user role

### 🔧 Development Tasks

#### Week 3: Unified Booking System
1. **Room Management Interface**
   - Create room listing component with role-based action buttons
   - Implement room creation/editing forms visible to Facility Admins[2]
   - Build room availability checking with group access control[1][2]
   - Set up location-based filtering matching backend structure[1]

2. **Booking Interface**
   - Design unified booking form for all users
   - Implement conflict detection matching backend validation[1][2]
   - Create booking management with role-based permissions
   - Build booking cancellation with admin override capabilities[2]

#### Week 4: Enhanced Management Features
3. **User Management (Role-Based)**
   - Create user listing component with Facility Admin actions[2]
   - Build user-group assignment interface for admins[2]
   - Set up user profile management for all users

4. **Dashboard & Analytics**
   - Implement booking statistics for Facility Admins
   - Build personal booking overview for Employees
   - Set up quick action buttons based on permissions[2]

### 🎮 Unified Module Structure
- **Booking Module**: Single interface with role-based features
- **Room Module**: Unified room browsing with admin management options[2]
- **User Module**: Profile management with admin user management[2]  
- **Dashboard Module**: Role-adaptive content and statistics

### 📊 Role-Based Services
- **Booking Service**: Handles all booking operations with permission validation
- **Room Service**: Room data with group access filtering[1][2]
- **User Service**: User management with role-based operations[2]
- **Permission Service**: Centralized access control logic

### 📦 Deliverables
- ✅ Unified interface working for both user roles[2]
- ✅ Role-based feature visibility functioning correctly
- ✅ Group-based room access implemented[1][2]  
- ✅ Booking system with conflict prevention[1][2]
- ✅ Dashboard adapting to user permissions

## 📋 Phase 3: Enhanced Role Features & Notifications (Week 5-6)

### 🎯 Phase Goals
- Complete Facility Admin management features within unified interface

### 📊 Success Criteria
- ✅ Facility Admins can manage all aspects through UI options[2]
- ✅ Reporting dashboard functional for admin users
- ✅ All user management operations available to Facility Admins[2]

### 🔧 Development Tasks




### 🛡️ Role-Based Feature Set
- **Employee Features**: Room booking, personal booking management, profile updates
- **Facility Admin Features**: All employee features plus user management, room management, group management, reporting[2]
- **Shared Features**: Booking interface, room discovery, dashboard[2]

### 📈 Advanced Admin Capabilities  
- **User Management**: Create, update, deactivate users, manage group assignments[2]
- **Room Management**: Create, update, deactivate rooms, manage group access[2]
- **Booking Oversight**: View all bookings, cancel/modify any booking[2]
- **System Analytics**: Usage reports, room utilization, user activity

### 📦 Final Deliverables
- ✅ Complete role-based management system
- ✅ Notification integration matching backend system[1][2]
- ✅ Reporting dashboard for Facility Admins
- ✅ Unified interface with full feature set based on roles[2]
- ✅ All requirements from specification document implemented[2]

## 🎨 Role-Based UI Guidelines

### Unified Interface Design
- **Conditional Rendering**: Use role-based directives to show/hide features
- **Enhanced Buttons**: Facility Admins see additional action buttons in same views[2]
- **Adaptive Menus**: Navigation menu items change based on user role[2]  
- **Contextual Actions**: Management options appear contextually for admin users

### Component Design Patterns
- **Smart Components**: Container components handle role-based logic
- **Role Directives**: Custom directives for conditional feature rendering
- **Unified Forms**: Same forms with different field visibility based on role
- **Adaptive Tables**: Data tables with role-based action columns

## 🔒 Role-Based Security Implementation

### Permission Management
- **Route Guards**: Single guard checking both authentication and role permissions
- **Component Guards**: Method-level permission checking within components
- **API Integration**: Frontend permissions matching backend role validation[1]
- **Graceful Degradation**: Features hidden instead of showing permission errors

### Security Best Practices
- **JWT Role Extraction**: Extract role from token payload matching backend[1]
- **Permission Caching**: Cache user permissions to reduce API calls
- **Secure Defaults**: Default to minimal permissions, explicitly grant admin features
- **Token Refresh**: Handle role changes during token refresh scenarios

## 🧪 Testing Strategy

### Role-Based Testing
- **Permission Testing**: Verify correct features show for each role
- **Navigation Testing**: Ensure menu items appear correctly for each user type[2]
- **API Integration**: Test role-based API calls match backend expectations[1]
- **Component Rendering**: Verify conditional rendering works properly

### User Flow Testing  
- **Employee Workflow**: Standard booking and management flows
- **Admin Workflow**: Enhanced management features and oversight capabilities[2]
- **Role Switching**: Test behavior when user role changes
- **Permission Edge Cases**: Test boundary conditions for role-based access

## 🚀 Implementation Notes

### Backend Integration Points
- **Authentication Flow**: Match exact OTP process from backend plan[1]
- **Role Detection**: Use same role structure as backend (Employee/FacilityAdmin)[2]
- **API Endpoints**: Align with backend controller structure and permissions[1]
- **Group Access**: Implement same group-based room access logic[1][2]

### Simplified Architecture Benefits
- **Single Codebase**: Easier maintenance with unified components
- **Role Scalability**: Easy to add new roles without major structural changes
- **User Experience**: Seamless experience with contextual feature enhancement
- **Development Speed**: Faster development with shared components and services

## C Sharp backend schema
```csharp
// Location Entity
public class Location
{
    public int LocationId { get; set; }
    public string LocationName { get; set; }
    public string Address { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
   
    // Navigation Properties
    public ICollection<Room> Rooms { get; set; }
}
 
// Room Entity
public class Room
{
    public int RoomId { get; set; }
    public string RoomName { get; set; }
    public int LocationId { get; set; }
    public int Capacity { get; set; }
    public string Equipment { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
   
    // Navigation Properties
    public Location Location { get; set; }
    public ICollection<RoomGroupAccess> GroupAccess { get; set; }
    public ICollection<Booking> Bookings { get; set; }
}
 
// RoomGroupAccess Entity
public class RoomGroupAccess
{
    public int RoomGroupAccessId { get; set; }
    public int RoomId { get; set; }
    public int GroupId { get; set; }
    public DateTime CreatedAt { get; set; }
   
    // Navigation Properties
    public Room Room { get; set; }
    public Group Group { get; set; }
}
 
// Booking Entity
public class Booking
{
    public int BookingId { get; set; }
    public int RoomId { get; set; }
    public int UserId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Purpose { get; set; }
    public string Status { get; set; } // Active, Cancelled
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
   
    // Navigation Properties
    public Room Room { get; set; }
    public User User { get; set; }
}
```