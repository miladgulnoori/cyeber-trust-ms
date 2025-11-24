// Dashboard.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Users,
  Building2,
  FolderKanban,
  ClipboardList,
  Receipt,
  Wallet,
} from "lucide-react";

import AnalyticsSection from "./AnalyticsSection";

// axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// fetch stats
const fetchCounts = async () => {
  const [employees, departments, projects, tasks, quotations, costs] =
    await Promise.all([
      api.get("/employee"),
      api.get("/department"),
      api.get("/project"),
      api.get("/task"),
      api.get("/quotation"),
      api.get("/cost"),
    ]);

  return {
    employees: employees.data.length ?? 0,
    departments: departments.data.length ?? 0,
    projects: projects.data.length ?? 0,
    tasks: tasks.data.length ?? 0,
    quotations: quotations.data.length ?? 0,
    costs: costs.data.length ?? 0,
  };
};

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardCounts"],
    queryFn: fetchCounts,
    refetchInterval: 5000,
  });

  if (isLoading) return <p className="p-6 text-lg">Loading Dashboard...</p>;
  if (error)
    return <p className="p-6 text-lg text-red-600">Error: {error.message}</p>;

  const stats = [
    {
      title: "Employees",
      value: data.employees,
      link: "/app/employees",
      icon: <Users className="w-10 h-10 text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      title: "Departments",
      value: data.departments,
      link: "/app/departments",
      icon: <Building2 className="w-10 h-10 text-green-600" />,
      color: "bg-green-50",
    },
    {
      title: "Projects",
      value: data.projects,
      link: "/app/projects",
      icon: <FolderKanban className="w-10 h-10 text-purple-600" />,
      color: "bg-purple-50",
    },
    {
      title: "Tasks",
      value: data.tasks,
      link: "/app/tasks",
      icon: <ClipboardList className="w-10 h-10 text-yellow-600" />,
      color: "bg-yellow-50",
    },
    {
      title: "Quotations",
      value: data.quotations,
      link: "/app/quotations",
      icon: <Receipt className="w-10 h-10 text-rose-600" />,
      color: "bg-rose-50",
    },
    {
      title: "Cost Tracking",
      value: data.costs,
      link: "/app/costs",
      icon: <Wallet className="w-10 h-10 text-indigo-600" />,
      color: "bg-indigo-50",
    },
  ];

  return (
    <div className="pl-30 space-y-10 ">
      <h1 className="text-4xl font-bold  top-0tracking-tight">Dashboard</h1>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-3 lg:grid-cols-2">
        {stats.map((item, index) => (
          <Link key={index} to={item.link}>
            <Card
              className={`group shadow-md hover:shadow-xl transition-all border hover:border-primary ${item.color}`}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-semibold">
                  {item.title}
                </CardTitle>
                {item.icon}
              </CardHeader>

              <CardContent>
                <p className="text-5xl font-bold">{item.value}</p>
                <p className="text-sm text-muted-foreground mt-2 group-hover:underline">
                  View all {item.title.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pass all six metrics */}
      <AnalyticsSection
        className="mt-10"
        employees={data.employees}
        departments={data.departments}
        projects={data.projects}
        tasks={data.tasks}
        quotations={data.quotations}
        costs={data.costs}
      />
    </div>
  );
}
