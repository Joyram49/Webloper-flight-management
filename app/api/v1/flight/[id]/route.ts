import { getFlight } from "@/queries/flight";
import dbConnect from "@/services/connectMongo";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    await dbConnect();
    const flight = await getFlight(id);
    if (!flight) {
      return new Response(
        JSON.stringify({
          statusCode: 404,
          success: false,
          message: "Flight can't find!",
          data: null,
        }),
        { status: 404 }
      );
    }
    return new Response(
      JSON.stringify({
        statusCode: 200,
        success: true,
        message: "Flight retrive successfull",
        data: flight,
      }),
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Flight Retrive failed";
    return new Response(
      JSON.stringify({
        statusCode: 500,
        success: false,
        message: errorMessage,
        data: null,
      }),
      { status: 500 }
    );
  }
}
