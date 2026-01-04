"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import OrderHistoryNavbar from "./components/OrderHistoryNavbar"
import OrderList from "./components/OrderList"
import EmptyState from "./components/EmptyState"
import { Order } from "./components/types"

// Interface untuk response API
interface OrdersResponse {
  success: boolean
  message: string
  orders: Order[]
}

export default function OrderHistoryPage() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUserOrders()
  }, [])

  const fetchUserOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      const response = await fetch("https://api.telkomeat.my.id/api/user/orders", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })

      // Type assertion untuk response
      const data = await response.json() as OrdersResponse

      if (response.ok && data.success) {
        // Pastikan orders adalah array
        setOrders(Array.isArray(data.orders) ? data.orders : [])
      } else if (response.status === 401) {
        localStorage.removeItem("token")
        router.push("/login")
      } else {
        throw new Error(data.message || "Failed to fetch orders")
      }
    } catch (error: any) {
      console.error("Error fetching orders:", error)
      setError(error.message || "Gagal memuat riwayat pesanan")
    } finally {
      setLoading(false)
    }
  }

  const handleNavigateToHome = () => {
    router.push("/home")
  }

  const handleRetry = () => {
    fetchUserOrders()
  }

  if (loading) {
    return (
      <main className="bg-secondary min-h-screen flex flex-col">
        <OrderHistoryNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} activePage="order-history"/>
        
        <div className="flex-1 px-4 sm:px-6 lg:px-12 py-8 max-w-5xl mx-auto w-full">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat riwayat pesanan...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="bg-secondary min-h-screen flex flex-col">
        <OrderHistoryNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} activePage="order-history"/>
        
        <div className="flex-1 px-4 sm:px-6 lg:px-12 py-8 max-w-5xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Riwayat Pesanan</h1>
          </div>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Coba Lagi
            </button>
            <button
              onClick={handleNavigateToHome}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Kembali ke Home
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-secondary min-h-screen flex flex-col">
      <OrderHistoryNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} activePage="order-history"/>
      
      <div className="flex-1 px-4 sm:px-6 lg:px-12 py-8 max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Riwayat Pesanan</h1>
          <p className="text-gray-600">
            {orders.length} pesanan ditemukan
          </p>
        </div>

        {orders.length === 0 ? (
          <EmptyState onNavigateToHome={handleNavigateToHome} />
        ) : (
          <OrderList orders={orders} />
        )}
      </div>
    </main>
  )
}