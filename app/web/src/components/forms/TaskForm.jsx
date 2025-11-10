// src/components/forms/TaskForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";

// Zod schema for Task
const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().min(1, "Due date is required"),
  assignedTo: z.string().optional(),
});

export function TaskForm({ initialData, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TaskSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      dueDate: "",
      assignedTo: "",
    },
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
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} placeholder="Task title" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          {...register("description")}
          placeholder="Task description"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="dueDate">Due Date</Label>
        <input
          type="date"
          id="dueDate"
          {...register("dueDate")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.dueDate && (
          <p className="text-red-500">{errors.dueDate.message}</p>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="assignedTo">Assigned To</Label>
        <Input
          id="assignedTo"
          {...register("assignedTo")}
          placeholder="Employee name"
        />
      </div>
      <div className="flex space-x-2">
        <Button type="submit" variant="primary">
          {initialData ? "Update Task" : "Create Task"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
