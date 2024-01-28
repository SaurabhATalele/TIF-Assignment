import express from "express";
import { createUser, Login, getMe } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", Login);
router.get("/me", getMe);

export default router;
