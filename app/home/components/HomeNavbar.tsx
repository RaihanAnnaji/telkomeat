"use client"

import Link from "next/link"
import { TEatLogo } from "@/components/auth/logo"
import { useState } from "react"
import { Menu, X, User } from "lucide-react"

interface HomeNavbarProps {
  activePage: string
}

export default function HomeNavbar({ activePage }: HomeNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { href: "/home", label: "Beranda", key: "home" },
    { href: "/canteen/kaf", label: "Kantin Kaf", key: "kaf" },
    { href: "/canteen/neo01", label: "Kantin Neo01", key: "neo01" },
    { href: "/order-history", label: "Riwayat Pesanan", key: "order-history" },
    { href: "/profile", label: "Profile", key: "profile", icon: <User size={16} /> },
  ]

  const getButtonClass = (itemKey: string) => {
    const baseClass = "px-4 py-1.5 rounded-full text-sm font-medium hover:opacity-90 transition flex items-center gap-2"
    return itemKey === activePage 
      ? `${baseClass} bg-primary text-white`
      : `${baseClass} bg-white text-primary border border-primary`
  }

  return (
    <nav className="bg-secondary sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between">
        <Link href="/home" className="flex-shrink-0">
          <TEatLogo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-3 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={getButtonClass(item.key)}
            >
              {item.icon && item.icon}
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-1.5 rounded-lg bg-primary text-white hover:opacity-90 transition"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col p-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="w-full px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition text-center border flex items-center justify-center gap-2"
                style={{
                  backgroundColor: item.key === activePage ? '#d41f26' : 'white',
                  color: item.key === activePage ? 'white' : '#d41f26',
                  borderColor: '#d41f26'
                }}
              >
                {item.icon && item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}