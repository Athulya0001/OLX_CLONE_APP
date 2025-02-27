import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";

dotenv.config();
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


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
      sameSite: "strict",
    });

    return res.json({ success: true, token, user: { username: user.username, email: user.email, _id: user._id } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// export const googleAuth = async (req, res) => {
//   const { token } = req.body;

//   try {
//     // Verify the token with Google
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID, // The client ID of your Google OAuth app
//     });

//     const payload = ticket.getPayload();
//     const user = {
//       name: payload.name,
//       email: payload.email,
//       picture: payload.picture,
//     };

//     const jwtToken = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

//     res.json({ token: jwtToken, user });
//   } catch (error) {
//     console.error('Error verifying Google token:', error);
//     res.status(400).json({ message: 'Invalid token' });
//   }
// }

export const wishlist = async (req, res)=>{
  const {wishlist} = req.body;

  try {
    const addWish = new User.insertOne({
      wishlist: wishlist
    })
    await addWish.save()
    return res.status(200).json({message:"Added to wishlist"})
  } catch (error) {
    return res.status(500).json({message: "Error adding to wishlist"})
  }
}