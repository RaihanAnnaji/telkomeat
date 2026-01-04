"use client"

import { useState, useEffect } from "react"
import PartnerNavbar from "./components/PartnerNavbar"
import Sidebar from "./components/Sidebar"
import MenuHeader from "./components/MenuHeader"
import MenuCategories from "./components/MenuCategories"
import MenuModal from "./components/MenuModal"
import { MenuItem, CategoryType } from "./components/types"

export default function MenuManagement() {
  const [canteenName, setCanteenName] = useState<string>("")
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState<{
    name: string
    description: string
    price: number
    category: CategoryType
    image: string | File
  }>({
    name: "",
    description: "",
    price: 0,
    category: "makanan",
    image: ""
  })

  // Fetch menu items dan canteen name
  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem("token")
      const kantinId = localStorage.getItem("kantin_id")
      
      const [productsRes, canteenRes] = await Promise.all([
        fetch("http://localhost:8000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }),
        fetch(`http://localhost:8000/api/canteen/${kantinId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
      ])
      
      const productsData = await productsRes.json()
      const canteenData = await canteenRes.json()
      
      setMenuItems(productsData)
      setCanteenName(canteenData.name || "Kantin")
    } catch (err) {
      console.error("Gagal ambil data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenuItems()
  }, [])

// Di page.tsx - Update handleAdd untuk handle edit juga:
const handleAdd = async () => {
  const token = localStorage.getItem("token")
  const form = new FormData()

  form.append("name", formData.name)
  form.append("description", formData.description)
  form.append("price", formData.price.toString())
  form.append("category", formData.category)

  if (formData.image instanceof File) {
    form.append("image", formData.image)
  }

  try {
    // Gunakan PUT untuk edit, POST untuk tambah
    const url = editingId 
      ? `http://localhost:8000/api/products/${editingId}`
      : "http://localhost:8000/api/products"
    
    const method = editingId ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || "Gagal menyimpan produk")
    }

    await fetchMenuItems()
    setShowModal(false)
    setEditingId(null)
    
    // reset form
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "makanan",
      image: ""
    })

  } catch (err: any) {
    console.error(err)
    alert(err.message || "Gagal menyimpan produk")
  }
}

  // ✅ Edit produk
  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image, // string
    })
    setShowModal(true)
  }

  // ✅ Hapus produk
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return
    const token = localStorage.getItem("token")
    try {
      await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchMenuItems()
    } catch (err) {
      console.error(err)
      alert("Gagal menghapus produk")
    }
  }

  const handleCancel = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "makanan",
      image: ""
    })
  }

  // ⬇️ FIX: terima File juga
  const handleFormChange = (field: string, value: string | number | File) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

   if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Memuat data menu...
      </div>
    )
  }

  return (
    <main className="bg-secondary min-h-screen flex flex-col">
      <PartnerNavbar 
        canteenName={canteenName} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
      />

      <div className="flex flex-1">
        <Sidebar activePage="menu" />

        <div className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-12 w-full">
          <MenuHeader onAddItem={() => setShowModal(true)} />

          <MenuCategories
            menuItems={menuItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <MenuModal
            showModal={showModal}
            editingId={editingId}
            formData={formData}
            onClose={handleCancel}
            onSave={handleAdd}
            onFormChange={handleFormChange}
          />
        </div>
      </div>
    </main>
  )
}