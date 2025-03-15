import express from "express";
import {
  registerUser,
  loginUser,
  verifyOtp,
  request,
  checkRequestStatus,
  getUser,
} from "../controllers/authController.js";
import { authCheck } from "../middleware/authCheck.js";

const authRouter = express.Router();

authRouter.post("/signup", registerUser);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/signin", loginUser);
authRouter.post("/request", request);
authRouter.get("/user", authCheck, checkRequestStatus);
authRouter.get("/", authCheck, getUser);

export default authRouter;
