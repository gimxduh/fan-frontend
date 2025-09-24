//Tabs.tsx
export default function Tabs({ tab, setTab }) {
  return (
    <div className="mt-6 flex justify-center gap-3">
      <button
        onClick={() => setTab('arai')}
        className={`px-4 py-2 rounded-lg ${tab === 'arai' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
      >
        Arai
      </button>
      <button
        onClick={() => setTab('oai')}
        className={`px-4 py-2 rounded-lg ${tab === 'oai' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
      >
        Oai
      </button>
      <button
        onClick={() => setTab('jai')}
        className={`px-4 py-2 rounded-lg ${tab === 'jai' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
      >
        Jai
      </button>
      <button
        onClick={() => setTab('kai')}
        className={`px-4 py-2 rounded-lg ${tab === 'kai' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
      >
        Kai
      </button>
      <button
        onClick={() => setTab('about')}
        className={`px-4 py-2 rounded-lg ${tab === 'about' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
      >
        About
      </button>
    </div>
  )
}
