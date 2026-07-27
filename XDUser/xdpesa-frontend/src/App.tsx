import { useEffect, useState } from "react";
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

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    setRequests(loadRequests());
    setTotalUsers(loadUsers().length);
  }, []);

  const handleRegister = (data: AuthFormData) =>
    registerUser(data.fullName, data.email, data.phoneNumber, data.password);

  const handleLogin = (email: string, password: string, remember: boolean) =>
    loginUser(email, password, remember);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const handleCreateRequest = (request: Omit<RequestItem, "id" | "date" | "status">) => {
    const nextRequest = createRequest(request);
    setRequests((prev) => [nextRequest, ...prev]);
  };

  const handleUpdateStatus = (id: string, status: RequestItem["status"]) => {
    const nextRequests = updateRequestStatus(id, status);
    setRequests(nextRequests);
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
