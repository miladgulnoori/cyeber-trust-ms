// Dashboard.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";

// Create an axios instance pointing to your backend
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// Fetch counts from employees, departments, projects, tasks, quotations, and costs
const fetchCounts = async () => {
  const [employees, departments, projects, tasks, quotations, costs] =
    await Promise.all([
      api.get("/employee"), // matches app.use("/api/v1/employee", ...)
      api.get("/department"), // matches app.use("/api/v1/department", ...)
      api.get("/project"), // matches app.use("/api/v1/project", ...)
      api.get("/task"), // matches app.use("/api/v1/task", ...)
      api.get("/quotation"), // matches app.use("/api/v1/quotation", ...)
      api.get("/cost"), // matches app.use("/api/v1/cost", ...)
    ]);

  return {
    employees: Array.isArray(employees.data)
      ? employees.data.length
      : employees.data.employees?.length ?? 0,
    departments: Array.isArray(departments.data)
      ? departments.data.length
      : departments.data.departments?.length ?? 0,
    projects: Array.isArray(projects.data)
      ? projects.data.length
      : projects.data.projects?.length ?? 0,
    tasks: Array.isArray(tasks.data)
      ? tasks.data.length
      : tasks.data.tasks?.length ?? 0,
    quotations: Array.isArray(quotations.data)
      ? quotations.data.length
      : quotations.data.quotations?.length ?? 0,
    costs: Array.isArray(costs.data)
      ? costs.data.length
      : costs.data.costs?.length ?? 0,
  };
};

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardCounts"],
    queryFn: fetchCounts,
    refetchInterval: 5000, // auto update every 5 seconds
  });

  if (isLoading) return <p className="p-6 text-lg">Loading Dashboard...</p>;
  if (error)
    return <p className="p-6 text-lg text-red-600">Error: {error.message}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Employees Card */}
        <Link
          to="/app/employees"
          className="bg-gray-200 text-white rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Employees</h2>
          <p className="text-4xl font-bold">{data?.employees ?? 0}</p>
        </Link>

        {/* Departments Card */}
        <Link
          to="/app/departments"
          className="bg-gray-200 text-white rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Departments</h2>
          <p className="text-4xl font-bold">{data?.departments ?? 0}</p>
        </Link>

        {/* Projects Card */}
        <Link
          to="/app/projects"
          className="bg-gray-200 text-white rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-4xl font-bold">{data?.projects ?? 0}</p>
        </Link>

        {/* Tasks Card */}
        <Link
          to="/app/tasks"
          className="bg-gray-200 text-white rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Tasks</h2>
          <p className="text-4xl font-bold">{data?.tasks ?? 0}</p>
        </Link>

        {/* Quotations Card */}
        <Link
          to="/app/quotations"
          className="bg-gray-200 text-white rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Quotations</h2>
          <p className="text-4xl font-bold">{data?.quotations ?? 0}</p>
        </Link>

        {/* Cost Tracking Card */}
        <Link
          to="/app/costs"
          className="bg-gray-200 text-white rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Cost Tracking</h2>
          <p className="text-4xl font-bold">{data?.costs ?? 0}</p>
        </Link>
      </div>
    </div>
  );
}
