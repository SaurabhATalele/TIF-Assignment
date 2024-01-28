import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./routers/UserRouter.js";
import RoleRouter from "./routers/RoleRouter.js";
import CommunityRouter from "./routers/CommunityRouter.js";
import MemberRouter from "./routers/MemberRouter.js";

// initializing app
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ Hello: "world" });
});

app.use("/v1/auth", UserRouter);
app.use("/v1/role", RoleRouter);
app.use("/v1/community", CommunityRouter);
app.use("/v1/member", MemberRouter);

// listening to the port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});
