import express from "express";
import morgan from "express";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

//Middleware
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);

export default app;
