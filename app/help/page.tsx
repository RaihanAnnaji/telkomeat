import Link from "next/link"
import { TEatLogo } from "@/components/auth/logo"
import { ArrowLeft } from "lucide-react"

export default function HelpPage() {
  return (
    <main className="bg-secondary min-h-screen">
      {/* Navigasi */}
      <nav className="bg-secondary border-b border-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/home" className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
            <ArrowLeft size={20} />
            Kembali
          </Link>
          <Link href="/home">
            <TEatLogo />
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Pusat Bantuan</h1>

        <div className="bg-white rounded-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Pertanyaan yang Sering Diajukan</h2>

            <div className="space-y-4">
              <div className="border-b border-tertiary pb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Bagaimana cara memesan makanan?</h3>
                <p className="text-gray-700">
                  Untuk memesan makanan, masuk ke akun TelkomEat Anda, pilih kantin, pilih menu yang diinginkan, lalu lanjutkan ke pembayaran. Pesanan Anda akan disiapkan dan dikirimkan sesuai alamat.
                </p>
              </div>

              <div className="border-b border-tertiary pb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Berapa lama waktu pengiriman?</h3>
                <p className="text-gray-700">
                  Waktu pengiriman bervariasi tergantung pada kantin dan jumlah pesanan yang sedang diproses. Biasanya, pesanan dikirim dalam waktu 20–30 menit setelah dikonfirmasi.
                </p>
              </div>

              <div className="border-b border-tertiary pb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Apakah saya bisa mengubah pesanan setelah dikirim?</h3>
                <p className="text-gray-700">
                  Anda dapat mengubah pesanan dalam waktu 5 menit setelah pemesanan. Setelah itu, silakan hubungi tim dukungan kami untuk meminta perubahan.
                </p>
              </div>

              <div className="border-b border-tertiary pb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Metode pembayaran apa saja yang tersedia?</h3>
                <p className="text-gray-700">
                  Kami menerima berbagai metode pembayaran termasuk kartu kredit, debit, dompet digital, dan transfer bank. Silakan periksa aplikasi untuk melihat semua opsi pembayaran yang tersedia.
                </p>
              </div>

              <div className="border-b border-tertiary pb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Bagaimana cara melaporkan masalah pada pesanan?</h3>
                <p className="text-gray-700">
                  Jika Anda mengalami masalah dengan pesanan, hubungi tim dukungan pelanggan kami melalui aplikasi atau kirim email ke support@telkomeeat.com.
                </p>
              </div>

              <div className="pb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Apakah data pribadi saya aman?</h3>
                <p className="text-gray-700">
                  Ya, kami menggunakan standar keamanan industri untuk melindungi data pribadi dan informasi pembayaran Anda. Silakan lihat Kebijakan Privasi kami untuk detail lebih lanjut.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 bg-primary text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Masih Butuh Bantuan?</h2>
            <p className="mb-4">
              Jika Anda tidak menemukan jawaban atas pertanyaan Anda, jangan ragu untuk menghubungi tim dukungan pelanggan kami.
            </p>
            <a
              href="mailto:support@telkomeeat.com"
              className="inline-block bg-white text-primary px-6 py-2 rounded-lg font-bold hover:opacity-90 transition"
            >
              Hubungi Dukungan
            </a>
          </section>
        </div>
      </div>
    </main>
  )
}
