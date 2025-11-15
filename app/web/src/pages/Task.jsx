// src/pages/TaskManagementPage.jsx
import React, { useState } from "react";
import { TaskForm } from "../components/forms/TaskForm";
import { Button } from "@/components/ui/button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const handleFormSubmit = (task) => {
    if (editTask) {
      setTasks(
        tasks.map((t) => (t.id === editTask.id ? { ...t, ...task } : t))
      );
    } else {
      setTasks([...tasks, { id: Date.now(), ...task }]);
    }
    setShowForm(false);
    setEditTask(null);
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <Button
        onClick={() => {
          setShowForm(true);
          setEditTask(null);
        }}
        className="mb-4"
      >
        + Add Task
      </Button>
      {showForm && (
        <TaskForm
          initialData={editTask}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditTask(null);
          }}
        />
      )}
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Due Date</th>
            <th className="px-4 py-2">Assigned To</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.dueDate}</td>
              <td className="px-4 py-2">{task.assignedTo}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
