import { connecttMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashesPassword = await bcrypt.hash(password, 10);
    await connecttMongoDB();
    await User.create({ name, email, password: hashesPassword });

    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registering usser", error },
      { status: 500 }
    );
  }
}
