// src/pages/QuotationManagementPage.jsx
import React, { useState } from "react";
import { QuotationForm } from "../components/forms/QuotationForm";
import { Button } from "@/components/ui/button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Quotations() {
  const [quotes, setQuotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editQuote, setEditQuote] = useState(null);

  const handleFormSubmit = (quote) => {
    if (editQuote) {
      setQuotes(
        quotes.map((q) => (q.id === editQuote.id ? { ...q, ...quote } : q))
      );
    } else {
      setQuotes([...quotes, { id: Date.now(), ...quote }]);
    }
    setShowForm(false);
    setEditQuote(null);
  };

  const handleEdit = (quote) => {
    setEditQuote(quote);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this quotation?")) {
      setQuotes(quotes.filter((q) => q.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quotation Management</h1>
      <button
        onClick={() => {
          setShowForm(true);
          setEditQuote(null);
        }}
        className="mb-4"
      >
        + Add Quotation
      </button>
      {showForm && (
        <QuotationForm
          initialData={editQuote}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditQuote(null);
          }}
        />
      )}
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Quote #</th>
            <th className="px-4 py-2">Client</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr key={q.id} className="border-t">
              <td className="px-4 py-2">{q.quoteNumber}</td>
              <td className="px-4 py-2">{q.client}</td>
              <td className="px-4 py-2">{q.amount}</td>
              <td className="px-4 py-2">{q.date}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(q)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
          {quotes.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No quotations available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
