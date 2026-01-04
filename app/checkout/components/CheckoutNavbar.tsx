import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { TEatLogo } from "@/components/auth/logo"
import { CheckoutNavbarProps } from "./types"

export default function CheckoutNavbar({ canteenParam, isSuccess = false }: CheckoutNavbarProps) {
  return (
    <nav className="bg-secondary border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-12 py-4 flex items-center gap-4">
        <Link 
          href={isSuccess ? "/home" : `/canteen/${canteenParam}`} 
          className="text-gray-600 hover:text-primary transition"
        >
          <ArrowLeft size={24} />
        </Link>
        <Link href="/home">
          <TEatLogo />
        </Link>
        {!isSuccess && (
          <span className="text-foreground font-medium ml-auto">Pesan</span>
        )}
      </div>
    </nav>
  )
}