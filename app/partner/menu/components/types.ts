export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "makanan" | "snack" | "minuman"
  available: boolean  // ← GUNAKAN available BUKAN is_active
}

export type CategoryType = "makanan" | "snack" | "minuman"

export interface PartnerNavbarProps {
  canteenName: string  
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

export interface SidebarProps {
  activePage?: string
}

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
    image: string | File     // ⬅️ WAJIB: bisa string (edit) atau File (upload)
  }
  onClose: () => void
  onSave: () => void
  onFormChange: (field: string, value: string | number | File) => void // ⬅️ WAJIB tambahkan File
}

