"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, XCircle } from "lucide-react"
import { CANTEENS } from "../../canteen/[id]/components/constants"

export default function CanteenSection() {
  const [canteenStatus, setCanteenStatus] = useState<any>({})
  const [loading, setLoading] = useState(true)

  const canteenList = [
    { id: 1, slug: "kaf", name: CANTEENS.kaf.name, image: CANTEENS.kaf.image },
    { id: 2, slug: "neo01", name: CANTEENS.neo01.name, image: CANTEENS.neo01.image }
  ]

  useEffect(() => {
    async function checkStatus() {
      const status: any = {}

      for (const kantin of canteenList) {
        try {
          const res = await fetch(`http://localhost:8000/api/canteen/${kantin.id}/products`, {
            cache: "no-store",
          })
          const data = await res.json()

          // Jika data produk kosong → kantin tutup
          status[kantin.slug] = data.length > 0 ? "open" : "closed"
        } catch (error) {
          status[kantin.slug] = "closed" // error = anggap tutup
        }
      }

      setCanteenStatus(status)
      setLoading(false)
    }

    checkStatus()
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Daftar Kantin</h2>
        <p className="text-center">Memeriksa status kantin...</p>
      </section>
    )
  }

  return (
    <section id="kantin" className="py-16 px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-bold text-center mb-12">Daftar Kantin</h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {canteenList.map((canteen) => {
          const status = canteenStatus[canteen.slug]

          return (
            <div key={canteen.slug} className="relative">
              <Link
                href={`/canteen/${canteen.slug}`}
                className="relative h-64 lg:h-80 rounded-2xl overflow-hidden group block cursor-pointer"
              >
                <Image
                  src={canteen.image}
                  alt={canteen.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />

                {/* STATUS BADGE */}
                <div className="absolute top-4 right-4 z-10">
                  {status === "open" ? (
                    <div className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
                      <CheckCircle size={12} />
                      <span>Buka</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                      <XCircle size={12} />
                      <span>Tutup</span>
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">{canteen.name}</h3>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
