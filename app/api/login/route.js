import { NextResponse } from "next/server"
import dbConnect from "../../../lib/mongodb"
import User from "../../../models/User"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    await dbConnect()
    const { email, password } = await request.json()

    // Find the user by email
    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // If credentials are valid, return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user.toObject()
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}

