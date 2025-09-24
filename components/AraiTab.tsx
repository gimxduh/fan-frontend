// AraiTab.tsx
'use client'
import { useState } from 'react'
import { Trash2, Send, Mic, Volume2 } from 'lucide-react'
import { API_URL } from "../utils/api"

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  style?: 'bullet' | 'sentence'
  sources?: { section: string; preview: string }[]
}

export default function AraiTab() {
  const [question, setQuestion] = useState("")
  const [chat, setChat] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [style, setStyle] = useState<'bullet' | 'sentence'>('bullet')
  const [listening, setListening] = useState(false)

  // ----------- Voice Input (Speech-to-Text) -----------
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("❌ Your browser does not support speech recognition.")
      return
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setQuestion(transcript)
    }

    recognition.start()
  }

  // ----------- Text-to-Speech -----------
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert("❌ Your browser does not support text-to-speech.")
      return
    }
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    window.speechSynthesis.speak(utterance)
  }

  // ----------- Ask Arai -----------
  const handleAsk = async () => {
    if (!question.trim()) return
    const q = question
    setQuestion("")
    setLoading(true)

    setChat(prev => [...prev, { role: 'user', content: q }])

    try {
      const res = await fetch(`${API_URL}/ask_arai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, style }),
      })
      const data = await res.json()
      const ans = data.answer || ("⚠️ Error: " + data.error)

      setChat(prev => [...prev, {
        role: 'assistant',
        content: ans,
        style,
        sources: data.sources || []
      }])
    } catch (e: any) {
      setChat(prev => [...prev, {
        role: 'assistant',
        content: "⚠️ Error: " + e.message
      }])
    }
    setLoading(false)
  }

  const handleClear = () => {
    setChat([])
    setQuestion("")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-bold">Arai (Onboarding Assistant)</h2>
        <p className="text-sm opacity-80">Ask by typing or speaking, and listen to the answers</p>
      </div>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 bg-slate-900/70 p-3 rounded-lg border border-slate-700">
        {chat.length === 0 && (
          <p className="text-slate-400 text-sm">No messages yet. Try typing or speaking!</p>
        )}
        {chat.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? "text-right" : "text-left"}>
            <div className={`inline-block px-3 py-2 rounded-lg max-w-[80%] whitespace-pre-line ${
              msg.role === 'user'
                ? "bg-indigo-600 text-white"
                : "bg-slate-800 text-slate-100"
            }`}>
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

            {/* Speak button for assistant replies */}
            {msg.role === 'assistant' && (
              <button
                onClick={() => speakText(msg.content)}
                className="ml-2 text-indigo-400 hover:text-indigo-200"
                title="Speak this answer"
              >
                <Volume2 size={18} />
              </button>
            )}

            {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
              <div className="mt-1 text-xs text-slate-400">
                Sources: {msg.sources.map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-slate-700 px-2 py-0.5 rounded mr-1 cursor-help"
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

      {/* Input area */}
      <div className="flex gap-2 mb-2">
        <select
          value={style}
          onChange={e => setStyle(e.target.value as 'bullet' | 'sentence')}
          className="px-2 py-2 rounded bg-slate-800 border border-slate-600 text-white"
        >
          <option value="bullet">Bullet</option>
          <option value="sentence">Sentence</option>
        </select>
        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleAsk()
            }
          }}
          className="flex-1 p-3 rounded bg-slate-800 border border-slate-600 text-white resize-none h-14"
          placeholder="Ask a question... (Enter to send, Shift+Enter for new line)"
        />
        <button
          onClick={handleVoiceInput}
          className={`px-4 ${listening ? "bg-red-600" : "bg-slate-700"} text-white rounded-lg flex items-center justify-center`}
          title="Speak your question"
        >
          <Mic size={18} />
        </button>
        <button
          onClick={handleAsk}
          disabled={loading}
          className="px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg flex items-center justify-center"
        >
          {loading ? "..." : <Send size={18} />}
        </button>
        <button
          onClick={handleClear}
          className="px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
