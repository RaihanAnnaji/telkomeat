import Link from "next/link"
import { TEatLogo } from "@/components/auth/logo"
import { ArrowLeft } from "lucide-react"

export default function DeliverPage() {
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
        <h1 className="text-4xl font-bold mb-8">Daftar Sebagai Kurir</h1>

        <div className="bg-white rounded-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Bergabung dengan Tim Pengantaran Kami</h2>
            <p className="text-gray-700">
              Sedang mencari cara fleksibel untuk mendapatkan penghasilan? Bergabunglah dengan TelkomEat sebagai mitra
              kurir dan jadilah bos untuk dirimu sendiri. Kami menawarkan jadwal kerja fleksibel, pendapatan kompetitif,
              dan komunitas yang mendukung.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Persyaratan</h2>
            <p className="text-gray-700">
              Untuk menjadi mitra kurir, kamu perlu memenuhi persyaratan berikut:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Minimal berusia 18 tahun</li>
              <li>Memiliki kartu identitas resmi (KTP)</li>
              <li>Memiliki SIM yang masih berlaku atau identitas resmi lainnya</li>
              <li>Memiliki kendaraan pribadi (motor atau mobil)</li>
              <li>Memiliki smartphone dengan fitur GPS</li>
              <li>Memiliki koneksi internet yang stabil</li>
              <li>Memiliki asuransi tanggung jawab profesional (tergantung wilayah)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cara Kerja</h2>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Daftar</h3>
                  <p className="text-gray-700 text-sm">
                    Lengkapi proses pendaftaran dan unggah dokumen yang diperlukan.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Verifikasi</h3>
                  <p className="text-gray-700 text-sm">
                    Tim kami akan memverifikasi informasi dan dokumen kamu.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Pelatihan</h3>
                  <p className="text-gray-700 text-sm">
                    Selesaikan pelatihan dan onboarding untuk memahami cara kerja platform kami.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Mulai Antar Pesanan</h3>
                  <p className="text-gray-700 text-sm">
                    Terima pesanan dan mulai mendapatkan penghasilan sesuai kecepatanmu sendiri.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Keuntungan</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Jam kerja fleksibel — bisa kerja kapan pun kamu mau</li>
              <li>Pendapatan kompetitif dan pembayaran instan</li>
              <li>Asuransi untuk setiap pemesanan</li>
              <li>Dukungan dan bantuan tersedia 24 jam</li>
              <li>Akses ke acara eksklusif mitra kurir</li>
              <li>Bergabung dengan komunitas kurir yang terus berkembang</li>
            </ul>
          </section>

          <section className="mt-8 bg-primary text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Siap untuk memulai?</h2>
            <p className="mb-4">
              Klik tombol di bawah ini untuk memulai proses pendaftaran. Hanya butuh beberapa menit!
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:opacity-90 transition">
              Daftar Sekarang
            </button>
          </section>
        </div>
      </div>
    </main>
  )
}
