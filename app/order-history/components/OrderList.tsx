import { OrderListProps } from "./types"
import OrderCard from "./OrderCard"
import { useRouter } from "next/navigation"

export default function OrderList({ orders }: OrderListProps) {
  const router = useRouter()

  const handleViewDetail = (orderId: string) => {
    router.push(`/order-history/${orderId}`)
  }

  // Sort by date (newest first)
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return (
    <div className="space-y-6">
      {sortedOrders.map((order) => (
        <OrderCard 
          key={order.id} 
          order={order} 
          onViewDetail={handleViewDetail} 
        />
      ))}
    </div>
  )
}