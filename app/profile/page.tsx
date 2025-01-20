"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Profile() {
  const [about, setAbout] = useState("")
  const [experience, setExperience] = useState("")
  const [userType, setUserType] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const userId = user._id
    if (!userId) {
      console.error("User ID not found, make sure to login first")
      router.push("/login") // Redirect to login page
      return
    }
    const data = { about, experience, userType }
  
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
  
      if (!response.ok) {
        throw new Error("Failed to update profile")
      }
  
      const updatedUser = await response.json()
      console.log("Profil mis à jour:", updatedUser)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Profil utilisateur</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <textarea
          placeholder="À propos"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
        />
        <textarea
          placeholder="Expérience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
        />
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Type d'utilisateur</label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="formateur"
                checked={userType === "formateur"}
                onChange={(e) => setUserType(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Formateur</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                value="apprenant"
                checked={userType === "apprenant"}
                onChange={(e) => setUserType(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Apprenant</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Mettre à jour le profil
        </button>
      </form>
    </div>
  )
}

