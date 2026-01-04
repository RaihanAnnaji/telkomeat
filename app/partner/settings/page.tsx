"use client"

import { useState, useEffect } from "react"
import PartnerNavbar from "./components/PartnerNavbar"
import Sidebar from "./components/Sidebar"
import SettingsHeader from "./components/SettingsHeader"
import CanteenStatusCard from "./components/CanteenStatusCard"
import CanteenInfoForm from "./components/CanteenInfoForm"
import OperatingHoursForm from "./components/OperatingHoursForm"

interface KantinData {
  id: number
  nama: string
  alamat: string
  telepon: string
  is_active?: boolean
  status?: string
  created_at?: string
  updated_at?: string
}

export default function PartnerSettings() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [kantinData, setKantinData] = useState<KantinData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [canteenName, setCanteenName] = useState<string>("")

  // Fetch kantin data
  useEffect(() => {
    fetchKantinData()
  }, [])

  const fetchKantinData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const token = localStorage.getItem("token")
      if (!token) {
        window.location.href = "/login"
        return
      }

      const response = await fetch("https://api.telkomeat.my.id/api/kantin/my-kantin", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })

      if (response.ok) {
        const data = await response.json()
        setKantinData(data)
        setCanteenName(data.nama || "Kantin")
      } else if (response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
      } else {
        throw new Error("Gagal mengambil data kantin")
      }
    } catch (err: any) {
      console.error("Error fetching kantin data:", err)
      setError(err.message || "Gagal memuat data kantin")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (kantinId: number, newStatus: boolean) => {
    try {
      const token = localStorage.getItem("token")
      
      const response = await fetch(`https://api.telkomeat.my.id/api/kantin/${kantinId}/status`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          is_active: newStatus
        })
      })

      if (response.ok) {
        setKantinData(prev => prev ? { ...prev, is_active: newStatus } : null)
        alert(`Status kantin berhasil diubah menjadi ${newStatus ? 'AKTIF' : 'NONAKTIF'}`)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Gagal mengubah status kantin")
      }
    } catch (err: any) {
      console.error("Error updating kantin status:", err)
      throw err
    }
  }

  const handleSaveInfo = (data: any) => {
    // Handle save info logic here
    console.log("Saving info:", data)
  }

  const handleSaveHours = (data: any) => {
    // Handle save hours logic here
    console.log("Saving hours:", data)
  }

  if (loading) {
    return (
      <main className="bg-secondary min-h-screen flex flex-col">
        <PartnerNavbar canteenName="Memuat..." menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="flex flex-1">
          <Sidebar activePage="settings" />
          <div className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-12 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary mx-auto mb-3 sm:mb-4"></div>
              <p className="text-gray-600 text-sm sm:text-base">Memuat data kantin...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !kantinData) {
    return (
      <main className="bg-secondary min-h-screen flex flex-col">
        <PartnerNavbar canteenName={canteenName} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="flex flex-1">
          <Sidebar activePage="settings" />
          <div className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-12">
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm">
              {error || "Data kantin tidak ditemukan"}
            </div>
            <button
              onClick={fetchKantinData}
              className="mt-3 sm:mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 text-sm sm:text-base"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-secondary min-h-screen flex flex-col">
      <PartnerNavbar canteenName={canteenName} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      
      <div className="flex flex-1">
        <Sidebar activePage="settings" />
        
        <div className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-12 max-w-4xl mx-auto w-full">
          <SettingsHeader 
            title="Pengaturan Kantin" 
            description="Kelola status dan informasi kantin Anda" 
          />
          
          {/* Canteen Status Card */}
          <div className="mb-6 sm:mb-8">
            <CanteenStatusCard
              kantinId={kantinData.id}
              kantinName={kantinData.nama}
              isActive={kantinData.is_active ?? true}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Forms Grid */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <CanteenInfoForm 
              initialData={{
                name: kantinData.nama,
                location: kantinData.alamat,
                phone: kantinData.telepon || ""
              }}
              onSubmit={handleSaveInfo}
            />
            <OperatingHoursForm onSubmit={handleSaveHours} />
          </div>

          {/* Kantin Information (Read Only) */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-gray-800">Detail Informasi Kantin</h3>
            
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Nama Kantin</p>
                <p className="font-medium text-sm sm:text-base">{kantinData.nama}</p>
              </div>
              
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Telepon</p>
                <p className="font-medium text-sm sm:text-base">{kantinData.telepon || "-"}</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Alamat</p>
                <p className="font-medium text-sm sm:text-base">{kantinData.alamat}</p>
              </div>
              
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">ID Kantin</p>
                <p className="font-medium text-sm sm:text-base">{kantinData.id}</p>
              </div>
              
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Bergabung Sejak</p>
                <p className="font-medium text-sm sm:text-base">
                  {new Date(kantinData.created_at || new Date()).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs sm:text-sm text-blue-700">
              <span className="font-medium">Catatan:</span> Status kantin mempengaruhi visibilitas di aplikasi user.
              Kantin yang nonaktif tidak akan muncul dalam daftar kantin yang tersedia.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}