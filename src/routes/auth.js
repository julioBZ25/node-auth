import { Router } from "express";
import { registerController } from "../controller/auth.js";

const router = Router();

router.post('/register', registerController)

router.post('/login')

export default router;