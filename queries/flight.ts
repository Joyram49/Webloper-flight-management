import { Flight } from "@/models/flightSchema";
import { IFlightQueryParams } from "@/types/interfaces";

export const getAllFlight = async ({
  searchTerm = "",
  origin = "",
  destination = "",
  page,
  limit,
}): IFlightQueryParams => {
  const skip = (page - 1) * limit;

  const query: unknown = {};
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
  const limitedFligths = await Flight.find(query).skip(skip).limit(limit);

  return { total, flights: limitedFligths };
};

export const getFlight = async (id: string) => {
  const flight = await Flight.findById(id);
  return flight;
};
