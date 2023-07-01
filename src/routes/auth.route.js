import { Router } from "express";
import {
  loginController,
  registerController,
  updateProfileController,
} from "../controller/auth.controller.js";
import { tokenVerification } from "../utils/middelwares.js";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/update", tokenVerification, updateProfileController);

export default router;
