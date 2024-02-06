import mongoose from "mongoose";

//database_connection
export const DATABASE = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected Successfully");
  } catch (error) {
    throw error;
  }
};
