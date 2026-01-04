import { useRouter } from "next/navigation"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { CartSectionProps, CartItem } from "./types"

export default function CartSection({ 
  cart, 
  onUpdateQuantity, 
  onRemoveFromCart, 
  totalPrice, 
  totalItems, 
  canteenId 
}: CartSectionProps) {
  const router = useRouter()

  if (cart.length === 0) return null

  const handleCheckout = () => {
    // Simpan cart ke localStorage
    localStorage.setItem("checkout_cart", JSON.stringify(cart))
    router.push(`/checkout?canteen=${canteenId}`)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="px-4 sm:px-6 lg:px-12 py-4 max-w-full">
        {/* Container untuk item cart dengan max-height dan scroll jika terlalu banyak */}
        <div className="max-h-32 overflow-y-auto mb-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {cart.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveFromCart={onRemoveFromCart}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-gray-600 truncate">Total {totalItems} item(s)</p>
            <p className="text-lg font-bold text-primary truncate">Total: Rp {totalPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={handleCheckout}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:opacity-90 transition shrink-0"
          >
            <ShoppingCart size={18} /> 
            <span className="hidden sm:inline">Pesan Sekarang</span>
            <span className="sm:hidden">Checkout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function CartItemCard({ 
  item, 
  onUpdateQuantity, 
  onRemoveFromCart 
}: { 
  item: CartItem
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveFromCart: (itemId: string) => void
}) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 min-w-fit shrink-0">
      <div className="min-w-[100px]">
        <p className="text-xs font-medium truncate max-w-[100px]">{item.name}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-600">x{item.quantity}</p>
          <p className="text-xs font-bold text-primary">Rp {(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="bg-primary text-white p-1 rounded hover:opacity-90 transition"
          aria-label="Kurangi jumlah"
        >
          <Minus size={12} />
        </button>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="bg-primary text-white p-1 rounded hover:opacity-90 transition"
          aria-label="Tambah jumlah"
        >
          <Plus size={12} />
        </button>
        <button
          onClick={() => onRemoveFromCart(item.id)}
          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:opacity-90 transition whitespace-nowrap"
        >
          Hapus
        </button>
      </div>
    </div>
  )
}