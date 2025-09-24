// components/App.tsx
'use client'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import AraiTab from './AraiTab'
import OaiTab from './OaiTab'
import JaiTab from './JaiTab'
import KaiTab from './KaiTab'
import AboutTab from './AboutTab'
import ProfileTab from './ProfileTab' // ถ้ายังไม่มี ใส่ placeholder ไปก่อนก็ได้

export default function App() {
  const [tab, setTab] = useState<'arai'|'oai'|'jai'|'kai'|'about'|'profile'>('arai')

  return (
    <div className="flex h-screen">
      <Sidebar tab={tab} setTab={setTab} />

      <main className="flex-1 flex flex-col bg-slate-950 text-slate-100">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'arai' && <AraiTab />}
          {tab === 'oai' && <OaiTab />}
          {tab === 'jai' && <JaiTab />}
          {tab === 'kai' && <KaiTab />}
          {tab === 'about' && <AboutTab />}
          {tab === 'profile' && <ProfileTab />}
        </div>
      </main>
    </div>
  )
}
