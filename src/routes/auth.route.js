import { Router } from "express";
import {
  loginController,
  refreshTokenController,
  registerController,
} from "../controller/auth.controller.js";
import { refreshTokenValidation } from "../utils/middelwares.js";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/refresh", refreshTokenValidation, refreshTokenController);
authRouter.post("/login", loginController);

export default authRouter;
