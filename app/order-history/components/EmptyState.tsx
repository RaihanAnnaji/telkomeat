import Link from "next/link"
import { EmptyStateProps } from "./types"

export default function EmptyState({ onNavigateToHome }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-xl p-12 text-center shadow">
      <p className="text-gray-600 mb-6">Belum ada riwayat pesanan.</p>
      <Link
        href="/home"
        className="inline-block bg-primary text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition"
      >
        Pesan Sekarang
      </Link>
    </div>
  )
}