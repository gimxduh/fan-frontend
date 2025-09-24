//ChatBox.tsx
'use client'
import { useState } from "react"

export default function ChatBox({ onSend }: { onSend: (q: string) => void }) {
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    onSend(input.trim())
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-4 border-t border-slate-800 bg-slate-900">
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white resize-none h-14"
        />
        <button
          onClick={handleSend}
          className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
        >
          ➤
        </button>
      </div>

      {/* Suggested prompts */}
      <div className="flex gap-2 mt-3 flex-wrap text-sm">
        {[
          "How to open the store?",
          "How to steam milk?",
          "Refund policy?",
          "Show daily checklist"
        ].map((s, i) => (
          <button
            key={i}
            onClick={() => onSend(s)}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-md text-slate-300"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

