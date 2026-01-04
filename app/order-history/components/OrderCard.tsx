import { MapPin, Clock, Store, CreditCard, MessageSquare } from "lucide-react"
import { OrderCardProps } from "./types"

export default function OrderCard({ order, onViewDetail }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai"
      case "confirmed":
        return "Dikonfirmasi"
      case "pending":
        return "Menunggu Konfirmasi"
      case "cancelled":
        return "Dibatalkan"
      default:
        return status
    }
  }

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "bank_transfer":
        return "Transfer Bank"
      case "qr_code":
        return "QR Code"
      default:
        return method
    }
  }

  const orderDate = new Date(order.created_at)

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-bold text-foreground">Pesanan #{order.id}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
              >
                {getStatusLabel(order.status)}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Store size={14} />
                <span>{order.kantin_nama}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CreditCard size={14} />
                <span>{getPaymentMethodLabel(order.payment_method)}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              Rp {order.total_price.toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-gray-600">{order.items.length} item</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {orderDate.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </p>
      </div>

      {/* Items */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3">Items:</h4>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-gray-600">x{item.quantity} @ Rp {item.price.toLocaleString("id-ID")}</p>
              </div>
              <p className="font-medium text-foreground whitespace-nowrap">
                Rp {(item.price * item.quantity).toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes if exists */}
      {order.delivery_notes && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start gap-2">
            <MessageSquare className="text-primary w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-600 mb-1">Catatan Pengiriman</p>
              <p className="text-sm text-gray-800">{order.delivery_notes}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          ID Pesanan: {order.id}
        </div>
        <button
          onClick={() => onViewDetail(order.id)}
          className="flex items-center gap-2 text-primary font-medium hover:opacity-70 transition px-4 py-2 rounded-lg hover:bg-primary/10"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  )
}