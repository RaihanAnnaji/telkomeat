import { OrderTotalProps } from "./types"

export default function OrderTotal({ 
  cart, 
  canteenName, 
  paymentMethod, 
  paymentProof, 
  onPlaceOrder 
}: OrderTotalProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 0
  const total = subtotal + deliveryFee
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleClick = () => {
    onPlaceOrder(total)
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow sticky top-24 space-y-6">
      <div>
        <h3 className="font-bold text-foreground mb-4">Total Pesanan</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-foreground">Rp {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Biaya Pengiriman</span>
            <span className="text-foreground">Rp {deliveryFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
            <span className="text-foreground">Total</span>
            <span className="text-primary">Rp {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-xs text-gray-600 mb-2">Dari: {canteenName}</p>
        <p className="text-sm font-medium text-foreground">{totalItems} item(s)</p>
      </div>

      <button
        onClick={handleClick}
        disabled={!paymentMethod || !paymentProof}
        className={`w-full py-3 rounded-lg font-bold text-white transition ${
          paymentMethod && paymentProof
            ? "bg-primary hover:opacity-90"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Buat Pesanan
      </button>

      <p className="text-xs text-gray-600 text-center">
        Dengan melakukan pemesanan, Anda menyetujui syarat dan ketentuan kami.
      </p>
    </div>
  )
}
