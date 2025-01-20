import { NextResponse } from "next/server"
import dbConnect from "../../../lib/mongodb"
import Annonce from "../../../models/Annonce"

export async function GET(request) {
  try {
    await dbConnect()
    const annonces = await Annonce.find({}).populate("formateur", "firstName lastName")
    return NextResponse.json(annonces)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch annonces" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await dbConnect()
    const annonceData = await request.json()
    const annonce = new Annonce(annonceData)
    await annonce.save()
    return NextResponse.json(annonce, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create annonce" }, { status: 500 })
  }
}

