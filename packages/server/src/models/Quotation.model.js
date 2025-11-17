import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
  {
    quoteNumber: String,
    client: String,
    amount: Number,
    date: String,
  },
  { timestamps: true }
);

export default mongoose.model("Quotation", quotationSchema);
