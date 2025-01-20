"use client";

import { useState } from "react";

export default function Search() {
  const [domain, setDomain] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [mode, setMode] = useState("avanced");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (mode === "avanced" && !domain) {
      setError("Veuillez remplir le champ domaine");
    } else if (mode === "fast" && !name) {
      setError("Veuillez remplir le champ nom");
    } else {
      setError("");
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const users = await response.json();
      const filteredUsers = users.filter((user: any) => {
        if (mode === "avanced") {
          if (domain && !user.domain.toLocaleLowerCase().includes(domain.toLocaleLowerCase())) {
            return false;
          }
          if (city && !user.address.city.toLocaleLowerCase().includes(city.toLocaleLowerCase())) {
            return false;
          }
        } else if (mode === "fast") {
          if (name && !user.lastName.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
            return false;
          }
        }
        return true;
      });
      setUsers(filteredUsers);
      console.log(users);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleSwitch = (mode: string) => {
    setMode(mode);
    setUsers([]);
    setError("");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Recherche</h1>
      <div className="mb-8">
        <button
          className={`px-4 py-2 mr-2 font-bold rounded ${
            mode === "avanced" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleSwitch("avanced")}
        >
          Mode Avancé
        </button>
        <button
          className={`px-4 py-2 font-bold rounded ${
            mode === "fast" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("fast")}
        >
          Mode Rapide
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        {mode === "avanced" && (
          <>
            <input
              type="text"
              placeholder="Domaine"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
            />
            <input
              type="text"
              placeholder="Ville (optionnel)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
            />
          </>
        )}
        {mode === "fast" && (
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 mb-3 text-base leading-tight text-gray-700 border border-neutral-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:border-neutral-800"
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Rechercher
        </button>
        {error && <p className="text-red-500 text-xs italic mt-3">{error}</p>}
      </form>

      {users.length > 0 && (
        <table className="table-auto border-collapse border border-gray-300 mt-8 w-full max-w-3xl text-sm text-left text-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Prénom</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Ville</th>
              <th className="border border-gray-300 px-4 py-2">Domaine</th>
              <th className="border border-gray-300 px-4 py-2">Tarif horaire (€)</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id}>
                <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
                <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.address.city}</td>
                <td className="border border-gray-300 px-4 py-2">{user.domain}</td>
                <td className="border border-gray-300 px-4 py-2">{user.hourlyRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {users.length === 0 && (
        <p className="text-gray-600 mt-8">Aucun résultat</p>
      )}
    </div>
  );
}
