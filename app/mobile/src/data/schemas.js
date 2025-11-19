import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position required"),
});

export const departmentSchema = z.object({
  title: z.string().min(1, "Department title required"),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Task title required"),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Project title required"),
});

export const quotationSchema = z.object({
  amount: z.string().min(1, "Amount required"),
});

export const costTrackingSchema = z.object({
  title: z.string().min(1, "Cost title is required"),
  cost: z.string().min(1, "Cost required"),
});
