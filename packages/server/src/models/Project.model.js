import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    startDate: String,
    endDate: String,
    budget: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Project", schema);
