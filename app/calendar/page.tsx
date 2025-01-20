"use client"

import { useState } from "react"

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [courseType, setCourseType] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici, vous ajouteriez la logique pour réserver un cours
    console.log("Cours réservé:", { selectedDate, selectedTime, courseType })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Calendrier</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
          required
        />
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
          required
        />
        <select
          value={courseType}
          onChange={(e) => setCourseType(e.target.value)}
          className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
          required
        >
          <option value="">Sélectionnez le type de cours</option>
          <option value="presentiel">Présentiel</option>
          <option value="distanciel">Distanciel</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Réserver un cours
        </button>
      </form>
    </div>
  )
}

