// src/routes/index.jsx
import ErrorPage from "@/pages/ErrorPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Employee from "@/pages/Employee.jsx";

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
        element: <div>DAshboard 3 page</div>,
      },
      {
        path: "tasks",
        element: <div>DAshboard 4 page</div>,
      },
      {
        path: "projects",
        element: 5,
      },
      {
        path: "quotations",
        element: <div>DAshboard 5 page</div>,
      },
      {
        path: "cost-tracking",
        element: <div>DAshboard 6 page</div>,
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
