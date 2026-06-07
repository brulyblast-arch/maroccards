"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(
        error.message.includes("Invalid login credentials")
          ? "Email ou mot de passe incorrect."
          : error.message.includes("Email not confirmed")
          ? "Vérifie ta boîte email et confirme ton compte."
          : "Une erreur est survenue. Réessaie."
      );
      setLoading(false);
    } else {
      setSuccess("Connexion réussie ! Redirection...");
      setTimeout(() => { router.push(redirect); router.refresh(); }, 800);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}` },
    });
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0A0E1A 0%, #0F1525 50%, #0A0E1A 100%)",
      padding: "80px 20px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(201,168,76,0.06), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(79,142,247,0.06), transparent 70%)", pointerEvents: "none" }} />

      <div style={{
        width: "100%", maxWidth: 460, background: "rgba(15,21,37,0.95)",
        border: "1px solid rgba(201,168,76,0.2)", borderRadius: 20, padding: "44px 40px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)", backdropFilter: "blur(20px)", position: "relative", zIndex: 1,
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/">
            <div style={{ width: 44, height: 44, background: "linear-gradient(135deg, #C9A84C, #F0C96B)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 900, color: "#0A0E1A", margin: "0 auto 12px", boxShadow: "0 4px 20px rgba(201,168,76,0.4)" }}>MC</div>
          </Link>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 6 }}>Bon retour ! 👋</h1>
          <p style={{ color: "#8892A4", fontSize: "0.9rem" }}>Connecte-toi à ton compte MarocCards</p>
        </div>

        <button onClick={handleGoogleLogin} style={{ width: "100%", padding: "12px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "#E8EAF0", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 24 }}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuer avec Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ color: "#8892A4", fontSize: "0.8rem" }}>ou avec ton email</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, marginBottom: 20, color: "#EF4444", fontSize: "0.85rem" }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}
        {success && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 10, marginBottom: 20, color: "#22C55E", fontSize: "0.85rem" }}>
            <CheckCircle size={16} /> {success}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "0.83rem", fontWeight: 600, marginBottom: 7, color: "#8892A4" }}>Adresse email</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#8892A4" }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ton@email.com" required
                style={{ width: "100%", padding: "12px 14px 12px 42px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#E8EAF0", fontSize: "0.9rem", outline: "none" }}
                onFocus={e => (e.target as HTMLElement).style.borderColor = "#C9A84C"}
                onBlur={e => (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"}
              />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
              <label style={{ fontSize: "0.83rem", fontWeight: 600, color: "#8892A4" }}>Mot de passe</label>
              <Link href="/forgot-password" style={{ fontSize: "0.78rem", color: "#C9A84C" }}>Mot de passe oublié ?</Link>
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#8892A4" }} />
              <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                style={{ width: "100%", padding: "12px 44px 12px 42px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#E8EAF0", fontSize: "0.9rem", outline: "none" }}
                onFocus={e => (e.target as HTMLElement).style.borderColor = "#C9A84C"}
                onBlur={e => (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#8892A4", cursor: "pointer" }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "13px", background: loading ? "rgba(201,168,76,0.5)" : "linear-gradient(135deg, #C9A84C, #F0C96B)", color: "#0A0E1A", border: "none", borderRadius: 10, fontSize: "0.95rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginTop: 4 }}>
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: "0.87rem", color: "#8892A4" }}>
          Pas encore de compte ?{" "}
          <Link href="/register" style={{ color: "#C9A84C", fontWeight: 600 }}>Créer un compte gratuit</Link>
        </p>
      </div>
    </div>
  );
}
