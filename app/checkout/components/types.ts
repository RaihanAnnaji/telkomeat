export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface PaymentMethod {
  type: "bank_transfer" | "qr_code"
  label: string
}

export interface BankDetails {
  bank: string
  accountNumber: string
  accountName: string
}

export interface CheckoutNavbarProps {
  canteenParam: string
  isSuccess?: boolean
}

export interface OrderSummaryProps {
  cart: CartItem[]
}

export interface PaymentMethodSectionProps {
  paymentMethod: "bank_transfer" | "qr_code" | null
  setPaymentMethod: (method: "bank_transfer" | "qr_code" | null) => void
  availablePaymentMethods: PaymentMethod[]
  total: number
}

export interface PaymentProofUploadProps {
  paymentProof: File | null
  previewUrl: string
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface DeliveryNotesProps {
  deliveryNotes: string
  setDeliveryNotes: (notes: string) => void
}

export interface OrderTotalProps {
  cart: CartItem[]
  canteenName: string
  paymentMethod: "bank_transfer" | "qr_code" | null
  paymentProof: File | null
  onPlaceOrder: (total: number) => void
}

export interface SuccessModalProps {
  canteenName: string
  total: number
  totalItems: number
}