// src/components/forms/QuotationForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";

// Zod schema for Quotation
const QuotationSchema = z.object({
  quoteNumber: z.string().min(1, "Quote number is required"),
  client: z.string().min(1, "Client name is required"),
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  date: z.string().min(1, "Date is required"),
});

export function QuotationForm({ initialData, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(QuotationSchema),
    defaultValues: initialData || {
      quoteNumber: "",
      client: "",
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
        <Label htmlFor="quoteNumber">Quote Number</Label>
        <Input
          id="quoteNumber"
          {...register("quoteNumber")}
          placeholder="Enter quote number"
        />
        {errors.quoteNumber && (
          <p className="text-red-500">{errors.quoteNumber.message}</p>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="client">Client</Label>
        <Input id="client" {...register("client")} placeholder="Client name" />
        {errors.client && (
          <p className="text-red-500">{errors.client.message}</p>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          id="amount"
          {...register("amount", { valueAsNumber: true })}
          placeholder="Enter amount"
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
          {initialData ? "Update Quotation" : "Create Quotation"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
