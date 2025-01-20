import { NextResponse } from "next/server"
import dbConnect from "../../../lib/mongodb"
import User from "../../../models/User"

export async function GET(request) {
  try {
    await dbConnect()
    const users = await User.find({}).select("-password")
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await dbConnect()
    const userData = await request.json()
    const user = new User(userData)
    await user.save()
    const { password, ...userWithoutPassword } = user.toObject()
    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

