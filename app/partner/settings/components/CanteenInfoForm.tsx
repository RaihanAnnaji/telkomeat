"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { CanteenInfoFormProps } from "./types"

export default function CanteenInfoForm({ 
  initialData = { name: "Kantin Kaf", location: "Gedung DC", phone: "+62-XXXX-XXXX-XXXX" },
  onSubmit 
}: CanteenInfoFormProps) {
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    alert("Informasi kantin berhasil disimpan!")
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow">
      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">Informasi Kantin</h2>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1 sm:mb-2">Nama Kantin</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1 sm:mb-2">Lokasi</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1 sm:mb-2">Nomor Telepon</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
        >
          <Save size={16} className="sm:size-5" />
          Simpan Perubahan
        </button>
      </form>
    </div>
  )
}