// Header.tsx
'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-slate-900/80 backdrop-blur-sm rounded-xl shadow-md border border-slate-700">
      {/* Logo + Title */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/app")}
      >
        <Image
          src="/FAN_logo.png" // ✅ วางไฟล์ FAN_logo.png ไว้ใน /public
          alt="FAN Logo"
          width={40}
          height={40}
          className="rounded-lg"
        />
        <h1 className="text-xl md:text-2xl font-bold text-white hover:text-indigo-400 transition">
          Franchise AI Navigator
        </h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => router.push("/intro")}
        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
      >
        Log out
      </button>
    </header>
  )
}

