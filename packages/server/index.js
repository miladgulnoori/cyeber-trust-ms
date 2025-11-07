import express from "express";
import cors from "cors";
import { connectDB } from "./src/database/db.js";
import ENV from "./src/config/env.config.js";
import employeeRouter from "./src/routers/employee.router.js";
import departementRouter from "./src/routers/department.router.js";
import projectRouter from "./src/routers/project.router.js";
import taskRouter from "./src/routers/task.router.js";
import costRouter from "./src/routers/cost.router.js";
import quotationRouter from "./src/routers/quotation.router.js";

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// Import your routes here (if you have any)
// Example: import userRoutes from "./src/routes/userRoutes.js";
// app.use("/api/users", userRoutes);
app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/department", departementRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/cost", costRouter);
app.use("/api/v1/quotation", quotationRouter);

const PORT = ENV.PORT || 5000;

// Start server after connecting to the database
async function startServer() {
  try {
    await connectDB(); // Connect to MongoDB
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit if DB connection fails
  }
}

startServer();
