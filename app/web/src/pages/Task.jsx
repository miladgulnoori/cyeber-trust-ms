import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskApi } from "@/api/taskApi";
import toast from "react-hot-toast";

const schema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  assignedTo: z.string().optional(),
  status: z.string().optional(),
});

export default function Task() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const load = async () => {
    setLoading(true);
    try {
      const data = await taskApi.getAll();
      setList(data);
    } catch (e) {
      toast.error("Failed to load tasks");
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
        const updated = await taskApi.update(editing._id, values);
        setList((prev) =>
          prev.map((i) => (i._id === updated._id ? updated : i))
        );
        toast.success("Task updated");
      } else {
        const created = await taskApi.create(values);
        setList((prev) => [created, ...prev]);
        toast.success("Task created");
      }
      reset();
      setEditing(null);
      setShowForm(false);
    } catch (e) {
      toast.error("Save failed");
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    reset(item);
    setShowForm(true);
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete task?")) return;
    try {
      await taskApi.delete(id);
      setList((prev) => prev.filter((i) => i._id !== id));
      toast.success("Deleted");
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          onClick={() => {
            reset();
            setEditing(null);
            setShowForm((s) => !s);
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          + Add Task
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              {...register("title")}
              className="mt-1 block w-full border rounded p-2"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Assigned To</label>
            <input
              {...register("assignedTo")}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Due Date</label>
            <input
              type="text"
              {...register("dueDate")}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium">Description</label>
            <input
              {...register("description")}
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
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Assigned To</th>
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : list.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No tasks
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.assignedTo}</td>
                  <td className="px-4 py-2">{item.dueDate}</td>
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
