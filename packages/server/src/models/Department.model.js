import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Department", departmentSchema);
