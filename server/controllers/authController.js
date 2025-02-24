import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(req.body,"req body")

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(existingUser,"auth")
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    // const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword,"password")
    const newUser = User.create({ username, email, password: hashedPassword });

    await newUser.save();
    return res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 3600000, 
      sameSite: 'strict'
  });

  return res.json({ success: true, token , user: { username: user.username, email: user.email, _id: user._id } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};