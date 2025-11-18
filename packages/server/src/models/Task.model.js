import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    dueDate: String,
    assignedTo: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Task", schema);
