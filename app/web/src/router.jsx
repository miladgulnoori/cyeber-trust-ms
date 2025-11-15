// src/routes/index.jsx
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
// import AppLayout from "/components/Layout"; // your layout with sidebar + navbar

// Lazy-load pages for performance
const DashboardPage = lazy(() => import("/pages/DashboardPage"));
const Employee = lazy(() => import("/pages/Employee"));
const Department = lazy(() => import("/pages/Department"));
const Task = lazy(() => import("/pages/Task"));
const Project = lazy(() => import("/pages/Project"));
const Quotations = lazy(() => import("/pages/Quotations"));
const CostTracking = lazy(() => import("/pages/CostTracking"));

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
            element: <Employee />,
          },
          {
            path: "departments",
            element: <Department />,
          },
          {
            path: "tasks",
            element: <Task />,
          },
          {
            path: "projects",
            element: <Project />,
          },
          {
            path: "quotations",
            element: <Quotations />,
          },
          {
            path: "cost-tracking",
            element: <CostTracking />,
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
