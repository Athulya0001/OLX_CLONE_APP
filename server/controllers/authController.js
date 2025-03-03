import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
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
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const request = (req, res) => {
  const {ownerEmail, message, userEmail} = req.body

  const mailOptions = {
    from: userEmail,
    to: ownerEmail,
    subject: 'Request for Details',
    text: message || 'No message provided.'
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Failed to send email', error });
    }
    res.status(200).json({ success:true,  message: 'Request sent successfully!' });
  });
}

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    if (user.verified) {
      return res.status(400).json({ success: false, message: "User already verified" });
    }

    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    user.verified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res.status(200).json({ success: true, message: "OTP verified. Registration complete!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    if (!user.verified) {
      return res.status(400).json({ success: false, message: "Please verify your email first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "Strict",
    });

    return res.json({ success: true, verified: user.verified, token, user: { username: user.username, email: user.email, _id: user._id } });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const wishlist = async (req, res) => {
  console.log(req.user,"user")
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(req.body,"wish")

    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productIdStr = productId.toString();

    const isAlreadyInWishlist = user.wishlist.some(id => id.toString() === productIdStr);

    if (isAlreadyInWishlist) {
      user.wishlist = user.wishlist.filter(id => id.toString() !== productIdStr);
    } else {
      user.wishlist.push(productIdStr);
    }

    await user.save();
    res.status(200).json({ wishlist: user.wishlist, message: "Wishlist updated" });

  } catch (error) {
    console.error("Error updating wishlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};