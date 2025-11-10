// src/components/forms/CostForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";

// Zod schema for Cost
const CostSchema = z.object({
  item: z.string().min(1, "Item is required"),
  category: z.string().min(1, "Category is required"),
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  date: z.string().min(1, "Date is required"),
});

export function CostForm({ initialData, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CostSchema),
    defaultValues: initialData || {
      item: "",
      category: "",
      amount: 0,
      date: "",
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
        <Label htmlFor="item">Item</Label>
        <Input id="item" {...register("item")} placeholder="Item description" />
        {errors.item && <p className="text-red-500">{errors.item.message}</p>}
      </div>
      <div className="mb-4">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          {...register("category")}
          className="mt-1 block w-full rounded-md border-gray-300"
        >
          <option value="">Select category</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Supplies">Supplies</option>
        </select>
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          id="amount"
          {...register("amount", { valueAsNumber: true })}
          placeholder="0.00"
        />
        {errors.amount && (
          <p className="text-red-500">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="date">Date</Label>
        <input
          type="date"
          id="date"
          {...register("date")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
      </div>
      <div className="flex space-x-2">
        <Button type="submit" variant="primary">
          {initialData ? "Update Cost" : "Add Cost"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
