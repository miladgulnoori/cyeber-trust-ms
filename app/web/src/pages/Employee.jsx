import React, { useState } from "react";
import { Button } from "/components/ui/Button";
import EmployeeForm from "/components/forms/EmployeeForm";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "/components/ui/table";
import { Edit3, Trash2 } from "lucide-react";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const handleAdd = () => {
    setEditEmployee(null);
    setShowForm(true);
  };

  const handleSave = (data) => {
    if (editEmployee) {
      // update
      setEmployees((prev) =>
        prev.map((e) =>
          e.id === editEmployee.id ? { ...editEmployee, ...data } : e
        )
      );
    } else {
      // create
      setEmployees((prev) => [...prev, { id: Date.now(), ...data }]);
    }
    setShowForm(false);
  };

  const handleEdit = (emp) => {
    setEditEmployee(emp);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
      {!showForm && (
        <>
          <Button className="mb-4" onClick={handleAdd}>
            Add Employee
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Department</TableHeader>
                <TableHeader className="text-right">Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.number}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(emp)}
                    >
                      <Edit3 size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(emp.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      {showForm && (
        <EmployeeForm
          initialData={editEmployee}
          onSubmit={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
