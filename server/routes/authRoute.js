import express from "express";
import { registerUser, loginUser, verifyEmail, wishlist } from "../controllers/authController.js";
import {authCheck} from '../middleware/authCheck.js';

const authRouter = express.Router();

authRouter.post("/signup", registerUser);
authRouter.post("verify/:token", verifyEmail)
authRouter.post("/signin", loginUser);
authRouter.post("/wishlist", authCheck, wishlist)
// authRouter.post("/google",googleAuth)

export default authRouter;