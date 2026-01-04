import Link from "next/link"
import { RecentOrdersProps } from "./types"

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-800"
      case "Menunggu":
        return "bg-yellow-100 text-yellow-800"
      case "Diproses":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-bold text-foreground">Pesanan Terbaru</h2>
        <Link href="/partner/orders" className="text-primary hover:underline text-sm font-medium text-center sm:text-left">
          Lihat Semua
        </Link>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">ID Pesanan</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Pelanggan</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Item</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Jumlah</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="py-3 px-4 font-medium text-foreground">{order.id}</td>
                <td className="py-3 px-4 text-gray-600">{order.customer}</td>
                <td className="py-3 px-4 text-gray-600">{order.items.length} item</td>
                <td className="py-3 px-4 font-medium text-foreground">Rp {Number(order.amount).toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-foreground">ID: {order.id}</div>
                <div className="text-sm text-gray-600">{order.customer}</div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
              >
                {order.status}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{order.items.length} item</span>
              <span className="font-medium text-foreground">Rp {Number(order.amount).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}