import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import testRouter from "./routes/test.js";
import stenoTestRoutes from "./routes/stenotest.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/tests", testRouter);
app.use("/api/v1/stenoTests", stenoTestRoutes);

export { app };
