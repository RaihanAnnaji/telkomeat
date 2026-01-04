import { DeliveryNotesProps } from "./types"

export default function DeliveryNotes({ deliveryNotes, setDeliveryNotes }: DeliveryNotesProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-2xl font-bold text-foreground mb-6">Catatan Pesanan</h2>
      <textarea
        value={deliveryNotes}
        onChange={(e) => setDeliveryNotes(e.target.value)}
        placeholder="Contoh: Kirim ke meja dekat tangga, Gedung Rektorat Lantai 2, atas Nama Baekhyun"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        rows={4}
      />
    </div>
  )
}