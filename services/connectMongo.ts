import mongoose from "mongoose";

export default async function dbConnect() {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    const conn = await mongoose.connect(String(process.env.MONGO_URI));
    console.log("successfully connceted to mongo database");
    return conn;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}
