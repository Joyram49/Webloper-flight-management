import { getAllFlight } from "@/queries/flight";
import dbConnect from "@/services/connectMongo";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const searchTerm = searchParams.get("searchTerm") || "";
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";

  try {
    await dbConnect();
    const flightData = await getAllFlight({
      searchTerm,
      origin,
      destination,
      page,
      limit,
    });

    if (!flightData) {
      return new Response(
        JSON.stringify({
          statusCode: 404,
          success: false,
          message: "No flights found",
          data: null,
        }),
        { status: 404 }
      );
    }

    const { meta, data: flights } = flightData;
    return new Response(
      JSON.stringify({
        statusCode: 200,
        success: true,
        message: "Flights retrieved successfully!",
        data: {
          meta,
          data: flights,
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        statusCode: 500,
        success: false,
        message: err instanceof Error ? err.message : "Failed to fetch flights",
        data: null,
      }),
      { status: 500 }
    );
  }
}
