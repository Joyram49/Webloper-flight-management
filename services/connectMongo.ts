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
    const errMessage =
      err instanceof Error ? err.message : "Failed to connect to database";
    throw new Error(errMessage);
  }
}
