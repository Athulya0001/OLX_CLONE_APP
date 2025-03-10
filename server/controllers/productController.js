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

export const addProduct = async (req, res) => {
  console.log("Received Body:", req.body);
  console.log("Received File:", req.file);
  const { title, category, price, description, owner } = req.body;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    console.log("Image Path:", imagePath);

    const postProduct = new Product({
      title,
      category,
      price,
      description,
      images: [imagePath],
      owner,
    });

    await postProduct.save();

    const user = await User.findById(owner);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.productsadd.push(postProduct._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Product added successfully!", product: postProduct });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
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
  console.log(productId, "id");
  console.log(req.user, "user after decoded");
  const userId = req.user.id;
  try {
    // const existingUser = await User.findOne({ userId });
    const userFind = await User.findById(userId);
    // console.log(userId,"user");

    if (!userFind) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const isWishlisted = userFind.wishlist.includes(productId);
    console.log(isWishlisted, "wish");
    if (!isWishlisted) {
      userFind.wishlist.push(productId);
      await userFind.save();
      return res
        .status(200)
        .json({
          success: true,
          message: "item added successfullly",
          id: productId,
        });
    }
    return res
      .status(401)
      .json({ success: false, message: "item already added to wishlist" });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query.query;

    if (!query || query.length < 3) {
      return res
        .status(400)
        .json({ message: "Search query must be at least 3 characters" });
    }

    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive search on title
        { category: { $regex: query, $options: "i" } }, // Case-insensitive search on category
      ],
    }).select("title category"); // Select only needed fields

    return res.json(products);
  } catch (error) {
    console.error("Search Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
