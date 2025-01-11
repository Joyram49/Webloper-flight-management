import { Flight } from "@/models/flightSchema";
import { IFlightQueryParams, IFlightsResponse } from "@/types/interfaces";

// Update the return type of getAllFlight
export const getAllFlight = async ({
  searchTerm = "",
  origin = "",
  destination = "",
  page,
  limit,
}: IFlightQueryParams): Promise<IFlightsResponse["data"]> => {
  const skip = (page - 1) * limit;

  const query: { [key: string]: any } = {};

  if (searchTerm) {
    query.$or = [
      { flightNumber: { $regex: searchTerm, $options: "i" } },
      { airline: { $regex: searchTerm, $options: "i" } },
    ];
  }
  if (origin) {
    query.origin = { $regex: origin, $options: "i" };
  }
  if (destination) {
    query.destination = { $regex: destination, $options: "i" };
  }

  const total = await Flight.countDocuments(query);
  const limitedFlights = await Flight.find(query).skip(skip).limit(limit);

  return {
    meta: { page, limit, total },
    data: limitedFlights,
  };
};

export const getFlight = async (id: string) => {
  const flight = await Flight.findById(id);
  return flight;
};
