"use client"

import { useState, useEffect } from "react"
import PartnerNavbar from "./components/PartnerNavbar"
import Sidebar from "./components/Sidebar"
import OrdersHeader from "./components/OrdersHeader"
import OrdersTable from "./components/OrdersTable"
import OrderDetailModal from "./components/OrderDetailModal"
import { Order } from "./components/types"

export default function PartnerOrders() {
  const [canteenName, setCanteenName] = useState<string>("")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token")
      const kantinId = localStorage.getItem("kantin_id")

      try {
        // Fetch canteen name
        const canteenRes = await fetch(`https://api.telkomeat.my.id/api/canteen/${kantinId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        
        const canteenData = await canteenRes.json()
        setCanteenName(canteenData.name || "Kantin")

        // Fetch orders
        const ordersRes = await fetch(`https://api.telkomeat.my.id/api/dashboard/${kantinId}/recent-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        
        const data = await ordersRes.json()

        if (data.recent_orders && Array.isArray(data.recent_orders)) {
          const mappedOrders = data.recent_orders.map((o: any) => {
            let status = "pending"
            if (typeof o.status === 'string') {
              const statusLower = o.status.toLowerCase()
              if (statusLower.includes('pending') || statusLower === 'pending') {
                status = "pending"
              } else if (statusLower.includes('confirm') || statusLower === 'confirmed') {
                status = "confirmed"
              } else if (statusLower.includes('cancel') || statusLower === 'cancelled') {
                status = "cancelled"
              } else if (statusLower.includes('complete') || statusLower === 'completed') {
                status = "completed"
              }
            }
            
            return {
              id: String(o.id),
              customer: o.customer || "Pelanggan",
              items: Array.isArray(o.items) ? o.items.map((item: any) => ({
                name: item.name || "Produk",
                quantity: item.quantity || 1,
                price: item.price || 0
              })) : [],
              total: typeof o.amount === 'string' ? 
                parseFloat(o.amount.replace(/[^\d.-]/g, '')) : 
                Number(o.amount || 0),
              status: status,
              timestamp: o.timestamp || new Date().toISOString(),
              notes: o.delivery_notes || o.notes || null,
              paymentProof: o.payment_proof || null
            }
          })
          
          setOrders(mappedOrders)
        } else {
          console.warn("Tidak ada data recent_orders atau format salah:", data)
          setOrders([])
        }
      } catch (err: any) {
        console.error("Gagal mengambil pesanan:", err)
        alert(`Error: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowDetail(true)
  }

  const handleCloseDetail = () => {
    setShowDetail(false)
    setSelectedOrder(null)
  }

  const handleConfirmOrder = async (orderId: string) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`https://api.telkomeat.my.id/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "confirmed" }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      alert(`Pesanan ${orderId} dikonfirmasi!`)
      
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: "confirmed" } : order
      ))
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: "confirmed" })
      }
      
      setShowDetail(false)
    } catch (err) {
      console.error(err)
      alert("Gagal konfirmasi pesanan.")
    }
  }

  const handleCancelOrder = async (orderId: string) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`https://api.telkomeat.my.id/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "cancelled" }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      alert(`Pesanan ${orderId} dibatalkan!`)
      
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      ))
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: "cancelled" })
      }
      
      setShowDetail(false)
    } catch (err) {
      console.error(err)
      alert("Gagal membatalkan pesanan.")
    }
  }

  return (
    <main className="bg-secondary min-h-screen flex flex-col">
      <PartnerNavbar 
        canteenName={canteenName} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
      />

      <div className="flex flex-1">
        <Sidebar activePage="orders" />

        <div className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-12 w-full">
          <OrdersHeader
            title="Manajemen Pesanan"
            description="Lihat dan kelola pesanan yang masuk"
          />

          {loading ? (
            <div className="flex justify-center items-center h-48 sm:h-64">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
              <span className="ml-3 text-gray-600 text-sm sm:text-base">Memuat pesanan...</span>
            </div>
          ) : (
            <>
              <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                Menampilkan {orders.length} pesanan
              </div>
              <OrdersTable
                orders={orders}
                onViewOrder={handleViewOrder}
              />
            </>
          )}

          {orders.length === 0 && !loading && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="text-gray-400 mb-3 text-3xl">📭</div>
              <p className="text-gray-600 font-medium">Belum ada pesanan</p>
              <p className="text-gray-500 text-sm mt-1">Semua pesanan akan muncul di sini</p>
            </div>
          )}

          <OrderDetailModal
            order={selectedOrder}
            isOpen={showDetail}
            onClose={handleCloseDetail}
            onConfirmOrder={handleConfirmOrder}
            onCancelOrder={handleCancelOrder}
          />
        </div>
      </div>
    </main>
  )
}