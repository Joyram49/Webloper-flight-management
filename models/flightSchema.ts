import mongoose, { Schema } from "mongoose";

const flightSchema = new Schema(
  {
    flightNumber: { type: String, required: true, unique: true },
    airline: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    availableSeats: { type: Number, required: true, min: 0 },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Flight =
  mongoose.models.Flight ?? mongoose.model("Flight", flightSchema);
