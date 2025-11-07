// src/pages/CostTrackingPage.tsx
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

const costs = [
  {
    id: "1",
    item: "Server Hosting",
    category: "IT",
    amount: "$200",
    date: "2025-04-01",
  },
  {
    id: "2",
    item: "Office Supplies",
    category: "Admin",
    amount: "$50",
    date: "2025-04-03",
  },
  // ... placeholder costs
];

export default function CostTracking() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cost Tracking</h1>
      <Button className="mb-4">Add Cost</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Item</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {costs.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.item}</TableCell>
              <TableCell>{c.category}</TableCell>
              <TableCell>{c.amount}</TableCell>
              <TableCell>{c.date}</TableCell>
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
