import Link from "next/link"
import { TEatLogo } from "@/components/auth/logo"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold mb-8">Syarat dan Ketentuan</h1>

        <div className="bg-white rounded-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Persetujuan terhadap Syarat</h2>
            <p className="text-gray-700">
              Dengan mengakses dan menggunakan aplikasi maupun situs web TelkomEat, Anda dianggap telah membaca,
              memahami, dan menyetujui untuk terikat dengan seluruh syarat dan ketentuan yang berlaku.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Lisensi Penggunaan</h2>
            <p className="text-gray-700">
              Izin diberikan untuk mengunduh sementara satu salinan materi (informasi atau perangkat lunak)
              pada TelkomEat untuk keperluan pribadi dan non-komersial. Ini merupakan pemberian lisensi, bukan
              pengalihan hak milik. Berdasarkan lisensi ini, Anda tidak diperbolehkan untuk:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Memodifikasi atau menyalin materi</li>
              <li>Menggunakan materi untuk tujuan komersial atau publik</li>
              <li>Mencoba mendekompilasi atau merekayasa balik perangkat lunak apa pun yang ada</li>
              <li>Menghapus hak cipta atau keterangan kepemilikan lain dari materi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Penyangkalan</h2>
            <p className="text-gray-700">
              Seluruh materi pada TelkomEat disediakan sebagaimana adanya (“as is”). TelkomEat tidak memberikan
              jaminan apa pun, baik tersurat maupun tersirat, termasuk namun tidak terbatas pada jaminan
              kelayakan jual, kesesuaian untuk tujuan tertentu, maupun non-pelanggaran hak kekayaan intelektual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Batasan Tanggung Jawab</h2>
            <p className="text-gray-700">
              Dalam keadaan apa pun, TelkomEat maupun pemasoknya tidak bertanggung jawab atas kerugian apa pun
              (termasuk, namun tidak terbatas pada, kehilangan data, keuntungan, atau gangguan bisnis) yang timbul
              akibat penggunaan atau ketidakmampuan menggunakan materi di TelkomEat.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Akurasi Materi</h2>
            <p className="text-gray-700">
              Materi yang muncul pada TelkomEat dapat mencakup kesalahan teknis, tipografi, atau fotografi.
              TelkomEat tidak menjamin bahwa semua materi di situsnya akurat, lengkap, atau terkini.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Perubahan Ketentuan</h2>
            <p className="text-gray-700">
              TelkomEat dapat merevisi syarat dan ketentuan ini kapan saja tanpa pemberitahuan sebelumnya.
              Dengan terus menggunakan situs atau aplikasi, Anda dianggap menyetujui versi terbaru dari syarat dan ketentuan ini.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Hukum yang Berlaku</h2>
            <p className="text-gray-700">
              Syarat dan ketentuan ini diatur dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia,
              dan Anda dengan ini tunduk pada yurisdiksi eksklusif pengadilan di wilayah tersebut.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
