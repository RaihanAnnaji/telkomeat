import Link from "next/link"
import { TEatLogo } from "@/components/auth/logo"
import { LogOut, Menu, X } from "lucide-react"
import { PartnerNavbarProps } from "./types"

export default function PartnerNavbar({ canteenName, menuOpen, setMenuOpen }: PartnerNavbarProps) {
  const navItems = [
    { href: "/partner/dashboard", label: "Dashboard" },
    { href: "/partner/menu", label: "Kelola Menu" },
    { href: "/partner/orders", label: "Pesanan" },
    { href: "/partner/settings", label: "Pengaturan" },
  ]

  return (
    <header className="bg-secondary border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/home">
            <TEatLogo />
          </Link>
          <span className="text-foreground font-medium hidden sm:block">
            Pesanan - {canteenName}
          </span>
          <span className="text-foreground font-medium sm:hidden">
            {canteenName}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logout Button - Desktop only */}
          <button className="hidden md:flex items-center gap-2 text-gray-600 hover:text-primary transition p-2">
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition text-center"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}