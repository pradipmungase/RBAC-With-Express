import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connectDB = async () => {
  try {
    const dbURI = process.env.DB_URL+process.env.DB_DATABASE;
    await mongoose.connect(dbURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
