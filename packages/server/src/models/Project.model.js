import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    startDate: String,
    endDate: String,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
