import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-secondary">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary rounded-full translate-x-0 translate-y-0"
          style={{ borderBottomRightRadius: "100px" }}
        />
        <div
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-primary rounded-full translate-x-0 translate-y-0"
          style={{ borderTopLeftRadius: "100px" }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <RegisterForm />
      </div>
    </main>
  )
}
