import api from "../api/axiosInstance";
import type { RequestItem, User, UserRole } from "../types";

const USERS_KEY = "xdpesa_users";
const CURRENT_USER_KEY = "xdpesa_current_user";
const REQUESTS_KEY = "xdpesa_requests";

interface StoredUser extends User {
  password: string;
}

const defaultAdmin: StoredUser = {
  id: "admin-1",
  fullName: "XDPesa Admin",
  email: "admin@xdpesa.com",
  phoneNumber: "0000000000",
  password: "Admin@123",
  role: "ADMIN",
};

function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") {
    return [defaultAdmin];
  }

  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([defaultAdmin]));
    return [defaultAdmin];
  }

  try {
    const parsed = JSON.parse(raw) as StoredUser[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      window.localStorage.setItem(USERS_KEY, JSON.stringify([defaultAdmin]));
      return [defaultAdmin];
    }
    return parsed;
  } catch {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([defaultAdmin]));
    return [defaultAdmin];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getStoredRequests(): RequestItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(REQUESTS_KEY);
  if (!raw) {
    window.localStorage.setItem(REQUESTS_KEY, JSON.stringify([]));
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as RequestItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    window.localStorage.setItem(REQUESTS_KEY, JSON.stringify([]));
    return [];
  }
}

function saveStoredRequests(requests: RequestItem[]) {
  window.localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw =
    window.localStorage.getItem(CURRENT_USER_KEY) ?? window.sessionStorage.getItem(CURRENT_USER_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as User;
    return parsed;
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

export function loadRequests(): RequestItem[] {
  return getStoredRequests();
}

export function loadUsers(): User[] {
  return getStoredUsers().map(({ password, ...user }) => user);
}

export async function registerUser(
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string,
  role: UserRole = "USER"
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

export function logoutUser() {
  clearCurrentUser();
  window.sessionStorage.removeItem(CURRENT_USER_KEY);
}

export function createRequest(request: Omit<RequestItem, "id" | "date" | "status">) {
  const requests = getStoredRequests();
  const nextRequest: RequestItem = {
    ...request,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    status: "PENDING",
  };
  const nextRequests = [nextRequest, ...requests];
  saveStoredRequests(nextRequests);
  return nextRequest;
}

export function updateRequestStatus(id: string, status: RequestItem["status"]) {
  const requests = getStoredRequests();
  const nextRequests = requests.map((request) =>
    request.id === id ? { ...request, status } : request,
  );
  saveStoredRequests(nextRequests);
  return nextRequests;
}
