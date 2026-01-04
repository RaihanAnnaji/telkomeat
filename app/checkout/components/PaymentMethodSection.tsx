"use client"

import { useState } from "react"
import Image from "next/image"
import { Copy } from "lucide-react"
import { PaymentMethodSectionProps } from "./types"

const BANK_DETAILS = {
  bank: "Bank BRI",
  accountNumber: "6838 0102 4648 532",
  accountName: "WAHYU TRI KASTIWI",
}

const QR_CODE_IMAGE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kantin_kaf-2uscga0DdPNfDQopo4FqWbWGbGKlFD.jpg"

export default function PaymentMethodSection({ 
  paymentMethod, 
  setPaymentMethod, 
  availablePaymentMethods, 
  total 
}: PaymentMethodSectionProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-2xl font-bold text-foreground mb-6">Metode Pembayaran</h2>

      {availablePaymentMethods.length === 0 ? (
        <p className="text-gray-600">No payment methods available for this canteen</p>
      ) : (
        <div className="space-y-4">
          {availablePaymentMethods.map((method) => (
            <div
              key={method.type}
              className="border-2 rounded-lg p-4 cursor-pointer transition"
              onClick={() => setPaymentMethod(method.type)}
              style={{
                borderColor: paymentMethod === method.type ? "#d41f26" : "#e5e5e5",
                backgroundColor: paymentMethod === method.type ? "#fff5e4" : "white",
              }}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={paymentMethod === method.type}
                  onChange={() => setPaymentMethod(method.type)}
                  className="w-4 h-4"
                />
                <label className="flex-1 cursor-pointer font-medium text-foreground">{method.label}</label>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bank Transfer Details */}
      {paymentMethod === "bank_transfer" && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-bold text-foreground mb-4">Bank Transfer Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Bank</p>
              <p className="font-medium text-foreground">{BANK_DETAILS.bank}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Number</p>
              <div className="flex items-center gap-2">
                <p className="font-mono font-bold text-foreground">{BANK_DETAILS.accountNumber}</p>
                <button
                  onClick={handleCopyAccountNumber}
                  className="text-primary hover:opacity-70 transition"
                  title="Copy account number"
                >
                  <Copy size={16} />
                </button>
              </div>
              {copied && <p className="text-xs text-green-600 mt-1">Copied to clipboard!</p>}
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Name</p>
              <p className="font-medium text-foreground">{BANK_DETAILS.accountName}</p>
            </div>
            <div className="bg-yellow-100 border border-yellow-400 p-3 rounded mt-4 text-xs text-yellow-800">
            Harap bayar sesuai dengan total pesanan anda ke rekening di atas dan unggah bukti transfer.
            </div>
          </div>
        </div>
      )}

      {/* QR Code Payment */}
      {paymentMethod === "qr_code" && (
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-bold text-foreground mb-4">Scan QR Code to Pay</h3>
          <div className="bg-white p-4 rounded-lg inline-block">
            <Image
              src={QR_CODE_IMAGE || "/placeholder.svg"}
              alt="QR Code Payment"
              width={200}
              height={200}
              className="rounded"
            />
          </div>
          <div className="bg-yellow-100 border border-yellow-400 p-3 rounded mt-4 text-xs text-yellow-800">
             Harap bayar sesuai dengan total pesanan anda ke rekening di atas dan unggah bukti transfer.
          </div>
        </div>
      )}
    </div>
  )
}