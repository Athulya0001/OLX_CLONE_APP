import Product from "../models/productModel.js";
import User from '../models/userModel.js';
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

export const addProduct = async (req, res) => {
  console.log("Received Body:", req.body);
  console.log("Received File:", req.file);
  const { title, category, price, description, owner } = req.body;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    console.log('Image Path:', imagePath);

    const postProduct = new Product({
      title,
      category,
      price,
      description,
      images: [imagePath],
      owner,
    });

    await postProduct.save();

    // const user = await User.findById(owner);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // user.productsadd.push(postProduct._id);
    // await user.save();

    res.status(201).json({ message: "Product added successfully!", product: postProduct });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};
