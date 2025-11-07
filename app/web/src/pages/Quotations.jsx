// src/pages/QuotationsPage.tsx
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

const quotes = [
  {
    id: "1",
    quoteNo: "Q-1001",
    client: "Acme Corp",
    total: "$2,500",
    status: "Approved",
  },
  {
    id: "2",
    quoteNo: "Q-1002",
    client: "Beta LLC",
    total: "$1,200",
    status: "Pending",
  },
  // ... placeholder quotations
];

export default function Quotations() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quotations</h1>
      <Button className="mb-4">Add Quotation</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Quote No.</TableHeader>
            <TableHeader>Client</TableHeader>
            <TableHeader>Total</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {quotes.map((q) => (
            <TableRow key={q.id}>
              <TableCell>{q.quoteNo}</TableCell>
              <TableCell>{q.client}</TableCell>
              <TableCell>{q.total}</TableCell>
              <TableCell>{q.status}</TableCell>
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
