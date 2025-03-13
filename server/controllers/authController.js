import User from "../models/userModel.js";
import Product from '../models/productModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';

dotenv.config();

export const registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(existingUser, "auth");
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
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
     return res.status(200).json({ success: true, message: "OTP sent to your email" });
    }catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

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
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

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

export const request = async (req, res) => {
  const { ownerEmail, message, userEmail, id } = req.body;
  console.log(userEmail,"email user")

  try {
    const user = await User.findOne({userEmail});
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const product = await Product.findById(id);
    console.log(product,"pro req")
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ownerEmail,
      subject: "Request for Details",
      html: `<p><b>Message:</b> ${message}</p><p><b>From:</b> ${userEmail}</p>`,
      replyTo: userEmail,
    };

    await transporter.sendMail(mailOptions);
    user.request = true;
    await user.save();
    return res.status(200).json({ success: true, message: "Requested details sent", userReq: user.request, productId: id});

  } catch (error) {
    console.error("Nodemailer Error:", error);
    return res.status(500).json({ success: false, message: "Error sending mail" });
  }
};

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

    return res
      .status(200)
      .json({
        success: true,
        message: "OTP verified. Registration complete!",
        user: user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
