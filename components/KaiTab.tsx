//KaiTab.tsx
'use client'
import { useState, useEffect } from "react"
import toast from "react-hot-toast"

type Mode = "menu" | "submit" | "upvote" | "kudos" | "challenge" | "summary"

export default function KaiTab() {
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<Mode>("menu")

  // states
  const [ideaText, setIdeaText] = useState("")
  const [employee, setEmployee] = useState("")
  const [branch, setBranch] = useState("")
  const [ideaId, setIdeaId] = useState("")
  const [fromEmp, setFromEmp] = useState("")
  const [toEmp, setToEmp] = useState("")
  const [message, setMessage] = useState("")
  const [ideas, setIdeas] = useState<any[]>([])

  // ---------- Backend calls ----------
  const fetchIdeas = async () => {
    const res = await fetch("http://localhost:8000/kai/ideas")
    const data = await res.json()
    setIdeas(data.ideas || [])
  }

  const submitIdea = async () => {
    const res = await fetch("http://localhost:8000/kai/idea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea_text: ideaText, employee, branch })
    })
    const data = await res.json()
    toast.success(data.result)
    setMode("menu")
  }

  const upvoteIdea = async () => {
    const res = await fetch(`http://localhost:8000/kai/upvote/${ideaId}`, { method: "POST" })
    const data = await res.json()
    toast.success(data.result)
    setMode("menu")
  }

  const viewChallenge = async () => {
    const res = await fetch("http://localhost:8000/kai/challenge")
    const data = await res.json()
    setOutput(data.result)
  }

  const postKudos = async () => {
    const res = await fetch("http://localhost:8000/kai/kudos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from_emp: fromEmp, to_emp: toEmp, message })
    })
    const data = await res.json()
    toast.success(data.result)
    setMode("menu")
  }

  const managerSummary = async () => {
    const res = await fetch("http://localhost:8000/kai/summary")
    const data = await res.json()
    setOutput(data.result)
  }

  // load ideas when entering upvote mode
  useEffect(() => {
    if (mode === "upvote") {
      fetchIdeas()
    }
  }, [mode])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-bold">🤝 Kai – Team Community</h2>
        <p className="text-sm opacity-80">Share ideas, challenges, and kudos with your team</p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {mode === "menu" && (
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setMode("submit")} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Submit Idea</button>
            <button onClick={() => setMode("upvote")} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Upvote Idea</button>
            <button onClick={viewChallenge} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">View Challenge</button>
            <button onClick={() => setMode("kudos")} className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">Post Kudos</button>
            <button onClick={managerSummary} className="col-span-2 px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-purple-800">Manager Summary</button>
          </div>
        )}

        {/* Submit Idea */}
        {mode === "submit" && (
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-200">💡 Submit Idea</h3>
            <input placeholder="Idea Text" value={ideaText} onChange={(e) => setIdeaText(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white"/>
            <input placeholder="Employee Name" value={employee} onChange={(e) => setEmployee(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white"/>
            <input placeholder="Branch ID" value={branch} onChange={(e) => setBranch(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white"/>
            <div className="flex gap-2">
              <button onClick={submitIdea} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Submit</button>
              <button onClick={() => setMode("menu")} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Cancel</button>
            </div>
          </div>
        )}

        {/* Upvote Idea */}
        {mode === "upvote" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-200">👍 Upvote an Idea</h3>
            
            {/* ideas list */}
            <div className="bg-slate-900 rounded-lg p-4 max-h-64 overflow-y-auto border border-slate-700">
              {ideas.length === 0 ? (
                <p className="text-slate-400 text-sm">No ideas submitted yet.</p>
              ) : (
                <ul className="space-y-2">
                  {ideas.map((idea) => (
                    <li key={idea.idea_id} className="p-2 bg-slate-800 rounded flex justify-between items-center">
                      <span>
                        <span className="font-bold text-indigo-400">#{idea.idea_id}</span> – {idea.idea_text} 
                        <span className="ml-2 text-xs text-slate-400">({idea.submitted_by})</span>
                      </span>
                      <span className="text-sm text-slate-300">⭐ {idea.upvotes}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* select id to upvote */}
            <input placeholder="Enter Idea ID" value={ideaId} onChange={(e) => setIdeaId(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white"/>
            <div className="flex gap-2">
              <button onClick={upvoteIdea} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Upvote</button>
              <button onClick={() => setMode("menu")} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Cancel</button>
            </div>
          </div>
        )}

        {/* Post Kudos */}
        {mode === "kudos" && (
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-200">👏 Post Kudos</h3>
            <input placeholder="From Employee" value={fromEmp} onChange={(e) => setFromEmp(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white"/>
            <input placeholder="To Employee" value={toEmp} onChange={(e) => setToEmp(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white"/>
            <input placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white"/>
            <div className="flex gap-2">
              <button onClick={postKudos} className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">Post</button>
              <button onClick={() => setMode("menu")} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Cancel</button>
            </div>
          </div>
        )}

        {/* Output (เฉพาะ Challenge & Summary) */}
        {mode === "menu" && output && (
          <pre className="p-4 bg-slate-800 text-slate-200 rounded-lg whitespace-pre-wrap">
            {output}
          </pre>
        )}
      </div>
    </div>
  )
}
