export interface CustomerInfo {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
}

export type UserRole = "ADMIN" | "USER";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
}

export interface RequestItem {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  purpose: string;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  date: string;
}

export interface AuthFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface ApiResponse<T> {
  message?: string;
  user?: T;
  loan?: T;
  data?: T;
}

/** Matches the backend LoanApplication JSON shape exactly */
export interface LoanApiResponse {
  laonId?: number;
  customerName: string;
  amount: number;
  purpose: string;
  interestRate?: number;
  durationMonths?: number;
  status?: string;
  customer?: CustomerInfo | null;
}
