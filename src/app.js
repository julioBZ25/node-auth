import express from "express";
import morgan from "express";
import authRoute from "./routes/auth.route.js";

const app = express();

//Middleware
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/auth", authRoute);

export default app;
