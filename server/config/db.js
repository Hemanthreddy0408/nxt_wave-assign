import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let isConnected = false;

export const connectDB = async () => {
  // Support both MONGODB_URI and MONGO_URI from Render / Atlas
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nxtwave_workshop';
  
  try {
    mongoose.set('strictQuery', false);
    const timeout = process.env.NODE_ENV === 'production' ? 10000 : 3000;
    
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: timeout,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${uri.replace(/:([^:@]{4})[^:@]*@/, ':****@')}.`);
    console.warn(`[MongoDB Notice] Operating with memory store. All endpoints active.`);
    isConnected = false;
  }
};

export const getDbStatus = () => isConnected;
