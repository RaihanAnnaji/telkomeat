import Image from "next/image"
import StepCard from "./StepCard"

export default function HeroSection() {
  const steps = [
    { number: "1", title: "Pesan", desc: "Pesan Makanan yang ingin anda makan" },
    { number: "2", title: "Bayar", desc: "Bayar pesanan yang anda pesan" },
    { number: "3", title: "Tunggu", desc: "Tunggu pesanan diantar ke anda" },
  ]

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-12 flex-grow">
      <div className="w-full">
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side */}
            <div className="bg-gray-900 p-8 md:p-16 lg:p-20 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-1%201-QybfQR6Y71bgUQiMUvl3ivhnSBz0M3.png"
                  alt="Background watermark"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
                  Pesan Makanan di
                  <br />
                  Kantin DC dengan
                </h1>
                <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary">TelkomEat</p>
              </div>
            </div>

            {/* Right side */}
            <div className="bg-primary p-8 md:p-16 lg:p-20 flex flex-col justify-center items-center relative">
              <div className="relative w-full h-64 sm:h-72 md:h-80 mb-8 flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-2%201-8Ii0cqI5Ze0XdDuDiKUxjvE6MXOR8c.png"
                  alt="Girl eating pizza"
                  width={280}
                  height={320}
                  className="object-contain drop-shadow-lg"
                />
              </div>

              <div className="space-y-4 w-full max-w-xs">
                {steps.map((step) => (
                  <StepCard 
                    key={step.number} 
                    number={step.number} 
                    title={step.title} 
                    desc={step.desc} 
                  />
                ))}
              </div>

              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 space-y-12 text-primary text-3xl font-bold opacity-20">
                <div>1</div>
                <div>2</div>
                <div>3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}