import { Plus } from "lucide-react"
import { MenuHeaderProps } from "./types"

export default function MenuHeader({ onAddItem }: MenuHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
          Kelola Menu
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Tambah, ubah, atau hapus item menu
        </p>
      </div>
      <button
        onClick={onAddItem}
        className="bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        <Plus size={18} className="sm:size-5" />
        <span className="text-sm sm:text-base">Tambah Item</span>
      </button>
    </div>
  )
}