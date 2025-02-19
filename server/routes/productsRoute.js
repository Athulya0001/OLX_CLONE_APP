import express from 'express'
import { allProducts } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', allProducts)

export default productRouter