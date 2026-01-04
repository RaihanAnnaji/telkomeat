"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { TEatLogo } from "@/components/auth/logo"
import { Mail, CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Gunakan optional chaining untuk menghindari error null
  const token = searchParams?.get("token") || null
  const email = searchParams?.get("email") || null

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading')
  const [message, setMessage] = useState("")
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Auto verify jika ada token
  useEffect(() => {
    if (token) {
      verifyEmail(token)
    } else {
      // Jika tidak ada token, langsung ke manual verification prompt
      setStatus('loading')
    }
  }, [token])

  // Countdown timer untuk resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const verifyEmail = async (verificationToken: string) => {
    try {
      const res = await fetch("http://localhost:8000/api/email/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token: verificationToken }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || "Email berhasil diverifikasi! Akun Anda sekarang aktif.")
        
        // Redirect ke login setelah 3 detik
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      } else {
        if (data.error === "Token expired") {
          setStatus('expired')
          setMessage("Link verifikasi telah kadaluarsa. Silakan minta link baru.")
        } else {
          setStatus('error')
          setMessage(data.message || "Verifikasi gagal. Token tidak valid.")
        }
      }
    } catch (error) {
      console.error(error)
      setStatus('error')
      setMessage("Terjadi kesalahan server. Silakan coba lagi.")
    }
  }

  const resendVerification = async () => {
    if (!email || isResending || countdown > 0) return

    setIsResending(true)
    try {
      const res = await fetch("http://localhost:8000/api/email/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        alert("Link verifikasi baru telah dikirim ke email Anda!")
        setCountdown(60) // 60 detik countdown
      } else {
        alert(data.message || "Gagal mengirim ulang link verifikasi.")
      }
    } catch (error) {
      console.error(error)
      alert("Terjadi kesalahan server. Silakan coba lagi.")
    } finally {
      setIsResending(false)
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500" />
      case 'error':
        return <XCircle className="w-16 h-16 text-red-500" />
      case 'expired':
        return <Clock className="w-16 h-16 text-yellow-500" />
      default:
        return <Mail className="w-16 h-16 text-primary" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return "text-green-600"
      case 'error':
        return "text-red-600"
      case 'expired':
        return "text-yellow-600"
      default:
        return "text-primary"
    }
  }

  // Tentukan apa yang ditampilkan berdasarkan status
  const showLoadingSpinner = status === 'loading' && token
  const showStatusMessage = status === 'success' || status === 'error' || status === 'expired'
  const showManualVerification = !token

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 space-y-6">
        <TEatLogo />

        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Verifikasi Email
          </h1>
          <p className="text-slate-600">
            {email ? `Email: ${email}` : "Konfirmasi alamat email Anda"}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          {/* Status Icon */}
          <div className="mb-2">
            {getStatusIcon()}
          </div>

          {/* Loading Animation */}
          {showLoadingSpinner && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-slate-600">Memverifikasi email Anda...</p>
            </div>
          )}

          {/* Status Message */}
          {showStatusMessage && (
            <div className="text-center">
              <h2 className={`text-xl font-semibold mb-2 ${getStatusColor()}`}>
                {status === 'success' ? 'Berhasil!' : 
                 status === 'expired' ? 'Link Kadaluarsa' : 'Gagal'}
              </h2>
              <p className="text-slate-700 mb-4">{message}</p>
              
              {status === 'success' && (
                <p className="text-sm text-slate-500">
                  Mengarahkan ke halaman login...
                </p>
              )}
            </div>
          )}

          {/* Manual Verification Prompt */}
          {showManualVerification && (
            <div className="text-center space-y-4">
              <p className="text-slate-700">
                Kami telah mengirim link verifikasi ke email Anda. 
                Silakan cek inbox atau folder spam.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-blue-800 mb-2">📧 Tidak menerima email?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Cek folder spam atau junk</li>
                  <li>• Pastikan email yang Anda daftar benar</li>
                  <li>• Tunggu beberapa menit</li>
                </ul>
              </div>
            </div>
          )}

          {/* Resend Button */}
          {email && status !== 'success' && (
            <div className="w-full space-y-3">
              <button
                onClick={resendVerification}
                disabled={isResending || countdown > 0}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isResending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Mengirim...
                  </>
                ) : countdown > 0 ? (
                  `Kirim ulang dalam ${countdown}s`
                ) : (
                  <>
                    <RefreshCw size={18} />
                    Kirim Ulang Link Verifikasi
                  </>
                )}
              </button>
              
              {countdown > 0 && (
                <p className="text-xs text-slate-500 text-center">
                  Tunggu {countdown} detik sebelum mengirim ulang
                </p>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <div className="text-center text-sm">
            <span className="text-slate-600">Kembali ke </span>
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary/90"
            >
              Login
            </Link>
          </div>
          
          {email && status !== 'success' && (
            <div className="text-center text-sm">
              <span className="text-slate-600">Masih belum menerima email? </span>
              <button
                onClick={resendVerification}
                disabled={isResending || countdown > 0}
                className="font-semibold text-primary hover:text-primary/90 disabled:opacity-50"
              >
                Kirim ulang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}