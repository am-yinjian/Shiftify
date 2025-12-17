import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/shiftify';
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.log('⚠️  Running in demo mode without database connection');
        console.log('   To enable full functionality, please:');
        console.log('   1. Install MongoDB: brew install mongodb-community');
        console.log('   2. Start MongoDB: brew services start mongodb-community');
        console.log('   3. Create .env file with MONGO_URI=mongodb://localhost:27017/shiftify');
    }
};