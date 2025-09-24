// Sidebar.tsx
'use client'
import Image from "next/image"
import {
  MessageSquare,
  Cpu,
  User,
  Users,
  Info,
  Home,
} from "lucide-react"

export default function Sidebar({ tab, setTab }) {
  const menu = [
    { key: "arai", label: "Arai", icon: MessageSquare },
    { key: "oai", label: "Oai", icon: Cpu },
    { key: "jai", label: "Jai", icon: User },
    { key: "kai", label: "Kai", icon: Users },
    { key: "profile", label: "Profile", icon: Home },
    { key: "about", label: "About", icon: Info },
  ]

  return (
    <aside className="w-60 bg-slate-900/90 text-slate-200 flex flex-col border-r border-slate-800 backdrop-blur-lg">
      {/* Logo */}
      <div className="p-4 flex items-center gap-4 border-b border-slate-800 bg-gradient-to-r from-indigo-600 to-blue-500">
        <Image
          src="/FAN_logo.png"
          alt="FAN Logo"
          width={55}
          height={55}
          className="rounded-xl shadow-md"
        />
        <h1 className="font-extrabold text-xl text-white tracking-wide">FAN</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menu.map(item => {
          const Icon = item.icon
          return (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 
                ${
                  tab === item.key
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md scale-[1.02]"
                    : "hover:bg-slate-800/70 text-slate-300"
                }`}
            >
              <Icon size={18} className={tab === item.key ? "text-white" : "text-slate-400"} />
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
        <span className="font-semibold text-indigo-400">Demo User</span>
      </div>
    </aside>
  )
}
