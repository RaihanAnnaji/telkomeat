"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { OperatingHoursFormProps } from "./types"

export default function OperatingHoursForm({ 
  initialData = { 
    weekdays: { open: "08:00", close: "17:00" },
    weekends: { open: "09:00", close: "16:00" }
  },
  onSubmit 
}: OperatingHoursFormProps) {
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    alert("Jam operasional berhasil disimpan!")
  }

  const handleTimeChange = (dayType: 'weekdays' | 'weekends', field: 'open' | 'close', value: string) => {
    setFormData(prev => ({
      ...prev,
      [dayType]: {
        ...prev[dayType],
        [field]: value
      }
    }))
  }

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow">
      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">Jam Operasional</h2>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1 sm:mb-2">Senin - Jumat</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="time"
              value={formData.weekdays.open}
              onChange={(e) => handleTimeChange('weekdays', 'open', e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="flex items-center justify-center px-2 text-gray-500 text-sm">hingga</span>
            <input
              type="time"
              value={formData.weekdays.close}
              onChange={(e) => handleTimeChange('weekdays', 'close', e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1 sm:mb-2">Sabtu - Minggu</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="time"
              value={formData.weekends.open}
              onChange={(e) => handleTimeChange('weekends', 'open', e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="flex items-center justify-center px-2 text-gray-500 text-sm">hingga</span>
            <input
              type="time"
              value={formData.weekends.close}
              onChange={(e) => handleTimeChange('weekends', 'close', e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
        >
          <Save size={16} className="sm:size-5" />
          Simpan Jam Operasional
        </button>
      </form>
    </div>
  )
}