import { Navigate } from "react-router-dom";
import type { User } from "../types";

interface PrivateRouteProps {
  user: User | null;
  children: React.ReactNode;
  requiredRole?: "ADMIN" | "USER";
}

export default function PrivateRoute({ user, children, requiredRole }: PrivateRouteProps) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/dashboard"} replace />;
  }

  return children;
}
