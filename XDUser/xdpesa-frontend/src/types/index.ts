export interface LoanApplication {
  id?: number;
  customerName: string;
  amount: number;
  purpose: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
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
