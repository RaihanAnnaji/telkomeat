import { MetricsGridProps } from "./types"

export default function MetricsGrid({ 
  totalOrders, 
  totalRevenue, 
  avgOrderValue, 
  completionRate 
}: MetricsGridProps) {
  const metrics = [
    { label: "Total Pesanan", value: totalOrders.toString(), subLabel: "Minggu ini" },
    { label: "Total Pendapatan", value: `Rp ${Number(totalRevenue).toFixed(2)}`, subLabel: "Minggu ini" },
    { label: "Rata-rata Nilai Pesanan", value: `Rp ${Number(avgOrderValue)}`, subLabel: "Minggu ini" },
    { label: "Tingkat Penyelesaian", value: completionRate, subLabel: "Minggu ini" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          label={metric.label}
          value={metric.value}
          subLabel={metric.subLabel}
        />
      ))}
    </div>
  )
}

function MetricCard({ label, value, subLabel }: { label: string; value: string; subLabel: string }) {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow">
      <div className="text-gray-600 text-sm font-medium mb-2">{label}</div>
      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary break-words">{value}</div>
      <div className="text-gray-500 text-xs mt-2">{subLabel}</div>
    </div>
  )
}