import Product from "../models/productModel.js"

export const addProducts = async(req, res) =>{
    try {
        const existProducts = await Product.find();
        if(existProducts){
            res.status(200).json({message:"product found"})
        }
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
}