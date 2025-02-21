import Product from "../models/productModel.js"
import { categories } from "../utils/categories.js";

export const allProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: err.message });
  }
};

export const category = async (req, res) => {
  try {
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: "Error getting categories", error });
  }
};
