"use client"

import { ImageIcon, CheckCircle, XCircle, Eye, Download, X } from "lucide-react"
import { OrderDetailModalProps } from "./types"
import { useState } from "react"

export default function OrderDetailModal({
  order,
  isOpen,
  onClose,
  onConfirmOrder,
  onCancelOrder
}: OrderDetailModalProps) {
  const [imgError, setImgError] = useState(false)

  if (!isOpen || !order) return null

  const handleViewProof = () => {
    if (order.paymentProof) {
      window.open(order.paymentProof, '_blank')
    }
  }

  const handleDownloadProof = () => {
    if (order.paymentProof) {
      const link = document.createElement('a')
      link.href = order.paymentProof
      link.download = `bukti-bayar-${order.id}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu Konfirmasi'
      case 'confirmed': return 'Dikonfirmasi'
      case 'cancelled': return 'Dibatalkan'
      case 'completed': return 'Selesai'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return timestamp
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-foreground">
            Pesanan #{order.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl p-1"
          >
            <X size={20} className="sm:size-6" />
          </button>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Informasi Pelanggan */}
          <div>
            <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Informasi Pelanggan</h3>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-1 sm:space-y-2">
              <p className="text-xs sm:text-sm">
                <span className="font-medium">Nama:</span> {order.customer}
              </p>
              <p className="text-xs sm:text-sm">
                <span className="font-medium">Waktu:</span> {formatDate(order.timestamp)}
              </p>
              <p className="text-xs sm:text-sm">
                <span className="font-medium">Status:</span> 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </p>
            </div>
          </div>

          {/* Daftar Pesanan */}
          <div>
            <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Daftar Pesanan</h3>
            <div className="space-y-1 sm:space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <span className="text-xs sm:text-sm font-medium">{item.name}</span>
                    {item.price !== undefined && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        @ Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs sm:text-sm font-medium">x{item.quantity}</span>
                    {item.price !== undefined && (
                      <p className="text-xs sm:text-sm font-bold mt-0.5">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Catatan Pengantaran */}
          {order.notes && (
            <div>
              <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Catatan Pengantaran</h3>
              <div className="bg-blue-50 border border-blue-200 p-3 sm:p-4 rounded-lg text-xs sm:text-sm text-gray-700">
                {order.notes}
              </div>
            </div>
          )}

          {/* Bukti Pembayaran */}
          <div>
            <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Bukti Pembayaran</h3>
            {order.paymentProof ? (
              <div className="space-y-2 sm:space-y-3">
                <div className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <ImageIcon size={14} className="sm:size-5 text-primary" />
                      <span className="text-xs sm:text-sm font-medium">Bukti pembayaran tersedia</span>
                    </div>
                    <span className="text-xs text-gray-500 hidden sm:inline">Klik untuk melihat</span>
                  </div>
                  
                  {/* Thumbnail */}
                  <div 
                    className="cursor-pointer border border-gray-300 rounded overflow-hidden max-w-xs mx-auto"
                    onClick={handleViewProof}
                  >
                    {imgError ? (
                      <div className="w-full h-32 sm:h-40 bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500 text-xs sm:text-sm">Gambar tidak dapat dimuat</p>
                      </div>
                    ) : (
                      <img 
                        src={order.paymentProof} 
                        alt="Bukti Pembayaran" 
                        className="w-full h-32 sm:h-40 object-contain bg-white hover:opacity-90 transition"
                        onError={() => setImgError(true)}
                      />
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-3">
                    <button
                      onClick={handleViewProof}
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-primary text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm hover:opacity-90 transition"
                    >
                      <Eye size={12} className="sm:size-4" />
                      <span className="hidden sm:inline">Lihat Full</span>
                      <span className="sm:hidden">Lihat</span>
                    </button>
                    <button
                      onClick={handleDownloadProof}
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-gray-200 text-gray-700 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm hover:opacity-90 transition"
                    >
                      <Download size={12} className="sm:size-4" />
                      <span className="hidden sm:inline">Download</span>
                      <span className="sm:hidden">Unduh</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 sm:py-6 border border-dashed border-gray-300 rounded-lg">
                <ImageIcon size={24} className="mx-auto text-gray-400 mb-1 sm:mb-2" />
                <p className="text-gray-500 italic text-xs sm:text-sm">Belum ada bukti pembayaran</p>
                <p className="text-xs text-gray-400 mt-0.5">Customer belum mengunggah bukti</p>
              </div>
            )}
          </div>

          {/* Total Pembayaran */}
          <div className="border-t border-gray-200 pt-3 sm:pt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground text-sm sm:text-base">Total Pembayaran:</span>
              <span className="text-lg sm:text-xl font-bold text-primary">
                Rp {order.total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Tombol Aksi untuk Pesanan Pending */}
          {order.status === "pending" && (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
              <button 
                onClick={() => onConfirmOrder(order.id)}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
              >
                <CheckCircle size={14} className="sm:size-5" />
                Konfirmasi
              </button>
              <button 
                onClick={() => onCancelOrder(order.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
              >
                <XCircle size={14} className="sm:size-5" />
                Batalkan
              </button>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 sm:mt-6 border border-gray-300 text-foreground py-2 rounded-lg font-medium hover:bg-gray-50 transition text-sm sm:text-base"
        >
          Tutup
        </button>
      </div>
    </div>
  )
}