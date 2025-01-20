import mongoose from "mongoose"

const annonceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  domain: {
    type: String,
    required: [true, "Domain is required"],
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  formateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Formateur is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: 0,
  },
  duration: {
    type: Number, // Duration in minutes
    required: [true, "Duration is required"],
    min: 15, // Minimum 15 minutes
  },
  type: {
    type: String,
    enum: ["presentiel", "distanciel"],
    required: [true, "Course type is required"],
  },
  availableDates: [
    {
      type: Date,
      required: [true, "At least one available date is required"],
    },
  ],
  maxParticipants: {
    type: Number,
    default: 1,
    min: 1,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "cancelled", "completed"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Add any pre-save hooks, virtual fields, or methods here

const Annonce = mongoose.models.Annonce || mongoose.model("Annonce", annonceSchema)

export default Annonce

