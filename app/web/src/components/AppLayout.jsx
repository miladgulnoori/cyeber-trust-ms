// src/components/Layout.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-xl font-bold border-b">Admin Panel</div>
        <nav className="p-4 space-y-2">
          <NavLink
            to="/app/dashboard"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/app/employees"
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Employees
          </NavLink>
          <NavLink
            to="/app/departments"
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Departments
          </NavLink>
          <NavLink
            to="/app/tasks"
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Tasks
          </NavLink>
          <NavLink
            to="/app/projects"
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Projects
          </NavLink>
          <NavLink
            to="/app/quotations"
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Quotations
          </NavLink>
          <NavLink
            to="/app/cost-tracking"
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Cost Tracking
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
