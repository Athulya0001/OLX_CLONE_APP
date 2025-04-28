import express from "express";
import { authCheck } from "../middleware/authCheck.js";
import {
  deleteProduct,
  updateProfile,
  userProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/profile", authCheck, userProfile);

userRouter.post("/profile", authCheck, updateProfile);

userRouter.post("/delete-product", authCheck, deleteProduct);

export default userRouter;
