import { NextResponse } from "next/server"
import dbConnect from "../../../../lib/mongodb"
import Annonce from "../../../../models/Annonce"

export async function GET(request, { params }) {
  try {
    await dbConnect()
    const annonce = await Annonce.findById(params.id).populate("formateur", "firstName lastName")
    if (!annonce) {
      return NextResponse.json({ error: "Annonce not found" }, { status: 404 })
    }
    return NextResponse.json(annonce)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch annonce" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect()
    const annonceData = await request.json()
    const annonce = await Annonce.findByIdAndUpdate(params.id, annonceData, { new: true })
    if (!annonce) {
      return NextResponse.json({ error: "Annonce not found" }, { status: 404 })
    }
    return NextResponse.json(annonce)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update annonce" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect()
    const annonce = await Annonce.findByIdAndDelete(params.id)
    if (!annonce) {
      return NextResponse.json({ error: "Annonce not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Annonce deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete annonce" }, { status: 500 })
  }
}

