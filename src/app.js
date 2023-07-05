import express from "express";
import morgan from "express";
import helmet from "helmet";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

//Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

//Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);

export default app;
