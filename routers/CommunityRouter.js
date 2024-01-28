import auth from "../Middleware/Auth.js";
import express from "express";
import {
  create,
  getAll,
  getAllMembers,
  getMyOwnedCommunity,
} from "../controllers/CommunityController.js";

const router = express.Router();

router.post("/", auth, create);
router.get("/", getAll);
router.get("/:id/members", getAllMembers);
router.get("/me/owner", auth, getMyOwnedCommunity);

export default router;
