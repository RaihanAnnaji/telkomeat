"use client"

import Image from "next/image"
import { Edit2, Trash2, Eye, EyeOff } from "lucide-react"
import { MenuItemCardProps } from "./types"

export default function MenuItemCard({ item, onEdit, onDelete }: MenuItemCardProps) {
  const isAvailable = item.available ?? true
  
  const handleToggleStatus = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:8000/api/products/${item.id}/status`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          available: !isAvailable
        })
      })

      if (response.ok) {
        window.location.reload()
      } else {
        const error = await response.json()
        console.error("Gagal mengubah status:", error)
        alert(`Gagal mengubah status: ${error.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Terjadi kesalahan koneksi")
    }
  }

  return (
    <div className={`bg-white rounded-xl shadow overflow-hidden transition-all ${!isAvailable ? 'opacity-70 bg-gray-50' : ''}`}>
      {/* Gambar */}
      <div className="relative h-40 sm:h-48 bg-gray-100">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        {/* Status Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
          isAvailable 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {isAvailable ? 'Aktif' : 'Nonaktif'}
        </div>
      </div>

      {/* Konten */}
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-foreground text-sm sm:text-lg line-clamp-1">{item.name}</h3>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs capitalize">
            {item.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex justify-between items-center">
          <p className="text-base sm:text-lg font-bold text-primary">
            Rp {item.price.toLocaleString("id-ID")}
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-1">
            {/* Toggle Status Button */}
            <button
              onClick={handleToggleStatus}
              className={`p-1.5 sm:p-2 rounded-lg transition ${
                isAvailable 
                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                  : 'bg-green-100 text-green-600 hover:bg-green-200'
              }`}
              title={isAvailable ? 'Nonaktifkan' : 'Aktifkan'}
            >
              {isAvailable ? <EyeOff size={14} className="sm:size-4" /> : <Eye size={14} className="sm:size-4" />}
            </button>
            
            {/* Edit Button */}
            <button
              onClick={() => onEdit(item)}
              className="p-1.5 sm:p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
              title="Edit"
            >
              <Edit2 size={14} className="sm:size-4" />
            </button>
            
            {/* Delete Button */}
            <button
              onClick={() => onDelete(item.id)}
              className="p-1.5 sm:p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
              title="Hapus"
            >
              <Trash2 size={14} className="sm:size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}