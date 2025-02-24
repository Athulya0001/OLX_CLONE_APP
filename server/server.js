import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from "cors";
import { fileURLToPath } from "url";
import mongoConnect from './mongoConnect.js';
import authRoutes from "./routes/authRoute.js"
import productRouter from './routes/productsRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }))

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

dotenv.config();

mongoConnect().then(()=>{
  app.listen(port,()=>{
    console.log("Server listening on port", port)
})
})

app.use("/api/auth", authRoutes);
app.use("/products", productRouter);

const port = process.env.PORT || 4000;

