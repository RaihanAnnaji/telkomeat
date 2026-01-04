"use client"

import { AlertTriangle, Power, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"
import { CanteenStatusCardProps } from "./types"

export default function CanteenStatusCard({ 
  kantinId, 
  kantinName, 
  isActive, 
  onStatusChange 
}: CanteenStatusCardProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleToggleStatus = async () => {
    const newStatus = !isActive
    const confirmMessage = newStatus 
      ? `Aktifkan kantin ${kantinName}?` 
      : `Nonaktifkan kantin ${kantinName}?\n\nKantin yang nonaktif tidak akan muncul di aplikasi user.`

    if (!confirm(confirmMessage)) return

    try {
      setLoading(true)
      setError(null)
      await onStatusChange(kantinId, newStatus)
    } catch (err: any) {
      setError(err.message || "Gagal mengubah status kantin")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800">{kantinName}</h2>
            <p className="text-gray-600 text-sm">ID: {kantinId}</p>
          </div>
          <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-sm sm:text-base ${
            isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isActive ? 'Aktif' : 'Nonaktif'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Status Info */}
        <div className={`p-3 sm:p-4 rounded-lg ${
          isActive 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start gap-2 sm:gap-3">
            {isActive ? (
              <CheckCircle className="text-green-600 w-4 h-4 sm:w-5 sm:h-5 mt-0.5" />
            ) : (
              <XCircle className="text-red-600 w-4 h-4 sm:w-5 sm:h-5 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-medium text-sm sm:text-base">
                {isActive 
                  ? 'Kantin saat ini AKTIF' 
                  : 'Kantin saat ini NONAKTIF'
                }
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {isActive
                  ? 'Kantin ini muncul di aplikasi dan dapat menerima pesanan.'
                  : 'Kantin ini TIDAK muncul di aplikasi dan tidak dapat menerima pesanan.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Warning for deactivation */}
        {isActive && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertTriangle className="text-yellow-600 w-4 h-4 sm:w-5 sm:h-5 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-yellow-800 text-sm sm:text-base">Perhatian!</p>
                <ul className="text-xs sm:text-sm text-yellow-700 mt-1 space-y-0.5 sm:space-y-1">
                  <li>• Kantin tidak akan muncul di aplikasi user</li>
                  <li>• Tidak dapat menerima pesanan baru</li>
                  <li>• Pesanan yang sedang berjalan tetap diproses</li>
                  <li>• Dapat diaktifkan kembali kapan saja</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleToggleStatus}
          disabled={loading}
          className={`w-full py-2.5 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-1.5 sm:gap-2 transition text-sm sm:text-base ${
            isActive
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
              Memproses...
            </>
          ) : (
            <>
              <Power size={16} className="sm:size-5" />
              {isActive ? 'Nonaktifkan Kantin' : 'Aktifkan Kantin'}
            </>
          )}
        </button>

        {/* Status History */}
        <div className="pt-3 sm:pt-4 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600">
            Terakhir diubah: {new Date().toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  )
}