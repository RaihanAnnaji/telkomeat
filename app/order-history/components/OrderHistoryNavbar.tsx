"use client"

import Link from "next/link"
import { ArrowLeft, Menu, X, User } from "lucide-react"

interface OrderHistoryNavbarProps {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  activePage: string
}

export default function OrderHistoryNavbar({ menuOpen, setMenuOpen, activePage }: OrderHistoryNavbarProps) {
  const mainNavItems = [
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
    <nav className="bg-secondary sticky top-0 z-50 border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between">
        {/* Left Section (Back + Title) */}
        <div className="flex items-center gap-3">
          <Link href="/home" className="text-gray-600 hover:text-primary transition">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-bold text-foreground">Riwayat Pesanan</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-3 items-center">
          {/* Main Navigation Items */}
          <div className="flex gap-3">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getButtonClass(item.key)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Profile Button */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-1.5 rounded-lg bg-primary text-white transition hover:opacity-90"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col p-3 space-y-2">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="w-full px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition text-center border"
                style={{
                  backgroundColor: item.key === activePage ? '#d41f26' : 'white',
                  color: item.key === activePage ? 'white' : '#d41f26',
                  borderColor: '#d41f26'
                }}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Profile Item */}
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="w-full px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition text-center border flex items-center justify-center gap-2"
              style={{
                backgroundColor: activePage === "profile" ? '#d41f26' : 'white',
                color: activePage === "profile" ? 'white' : '#d41f26',
                borderColor: '#d41f26'
              }}
            >
              <User size={16} />
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}