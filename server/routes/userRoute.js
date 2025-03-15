import express from "express";
import { authCheck } from "../middleware/authCheck.js";
import {
  deleteProduct,
  updateProfile,
  userProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/profile", authCheck, userProfile);

userRouter.put("/profile", authCheck, updateProfile);

userRouter.delete("/delete-product/:productId", authCheck, deleteProduct);

export default userRouter;
