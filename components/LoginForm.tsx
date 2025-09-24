'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault()
        router.push("/app")
      }}
    >
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-1">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@company.com"
          className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-900 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Password */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-slate-200">Password</label>
          <a href="#" className="text-xs text-indigo-400 hover:underline">Forgot your password?</a>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-900 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Remember me */}
      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          className="h-4 w-4 text-indigo-500 border-slate-600 bg-slate-800 rounded"
        />
        <label htmlFor="remember" className="ml-2 text-sm text-slate-400">Remember me</label>
      </div>

      {/* Sign in button */}
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        Sign in
      </button>

      {/* Demo login */}
      <button
        type="button"
        onClick={() => router.push("/app")}
        className="w-full py-2 rounded-lg bg-slate-700 text-slate-100 font-semibold hover:bg-slate-600 transition"
      >
        🚀 Demo Login
      </button>

      {/* Sign up */}
      <p className="text-sm text-slate-400 text-center">
        Don&apos;t have an account?{" "}
        <a href="#" className="text-indigo-400 hover:underline">Sign up</a>
      </p>
    </form>
  )
}
