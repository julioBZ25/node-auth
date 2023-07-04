import { Router } from "express";
import {
  getProfileController,
  updateProfileController,
} from "../controller/auth.controller.js";
import { tokenVerification } from "../utils/middelwares.js";

const userRoute = Router();

userRoute.use(tokenVerification);
userRoute.put("/update", updateProfileController);
userRoute.get("/profile", getProfileController);

export default userRoute;
