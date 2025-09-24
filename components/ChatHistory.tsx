// ChatHistory.tsx
'use client'
type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  style?: 'bullet' | 'sentence'
  sources?: { section: string; preview: string }[]
}

export default function ChatHistory({ chat }: { chat: ChatMessage[] }) {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-3 bg-slate-900 p-3 rounded-lg border border-slate-700">
      {chat.length === 0 && (
        <p className="text-slate-400 text-sm">No messages yet. Ask something!</p>
      )}

      {chat.map((msg, i) => (
        <div key={i} className={msg.role === 'user' ? "text-right" : "text-left"}>
          <div
            className={`inline-block px-3 py-2 rounded-lg max-w-[80%] whitespace-pre-line ${
              msg.role === 'user'
                ? "bg-indigo-600 text-white"
                : "bg-slate-800 text-slate-100"
            }`}
          >
            {msg.role === 'assistant' && msg.style === 'bullet'
              ? (
                <ul className="list-disc pl-5 space-y-1 text-left">
                  {msg.content.split("\n").map((line, idx) => (
                    line.trim() && <li key={idx}>{line.replace(/^•\s*/, "")}</li>
                  ))}
                </ul>
              )
              : msg.content}
          </div>

          {/* Sources */}
          {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
            <div className="mt-1 text-xs text-slate-400">
              Sources: {msg.sources.map((s, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-slate-700 px-2 py-0.5 rounded mr-1 cursor-help hover:bg-slate-600"
                  title={s.preview}
                >
                  {s.section}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
