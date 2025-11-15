// src/pages/CostManagementPage.jsx
import React, { useState } from "react";
import { CostForm } from "../components/forms/CostForm";
import { Button } from "../components/ui/Button";
import { PencilSquareIcon, TrashIcon } from "heroicons/react/24/outline";

export default function CostTracking() {
  const [costs, setCosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCost, setEditCost] = useState(null);

  const handleFormSubmit = (cost) => {
    if (editCost) {
      setCosts(
        costs.map((c) => (c.id === editCost.id ? { ...c, ...cost } : c))
      );
    } else {
      setCosts([...costs, { id: Date.now(), ...cost }]);
    }
    setShowForm(false);
    setEditCost(null);
  };

  const handleEdit = (cost) => {
    setEditCost(cost);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this cost?")) {
      setCosts(costs.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cost Tracking</h1>
      <Button
        onClick={() => {
          setShowForm(true);
          setEditCost(null);
        }}
        className="mb-4"
      >
        + Add Cost
      </Button>
      {showForm && (
        <CostForm
          initialData={editCost}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditCost(null);
          }}
        />
      )}
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {costs.map((cost) => (
            <tr key={cost.id} className="border-t">
              <td className="px-4 py-2">{cost.item}</td>
              <td className="px-4 py-2">{cost.category}</td>
              <td className="px-4 py-2">{cost.amount}</td>
              <td className="px-4 py-2">{cost.date}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(cost)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(cost.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
          {costs.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No costs recorded.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
