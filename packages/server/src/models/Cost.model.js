import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    item: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: String,
  },
  { timestamps: true }
);

export default mongoose.model("Cost", schema);
