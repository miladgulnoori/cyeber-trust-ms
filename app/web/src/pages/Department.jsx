// src/pages/DepartmentManagementPage.jsx
import React, { useState } from "react";
import { DepartmentForm } from "../components/forms/DepartmentForm";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"; // Icons for edit/delete

export default function Departmen() {
  const [departments, setDepartments] = useState([]); // List of departments
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [editDept, setEditDept] = useState(null); // Department being edited

  // Handler to add or update a department
  const handleFormSubmit = (dept) => {
    if (editDept) {
      // Update existing department
      setDepartments(
        departments.map((d) => (d.id === editDept.id ? { ...d, ...dept } : d))
      );
    } else {
      // Add new department (assign a random ID)
      setDepartments([...departments, { id: Date.now(), ...dept }]);
    }
    setShowForm(false);
    setEditDept(null);
  };

  // Handler to start editing
  const handleEdit = (dept) => {
    setEditDept(dept);
    setShowForm(true);
  };

  // Handler to delete a department
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setDepartments(departments.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Department Management</h1>

      {/* Button to show create form */}
      <Button
        onClick={() => {
          setShowForm(true);
          setEditDept(null);
        }}
        className="mb-4"
      >
        + Add Department
      </Button>

      {/* Conditional form for add/edit */}
      {showForm && (
        <DepartmentForm
          initialData={editDept}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditDept(null);
          }}
        />
      )}

      {/* Departments Table */}
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id} className="border-t">
              <td className="px-4 py-2">{dept.name}</td>
              <td className="px-4 py-2">{dept.description}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(dept)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
          {departments.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No departments available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
