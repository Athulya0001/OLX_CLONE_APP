import express from "express";
import {
  allProducts,
  category,
  addProduct,
  productDetails,
  wishlist,
} from "../controllers/productController.js";
import multer from "multer";
import { authCheck } from "../middleware/authCheck.js";
import upload from "../middleware/multerConfiguration.js";

const productRouter = express.Router();

productRouter.post("/newpost", upload.array("images", 5), addProduct);
productRouter.get("/", allProducts);
productRouter.get("/category", category);
productRouter.get("/:id", productDetails);
productRouter.post("/wishlist", authCheck, wishlist);
export default productRouter;
