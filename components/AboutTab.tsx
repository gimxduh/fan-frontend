//AboutTab.tsx
'use client'
import { Shield, BarChart3, Bot } from "lucide-react"  // ✅ modern icons

export default function AboutTab(){
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">About FAN</h2>
      <p className="text-slate-400 mb-6 max-w-2xl">
        FAN is an AI ecosystem for onboarding, scheduling, mentorship, and knowledge management —
        empowering franchises with smart, scalable tools.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition">
          <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center mb-3">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold">Secure Login</h4>
          <p className="text-sm text-slate-400 mt-1">Role-based authentication and access control.</p>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition">
          <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold">Progress Tracking</h4>
          <p className="text-sm text-slate-400 mt-1">Track employee growth and performance metrics.</p>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition">
          <div className="h-10 w-10 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold">AI Guidance</h4>
          <p className="text-sm text-slate-400 mt-1">Personalized assistance for onboarding and career development.</p>
        </div>
      </div>

      {/* Credit Section */}
      <div className="mt-12 text-center">
        <hr className="border-slate-700 mb-6" />
        <h3 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Developed by
        </h3>
        <p className="mt-3 text-lg font-semibold text-slate-200">
          Jiratip J. <span className="text-slate-400">&</span> Krittaphas T.
        </p>
        <p className="mt-1 text-xs text-slate-500">Hackathon 2025 — Franchise AI Navigator</p>
      </div>
    </div>
  )
}
