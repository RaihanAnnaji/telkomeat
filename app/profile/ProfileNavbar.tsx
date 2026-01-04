"use client"

import Link from "next/link"
import { TEatLogo } from "@/components/auth/logo"
import { ArrowLeft, User } from "lucide-react"

interface ProfileNavbarProps {
  activePage?: string
}

export default function ProfileNavbar({ activePage = "profile" }: ProfileNavbarProps) {
  const navItems = [
    { href: "/home", label: "Beranda", key: "home" },
    { href: "/canteen/kaf", label: "Kantin Kaf", key: "kaf" },
    { href: "/canteen/neo01", label: "Kantin Neo01", key: "neo01" },
    { href: "/order-history", label: "Riwayat Pesanan", key: "order-history" },
  ]

  const getButtonClass = (itemKey: string) => {
    const baseClass = "px-4 py-1.5 rounded-full text-sm font-medium hover:opacity-90 transition"
    return itemKey === activePage 
      ? `${baseClass} bg-primary text-white`
      : `${baseClass} bg-white text-primary border border-primary`
  }

  const getProfileButtonClass = () => {
    const baseClass = "px-4 py-1.5 rounded-full text-sm font-medium hover:opacity-90 transition flex items-center gap-2"
    return activePage === "profile"
      ? `${baseClass} bg-primary text-white`
      : `${baseClass} bg-white text-primary border border-primary`
  }

  return (
    <nav className="bg-secondary sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between">
        {/* Left Section (Back + Logo) */}
        <div className="flex items-center gap-3">
          <Link href="/home" className="text-gray-600 hover:text-primary transition">
            <ArrowLeft size={20} />
          </Link>
          <Link href="/home" className="flex-shrink-0">
            <TEatLogo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-3 items-center">
          {/* Main Navigation Items */}
          <div className="flex gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getButtonClass(item.key)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Profile Button (active) */}
          <div className="ml-4 border-l border-gray-300 pl-4">
            <Link
              href="/profile"
              className={getProfileButtonClass()}
            >
              <User size={16} />
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}