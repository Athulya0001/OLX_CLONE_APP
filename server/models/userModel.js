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
  phone: {
    type: String,
    required: true
  },
  profileimg: { 
    type: String 
  },
  verified: {
    type: Boolean,
    default: false
  },
  otp: { 
    type: String, 
    default: null 
  },
  otpExpires: { 
    type: Date, 
    default: null 
  },
  productsadd: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product" 
  }],
  wishlist: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product" 
  }]
});

const User = mongoose.model("User", UserSchema);
export default User;