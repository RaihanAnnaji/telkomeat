import { PaymentMethod } from "./types"

export const BANK_DETAILS = {
  bank: "Bank BRI",
  accountNumber: "6838 0102 4648 532",
  accountName: "WAHYU TRI KASTIWI",
}

export const QR_CODE_IMAGE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kantin_kaf-2uscga0DdPNfDQopo4FqWbWGbGKlFD.jpg"

export const getPaymentMethods = (canteenParam: string): PaymentMethod[] => {
  return canteenParam === "kaf" 
    ? [{ type: "qr_code", label: "QR Code Payment" }]
    : [{ type: "bank_transfer", label: "Bank Transfer" }]
}