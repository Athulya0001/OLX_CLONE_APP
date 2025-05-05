import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// signup
export const registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid phone number. Must be 10 digits.",
        });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters and include 1 uppercase letter, 1 number, and 1 special character.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      otp,
      otpExpires,
      verified: false,
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
    });
    return res
      .status(200)
      .json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// signin
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
        error: "invalid_email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
        error: "invalid_password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { expires: new Date(Date.now() + 3600000) });
    return res.json({
      success: true,
      token,
      user: user,
    });
  } catch (error) {
    // console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get user details
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "user found", user: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// request product details
export const request = async (req, res) => {
  const { ownerId, message, userEmail, id } = req.body;
  console.log(req.body, "=====");

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const owner = await User.findById(product.owner);
    console.log(owner, "owner===============");
    if (!owner) {
      return res
        .status(404)
        .json({ success: false, message: "Product owner not found" });
    }

    if (user.requestedProducts.includes(id)) {
      return res.status(400).json({
        success: false,
        message: "You have already requested details for this product.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: owner.email,
      subject: "Request for Product Details",
      html: `
        <h2>Product Request</h2>
        <p><strong>Product ID:</strong> ${product._id}</p>
        <p><strong>Product Title:</strong> ${product.title}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>From:</strong> ${userEmail}</p>
      `,
      replyTo: userEmail,
    };

    await transporter.sendMail(mailOptions);

    user.requestedProducts.push(id);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Request sent successfully",
      productId: id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error sending request",
      error: error.message,
    });
  }
};

// check request status
export const checkRequestStatus = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.json({
      success: true,
      requestedProducts: user.requestedProducts || [],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// verify otp for authentication
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (user.verified) {
      return res
        .status(400)
        .json({ success: false, message: "User already verified" });
    }

    if (user.otp !== otp || user.otpExpires < new Date()) {
      console.log(user.otp, "user otp");
      console.log(otp, "otp");
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    user.verified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified. Registration complete!",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
