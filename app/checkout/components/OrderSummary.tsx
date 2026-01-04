import { OrderSummaryProps } from "./types"

export default function OrderSummary({ cart }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-2xl font-bold text-foreground mb-6">Detail Pesanan</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-start pb-4 border-b border-gray-200 last:border-0"
          >
            <div>
              <p className="font-medium text-foreground">{item.name}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <span className="font-bold text-foreground">
              Rp {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
