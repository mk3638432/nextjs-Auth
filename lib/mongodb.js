import mongoose from "mongoose";

export const connecttMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connceting MongoDb", error);
  }
};
