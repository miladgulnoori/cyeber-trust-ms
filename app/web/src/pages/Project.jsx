// src/pages/ProjectManagementPage.jsx
import React, { useState } from "react";
import { ProjectForm } from "../components/forms/ProjectForm";
import { Button } from "../components/ui/Button";
import { PencilSquareIcon, TrashIcon } from "heroicons/react/24/outline";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const handleFormSubmit = (proj) => {
    if (editProject) {
      setProjects(
        projects.map((p) => (p.id === editProject.id ? { ...p, ...proj } : p))
      );
    } else {
      setProjects([...projects, { id: Date.now(), ...proj }]);
    }
    setShowForm(false);
    setEditProject(null);
  };

  const handleEdit = (proj) => {
    setEditProject(proj);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Management</h1>
      <button
        onClick={() => {
          setShowForm(true);
          setEditProject(null);
        }}
        className="mb-4"
      >
        + Add Project
      </button>
      {showForm && (
        <ProjectForm
          initialData={editProject}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditProject(null);
          }}
        />
      )}
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj) => (
            <tr key={proj.id} className="border-t">
              <td className="px-4 py-2">{proj.name}</td>
              <td className="px-4 py-2">{proj.startDate}</td>
              <td className="px-4 py-2">{proj.endDate}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(proj)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No projects available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
