import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

const mongoConnect = async() =>{
    try {
        await mongoose.connect(uri)
        console.log("Connected to mongodb")
        
    } catch (error) {
        console.log("Error connecting MongoDB", error)
    }
}

export default mongoConnect;