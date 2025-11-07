// src/pages/DepartmentManagementPage.tsx
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

const departments = [
  { id: "1", name: "Human Resources", manager: "Alice Johnson" },
  { id: "2", name: "IT Services", manager: "Bob Smith" },
  // ... placeholder departments
];

export default function Department() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Department Management</h1>
      <Button className="mb-4">Add Department</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Manager</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((dept) => (
            <TableRow key={dept.id}>
              <TableCell>{dept.name}</TableCell>
              <TableCell>{dept.manager}</TableCell>
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
