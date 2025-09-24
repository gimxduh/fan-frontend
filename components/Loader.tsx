'use client'
export default function Loader({size=6}:{size?:number}){
  const s = `${size * 4}px`
  return (
    <div className="flex justify-center my-4">
      <div className="animate-spin rounded-full border-4 border-t-transparent"
        style={{width: s, height: s, borderColor: '#94a3b8', borderTopColor: 'white'}} />
    </div>
  )
}
