import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { departmentApi } from "@/api/departmentApi";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(1, "Name required"),
  description: z.string().optional(),
});

export default function Department() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
      const data = await departmentApi.getAll();
      setList(data);
    } catch {
      toast.error("Failed to load departments");
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
        const updated = await departmentApi.update(editing._id, values);
        setList((prev) =>
          prev.map((i) => (i._id === updated._id ? updated : i))
        );
        toast.success("Department updated");
      } else {
        const created = await departmentApi.create(values);
        setList((prev) => [created, ...prev]);
        toast.success("Department created");
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
    reset({ name: item.name, description: item.description });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this department?")) return;
    try {
      await departmentApi.delete(id);
      setList((prev) => prev.filter((i) => i._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Departments</h1>
        <button
          onClick={() => {
            reset();
            setEditing(null);
            setShowForm((s) => !s);
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          + Add Department
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 rounded shadow mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                {...register("name")}
                className="mt-1 block w-full border rounded p-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <input
                {...register("description")}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2 justify-end">
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
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : list.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No departments
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleEdit(item)}
                      className="mr-2 text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600"
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
