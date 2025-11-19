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

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>landig page</div>,
  },
  {
    path: "app",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      {
        path: "dashboard",
        element: <div>DAshboard page</div>,
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
