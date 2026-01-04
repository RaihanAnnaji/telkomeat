import Link from "next/link"
import { Check } from "lucide-react"
import { SuccessModalProps } from "./types"

export default function SuccessModal({ canteenName, total, totalItems }: SuccessModalProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-lg">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-4">
          Your order from {canteenName} has been placed. The partner will review your payment and confirm shortly.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600 mb-1">Detail Pesanan:</p>
          <p className="font-bold text-lg text-primary">Rp {total.toFixed(2)}</p>
          <p className="text-xs text-gray-600 mt-2">{totalItems} items</p>
        </div>
        <Link
          href="/home"
          className="block w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}