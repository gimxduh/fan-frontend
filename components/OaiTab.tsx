// OaiTab.tsx
'use client'
import { useState } from 'react'
import { Upload, Play, ArrowLeftRight, Download, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export default function OaiTab() {
  const [preview, setPreview] = useState<any[] | null>(null)
  const [schedule, setSchedule] = useState<any | null>(null)
  const [original, setOriginal] = useState<any | null>(null)
  const [employees, setEmployees] = useState<string[]>([])
  const [shifts, setShifts] = useState<string[]>([])
  const [emp1, setEmp1] = useState<string>("")
  const [emp2, setEmp2] = useState<string>("")
  const [shiftSel, setShiftSel] = useState<string>("")

  // Upload CSV
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("http://localhost:8000/preview", {
      method: "POST",
      body: formData,
    })
    const data = await res.json()
    setPreview(data.preview)
    toast.success("CSV uploaded successfully!")
  }

  // Generate Schedule
  const handleGenerate = async () => {
    if (!preview) return
    const res = await fetch("http://localhost:8000/generate_schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ availability: preview }),
    })
    const data = await res.json()
    setSchedule(data.schedule)
    setOriginal(data.schedule)

    // set employees & shifts for dropdowns
    const cols = Object.keys(data.schedule)
    const rows = Object.keys(data.schedule[cols[0]])
    setEmployees(rows)
    setShifts(cols)
    setEmp1(rows[0])
    setEmp2(rows[1] || rows[0])
    setShiftSel(cols[0])

    toast.success("Schedule generated!")
  }

  // Reset schedule
  const handleReset = () => {
    if (original) {
      setSchedule(original)
      toast("Schedule reset", { icon: "🔄" })
    }
  }

  // Download CSV
  const handleDownload = () => {
    if (!schedule) return
    const rows = Object.keys(schedule[Object.keys(schedule)[0]])
    const cols = Object.keys(schedule)
    let csv = ["Employee", ...cols].join(",") + "\n"
    rows.forEach(r => {
      csv += [r, ...cols.map(c => schedule[c][r])].join(",") + "\n"
    })
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "schedule.csv"
    a.click()
    window.URL.revokeObjectURL(url)
    toast.success("Schedule downloaded!")
  }

  // Swap Shift
  const handleSwap = async () => {
    if (!schedule || !emp1 || !emp2 || !shiftSel) return
    const res = await fetch("http://localhost:8000/swap_shift", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        schedule, 
        emp1, 
        emp2, 
        shift: shiftSel, 
        availability: preview  // ✅ ส่ง preview กลับไปด้วย
      }),
    })
    const data = await res.json()
    if (data.success) {
      setSchedule(data.schedule)
      toast.success(`Swapped ${shiftSel} between ${emp1} and ${emp2}`)
    } else {
      toast.error(data.message || "Swap not allowed")
    }
  }


  // 🔧 helper: render preview/schedule as table
  const renderTable = (data: any) => {
    if (!data) return null

    // schedule = dict of columns -> rows
    if (!Array.isArray(data)) {
      const cols = Object.keys(data)
      const rows = Object.keys(data[cols[0]])
      return (
        <table className="min-w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="border px-3 py-2 bg-slate-800">Employee</th>
              {cols.map((col, i) => (
                <th key={i} className="border px-3 py-2 bg-slate-800">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, j) => (
              <tr key={j}>
                <td className="border px-3 py-2 font-semibold">{r}</td>
                {cols.map((c, i) => (
                  <td
                    key={i}
                    className={`border px-3 py-2 text-center ${
                      data[c][r] === 1 ? "bg-green-600 text-white font-bold" : ""
                    }`}
                  >
                    {data[c][r]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    }

    // preview = array of objects
    const cols = Object.keys(data[0])
    return (
      <table className="min-w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
        <thead>
          <tr>
            {cols.map((col, i) => (
              <th key={i} className="border px-3 py-2 bg-slate-800">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, j) => (
            <tr key={j}>
              {cols.map((c, i) => (
                <td key={i} className="border px-3 py-2 text-center">
                  {row[c] as any}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      {/* Header block */}
      <div className="p-4 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-white">🗓️ Oai – Scheduler</h2>
        <p className="text-slate-200 text-sm mt-1">
          Upload availability CSV, auto-generate fair schedules, and manage swaps.
        </p>
      </div>



      {/* Upload */}
      <div className="mb-6">
        <label className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg cursor-pointer hover:bg-slate-700 w-fit">
          <Upload size={16} /> Upload CSV
          <input type="file" accept=".csv" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {/* Preview */}
      {preview && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Preview Availability</h3>
          {renderTable(preview)}
          <button
            onClick={handleGenerate}
            className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center gap-2"
          >
            <Play size={16} /> Generate Schedule
          </button>
        </div>
      )}

      {/* Schedule */}
      {schedule && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Generated Schedule</h3>
          {renderTable(schedule)}

          {/* Swap Shift UI */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Swap Shifts</h4>
            <div className="flex flex-wrap gap-3 mb-3">
              <select value={emp1} onChange={e => setEmp1(e.target.value)} className="px-2 py-1 rounded bg-slate-800 border border-slate-600">
                {employees.map((e, i) => <option key={i} value={e}>{e}</option>)}
              </select>
              <select value={emp2} onChange={e => setEmp2(e.target.value)} className="px-2 py-1 rounded bg-slate-800 border border-slate-600">
                {employees.map((e, i) => <option key={i} value={e}>{e}</option>)}
              </select>
              <select value={shiftSel} onChange={e => setShiftSel(e.target.value)} className="px-2 py-1 rounded bg-slate-800 border border-slate-600">
                {shifts.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
              <button onClick={handleSwap} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center gap-2">
                <ArrowLeftRight size={16}/> Swap
              </button>
            </div>
          </div>

          {/* Control buttons */}
          <div className="mt-4 flex gap-3">
            <button onClick={handleDownload} className="px-4 py-2 bg-slate-700 rounded-lg text-white flex items-center gap-2">
              <Download size={16}/> Download CSV
            </button>
            <button onClick={handleReset} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2">
              <RefreshCw size={16}/> Reset
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
