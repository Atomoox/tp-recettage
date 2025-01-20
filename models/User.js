import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  about: {
    type: String,
    trim: true,
  },
  experience: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  userType: {
    type: String,
    enum: ["formateur", "apprenant"],
    required: [true, "User type is required"],
  },
  profilePicture: {
    type: String, // URL to the image
  },
  // Additional fields for formateurs
  availability: {
    type: [Date],
    default: [],
  },
  hourlyRate: {
    type: Number,
    min: 0,
  },
  teachingLocations: {
    type: [String],
    enum: ["distance", "chez_formateur", "chez_apprenant"],
  },
  iban: {
    type: String,
    trim: true,
  },
  // Fields for reviews
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
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

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User

