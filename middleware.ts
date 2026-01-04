import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || null
  const role = request.cookies.get("role")?.value || null

  const url = request.nextUrl.clone()

  // ===========================
  // 1. WAJIB LOGIN
  // ===========================
  if (!token) {
    // Proteksi checkout
    if (url.pathname.startsWith("/checkout")) {
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }

    // Proteksi home atau admin/partner
    if (url.pathname.startsWith("/home") || url.pathname.startsWith("/admin") || url.pathname.startsWith("/partner")) {
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }
  }

  // ===========================
  // 2. ROLE AUTHORIZATION
  // ===========================

  // Jika user biasa mencoba akses admin/partner
  if (role === "user" && url.pathname.startsWith("/partner")) {
    url.pathname = "/home"
    return NextResponse.redirect(url)
  }

  // Jika admin mencoba masuk ke halaman user
  if (role === "admin" && url.pathname.startsWith("/home")) {
    url.pathname = "/partner/dashboard"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
