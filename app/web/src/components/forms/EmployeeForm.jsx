import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const employeeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  department: z.string().min(1, "Department required"),
});

export default function EmployeeForm({ onSubmit, initialData, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialData || { name: "", email: "", department: "" },
  });

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-3 bg-white p-4 rounded-md shadow"
    >
      <div>
        <Input {...register("name")} placeholder="Employee Name" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Input {...register("email")} placeholder="Email" />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input {...register("department")} placeholder="Department" />
        {errors.department && (
          <p className="text-red-500 text-sm">{errors.department.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
