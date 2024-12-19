import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { loginUser } from "../controllers/user.controller";
import { verifySession , logout } from "../controllers/auth.controllers";
const router = Router();
router.post("/auth/register", registerUser as any);
router.post("/auth/login", loginUser as any);
router.get("/auth/verify", verifySession as any);
router.post("/auth/logout", logout as any);

export default router;
