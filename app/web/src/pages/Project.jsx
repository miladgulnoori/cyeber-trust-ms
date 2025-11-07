// src/pages/ProjectsManagementPage.tsx
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

const projects = [
  { id: "1", name: "Website Redesign", client: "Acme Corp", budget: "$10,000" },
  { id: "2", name: "Mobile App", client: "Beta LLC", budget: "$15,000" },
  // ... placeholder projects
];

export default function Project() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Projects Management</h1>
      <Button className="mb-4">Add Project</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Project Name</TableHeader>
            <TableHeader>Client</TableHeader>
            <TableHeader>Budget</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((proj) => (
            <TableRow key={proj.id}>
              <TableCell>{proj.name}</TableCell>
              <TableCell>{proj.client}</TableCell>
              <TableCell>{proj.budget}</TableCell>
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
