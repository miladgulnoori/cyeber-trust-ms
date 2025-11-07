import express from "express";
import cors from "cors";
import { connectDB } from "./src/database/db.js";
import ENV from "./src/config/env.config.js";

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
