import mongoose from "mongoose";
import ENV from "../config/env.config.js";

if (!ENV.MONGODB_URI) {
  throw new Error("DATABASE_URL is not defined in environment variables.");
}

export async function connectDB() {
  try {
    const mongooseInstance = await mongoose.connect(ENV.MONGODB_URI, {
      dbName: ENV.DB_NAME,
      maxPoolSize: 10,
    });

    console.log("Database connected");

    return mongooseInstance;
  } catch (err) {
    console.error("Database failed to connect", err);
    throw err;
  }
}
export default connectDB;
