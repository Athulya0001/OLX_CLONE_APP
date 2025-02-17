import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import mongoConnect from './mongoConnect.js';
import authRoutes from "./routes/authRoutes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }))
dotenv.config();

mongoConnect();

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log("Server listening on port", port)
})