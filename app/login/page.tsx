import { Suspense } from "react"
import LoginForm from "./LoginForm"

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0A0E1A" }}>
        <div style={{ color: "#C9A84C" }}>Chargement...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
