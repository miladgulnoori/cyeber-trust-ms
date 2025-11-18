import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    quoteNumber: { type: String, required: true },
    client: { type: String, required: true },
    amount: { type: Number, required: true },
    date: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Quotation", schema);
