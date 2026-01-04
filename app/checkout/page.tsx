"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import CheckoutNavbar from "./components/CheckoutNavbar"
import OrderSummary from "./components/OrderSummary"
import PaymentMethodSection from "./components/PaymentMethodSection"
import PaymentProofUpload from "./components/PaymentProofUpload"
import DeliveryNotes from "./components/DeliveryNotes"
import OrderTotal from "./components/OrderTotal"
import SuccessModal from "./components/SuccessModal"
import { getPaymentMethods } from "./components/constants"
import { CartItem } from "./components/types"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const [cart, setCart] = useState<CartItem[]>([])
  const [canteenParam, setCanteenParam] = useState("kaf")

  useEffect(() => {
    if (!searchParams) return  // ✅ kalau masih null, stop dulu
  
    const canteen = searchParams.get("canteen") ?? "kaf"
    setCanteenParam(canteen)
  
    const storedCart = localStorage.getItem("checkout_cart")
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (e) {
        console.error("Gagal parse checkout_cart:", e)
      }
    }
  }, [searchParams])  

  const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "qr_code" | null>(null)
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [deliveryNotes, setDeliveryNotes] = useState("")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const canteenName = canteenParam === "kaf" ? "Kantin Kaf" : "Kantin Neo01"
  const availablePaymentMethods = getPaymentMethods(canteenParam)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPaymentProof(file)
      const reader = new FileReader()
      reader.onload = (event) => setPreviewUrl(event.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handlePlaceOrder = async (total: number) => {
    if (!paymentMethod || !paymentProof) {
      alert("Pilih metode pembayaran dan upload bukti terlebih dahulu")
      return
    }

    const token = localStorage.getItem("token")
    if (!token) {
      alert("Silakan login terlebih dahulu")
      return
    }

    const form = new FormData()
    form.append("kantin_id", canteenParam === "kaf" ? "1" : "2")
    form.append("total_price", total.toString())
    form.append("payment_method", paymentMethod)
    form.append("delivery_notes", deliveryNotes)
    form.append("payment_proof", paymentProof)
    form.append(
      "items",
      JSON.stringify(
        cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        }))
      )
    )

    try {
      const res = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: form,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Gagal membuat pesanan")

      setOrderPlaced(true)
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan saat membuat pesanan")
    }
  }

  if (orderPlaced) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 2.5
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
      <main className="bg-secondary min-h-screen flex flex-col">
        <CheckoutNavbar canteenParam={canteenParam} isSuccess />
        <SuccessModal canteenName={canteenName} total={total} totalItems={totalItems} />
      </main>
    )
  }

  return (
    <main className="bg-secondary min-h-screen flex flex-col">
      <CheckoutNavbar canteenParam={canteenParam} />

      <div className="flex-1 px-4 sm:px-6 lg:px-12 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <OrderSummary cart={cart} />
            <PaymentMethodSection
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              availablePaymentMethods={availablePaymentMethods}
              total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 2.5}
            />
            <PaymentProofUpload
              paymentProof={paymentProof}
              previewUrl={previewUrl}
              onFileChange={handleFileChange}
            />
            <DeliveryNotes
              deliveryNotes={deliveryNotes}
              setDeliveryNotes={setDeliveryNotes}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderTotal
              cart={cart}
              canteenName={canteenName}
              paymentMethod={paymentMethod}
              paymentProof={paymentProof}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
