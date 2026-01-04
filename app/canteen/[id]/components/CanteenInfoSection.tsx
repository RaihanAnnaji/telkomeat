import Image from "next/image"
import { MapPin, Clock, AlertCircle, CheckCircle } from "lucide-react" // Tambah CheckCircle
import { CanteenInfoSectionProps } from "./types"

export default function CanteenInfoSection({ canteen, isActive = true }: CanteenInfoSectionProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-12 py-8">
      <div className="w-full bg-white rounded-3xl overflow-hidden shadow-lg">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-gray-900 p-8 md:p-12 flex flex-col justify-center relative">
            {/* Status Badge - DINAMIS */}
            <div className="absolute top-4 right-4">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                isActive 
                  ? "bg-green-500 text-white" 
                  : "bg-red-500 text-white"
              }`}>
                {isActive ? (
                  <>
                    <CheckCircle size={14} />
                    Buka
                  </>
                ) : (
                  <>
                    <AlertCircle size={14} />
                    Tutup Sementara
                  </>
                )}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{canteen.name}</h1>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-white">
                <MapPin size={20} />
                <span>{canteen.location}</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Clock size={20} />
                <span>{canteen.distance}</span>
              </div>
            </div>
            <div className="bg-primary text-white rounded-full px-6 py-3 inline-block w-fit font-medium mb-8">
              {canteen.hours}
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Jam Operasional</h3>
              <div className="space-y-2 text-sm text-gray-300">
                {canteen.operationalHours.map((op) => (
                  <div key={op.day}>
                    <span className="font-medium">{op.day}:</span> {op.hours}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Informasi Kontak</h3>
              <p className="text-gray-300 text-sm mb-4">
                Jika ada masalah atau pertanyaan mengenai makanan/langganan, silahkan hubungi kami disini.
              </p>
              <p className="text-white font-medium">No. HP: {canteen.phone}</p>
            </div>
          </div>
          <div className="relative h-64 md:h-auto min-h-96 bg-gray-200">
            <Image 
              src={canteen.image || "/placeholder.svg"} 
              alt={canteen.name} 
              fill 
              className="object-cover"
              style={!isActive ? { opacity: 0.7 } : {}}
            />
            {/* Overlay HANYA jika nonaktif */}
            {!isActive && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <AlertCircle size={48} className="mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Sedang Tutup</h3>
                  <p className="text-lg">Kembali dalam waktu dekat</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}