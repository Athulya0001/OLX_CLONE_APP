import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    title : {
        type: String
    },
    price: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        type: String,
        enum: ['vehicles', 'electronics', 'furniture', 'properties'],
        default: 'vehicles'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Product = mongoose.model("Product" ,productSchema)

export default Product;