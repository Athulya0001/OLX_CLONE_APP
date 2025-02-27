import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", registerUser);
authRouter.post("/signin", loginUser);
// authRouter.post("/google",googleAuth)

export default authRouter;