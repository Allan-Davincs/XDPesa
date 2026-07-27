import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RequestFundsPage from "./pages/RequestFundsPage";
import MyRequestsPage from "./pages/MyRequestsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminRequestsPage from "./pages/AdminRequestsPage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  createRequest,
  getCurrentUser,
  loadRequests,
  loadRequestsByUser,
  loadUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateRequestStatus,
} from "./lib/storage";
import type { AuthFormData, RequestItem, User } from "./types";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchData = useCallback(async () => {
    const user = getCurrentUser();
    setCurrentUser(user);

    if (user) {
      if (user.role === "ADMIN") {
        const allRequests = await loadRequests();
        setRequests(allRequests);
        const allUsers = await loadUsers();
        setTotalUsers(allUsers.length);
      } else {
        const userRequests = await loadRequestsByUser(user.id);
        setRequests(userRequests);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRegister = async (data: AuthFormData) => {
    const result = await registerUser(data.fullName, data.email, data.phoneNumber, data.password);
    if (result.success && result.user) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const handleLogin = async (email: string, password: string, remember: boolean) => {
    const result = await loginUser(email, password, remember);
    if (result.success && result.user) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setRequests([]);
    setTotalUsers(0);
  };

  const handleCreateRequest = async (request: Omit<RequestItem, "id" | "date" | "status">) => {
    try {
      const newRequest = await createRequest(request);
      setRequests((prev) => [newRequest, ...prev]);
    } catch (error) {
      console.error("Failed to create request", error);
    }
  };

  const handleUpdateStatus = async (id: string, status: RequestItem["status"]) => {
    try {
      const nextRequests = await updateRequestStatus(id, status);
      setRequests(nextRequests);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <Router>
      <div className="app-shell">
        <NavBar currentUser={currentUser} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<LandingPage currentUser={currentUser} />} />
          <Route
            path="/register"
            element={
              currentUser ? (
                <Navigate to={currentUser.role === "ADMIN" ? "/admin" : "/dashboard"} replace />
              ) : (
                <RegisterPage onRegister={handleRegister} />
              )
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to={currentUser.role === "ADMIN" ? "/admin" : "/dashboard"} replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={currentUser}>
                <DashboardPage currentUser={currentUser!} requests={requests} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
          <Route
            path="/request-funds"
            element={
              <PrivateRoute user={currentUser}>
                <RequestFundsPage currentUser={currentUser!} onCreateRequest={handleCreateRequest} />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-requests"
            element={
              <PrivateRoute user={currentUser}>
                <MyRequestsPage currentUser={currentUser!} requests={requests} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute user={currentUser} requiredRole="ADMIN">
                <AdminDashboardPage currentUser={currentUser!} requests={requests} totalUsers={totalUsers} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/requests"
            element={
              <PrivateRoute user={currentUser} requiredRole="ADMIN">
                <AdminRequestsPage requests={requests} onUpdateStatus={handleUpdateStatus} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
