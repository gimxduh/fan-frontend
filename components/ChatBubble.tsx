'use client'
export default function ChatBubble({from,text}:{from:'ai'|'user',text:string}){
  const isUser = from==='user'
  return (
    <div className={`flex ${isUser?'justify-end':'justify-start'}`}>
      <div className={`max-w-xs px-4 py-2 rounded-2xl shadow ${isUser?'bg-indigo-600 text-white rounded-br-none':'bg-slate-700 text-slate-100 rounded-bl-none'}`}>
        {text}
      </div>
    </div>
  )
}
