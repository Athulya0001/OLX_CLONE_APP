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
  profileimg: {
    type: String,
    default: '../public/images/profile-logo.webp'
  },
  phone: {
    type: String,
    required: false,
    unique: true,
  },
  productsadd: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const User = mongoose.model("User", UserSchema);

export default User;