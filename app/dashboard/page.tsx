import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      <nav className="space-x-4">
        <Link href="/search" className="text-blue-500 hover:text-blue-700">
          Recherche
        </Link>
        <Link href="/profile" className="text-blue-500 hover:text-blue-700">
          Profil
        </Link>
        <Link href="/calendar" className="text-blue-500 hover:text-blue-700">
          Calendrier
        </Link>
      </nav>
    </div>
  )
}

