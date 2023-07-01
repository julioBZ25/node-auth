import { Router } from "express";
import { updateProfileController } from "../controller/auth.controller.js";
import { tokenVerification } from "../utils/middelwares.js";

const userRoute = Router();

userRoute.use(tokenVerification);
userRoute.put("/update", updateProfileController);

export default userRoute;
