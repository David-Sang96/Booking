import mongoose from "mongoose";
import { ENV_VARS } from "./envVars";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGODB_URI as string);
    console.log("MongoDB connected: " + conn.connection.host);
  } catch (error: any) {
    console.error("Error connecting to MongoDB: " + error.message);
    process.exit(1);
  }
};
