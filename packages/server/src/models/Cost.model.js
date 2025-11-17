import mongoose from "mongoose";

const costSchema = new mongoose.Schema(
  {
    item: String,
    category: String,
    amount: Number,
    date: String,
  },
  { timestamps: true }
);

export default mongoose.model("Cost", costSchema);
