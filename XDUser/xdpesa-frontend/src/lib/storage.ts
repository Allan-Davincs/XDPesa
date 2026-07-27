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

export function registerUser(
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string,
  role: UserRole = "USER"
): { success: boolean; message: string; user?: User } {
  const users = getStoredUsers();
  const emailExists = users.some((record) => record.email.toLowerCase() === email.toLowerCase());
  const phoneExists = users.some((record) => record.phoneNumber === phoneNumber);

  if (emailExists) {
    return { success: false, message: "Email is already registered." };
  }

  if (phoneExists) {
    return { success: false, message: "Phone number is already registered." };
  }

  const user: StoredUser = {
    id: crypto.randomUUID(),
    fullName,
    email,
    phoneNumber,
    password,
    role,
  };
  const nextUsers = [...users, user];
  saveStoredUsers(nextUsers);
  const safeUser: User = { id: user.id, fullName, email, phoneNumber, role };
  setCurrentUser(safeUser);
  return { success: true, message: "Registration successful.", user: safeUser };
}

export function loginUser(
  email: string,
  password: string,
  remember = false
): { success: boolean; message: string; user?: User } {
  const users = getStoredUsers();
  const user = users.find(
    (record) => record.email.toLowerCase() === email.toLowerCase() && record.password === password,
  );

  if (!user) {
    return { success: false, message: "Invalid email or password." };
  }

  const safeUser: User = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
  };

  setCurrentUser(safeUser);

  if (!remember) {
    window.sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
  }

  return { success: true, message: "Login successful.", user: safeUser };
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
