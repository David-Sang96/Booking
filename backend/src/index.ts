import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";

import morgan from "morgan";
import { connectDB } from "./config/db";
import { ENV_VARS } from "./config/envVars";
import authRoutes from "./routes/auth.router";
import userRoutes from "./routes/user.router";

const app: Express = express();

if (ENV_VARS.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.listen(ENV_VARS.PORT, async () => {
  await connectDB();
  console.log(`server running on port : ${ENV_VARS.PORT}`);
});
