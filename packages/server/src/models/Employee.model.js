import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    position: { type: String },
    department: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", schema);
