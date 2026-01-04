import Link from "next/link"
import { BarChart3, ShoppingBag, Plus, Settings } from "lucide-react"
import { SidebarProps } from "./types"

export default function Sidebar({ activePage = "dashboard" }: SidebarProps) {
  const menuItems = [
    { href: "/partner/dashboard", label: "Dashboard", icon: BarChart3, isActive: activePage === "dashboard" },
    { href: "/partner/menu", label: "Kelola Menu", icon: ShoppingBag, isActive: activePage === "menu" },
    { href: "/partner/orders", label: "Pesanan", icon: Plus, isActive: activePage === "orders" },
    { href: "/partner/settings", label: "Pengaturan", icon: Settings, isActive: activePage === "settings" },
  ]

  return (
    <aside className="hidden md:block w-64 bg-white border-r border-gray-200 py-8 px-4">
      <nav className="space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                item.isActive
                  ? "bg-primary text-white font-medium"
                  : "text-foreground hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}