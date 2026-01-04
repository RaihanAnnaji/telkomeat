"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PartnerNavbar from "./components/PartnerNavbar"
import Sidebar from "./components/Sidebar"
import DashboardHeader from "./components/DashboardHeader"
import MetricsGrid from "./components/MetricsGrid"
import SalesChart from "./components/SalesChart"
import RecentOrders from "./components/RecentOrders"
import type { SalesData, Order } from "./components/types"

export default function PartnerDashboard() {
  const router = useRouter()
  const [canteenName, setCanteenName] = useState<string>("")
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const kantinId = localStorage.getItem("kantin_id")

    // Redirect kalau tidak login
    if (!token) {
      router.push("/login")
      return
    }

    // Redirect kalau role bukan admin
    if (role !== "admin") {
      router.push("/home")
      return
    }

    // ===============================
    // FETCH DASHBOARD + RECENT ORDERS
    // ===============================
    const fetchDashboard = async () => {
      try {
        const [dashboardRes, ordersRes] = await Promise.all([
          fetch(`http://localhost:8000/api/dashboard/${kantinId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }),
          fetch(`http://localhost:8000/api/dashboard/${kantinId}/recent-orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }),
        ])

        const dashboardData = await dashboardRes.json()
        const ordersData = await ordersRes.json()

        setCanteenName(dashboardData.canteen_name || "Kantin Tidak Dikenal")
        setSalesData(dashboardData.sales || [])

        // ✅ BAGIAN YANG DITAMBAHKAN (konversi amount + terjemahan status)
        setRecentOrders(
          (ordersData.recent_orders || []).map((o: any) => ({
            ...o,
            amount: Number(o.amount), // ubah string ke number
            status:
              o.status === "Pending"
                ? "Menunggu"
                : o.status === "Confirmed"
                ? "Selesai"
                : o.status === "Cancelled"
                ? "Dibatalkan"
                : o.status,
          }))
        )
      } catch (err) {
        console.error("Error fetching dashboard:", err)
        setError("Gagal memuat data dashboard.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [router])

  const totalOrders = salesData.reduce((sum, d) => sum + (Number(d.orders) || 0), 0)
  const totalRevenue = salesData.reduce((sum, d) => sum + (Number(d.revenue) || 0), 0)
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : "0.00"  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-700">
        Memuat dashboard...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    )
  }

  return (
    <main className="bg-secondary min-h-screen flex flex-col">
      <PartnerNavbar
        canteenName={canteenName}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <div className="flex flex-1">
        {/* Sidebar hanya muncul di desktop */}
        <Sidebar activePage="dashboard" />

        <div className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-12 w-full">
          <DashboardHeader canteenName={canteenName} />
          <MetricsGrid
            totalOrders={totalOrders}
            totalRevenue={totalRevenue}
            avgOrderValue={avgOrderValue}
            completionRate="98%"
          />
          <SalesChart salesData={salesData} />
          <RecentOrders orders={recentOrders} />
        </div>
      </div>
    </main>
  )
}