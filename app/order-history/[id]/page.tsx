"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import OrderHistoryNavbar from "@/app/order-history/components/OrderHistoryNavbar"
import { ArrowLeft, Store, CreditCard, Calendar, Package, MessageSquare } from "lucide-react"

// Update interface
interface OrderDetail {
  id: string
  kantin_id: number
  kantin_nama: string
  total_price: number
  status: string
  payment_method: string
  delivery_notes?: string
  created_at: string
  updated_at: string
  items: Array<{
    id: string
    product_id: string
    name: string
    quantity: number
    price: number
    subtotal: number
  }>
}

interface ApiOrderResponse {
  success: boolean
  message: string
  order?: OrderDetail
}

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params?.id as string // Handle null
  
  const [menuOpen, setMenuOpen] = useState(false)
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!orderId) {
      setError("ID Pesanan tidak ditemukan")
      setLoading(false)
      return
    }
    fetchOrderDetail()
  }, [orderId])

  const fetchOrderDetail = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      const response = await fetch(`http://localhost:8000/api/user/orders/${orderId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })

      const data: ApiOrderResponse = await response.json()

      if (response.ok && data.success && data.order) {
        setOrder(data.order)
      } else if (response.status === 401) {
        localStorage.removeItem("token")
        router.push("/login")
      } else if (response.status === 403) {
        setError("Anda tidak memiliki akses ke pesanan ini")
      } else {
        throw new Error(data.message || "Gagal memuat detail pesanan")
      }
    } catch (error: any) {
      console.error("Error fetching order detail:", error)
      setError(error.message || "Gagal memuat detail pesanan")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai"
      case "confirmed":
        return "Dikonfirmasi"
      case "pending":
        return "Menunggu Konfirmasi"
      case "cancelled":
        return "Dibatalkan"
      default:
        return status
    }
  }

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "bank_transfer":
        return "Transfer Bank"
      case "qr_code":
        return "QR Code"
      default:
        return method
    }
  }

  if (loading) {
    return (
      <main className="bg-secondary min-h-screen">
        <OrderHistoryNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} activePage="order-history"/>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat detail pesanan...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="bg-secondary min-h-screen">
        <OrderHistoryNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} activePage="order-history"/>
        <div className="px-4 sm:px-6 lg:px-12 py-8 max-w-5xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error || "Pesanan tidak ditemukan"}
          </div>
          <button
            onClick={() => router.push("/order-history")}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            Kembali ke Riwayat
          </button>
        </div>
      </main>
    )
  }

  const orderDate = new Date(order.created_at)

  return (
    <main className="bg-secondary min-h-screen">
      <OrderHistoryNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} activePage="order-history"/>
      
      {/* ... semua UI tetap sama seperti yang kamu kirim ... */}
    </main>
  )
}
