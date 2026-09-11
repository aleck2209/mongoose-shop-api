import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
}

export const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully')
    }catch (error: unknown) {
        console.error("Error connecting to MongoDB:", error);
    }
}