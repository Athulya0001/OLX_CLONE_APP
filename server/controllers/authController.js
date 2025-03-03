import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();


export const registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;
  // console.log(req.body,"req body")

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      verificationToken,
      verified: false,
    });
    console.log(newUser,"new user")

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationLink = `${process.env.CLIENT_URL}/verify/${verificationToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });
    return res.status(201).json({ success: true, message: "Verification email sent. Please verify your email." })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }

};

export const request = (req, res) => {
  const {ownerEmail, message} = req.body

  const mailOptions = {
    from: process.env.EMAIL_USER,  
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

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid token or user does not exist" });
    }

    user.verified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ success: true, message: "Email verified successfully! You can now log in." });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

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