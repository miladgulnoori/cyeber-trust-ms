// src/routes/index.jsx
import ErrorPage from "@/pages/ErrorPage.jsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Employee from "@/pages/Employee.jsx";
import Department from "@/pages/Department.jsx";
import Task from "@/pages/Task.jsx";
import Project from "@/pages/Project.jsx";
import Quotation from "@/pages/Quotations.jsx"; // FIXED
import CostTracking from "@/pages/CostTracking.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import LoginForm from "./pages/auth/LoginForm";
import SignupForm from "./pages/auth/SignupForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Lending page</div>,
  },
  {
    path: "auth",
    children: [
      {
        index: true,
        element: <Navigate to="signup" replace />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "signup",
        element: <SignupForm />,
      },
    ],
  },
  {
    path: "app",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      {
        path: "dashboard",
        element: <Dashboard />,
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
        element: <Quotation />,
      },
      {
        path: "cost-tracking",
        element: <CostTracking />,
      },
    ],
  },

  {
    path: "*",
    element: <div>No found this route</div>,
    errorElement: <ErrorPage />,
  },
]);

export default router;
