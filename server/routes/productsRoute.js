import express from 'express'
import { addProducts } from '../controllers/productController.js'

const productRouter = express.Router();

productRouter.get("/products", addProducts)

export default productRouter