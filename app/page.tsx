import { redirect } from "next/navigation"

export default function Page() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (token) {
      redirect("/home")
    } else {
      redirect("/login")
    }
  }
}
