import Link from "next/link"
import { TEatLogo } from "@/components/auth/logo"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-8">Kebijakan Privasi</h1>

        <div className="bg-white rounded-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Pendahuluan</h2>
            <p className="text-gray-700">
              TelkomEat ("kami") mengoperasikan situs web dan aplikasi seluler TelkomEat. Halaman ini menjelaskan
              kebijakan kami terkait pengumpulan, penggunaan, dan pengungkapan data pribadi ketika Anda menggunakan
              layanan kami, serta pilihan yang Anda miliki terkait data tersebut.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Pengumpulan dan Penggunaan Informasi</h2>
            <p className="text-gray-700">
              Kami mengumpulkan berbagai jenis informasi untuk berbagai keperluan dalam rangka menyediakan dan
              meningkatkan layanan kami kepada Anda.
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>
                <strong>Data Pribadi:</strong> Saat menggunakan layanan kami, kami mungkin meminta Anda memberikan
                informasi pribadi tertentu yang dapat digunakan untuk menghubungi atau mengidentifikasi Anda ("Data
                Pribadi"). Ini dapat mencakup, namun tidak terbatas pada: alamat email, nama depan dan belakang,
                cookie, dan data penggunaan.
              </li>
              <li>
                <strong>Data Penggunaan:</strong> Kami juga dapat mengumpulkan informasi tentang bagaimana layanan kami
                diakses dan digunakan ("Data Penggunaan"). Ini dapat mencakup informasi seperti alamat IP perangkat Anda,
                jenis browser, versi browser, halaman yang Anda kunjungi, waktu dan tanggal kunjungan, lama waktu di
                setiap halaman, serta data diagnostik lainnya.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Penggunaan Data</h2>
            <p className="text-gray-700">TelkomEat menggunakan data yang dikumpulkan untuk berbagai tujuan berikut:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Untuk menyediakan dan memelihara layanan kami</li>
              <li>Untuk memberi tahu Anda tentang perubahan pada layanan kami</li>
              <li>Untuk memungkinkan Anda berpartisipasi dalam fitur interaktif layanan kami</li>
              <li>Untuk menyediakan dukungan pelanggan</li>
              <li>Untuk mengumpulkan analisis atau informasi berharga guna meningkatkan layanan kami</li>
              <li>Untuk memantau penggunaan layanan kami</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Keamanan Data</h2>
            <p className="text-gray-700">
              Keamanan data Anda sangat penting bagi kami, namun harap diingat bahwa tidak ada metode transmisi melalui
              internet atau penyimpanan elektronik yang sepenuhnya aman. Meskipun kami berupaya menggunakan cara yang
              dapat diterima secara komersial untuk melindungi Data Pribadi Anda, kami tidak dapat menjamin keamanan
              absolutnya.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Perubahan Kebijakan Privasi Ini</h2>
            <p className="text-gray-700">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda jika ada
              perubahan dengan memposting versi terbaru di halaman ini dan memperbarui "tanggal berlaku" di bagian atas
              Kebijakan Privasi ini.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Hubungi Kami</h2>
            <p className="text-gray-700">
              Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami melalui halaman kontak
              di situs web kami.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
