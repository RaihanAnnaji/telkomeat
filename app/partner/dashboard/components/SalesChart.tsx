import { SalesChartProps } from "./types"

export default function SalesChart({ salesData }: SalesChartProps) {
  const maxOrders = Math.max(...salesData.map(data => data.orders))

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow mb-8">
      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6">Penjualan Mingguan</h2>
      <div className="flex items-end justify-between gap-1 sm:gap-2 h-48 sm:h-64 overflow-x-auto">
        {salesData.map((data, idx) => (
          <ChartBar
            key={idx}
            date={data.date}
            orders={data.orders}
            revenue={data.revenue}
            maxOrders={maxOrders}
          />
        ))}
      </div>
    </div>
  )
}

function ChartBar({ date, orders, revenue, maxOrders }: { 
  date: string; 
  orders: number; 
  revenue: number; 
  maxOrders: number 
}) {
  const heightPercentage = (orders / maxOrders) * 100

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 min-w-[40px] sm:min-w-0">
      <div className="text-xs text-gray-600 font-medium hidden sm:block">{orders} pesanan</div>
      <div className="text-xs text-gray-600 font-medium sm:hidden">{orders}</div>
      <div
        className="bg-primary rounded-t w-full hover:opacity-80 transition cursor-pointer"
        style={{ height: `${heightPercentage}%`, minHeight: "10px" }}
        title={`${date}: ${orders} pesanan, Rp ${Number(revenue).toFixed(2)}`}
      />
      <div className="text-xs text-gray-600 font-medium truncate">{date}</div>
    </div>
  )
}