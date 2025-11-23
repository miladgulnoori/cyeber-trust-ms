import { Router } from "express";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller.js";

const router = Router();

// REGISTER route
router.post("/register", registerController);

// LOGIN route
router.post("/login", loginController);

export default router;
