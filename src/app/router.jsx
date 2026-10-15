import { createBrowserRouter, Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { GuestRoute, ProtectedRoute } from "./ProtectedRoutes";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import ForgotPassword from "../features/auth/pages/ForgotPassword";

const page = (load) => () => load().then((module) => ({ Component: module.default }));

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
          { path: "/forgot-password", element: <ForgotPassword /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        hydrateFallbackElement: <Loader fullScreen />,
        children: [
          { path: "/", lazy: page(() => import("../features/dashboard/pages/Home")) },
          { path: "/tasks", lazy: page(() => import("../features/tasks/pages/Tasks")) },
          { path: "/boards", lazy: page(() => import("../features/boards/pages/Boards")) },
          { path: "/profile", lazy: page(() => import("../features/profile/pages/Profile")) },
          {
            path: "/profile/change/:type",
            lazy: page(() => import("../features/profile/pages/ChangeCredential")),
          },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;
