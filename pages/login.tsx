// pages/login.tsx
'use client'
import LoginForm from "../components/LoginForm"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-8">
          <div className="text-center mb-6">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-lg">
              FAN
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-100">Franchise AI Navigator</h2>
            <p className="mt-1 text-sm text-slate-400">Sign in to your account</p>
          </div>

          <LoginForm />
          {/* ปุ่ม demo login */}
          <button
            onClick={() => router.push("/app")}
            className="mt-4 w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            🚀 Demo Login
          </button>
        </div>
      </div>
    </div>
  )
}
