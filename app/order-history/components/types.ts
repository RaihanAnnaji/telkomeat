export interface Order {
  id: string
  kantin_id: number
  kantin_nama: string
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  payment_method: 'bank_transfer' | 'qr_code'
  delivery_notes?: string
  created_at: string
  updated_at: string
  items: OrderItem[]
}

export interface OrderDetail extends Order {
  items: (OrderItem & { subtotal: number })[]
  payment_proof?: string
  notes?: string
}

export interface OrderItem {
  id: string
  product_id: string
  name: string
  quantity: number
  price: number
}

export interface OrderCardProps {
  order: Order
  onViewDetail: (orderId: string) => void
}

export interface OrderListProps {
  orders: Order[]
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  orders?: T[]
  order?: T // Add this for single order response
}