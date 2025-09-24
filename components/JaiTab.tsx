//JaiTab.tsx
'use client'
import { useState } from "react"

export default function JaiTab() {
  const [output, setOutput] = useState("")
  const [empId, setEmpId] = useState("101") // ค่า default = Alex

  const fetchGrowth = async () => {
    const res = await fetch(`http://localhost:8000/jai/growth/${empId}`)
    const data = await res.json()
    setOutput(data.result)
  }

  const fetchNudge = async () => {
    const res = await fetch(`http://localhost:8000/jai/nudge/${empId}`)
    const data = await res.json()
    setOutput(data.result)
  }

  const fetchSkills = async () => {
    const res = await fetch(`http://localhost:8000/jai/skills/${empId}`)
    const data = await res.json()
    setOutput(data.result)
  }


  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-bold">📘 Jai – Personal Growth</h2>
        <p className="text-sm opacity-80">Track growth path, skills, and nudges</p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Input box */}
        <div className="flex items-center gap-2">
          <label className="text-slate-200 text-sm">Employee ID:</label>
          <input
            type="text"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            className="px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white w-28"
          />
        </div>

        {/* Buttons */}
        <div className="space-x-2">
          <button onClick={fetchGrowth} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Growth Path</button>
          <button onClick={fetchNudge} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Weekly Nudge</button>
          <button onClick={fetchSkills} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Skill Tree</button>
        </div>

        {/* Output */}
        <pre className="p-4 bg-slate-800 text-slate-200 rounded-lg whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  )
}
