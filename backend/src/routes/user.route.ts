import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { loginUser } from "../controllers/user.controller";
const router = Router();

router.post("/register", registerUser as any);
router.post("/login", loginUser as any);

export default router;
