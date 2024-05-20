import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();


const connectDatabase = async () => {
  
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    
    console.log(`MongoDB connected with server: ${mongoose.connection.host}`.bgMagenta.white);
  } catch (err) {
    console.error(`Error connecting to MongoDB ${err}`.bgRed.white);
  }
};


export default connectDatabase;
