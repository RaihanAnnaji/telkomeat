import Image from "next/image"
import { PaymentProofModalProps } from "./types"

export default function PaymentProofModal({ paymentProof, isOpen, onClose }: PaymentProofModalProps) {
  if (!isOpen || !paymentProof) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h3 className="text-lg font-bold text-foreground mb-4">Bukti Pembayaran</h3>
        <div className="relative w-full h-64 border border-gray-200 rounded-lg overflow-hidden">
          <Image
            src={paymentProof}
            alt="Bukti Pembayaran"
            fill
            className="object-contain"
          />
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          Tutup
        </button>
      </div>
    </div>
  )
}