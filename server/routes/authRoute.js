import express from "express";
import { registerUser, loginUser, verifyEmail } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", registerUser);
authRouter.post("verify/:token", verifyEmail)
authRouter.post("/signin", loginUser);
// authRouter.post("/google",googleAuth)

export default authRouter;