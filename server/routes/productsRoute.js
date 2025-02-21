import express from 'express'
import { allProducts, category } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', allProducts)
productRouter.get('/category', category)

export default productRouter