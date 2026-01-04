export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  customer: string
  items: OrderItem[]
  total: number
  amount?: number      // ← TAMBAHKAN
  status: "pending" | "confirmed" | "cancelled"
  timestamp: string
  paymentProof?: string
  notes?: string
}

export interface PartnerNavbarProps {
  canteenName: string
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

export interface SidebarProps {
  activePage?: string
}

export interface OrdersHeaderProps {
  title: string
  description: string
}

export interface OrdersTableProps {
  orders: Order[]
  onViewOrder: (order: Order) => void
}

export interface OrderDetailModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
  onConfirmOrder: (orderId: string) => void
  onCancelOrder: (orderId: string) => void
  // HAPUS onShowProof dari sini karena sudah dihandle di dalam component
}

export interface PaymentProofModalProps {
  paymentProof: string | null
  isOpen: boolean
  onClose: () => void
}