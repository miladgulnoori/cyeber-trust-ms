// src/routes/index.jsx
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout"; // your layout with sidebar + navbar
import ErrorPage from "@/pages/ErrorPage";

// Lazy-load pages for performance
// const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const EmployeeManagementPage = lazy(() => import("@/pages/Employee"));
const DepartmentManagementPage = lazy(() => import("@/pages/Department"));
const TasksManagementPage = lazy(() => import("@/pages/Task"));
const ProjectsManagementPage = lazy(() => import("@/pages/Project"));
const QuotationsPage = lazy(() => import("@/pages/Quotations"));
const CostTrackingPage = lazy(() => import("@/pages/CostTracking"));

// Optional: authentication layout if needed later
// const AuthLayout = lazy(() => import('@/pages/auth/AuthLayout'));
// const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/dashboard" replace />,
      },
      {
        path: "app",
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "employees",
            element: <EmployeeManagementPage />,
          },
          {
            path: "departments",
            element: <DepartmentManagementPage />,
          },
          {
            path: "tasks",
            element: <TasksManagementPage />,
          },
          {
            path: "projects",
            element: <ProjectsManagementPage />,
          },
          {
            path: "quotations",
            element: <QuotationsPage />,
          },
          {
            path: "cost-tracking",
            element: <CostTrackingPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
