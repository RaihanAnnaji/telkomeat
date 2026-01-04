"use client"

import { useState, useEffect } from "react"
import ProfileNavbar from "@/app/profile/ProfileNavbar"
import { User, Edit2, Save, X, Mail, Calendar } from "lucide-react"

interface UserData {
  id: number
  name: string
  email: string
  role: string
  created_at: string
  kantin?: {
    id: number
    nama: string
  }
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        window.location.href = "/login"
        return
      }

      const response = await fetch("https://api.telkomeat.my.id/api/profile", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setEditName(data.user.name)
      } else if (response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
      } else {
        throw new Error("Failed to fetch profile")
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      setError("Gagal mengambil data pengguna")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setError("")
      setSuccessMessage("")
      const token = localStorage.getItem("token")
      
      if (!editName.trim()) {
        setError("Nama tidak boleh kosong")
        return
      }
      
      const response = await fetch("https://api.telkomeat.my.id/api/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ name: editName })
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        setIsEditing(false)
        setSuccessMessage("Nama berhasil diperbarui!")
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        setError(data.message || "Gagal memperbarui nama")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      setError("Terjadi kesalahan saat menyimpan")
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (user) {
      setEditName(user.name)
    }
    setError("")
    setSuccessMessage("")
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        await fetch("https://api.telkomeat.my.id/api/logout", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        })
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary">
        <ProfileNavbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600 animate-pulse">Memuat data profile...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary">
        <ProfileNavbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-500 mb-4">Tidak dapat memuat data pengguna</div>
            <button 
              onClick={() => window.location.href = "/login"}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
            >
              Login Kembali
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-secondary">
      <ProfileNavbar activePage="profile" />
      
      <div className="px-4 sm:px-6 lg:px-12 py-8 max-w-4xl mx-auto">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg animate-fadeIn">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fadeIn">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Profile Pengguna</h1>
              <p className="text-gray-600">Kelola informasi akun Anda</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition hover:scale-105"
              >
                <Edit2 size={18} /> Edit Nama
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition hover:scale-105"
                >
                  <Save size={18} /> Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:opacity-90 transition hover:scale-105"
                >
                  <X size={18} /> Batal
                </button>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="space-y-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                <User size={48} className="text-primary" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm text-gray-500">User ID: <span className="font-medium">{user.id}</span></p>
                <p className="text-sm text-gray-500 capitalize">Role: <span className="font-medium">{user.role}</span></p>
                {user.kantin && (
                  <p className="text-sm text-gray-500">Kantin: <span className="font-medium">{user.kantin.nama}</span></p>
                )}
              </div>
            </div>

            {/* User Information Card */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700 mb-1">
                  <User size={18} />
                  <span className="font-medium">Nama Pengguna</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg bg-white"
                    placeholder="Masukkan nama Anda"
                    autoFocus
                  />
                ) : (
                  <div className="text-2xl font-bold text-gray-800 px-2">{user.name}</div>
                )}
              </div>

              {/* Email Field (Read Only) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700 mb-1">
                  <Mail size={18} />
                  <span className="font-medium">Email</span>
                </div>
                <div className="text-lg text-gray-600 px-2">{user.email}</div>
              </div>

              {/* Join Date (Read Only) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700 mb-1">
                  <Calendar size={18} />
                  <span className="font-medium">Bergabung Sejak</span>
                </div>
                <div className="text-lg text-gray-600 px-2">
                  {new Date(user.created_at).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:opacity-90 transition hover:scale-105 font-medium"
          >
            Kembali
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition hover:scale-105 font-medium flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M9 8a1 1 0 00-1 1v2a1 1 0 102 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Add some custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </main>
  )
}