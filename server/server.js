import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import mongoConnect from "./mongoConnect.js";
import authRoutes from "./routes/authRoute.js";
import productRouter from "./routes/productsRoute.js";
import cookieParser from "cookie-parser";
import searchRoutes from './routes/searchRoutes.js'
import userRouter from "./routes/userRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

dotenv.config();
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/products", productRouter);app.use('api/search',searchRoutes)
app.use('/api/search',searchRoutes)
app.use("/api/user", userRouter)
const port = process.env.PORT || 4000;

mongoConnect().then(() => {
  app.listen(port, () => {
    console.log("Server listening on port", port);
  });
});

// app.post('/api/auth/wishlist',authCheck, wishlist);
