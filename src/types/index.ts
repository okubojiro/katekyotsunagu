// Since we're using SQLite without enums, define types manually
export type UserRole = 'PARENT' | 'TEACHER' | 'ADMIN';
export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
export type NotificationType = 'REQUEST_RECEIVED' | 'REQUEST_APPROVED' | 'REQUEST_REJECTED' | 'PAYMENT_REMINDER' | 'MATCH_COMPLETED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface UserProfile {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  avatar: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParentProfileData {
  studentName?: string;
  grade?: string;
  subjects: string[];
  budget?: number;
  location?: string;
  description?: string;
  learningGoals?: string;
  preferredSchedule?: string;
}

export interface TeacherProfileData {
  subjects: string[];
  hourlyRate?: number;
  experience?: number;
  education: string[];
  certifications: string[];
  description?: string;
  availability?: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
}

export interface MatchRequestData {
  id: string;
  parentId: string;
  teacherId: string;
  status: RequestStatus;
  feeAmount?: number;
  message?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationData {
  id: string;
  userId: string;
  requestId?: string;
  type: NotificationType;
  payload: string;
  sentAt?: Date;
  readAt?: Date;
  createdAt: Date;
}

export interface PaymentData {
  id: string;
  requestId: string;
  stripeSessionId?: string;
  amount: number;
  status: PaymentStatus;
  paidAt?: Date;
  createdAt: Date;
}

export interface SearchFilters {
  subjects?: string[];
  minRate?: number;
  maxRate?: number;
  location?: string;
  experience?: number;
  isVerified?: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}