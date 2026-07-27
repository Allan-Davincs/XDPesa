import api from "../api/axiosInstance";
import type { LoanApiResponse, RequestItem, User, UserRole } from "../types";

const CURRENT_USER_KEY = "xdpesa_current_user";

// ─────────────────────────────────────────────
// Helper: convert backend LoanApiResponse → frontend RequestItem
// ─────────────────────────────────────────────
function loanToRequestItem(loan: LoanApiResponse): RequestItem {
  const customerId = loan.customer?.id;
  return {
    id: String(loan.laonId ?? ""),
    userId: customerId != null ? String(customerId) : "",
    userName: loan.customerName,
    userEmail: loan.customer?.email ?? "",
    amount: loan.amount,
    purpose: loan.purpose,
    description: `Interest: ${(loan.interestRate ?? 0) * 100}%, Duration: ${loan.durationMonths ?? 0} months`,
    status: (loan.status as RequestItem["status"]) ?? "PENDING",
    date: new Date().toISOString(),
  };
}

// ─────────────────────────────────────────────
// Current user persistence (localStorage / sessionStorage)
// ─────────────────────────────────────────────
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const raw =
    window.localStorage.getItem(CURRENT_USER_KEY) ??
    window.sessionStorage.getItem(CURRENT_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User) {
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  window.localStorage.removeItem(CURRENT_USER_KEY);
  window.sessionStorage.removeItem(CURRENT_USER_KEY);
}

// ─────────────────────────────────────────────
// Auth – register
// ─────────────────────────────────────────────
export async function registerUser(
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string,
  _role: UserRole = "USER"
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    const response = await api.post("auth/register", {
      fullName,
      email,
      phoneNumber,
      password,
    });

    const user = response.data.user as User;
    setCurrentUser(user);
    return { success: true, message: response.data.message, user };
  } catch (error: any) {
    if (error.response?.data?.message) {
      return { success: false, message: error.response.data.message };
    }
    return { success: false, message: "Registration failed. Please try again." };
  }
}

// ─────────────────────────────────────────────
// Auth – login
// ─────────────────────────────────────────────
export async function loginUser(
  email: string,
  password: string,
  remember = false
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    const response = await api.post("auth/login", { email, password });
    const user = response.data.user as User;

    setCurrentUser(user);
    if (!remember) {
      window.sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }

    return { success: true, message: response.data.message, user };
  } catch (error: any) {
    if (error.response?.data?.message) {
      return { success: false, message: error.response.data.message };
    }
    return { success: false, message: "Login failed. Please try again." };
  }
}

// ─────────────────────────────────────────────
// Auth – logout
// ─────────────────────────────────────────────
export function logoutUser() {
  clearCurrentUser();
  window.sessionStorage.removeItem(CURRENT_USER_KEY);
}

// ─────────────────────────────────────────────
// Loans – fetch all loans (admin)
// ─────────────────────────────────────────────
export async function loadRequests(): Promise<RequestItem[]> {
  try {
    const response = await api.get("loan/all");
    const loans: LoanApiResponse[] = response.data;
    return loans.map((loan) => loanToRequestItem(loan));
  } catch (error) {
    console.error("Failed to load requests from API", error);
    return [];
  }
}

// ─────────────────────────────────────────────
// Loans – fetch loans for a specific user
// ─────────────────────────────────────────────
export async function loadRequestsByUser(userId: string): Promise<RequestItem[]> {
  try {
    const response = await api.get(`loan/user/${userId}`);
    const loans: LoanApiResponse[] = response.data;
    return loans.map((loan) => loanToRequestItem(loan));
  } catch (error) {
    console.error("Failed to load user requests from API", error);
    return [];
  }
}

// ─────────────────────────────────────────────
// Loans – fetch all users (admin)
// ─────────────────────────────────────────────
export async function loadUsers(): Promise<User[]> {
  try {
    const response = await api.get("auth/users");
    return response.data as User[];
  } catch (error) {
    console.error("Failed to load users from API", error);
    return [];
  }
}

// ─────────────────────────────────────────────
// Loans – create a new loan request
// ─────────────────────────────────────────────
export async function createRequest(
  request: Omit<RequestItem, "id" | "date" | "status">
): Promise<RequestItem> {
  try {
    // Send the customer FK so JPA links the loan to the user
    const customerId = request.userId ? Number(request.userId) : null;
    const payload: Record<string, unknown> = {
      customerName: request.userName,
      amount: request.amount,
      purpose: request.purpose,
    };
    if (customerId) {
      payload.customer = { id: customerId };
    }

    const response = await api.post("loan/apply", payload);
    const createdLoan: LoanApiResponse = response.data;
    return loanToRequestItem(createdLoan);
  } catch (error) {
    console.error("Failed to create request via API", error);
    throw new Error("Failed to submit loan request. Please try again.");
  }
}

// ─────────────────────────────────────────────
// Loans – update loan status (admin approve/reject)
// ─────────────────────────────────────────────
export async function updateRequestStatus(
  id: string,
  status: RequestItem["status"]
): Promise<RequestItem[]> {
  try {
    await api.put(`loan/update/${id}`, null, { params: { status } });
    // After updating, return the full latest list
    return await loadRequests();
  } catch (error) {
    console.error("Failed to update request status via API", error);
    throw new Error("Failed to update request status. Please try again.");
  }
}
