import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from "cors";
import { fileURLToPath } from "url";
import mongoConnect from './mongoConnect.js';
import authRoutes from "./routes/authRoute.js"
import productRouter from './routes/productsRoute.js';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { wishlist } from './controllers/authController.js';
import { authCheck } from './middleware/authCheck.js';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

dotenv.config();
app.use(cookieParser());


mongoConnect().then(()=>{
  app.listen(port,()=>{
    console.log("Server listening on port", port)
})
})
app.get('/api/auth/wishlist', wishlist); 


app.use("/api/auth", authRoutes);
app.use("/products", productRouter);
app.post('/api/auth/wishlist',authCheck, wishlist);  // Define POST route for updating the wishlist

const port = process.env.PORT || 4000;

