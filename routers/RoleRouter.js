import express from "express";
import { createRole, getAll } from "../controllers/roleController.js";

const router = express.Router();

router.post("/", createRole);
router.get("/",getAll)
export default router;
