import Image from "next/image"
import { Upload } from "lucide-react"
import { PaymentProofUploadProps } from "./types"

export default function PaymentProofUpload({ paymentProof, previewUrl, onFileChange }: PaymentProofUploadProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-2xl font-bold text-foreground mb-6">Upload Bukti Pembayaran</h2>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        {previewUrl ? (
          <div className="space-y-4">
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src={previewUrl || "/placeholder.svg"}
                alt="Payment proof preview"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{paymentProof?.name}</p>
              <button
                onClick={() => document.getElementById("file-input")?.click()}
                className="text-primary hover:underline text-sm mt-2"
              >
                Change File
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload size={32} className="mx-auto text-gray-400" />
            <div>
              <p className="font-medium text-foreground">Upload Bukti Pembayaran</p>
              <p className="text-sm text-gray-600">Screenshot of transfer or QR payment</p>
            </div>
            <button
              onClick={() => document.getElementById("file-input")?.click()}
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition inline-block"
            >
              Choose File
            </button>
          </div>
        )}
        <input id="file-input" type="file" accept="image/*" onChange={onFileChange} className="hidden" />
      </div>
    </div>
  )
}