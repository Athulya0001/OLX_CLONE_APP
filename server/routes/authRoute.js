import express from "express";
import { registerUser, loginUser, verifyOtp, wishlist, request } from "../controllers/authController.js";
<<<<<<< HEAD
// import {authCheck} from '../middleware/authCheck.js';
=======
import {authCheck} from '../middleware/authCheck.js';
>>>>>>> 0dde386b71112a7d5920cb8aefffd07c88b900a2

const authRouter = express.Router();

authRouter.post("/signup", registerUser);
authRouter.post("/verify-otp", verifyOtp)
authRouter.post("/signin", loginUser);
authRouter.post("/request", request)
// authRouter.post("/wishlist", wishlist);
// authRouter.get("wishlist", wishlist)

export default authRouter;