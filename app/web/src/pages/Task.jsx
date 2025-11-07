// src/pages/TasksManagementPage.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";

const tasks = [
  {
    id: "1",
    title: "Design Homepage",
    assignedTo: "Alice Johnson",
    status: "In Progress",
  },
  {
    id: "2",
    title: "Setup Database",
    assignedTo: "Bob Smith",
    status: "Pending",
  },
  // ... placeholder tasks
];

export default function Task() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks Management</h1>
      <Button className="mb-4">Add Task</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Title</TableHeader>
            <TableHeader>Assigned To</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="icon" variant="ghost" title="Edit">
                  <Edit3 size={16} />
                </Button>
                <Button size="icon" variant="destructive" title="Delete">
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
