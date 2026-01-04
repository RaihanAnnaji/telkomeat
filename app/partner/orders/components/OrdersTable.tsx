import { Eye } from "lucide-react"
import { OrdersTableProps } from "./types"

export default function OrdersTable({ orders, onViewOrder }: OrdersTableProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Dikonfirmasi"
      case "pending":
        return "Menunggu"
      case "cancelled":
        return "Dibatalkan"
      case "completed":
        return "Selesai"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Format timestamp sederhana untuk mobile
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp)
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return timestamp
    }
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-bold text-foreground">ID Pesanan</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Pelanggan</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Item</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Total</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Status</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Waktu</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-6 font-medium text-foreground">{order.id}</td>
                  <td className="py-4 px-6 text-gray-600">{order.customer}</td>
                  <td className="py-4 px-6 text-gray-600">{order.items.length} item</td>
                  <td className="py-4 px-6 font-medium text-foreground">
                    Rp {Number(order.total || 0).toLocaleString('id-ID')}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-xs">{formatTimestamp(order.timestamp)}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => onViewOrder(order)}
                      className="text-primary hover:underline font-medium flex items-center gap-1"
                    >
                      <Eye size={16} />
                      Lihat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards*/}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-foreground text-sm">ID: {order.id}</div>
                <div className="text-gray-600 text-sm">{order.customer}</div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
              >
                {getStatusLabel(order.status)}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{order.items.length} item</span>
              <span className="font-medium text-foreground">
                Rp {Number(order.total || 0).toLocaleString('id-ID')}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{formatTimestamp(order.timestamp)}</span>
              <button
                onClick={() => onViewOrder(order)}
                className="text-primary font-medium flex items-center gap-1"
              >
                <Eye size={14} />
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}