export interface PartnerNavbarProps {
  canteenName: string  
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

export interface CanteenInfoFormProps {
  initialData?: {
    name: string
    location: string
    phone: string
  }
  onSubmit: (data: any) => void
}

export interface OperatingHoursFormProps {
  initialData?: {
    weekdays: { open: string; close: string }
    weekends: { open: string; close: string }
  }
  onSubmit: (data: any) => void
}

export interface SidebarProps {
  activePage?: string
}

export interface SettingsHeaderProps {
  title: string
  description: string
}

export interface CanteenStatusCardProps {
  kantinId: number
  kantinName: string
  isActive: boolean
  onStatusChange: (kantinId: number, newStatus: boolean) => Promise<void>
}


export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "makanan" | "snack" | "minuman"
  available: boolean
}

export type CategoryType = "makanan" | "snack" | "minuman"

export interface MenuHeaderProps {
  onAddItem: () => void
}

export interface MenuCategoriesProps {
  menuItems: MenuItem[]
  onEdit: (item: MenuItem) => void
  onDelete: (id: string) => void
}

export interface MenuItemCardProps {
  item: MenuItem
  onEdit: (item: MenuItem) => void
  onDelete: (id: string) => void
}

export interface MenuModalProps {
  showModal: boolean
  editingId: string | null
  formData: {
    name: string
    description: string
    price: number
    category: CategoryType
    image: string | File
  }
  onClose: () => void
  onSave: () => void
  onFormChange: (field: string, value: string | number | File) => void
}


export interface Order {
  id: string
  customer: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  timestamp: string
  notes?: string
  paymentProof?: string
}

export interface OrderItem {
  name: string
  quantity: number
  price?: number
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
}


export interface PaymentProofModalProps {
  paymentProof: string | null
  isOpen: boolean
  onClose: () => void
}

export interface DashboardStatsProps {
  title: string
  value: string | number
  change: string
  isPositive: boolean
}
