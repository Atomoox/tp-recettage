"use client"

import { useState } from "react"

export default function Search() {
  const [domain, setDomain] = useState("")
  const [city, setCity] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!domain) {
      setError("Veuillez remplir le champ domaine")
    } else {
      // Ici, vous ajouteriez la logique de recherche
      console.log("Recherche pour:", { domain, city })
      setError("")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Recherche avancée</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Domaine"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
          required
        />
        <input
          type="text"
          placeholder="Ville (optionnel)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Rechercher
        </button>
        {error && <p className="text-red-500 text-xs italic mt-3">{error}</p>}
      </form>
    </div>
  )
}

