// src/components/forms/ProjectForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";

// Zod schema for Project
const ProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export function ProjectForm({ initialData, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProjectSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
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
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter project name"
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
      </div>
      <div className="mb-4">
        <Label htmlFor="startDate">Start Date</Label>
        <input
          type="date"
          id="startDate"
          {...register("startDate")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.startDate && (
          <p className="text-red-500">{errors.startDate.message}</p>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="endDate">End Date</Label>
        <input
          type="date"
          id="endDate"
          {...register("endDate")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.endDate && (
          <p className="text-red-500">{errors.endDate.message}</p>
        )}
      </div>
      <div className="flex space-x-2">
        <Button type="submit" variant="primary">
          {initialData ? "Update Project" : "Create Project"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
