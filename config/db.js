import mongoose from "mongoose";

const baseUrl = process.env.MONGODB || "0.0.0.0:27017";

export const connectToDb = async () => {
  try {
    await mongoose.connect(`mongodb://${baseUrl}/postaway2`);
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
