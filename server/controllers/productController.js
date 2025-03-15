import Product from "../models/productModel.js";
import User from "../models/userModel.js";
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

// add products
export const addProduct = async (req, res) => {
  console.log("Received Body:", req.body);
  console.log("Received Files:", req.files);

  const { title, category, price, description, owner } = req.body;
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

    const postProduct = new Product({
      title,
      category,
      price,
      description,
      images: imagePaths,
      owner,
    });

    await postProduct.save();

    const user = await User.findById(owner);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.productsadd.push(postProduct._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      product: postProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to create product",
        error: error.message,
      });
  }
};

export const productDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const owner = await User.findById(product.owner).select(
      "username email phone"
    );
    return res.status(200).json({ product, owner });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// add to wishlist
export const wishlist = async (req, res) => {
  const { productId } = req.body;

  const userId = req.user.id;

  try {
    const userFind = await User.findById(userId);

    if (!userFind) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isWishlisted = userFind.wishlist.includes(productId);
    console.log(isWishlisted, "wishlisted");

    if (isWishlisted) {
      userFind.wishlist = userFind.wishlist.filter(
        (id) => id.toString() !== productId
      );
      await userFind.save();
      return res.status(200).json({
        success: true,
        message: "Item removed from wishlist",
        id: productId,
      });
    } else {
      userFind.wishlist.push(productId);
      await userFind.save();
      return res.status(200).json({
        success: true,
        message: "Item added successfully",
        id: productId,
      });
    }
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const searchProducts = async (req, res) => {
  console.log(req.query);
  const { q } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    });

    return res
      .status(200)
      .json({ success: true, message: "Products found", products: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: "not found" });
  }
};
