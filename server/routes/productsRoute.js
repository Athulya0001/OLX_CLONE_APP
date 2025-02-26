import express from 'express'
import { allProducts, category, addProduct, productDetails } from '../controllers/productController.js';
import multer from "multer";

const productRouter = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

const upload = multer({ storage });


productRouter.post("/newpost", upload.single("image"), addProduct);
productRouter.get('/', allProducts)
productRouter.get('/category', category)
productRouter.get('/:id', productDetails)

export default productRouter