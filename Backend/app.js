import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import stenoTestRoutes from "./routes/stenotest.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/stenoTests", stenoTestRoutes);

export { app };
