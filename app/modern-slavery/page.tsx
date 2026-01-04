import Link from "next/link"
import { TEatLogo } from "@/components/auth/logo"
import { ArrowLeft } from "lucide-react"

export default function ModernSlaveryPage() {
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
        <h1 className="text-4xl font-bold mb-8">Pernyataan Anti Perbudakan Modern</h1>

        <div className="bg-white rounded-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Komitmen Kami</h2>
            <p className="text-gray-700">
              TelkomEat berkomitmen untuk menjunjung standar tertinggi dalam etika dan integritas di seluruh kegiatan bisnis kami. 
              Kami menerapkan kebijakan tanpa toleransi terhadap segala bentuk perbudakan dan perdagangan manusia 
              dalam organisasi maupun rantai pasokan kami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Kebijakan Kami</h2>
            <p className="text-gray-700">
              Kami telah menerapkan kebijakan komprehensif untuk mencegah terjadinya perbudakan dan perdagangan manusia 
              dalam setiap operasi kami. Kebijakan tersebut mencakup:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Praktik ketenagakerjaan dan hak asasi manusia</li>
              <li>Evaluasi pemasok dan mitra bisnis</li>
              <li>Prosedur pelaporan (whistleblowing)</li>
              <li>Pelatihan dan peningkatan kesadaran bagi seluruh karyawan</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Rantai Pasokan</h2>
            <p className="text-gray-700">
              Kami bekerja sama dengan pemasok dan mitra yang memiliki komitmen yang sama terhadap praktik etis 
              dan penghormatan terhadap hak asasi manusia. Kami melakukan uji kelayakan (due diligence) terhadap rantai pasokan 
              dan mewajibkan semua mitra bisnis untuk mematuhi undang-undang ketenagakerjaan yang berlaku 
              serta Kode Etik kami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Pelaporan</h2>
            <p className="text-gray-700">
              Jika Anda memiliki kekhawatiran mengenai potensi perbudakan atau perdagangan manusia 
              dalam operasi atau rantai pasokan kami, harap segera laporkan melalui saluran pelaporan rahasia kami. 
              Kami mendorong pelaporan dan menjamin tidak akan ada tindakan balasan terhadap siapa pun 
              yang melapor dengan itikad baik.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Perbaikan Berkelanjutan</h2>
            <p className="text-gray-700">
              Kami secara rutin meninjau dan memperbarui kebijakan serta praktik kami untuk memastikan efektivitas 
              dalam mencegah perbudakan dan perdagangan manusia. 
              Kami berkomitmen pada transparansi dan akuntabilitas dalam setiap upaya kami.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
