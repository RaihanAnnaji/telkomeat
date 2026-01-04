import HomeNavbar from "./components/HomeNavbar"
import HeroSection from "./components/HeroSection"
import CanteenSection from "./components/CanteenSection"
import HomeFooter from "./components/HomeFooter"

export default function HomePage() {
  return (
    <main className="bg-secondary min-h-screen flex flex-col">
      <HomeNavbar activePage="home" />
      <HeroSection />
      <CanteenSection />
      <HomeFooter />
    </main>
  )
}