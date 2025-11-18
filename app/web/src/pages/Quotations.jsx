import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { quotationApi } from "@/api/quotationApi";
import toast from "react-hot-toast";

const schema = z.object({
  quoteNumber: z.string().min(1, "Quote number required"),
  client: z.string().min(1, "Client required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  date: z.string().optional(),
});

export default function Quotations() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const load = async () => {
    setLoading(true);
    try {
      const data = await quotationApi.getAll();
      setList(data);
    } catch {
      toast.error("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (values) => {
    try {
      if (editing) {
        const updated = await quotationApi.update(editing._id, values);
        setList((prev) =>
          prev.map((i) => (i._id === updated._id ? updated : i))
        );
        toast.success("Quotation updated");
      } else {
        const created = await quotationApi.create(values);
        setList((prev) => [created, ...prev]);
        toast.success("Quotation created");
      }
      reset();
      setEditing(null);
      setShowForm(false);
    } catch {
      toast.error("Save failed");
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    reset(item);
    setShowForm(true);
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete quotation?")) return;
    try {
      await quotationApi.delete(id);
      setList((prev) => prev.filter((i) => i._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quotations</h1>
        <button
          onClick={() => {
            reset();
            setEditing(null);
            setShowForm((s) => !s);
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          + Add Quote
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-sm font-medium">Quote #</label>
            <input
              {...register("quoteNumber")}
              className="mt-1 block w-full border rounded p-2"
            />
            {errors.quoteNumber && (
              <p className="text-red-500 text-sm">
                {errors.quoteNumber.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Client</label>
            <input
              {...register("client")}
              className="mt-1 block w-full border rounded p-2"
            />
            {errors.client && (
              <p className="text-red-500 text-sm">{errors.client.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              {...register("amount", { valueAsNumber: true })}
              className="mt-1 block w-full border rounded p-2"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              {...register("date")}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div className="md:col-span-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                reset();
                setShowForm(false);
                setEditing(null);
              }}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-green-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Quote #</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : list.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No quotations
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-2">{item.quoteNumber}</td>
                  <td className="px-4 py-2">{item.client}</td>
                  <td className="px-4 py-2">{item.amount}</td>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      className="mr-2 text-blue-600"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
