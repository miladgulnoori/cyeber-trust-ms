import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    dueDate: String,
    assignedTo: String,
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
