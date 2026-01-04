export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "makanan" | "snack" | "minuman"
}

export interface CartItem extends MenuItem {
  quantity: number
  notes?: string 
}


export interface OperationalHour {
  day: string;
  hours: string;
}

export interface CanteenInfo {
  id: string
  name: string
  location: string
  distance: string
  hours: string
  operationalHours: OperationalHour[] 
  phone: string
  image: string
}


export interface CanteenInfoSectionProps {
  canteen: CanteenInfo; // 
  isActive?: boolean;
}

export interface CanteenNavbarProps {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  activePage: string
}

export interface MenuTabsProps {
  activeTab: "makanan" | "snack" | "minuman"
  setActiveTab: (tab: "makanan" | "snack" | "minuman") => void
}


export interface MenuDetailModalProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (item: MenuItem, quantity: number, notes?: string) => void
  initialQuantity?: number
}

// Update MenuGridProps
export interface MenuGridProps {
  items: MenuItem[]
  onAddToCart: (item: MenuItem) => void
  onItemClick: (item: MenuItem) => void 
}

export interface CartSectionProps {
  cart: CartItem[]
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveFromCart: (itemId: string) => void
  totalPrice: number
  totalItems: number
  canteenId: string
}