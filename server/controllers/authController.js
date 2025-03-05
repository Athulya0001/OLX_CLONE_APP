import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;
  // console.log(req.body,"req body")

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(existingUser, "auth");
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword,"password")
    const newUser = User.create({
      username,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  console.log("fn call");
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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.cookie("token", token, { expires: new Date(Date.now() + 3600000) });
    return res.json({
      success: true,
      token,
      user: {
        username: user.username,
        email: user.email,
        _id: user._id,
      },
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

export const request = (req, res) => {
  const { ownerEmail, message, userEmail } = req.body;

  const mailOptions = {
    from: userEmail,
    to: ownerEmail,
    subject: "Request for Details",
    text: message || "No message provided.",
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Failed to send email", error });
    }
    res
      .status(200)
      .json({ success: true, message: "Request sent successfully!" });
  });
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
      .json({ success: true, message: "OTP verified. Registration complete!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
