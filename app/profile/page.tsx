"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Profile() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [photo, setPhoto] = useState("")
  const [about, setAbout] = useState("")
  const [experience, setExperience] = useState("")
  const [userType, setUserType] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [domain, setDomain] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [hourlyRate, setHourlyRate] = useState("")
  const [courseLocation, setCourseLocation] = useState({
    remote: false,
    atTeacher: false,
    atStudent: false,
  })
  const [iban, setIban] = useState("")
  const [availability, setAvailability] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user) {
      setEmail(user.email || "")
      setFirstName(user.firstName || "")
      setLastName(user.lastName || "")
      setPhoto(user.photo || "")
      setAbout(user.about || "")
      setExperience(user.experience || "")
      setUserType(user.userType || "")
      setPhoneNumber(user.phoneNumber || "")
      setDomain(user.domain || "")
      setStreet(user.address?.street || "")
      setCity(user.address?.city || "")
      setPostalCode(user.address?.postalCode || "")
      setCountry(user.address?.country || "")
      setHourlyRate(user.hourlyRate || "")
      setCourseLocation({
        remote: user.teachingLocations?.includes("distance") || false,
        atTeacher: user.teachingLocations?.includes("chez_formateur") || false,
        atStudent: user.teachingLocations?.includes("chez_apprenant") || false,
      })
      setIban(user.iban || "")
      setAvailability(user.availability || [])
    }
  }, [])

  const handleAddAvailability = () => {
    const currentDateTime = new Date().toISOString().slice(0, 16)
    setAvailability([...availability, currentDateTime])
  }

  const handleRemoveAvailability = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index))
  }

  const handleAvailabilityChange = (index: number, value: string) => {
    const newAvailability = [...availability]
    newAvailability[index] = value
    setAvailability(newAvailability)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const userId = user._id
    if (!userId) {
      console.error("User ID not found, make sure to login first")
      router.push("/login") // Redirect to login page
      return
    }

    const teachingLocations = []
    if (courseLocation.remote) teachingLocations.push("distance")
    if (courseLocation.atTeacher) teachingLocations.push("chez_formateur")
    if (courseLocation.atStudent) teachingLocations.push("chez_apprenant")

    const data = {
      email,
      firstName,
      lastName,
      about,
      experience,
      userType,
      phoneNumber,
      domain,
      address: { street, city, postalCode, country },
      hourlyRate,
      teachingLocations,
      iban,
      photo,
      availability
    }

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
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Profil utilisateur</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
        />
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
        />
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
        />
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
        <input
          type="text"
          placeholder="Numéro de téléphone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
        />
        <input
          type="text"
          placeholder="Domaine"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
        />
        <input
          type="text"
          placeholder="Rue"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
        />
        <input
          type="text"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
        />
        <input
          type="text"
          placeholder="Code postal"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
        />
        <input
          type="text"
          placeholder="Pays"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
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
        {userType === "formateur" && (
          <>
            <input
              type="number"
              placeholder="Prix/heure"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
            />
            {availability.map((date, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="datetime-local"
                  value={new Date(date).toISOString().slice(0, 16)}
                  onChange={(e) => handleAvailabilityChange(index, e.target.value)}
                  className="w-full px-3 py-2 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAvailability(index)}
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Supprimer
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAvailability}
              className="mb-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Ajouter une disponibilité
            </button>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">Lieu de cours</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={courseLocation.remote}
                    onChange={(e) => setCourseLocation({ ...courseLocation, remote: e.target.checked })}
                    className="form-checkbox"
                  />
                  <span className="ml-2">A distance</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="checkbox"
                    checked={courseLocation.atTeacher}
                    onChange={(e) => setCourseLocation({ ...courseLocation, atTeacher: e.target.checked })}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Chez lui</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="checkbox"
                    checked={courseLocation.atStudent}
                    onChange={(e) => setCourseLocation({ ...courseLocation, atStudent: e.target.checked })}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Chez l’apprenant</span>
                </label>
              </div>
            </div>
            <input
              type="text"
              placeholder="IBAN"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
            />
          </>
        )}
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