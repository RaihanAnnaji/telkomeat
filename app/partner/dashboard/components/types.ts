export interface SalesData {
  date: string
  orders: number
  revenue: number
}

export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  customer: string
  items: OrderItem[] 
  amount: number
  status: "Selesai" | "Menunggu" | "Diproses"
}

export interface PartnerNavbarProps {
  canteenName: string
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

export interface SidebarProps {
  activePage?: string
}

export interface DashboardHeaderProps {
  canteenName: string
}

export interface MetricsGridProps {
  totalOrders: number
  totalRevenue: number
  avgOrderValue: string
  completionRate: string
}

export interface SalesChartProps {
  salesData: SalesData[]
}

export interface RecentOrdersProps {
  orders: Order[]
}