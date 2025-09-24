'use client'
import { useState } from 'react'
import ChatBubble from './ChatBubble'
import { Send } from 'lucide-react'

export default function Chat(){
  const [messages,setMessages] = useState<{from:'ai'|'user',text:string}[]>([
    {from:'ai', text:'Hello 👋 I am FAN, your onboarding assistant. Ask me anything!'}
  ])
  const [input,setInput] = useState('')

  const send=()=>{
    if(!input.trim()) return
    setMessages([...messages,{from:'user',text:input}])
    setTimeout(()=>{
      setMessages(m=>[...m,{from:'ai',text:`You said: ${input}`}])
    },600)
    setInput('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      <header className="p-4 border-b border-slate-700 flex items-center gap-3">
        <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">F</div>
        <h1 className="font-bold text-lg">FAN Chat</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m,i)=><ChatBubble key={i} from={m.from} text={m.text}/>)}
      </div>
      <div className="p-4 border-t border-slate-700 flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your message..."
          className="flex-1 rounded-lg bg-slate-800 px-4 py-2 focus:outline-none"/>
        <button onClick={send} className="px-4 py-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white hover:opacity-90">
          <Send size={18}/>
        </button>
      </div>
    </div>
  )
}
