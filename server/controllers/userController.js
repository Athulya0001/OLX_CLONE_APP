import User from "../models/userModel.js";
import Product from "../models/productModel.js";

// get user details
export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("productsadd");
    return res
      .status(200)
      .json({ success: true, message: "User details", user: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update profile handler
export const updateProfile = async (req, res) => {
  try {
    const { username, phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, phone },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Updated user details",
      updatedUser: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete product handler
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { productsadd: productId },
    });

    await Product.findByIdAndDelete(productId);

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};