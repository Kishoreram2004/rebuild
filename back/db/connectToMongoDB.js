import mongoose from 'mongoose';

const connectToMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected to mongoDB successfully")
    } catch (error) {
        console.log("error connecting to mongoDB", error)
    }
} 

export default connectToMongoDB