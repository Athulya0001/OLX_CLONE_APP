import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import mongoConnect from './mongoConnect.js';
import authRoutes from "./routes/authRoute.js"
import productRoute from "./routes/productsRoute.js"
import Product from './models/productModel.js';

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
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch products from the database
    res.json(products); // Send products as a JSON response
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err });
  }
});

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log("Server listening on port", port)
})