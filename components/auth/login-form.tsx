"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { TEatLogo } from "./logo"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("https://api.telkomeat.my.id/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || "Login gagal, periksa email dan password Anda.")
        return
      }

      // ================================
      // 🎉 LOGIN BERHASIL
      // ================================
      alert("Login berhasil 🎉")

      // ================================
      // 🔥 SIMPAN DATA LOGIN
      // ================================
      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.user.role)
      localStorage.setItem("kantin_id", data.user.kantin_id)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Simpan juga ke cookie (opsional untuk middleware)
      document.cookie = `token=${data.token}; path=/;`
      document.cookie = `role=${data.user.role}; path=/;`
      document.cookie = `kantin_id=${data.user.kantin_id}; path=/;`

      // ================================
      // 🔥 REDIRECT BERDASARKAN ROLE
      // ================================
      if (data.user.role === "admin") {
        router.push("/partner/dashboard")
      } else {
        router.push("/home")
      }

    } catch (error) {
      console.error(error)
      alert("Terjadi kesalahan server. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 space-y-6">
      <TEatLogo />

      <div>
        <h1 className="text-3xl font-bold text-center text-slate-900">Login</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan Email Anda"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 placeholder:text-gray-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold text-slate-900">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan Sandi Anda"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 placeholder:text-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Memproses..." : "Login"}
        </button>
      </form>

      <div className="text-center text-sm">
        <span className="text-slate-600">Belum punya akun? </span>
        <Link href="/register" className="font-semibold text-primary hover:text-primary/90">
          Daftar
        </Link>
      </div>
    </div>
  )
}
