'use client'
export default function Toast({message, type='info'}:{message:string, type?: 'info'|'error'|'success'}){
  const bg = type==='success' ? 'bg-green-600' : type==='error' ? 'bg-red-600' : 'bg-slate-700'
  return (
    <div className={`${bg} text-white px-4 py-2 rounded-md shadow-sm mb-4`}>
      {message}
    </div>
  )
}
