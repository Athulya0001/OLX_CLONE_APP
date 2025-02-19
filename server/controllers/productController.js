import Product from "../models/productModel.js"

export const allProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
  }