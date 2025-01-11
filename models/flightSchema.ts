import { IFlight } from "@/types/interfaces";
import mongoose, { Document, Schema } from "mongoose";

export interface IFlightModel extends IFlight, Document {
  isDelete?: boolean;
}

const flightSchema = new Schema<IFlightModel>(
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
  mongoose.models.Flight ??
  mongoose.model<IFlightModel>("Flight", flightSchema);
