import Link from "next/link"
import { TEatLogo } from "@/components/auth/logo"
import { ArrowLeft } from "lucide-react"

export default function CookiesPage() {
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
        <h1 className="text-4xl font-bold mb-8">Kebijakan Cookie</h1>

        <div className="bg-white rounded-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Apa Itu Cookie?</h2>
            <p className="text-gray-700">
              Cookie adalah potongan data kecil yang disimpan di perangkat Anda saat Anda mengunjungi situs web atau menggunakan aplikasi kami.
              Cookie membantu kami memberikan pengalaman yang lebih baik dengan mengingat preferensi Anda dan memahami bagaimana
              Anda menggunakan layanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Jenis Cookie yang Kami Gunakan</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>
                <strong>Cookie Esensial:</strong> Diperlukan agar situs web berfungsi dengan baik. Cookie ini
                memungkinkan fungsionalitas inti seperti keamanan, manajemen jaringan, dan aksesibilitas.
              </li>
              <li>
                <strong>Cookie Kinerja:</strong> Mengumpulkan informasi tentang bagaimana Anda menggunakan situs kami, seperti
                halaman mana yang Anda kunjungi dan apakah Anda mengalami kesalahan.
              </li>
              <li>
                <strong>Cookie Fungsionalitas:</strong> Mengingat preferensi dan pilihan Anda untuk memberikan pengalaman yang lebih
                personal.
              </li>
              <li>
                <strong>Cookie Pemasaran:</strong> Melacak aktivitas online Anda untuk membantu kami memahami minat Anda dan
                menampilkan iklan yang lebih relevan.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Pilihan Anda Terkait Cookie</h2>
            <p className="text-gray-700">
              Sebagian besar browser web memungkinkan Anda mengontrol cookie melalui pengaturannya. Anda dapat menolak cookie atau
              menerima pemberitahuan ketika cookie dikirim. Namun, memblokir cookie dapat memengaruhi kemampuan Anda untuk menggunakan
              beberapa fitur di situs kami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cookie Pihak Ketiga</h2>
            <p className="text-gray-700">
              Kami juga dapat mengizinkan perusahaan pihak ketiga untuk menempatkan cookie di perangkat Anda untuk tujuan analitik,
              periklanan, dan lainnya. Perusahaan-perusahaan ini diwajibkan untuk menangani informasi Anda sesuai dengan kebijakan ini
              dan hukum yang berlaku.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Pembaruan Kebijakan Ini</h2>
            <p className="text-gray-700">
              Kami dapat memperbarui Kebijakan Cookie ini dari waktu ke waktu untuk mencerminkan perubahan praktik kami atau karena alasan
              operasional, hukum, atau peraturan lainnya. Penggunaan Anda yang berkelanjutan atas situs web atau aplikasi kami setelah perubahan
              tersebut berarti Anda menerima kebijakan yang diperbarui.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Hubungi Kami</h2>
            <p className="text-gray-700">
              Jika Anda memiliki pertanyaan mengenai penggunaan cookie atau Kebijakan Cookie ini, silakan hubungi kami di
              privacy@telkomeeat.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
