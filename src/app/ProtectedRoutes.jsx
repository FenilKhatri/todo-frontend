import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import useAuth from "../features/auth/useAuth";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader fullScreen />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}

export function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullScreen />;
  if (user) return <Navigate to="/" replace />;
  return <Outlet />;
}
