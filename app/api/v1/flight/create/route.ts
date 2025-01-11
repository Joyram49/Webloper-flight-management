import { Flight } from "@/models/flightSchema";
import dbConnect from "@/services/connectMongo";
import { IFlight } from "@/types/interfaces";

export async function POST(request: Request) {
  const {
    flightNumber,
    airline,
    origin,
    destination,
    price,
    date,
    startTime,
    endTime,
    availableSeats,
  } = await request.json();
  try {
    await dbConnect();
    const newFlight = new Flight<IFlight>({
      flightNumber,
      airline,
      origin,
      destination,
      price,
      date,
      startTime,
      endTime,
      availableSeats,
    });

    const savedFlight = await newFlight.save();
    return new Response(
      JSON.stringify({
        statusCode: 200,
        success: true,
        message: "Flight Create Successfully",
        data: savedFlight,
      }),
      {
        status: 201,
      }
    );
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({
        statusCode: 500,
        success: false,
        message: err?.message ?? "New flight created",
        data: null,
      }),
      {
        status: 500,
      }
    );
  }
}
