// AnalyticsSection.jsx
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const COLORS = [
  "#4f46e5",
  "#16a34a",
  "#db2777",
  "#2563eb",
  "#ea580c",
  "#9333ea",
];

export default function AnalyticsSection({
  employees,
  departments,
  projects,
  tasks,
  quotations,
  costs,
}) {
  // Employee growth simulation
  const employeeGrowth = [
    { month: "Jan", value: Math.floor(employees * 0.4) },
    { month: "Feb", value: Math.floor(employees * 0.55) },
    { month: "Mar", value: Math.floor(employees * 0.7) },
    { month: "Apr", value: employees },
  ];

  // Projects vs Departments
  const projectStatus = [
    { name: "Total Projects", value: projects },
    { name: "Departments", value: departments },
  ];

  // Task progress breakdown
  const taskProgress = [
    { stage: "Pending", value: Math.floor(tasks * 0.35) },
    { stage: "In Progress", value: Math.floor(tasks * 0.45) },
    { stage: "Completed", value: Math.floor(tasks * 0.2) },
  ];

  // Cost tracking
  const costData = [
    { month: "Jan", cost: Math.floor(costs * 0.5) },
    { month: "Feb", cost: Math.floor(costs * 0.7) },
    { month: "Mar", cost: Math.floor(costs * 0.85) },
    { month: "Apr", cost: costs },
  ];

  // Quotations distribution
  const quotationData = [
    { name: "Quotations", value: quotations },
    { name: "Projects", value: projects },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      {/* Employee Growth Line Chart */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Employee Growth</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={employeeGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Projects & Departments Pie Chart */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Projects & Departments</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={projectStatus}
                innerRadius={40}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {projectStatus.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Task Progress Bar Chart */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Task Progress</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={taskProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cost Tracking Line Chart */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Cost Tracking</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#ea580c"
                strokeWidth={3}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quotations Pie Chart */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Quotations</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={quotationData}
                innerRadius={40}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {quotationData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
