"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Plus, Minus, X, Edit2 } from "lucide-react"
import { MenuItem } from "./types"

interface MenuDetailModalProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (item: MenuItem, quantity: number, notes?: string) => void
  initialQuantity?: number
}

export default function MenuDetailModal({
  item,
  isOpen,
  onClose,
  onAddToCart,
  initialQuantity = 0
}: MenuDetailModalProps) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [notes, setNotes] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const notesTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Reset state saat modal dibuka dengan item baru
  useEffect(() => {
    if (isOpen && item) {
      setQuantity(initialQuantity)
      setNotes("")
      setIsAdding(false)
    }
  }, [isOpen, item, initialQuantity])

  // Auto focus notes textarea jika modal terbuka
  useEffect(() => {
    if (isOpen && notesTextareaRef.current) {
      notesTextareaRef.current.focus()
    }
  }, [isOpen])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !item) return null

  const handleAddToCart = () => {
    if (quantity === 0) return
    
    setIsAdding(true)
    onAddToCart(item, quantity, notes.trim())
    
    setTimeout(() => {
      setQuantity(0)
      setNotes("")
      setIsAdding(false)
      onClose()
    }, 300)
  }

  const handleIncrease = () => setQuantity(prev => prev + 1)
  const handleDecrease = () => setQuantity(prev => Math.max(0, prev - 1))

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 200) {
      setNotes(e.target.value)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4 md:p-6">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] md:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header dengan gambar */}
        <div className="relative h-48 sm:h-56 md:h-64 bg-gray-200 flex-shrink-0">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition backdrop-blur-sm"
            aria-label="Tutup"
          >
            <X size={20} className="sm:size-6" />
          </button>
        </div>

        {/* Konten yang bisa discroll */}
        <div 
          ref={modalContentRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4">{item.description}</p>
          
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl sm:text-3xl font-bold text-primary">
              Rp {item.price.toLocaleString("id-ID")}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
              {item.category}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Jumlah Pesanan
            </label>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
              <button
                onClick={handleDecrease}
                disabled={quantity === 0}
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Kurangi jumlah"
              >
                <Minus size={20} />
              </button>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{quantity}</div>
                <div className="text-sm text-gray-500 mt-1">Porsi</div>
              </div>
              
              <button
                onClick={handleIncrease}
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 transition"
                aria-label="Tambah jumlah"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Notes Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <div className="flex items-center gap-2">
                <Edit2 size={16} />
                Catatan Khusus (Opsional)
              </div>
            </label>
            <textarea
              ref={notesTextareaRef}
              value={notes}
              onChange={handleNotesChange}
              placeholder="Contoh: Pedas, tanpa bawang, tambah sayur, pakai saus, dll."
              className="w-full border border-gray-300 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={3}
              maxLength={200}
            />
            <div className="flex justify-between items-center mt-1">
              <div className="text-xs text-gray-500">
                {notes.length}/200 karakter
              </div>
              {notes.length > 0 && (
                <button
                  onClick={() => setNotes("")}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Hapus catatan
                </button>
              )}
            </div>
          </div>

          {/* Total Harga Preview */}
          {quantity > 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Subtotal untuk {quantity} porsi</p>
                  <p className="text-lg font-bold text-primary">
                    Rp {(item.price * quantity).toLocaleString("id-ID")}
                  </p>
                </div>
                {notes && (
                  <div className="text-left max-w-[150px]">
                    <p className="text-xs text-gray-600 mb-1">Catatan:</p>
                    <p className="text-xs text-gray-800 line-clamp-2">{notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer dengan tombol  */}
        <div className="border-t border-gray-200 p-4 sm:p-6 flex-shrink-0 bg-white">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition text-sm sm:text-base"
            >
              Batal
            </button>
            <button
              onClick={handleAddToCart}
              disabled={quantity === 0 || isAdding}
              className="flex-1 bg-primary text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {isAdding ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Menambahkan...
                </>
              ) : quantity > 0 ? (
                <>
                  <Plus size={20} />
                  Tambah ({quantity})
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Pilih Jumlah
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}