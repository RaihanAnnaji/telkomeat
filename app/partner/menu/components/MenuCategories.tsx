"use client"

import { useState } from "react"
import MenuItemCard from "./MenuItemCard"
import { MenuCategoriesProps } from "./types"
import { Filter } from "lucide-react"

export default function MenuCategories({ menuItems, onEdit, onDelete }: MenuCategoriesProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all')
  
  const filteredItems = menuItems.filter(item => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'active') return item.available
    if (activeFilter === 'inactive') return !item.available
    return true
  })

  const activeCount = menuItems.filter(item => item.available).length
  const inactiveCount = menuItems.filter(item => !item.available).length

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="bg-white rounded-lg p-3 sm:p-4 shadow">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto mb-2 sm:mb-0">
            <Filter size={16} className="text-gray-600" />
            <h3 className="font-medium text-gray-700 text-sm sm:text-base">Filter Status:</h3>
          </div>
          
          <div className="flex gap-1 sm:gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition flex-1 sm:flex-none ${
                activeFilter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Semua ({menuItems.length})
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition flex-1 sm:flex-none ${
                activeFilter === 'active' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              Aktif ({activeCount})
            </button>
            <button
              onClick={() => setActiveFilter('inactive')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition flex-1 sm:flex-none ${
                activeFilter === 'inactive' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              Nonaktif ({inactiveCount})
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      {['makanan', 'snack', 'minuman'].map((category) => {
        const categoryItems = filteredItems.filter(
          (item) => item.category === category
        )

        if (categoryItems.length === 0) return null

        return (
          <div key={category} className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-foreground capitalize">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categoryItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        )
      })}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow">
          <div className="text-gray-400 mb-2 sm:mb-3 text-2xl sm:text-3xl">
            {activeFilter === 'all' 
              ? '📦' 
              : activeFilter === 'active' 
                ? '✅' 
                : '⏸️'
            }
          </div>
          <p className="text-gray-600 font-medium text-sm sm:text-base">
            {activeFilter === 'all'
              ? 'Belum ada produk'
              : activeFilter === 'active'
                ? 'Tidak ada produk aktif'
                : 'Tidak ada produk nonaktif'
            }
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            {activeFilter !== 'all' && 'Coba filter "Semua" untuk melihat semua produk'}
          </p>
        </div>
      )}
    </div>
  )
}