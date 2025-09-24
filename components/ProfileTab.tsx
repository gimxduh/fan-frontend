// ProfileTab.tsx
'use client'
import { User, Settings, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ProfileTab() {
  const router = useRouter()

  const handleLogout = () => {
    toast.success("Logged out successfully")
    setTimeout(() => {
      router.push('/intro')
    }, 800)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <User className="w-5 h-5" /> Profile
        </h2>
        <p className="text-sm opacity-80">Manage your account and preferences</p>
      </div>

      {/* Profile Info */}
      <div className="bg-slate-800 rounded-lg p-6 shadow-md space-y-4">
        <div>
          <p className="text-slate-400 text-sm">Name</p>
          <p className="text-lg font-semibold text-white">Demo</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Email</p>
          <p className="text-lg font-semibold text-white">demo.1234@example.com</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Role</p>
          <p className="text-lg font-semibold text-white">Barista</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
          <Settings className="w-4 h-4" /> Settings
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  )
}
