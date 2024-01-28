import auth from "../Middleware/Auth.js";
import { addMember, deleteMember } from "../controllers/MemberController.js";
import express from "express";
const router = express.Router();

router.post("/", auth, addMember);
router.delete("/:id", auth, deleteMember);

export default router;
