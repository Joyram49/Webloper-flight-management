/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@/models/userSchema";
import dbConnect from "@/services/connectMongo";
import { IUser } from "@/types/interfaces";
import bcrypt from "bcryptjs";

interface TUser extends IUser {
  password: string;
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Connect to the database
    await dbConnect();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({
          statusCode: 400,
          success: false,
          message: "Email already registered",
        }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User<TUser>({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const savedUser = await newUser.save();

    // Exclude the password from the response
    const { password: exludedPassword, ...userWithoutPassword } =
      savedUser.toObject();

    // Return a success response
    return new Response(
      JSON.stringify({
        statusCode: 200,
        success: true,
        message: "Registered Successfully",
        data: userWithoutPassword,
      }),
      { status: 201 }
    );
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Registration failed";
    return new Response(
      JSON.stringify({
        statusCode: 500,
        success: false,
        message: errorMessage,
      }),
      { status: 500 }
    );
  }
}
