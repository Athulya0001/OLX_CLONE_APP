import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  profileimg: { type: String },
  phone: {
    type: String,
    required: true
  },
  productsadd: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const User = mongoose.model("User", UserSchema);
export default User;