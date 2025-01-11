import { User } from "@/models/userSchema";
import dbConnect from "@/services/connectMongo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // Connect to the database
    await dbConnect();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({
          statusCode: 404,
          success: false,
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    // compare the password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({
          statusCode: 400,
          success: false,
          message: "Invalid password",
        }),
        { status: 400 }
      );
    }

    // Create a JWT token with a 1hour expiration
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.AUTH_SECRET as string,
      { expiresIn: "1h" }
    );
    // Return the success response with the access token
    return new Response(
      JSON.stringify({
        statusCode: 200,
        success: true,
        message: "Login successful",
        data: { accessToken },
      }),
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error(err);
    return new Response(
      JSON.stringify({
        statusCode: 500,
        success: false,
        message: err.message ?? "Login failed",
      }),
      { status: 500 }
    );
  }
}
