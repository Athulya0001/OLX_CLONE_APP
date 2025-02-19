import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    title : {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum: ['vehicles', 'electronics', 'furniture', 'properties'],
        default: 'electronics'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Product = mongoose.model("Product" ,productSchema)

export default Product;