// src/components/forms/DepartmentForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/Input"; // ShadCN UI Input component
import { Label } from "../ui/Label"; // ShadCN UI Label component
import { Button } from "../ui/Button"; // ShadCN UI Button component

// Define Zod schema for department
const DepartmentSchema = z.object({
  name: z.string().min(1, "Department Name is required"),
  description: z.string().optional(),
});

export default function DepartmentForm({ initialData, onSubmit, onCancel }) {
  // Use React Hook Form with Zod resolver for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DepartmentSchema),
    defaultValues: initialData || { name: "", description: "" },
  });

  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="p-4 border rounded-lg bg-white"
    >
      <div className="mb-4">
        <Label htmlFor="name">Department Name</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter department name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          {...register("description")}
          placeholder="Enter description"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div className="flex space-x-2">
        <Button type="submit" variant="primary">
          {initialData ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
