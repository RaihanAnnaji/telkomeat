"use client"

import { useState, use, useEffect } from "react"
import Link from "next/link"
import CanteenNavbar from "./components/CanteenNavbar"
import CanteenInfoSection from "./components/CanteenInfoSection"
import MenuTabs from "./components/MenuTabs"
import MenuGrid from "./components/MenuGrid"
import CartSection from "./components/CartSection"
import MenuDetailModal from "./components/MenuDetailModal" // Import baru
import { CANTEENS } from "./components/constants"
import { CartItem, MenuItem } from "./components/types"
import { AlertTriangle, Store, Clock } from "lucide-react"

export default function CanteenDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const canteen = CANTEENS[id as keyof typeof CANTEENS]
  const [menuOpen, setMenuOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeTab, setActiveTab] = useState<"makanan" | "snack" | "minuman">("makanan")
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [canteenActive, setCanteenActive] = useState<boolean>(true)
  
  // State untuk modal detail
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!canteen) return

    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const res = await fetch(`https://api.telkomeat.my.id/api/canteen/${canteen.id}/products`, {
          headers: {
            Accept: "application/json",
          },
        })

        if (!res.ok) {
          setCanteenActive(false)
          setMenuItems([])
          setError("Kantin sedang tidak beroperasi")
          return
        }

        const data = await res.json()
        
        if (Array.isArray(data)) {
          setMenuItems(data)
          if (data.length === 0) {
            setCanteenActive(false)
          } else {
            setCanteenActive(true)
          }
        } else {
          console.error("Unexpected response format:", data)
          setCanteenActive(false)
          setMenuItems([])
          setError(data.message || "Terjadi kesalahan")
        }
      } catch (error: any) {
        console.error("Gagal mengambil data menu:", error)
        setCanteenActive(false)
        setMenuItems([])
        setError("Kantin tidak tersedia saat ini")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [canteen])

  // --- Cart Logic ---
  const addToCartDirect = (item: MenuItem) => {
    // Fungsi untuk tambah langsung dari card (tanpa modal)
    const existingItem = cart.find((i) => i.id === item.id)
    if (existingItem) {
      setCart(cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const addToCartWithDetails = (item: MenuItem, quantity: number, notes?: string) => {
    // Fungsi untuk tambah dari modal (dengan quantity dan notes)
    const existingItem = cart.find((i) => i.id === item.id)
    
    if (existingItem) {
      setCart(cart.map((i) => 
        i.id === item.id 
          ? { 
              ...i, 
              quantity: i.quantity + quantity,
              notes: notes || i.notes || "" 
            } 
          : i
      ))
    } else {
      setCart([...cart, { 
        ...item, 
        quantity,
        notes: notes || "" 
      }])
    }
  }

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((i) => i.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCart(cart.map((i) => (i.id === itemId ? { ...i, quantity } : i)))
    }
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  // --- Modal Handler ---
  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const handleAddFromModal = (item: MenuItem, quantity: number, notes?: string) => {
    addToCartWithDetails(item, quantity, notes)
  }

  if (!canteen) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Kantin tidak ditemukan</h1>
          <Link href="/home" className="text-primary hover:underline">
            Kembali ke Home
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex flex-col">
        <CanteenNavbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          activePage={id === "kaf" ? "kaf" : "neo01"}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat menu {canteen.name}...</p>
          </div>
        </div>
      </div>
    )
  }

  const filteredItems = canteenActive ? menuItems.filter((item) => item.category === activeTab) : []

  return (
    <main className="bg-secondary min-h-screen flex flex-col">
      <CanteenNavbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        activePage={id === "kaf" ? "kaf" : "neo01"}
      />

      <div className="flex-1 pb-40 md:pb-48">
        <CanteenInfoSection 
          canteen={canteen} 
          isActive={canteenActive}
        />
        
        {!canteenActive && (
          <div className="px-4 sm:px-6 lg:px-12 py-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 shadow-sm">
              {/* ... existing error content ... */}
            </div>
          </div>
        )}

        {canteenActive && (
          <>
            <MenuTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {filteredItems.length > 0 ? (
              <MenuGrid 
                items={filteredItems} 
                onAddToCart={addToCartDirect}
                onItemClick={handleItemClick}
              />
            ) : (
              <div className="px-4 sm:px-6 lg:px-12 py-8 text-center">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-md mx-auto">
                  <div className="text-blue-500 text-4xl mb-4">🍽️</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Menu Belum Tersedia</h3>
                  <p className="text-gray-600">
                    {canteen.name} sedang menyiapkan menu. Silakan kembali nanti.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {error && canteenActive && (
          <div className="px-4 sm:px-6 lg:px-12 py-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-medium">Terjadi kesalahan</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal Detail Menu */}
      <MenuDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddFromModal}
      />

      {/* Cart hanya ditampilkan jika kantin aktif DAN ada item di cart */}
      {canteenActive && cart.length > 0 && (
        <CartSection
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          totalPrice={totalPrice}
          totalItems={totalItems}
          canteenId={id}
        />
      )}
    </main>
  )
}