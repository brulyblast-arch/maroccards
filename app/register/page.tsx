"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, ShieldCheck } from "lucide-react";

const CITIES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Meknès", "Oujda", "Kénitra", "Tétouan", "Safi", "Autre"
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const checkUsername = async (u: string) => {
    if (u.length < 3) return;
    const { data } = await supabase.from("profiles").select("username").eq("username", u).single();
    if (data) setError("Ce nom d'utilisateur est déjà pris.");
    else setError("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (password !== confirmPassword) { setError("Les mots de passe ne correspondent pas."); return; }
      if (password.length < 8) { setError("Le mot de passe doit contenir au moins 8 caractères."); return; }
      setStep(2);
      return;
    }

    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, city, role },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) {
      setError(signUpError.message.includes("already registered")
        ? "Cet email est déjà utilisé."
        : "Erreur lors de l'inscription. Réessaie.");
      setLoading(false);
      return;
    }

    // Create profile
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        username,
        city,
        role,
        is_verified: false,
        is_admin: false,
        rating: 0,
        sales_count: 0,
        created_at: new Date().toISOString(),
      });
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleGoogleRegister = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const PasswordStrength = ({ pwd }: { pwd: string }) => {
    const checks = [
      { ok: pwd.length >= 8, label: "8 caractères minimum" },
      { ok: /[A-Z]/.test(pwd), label: "Une majuscule" },
      { ok: /[0-9]/.test(pwd), label: "Un chiffre" },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
        {checks.map(c => (
          <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem" }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: c.ok ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${c.ok ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.1)"}`,
              fontSize: "0.6rem", color: c.ok ? "#22C55E" : "#8892A4",
            }}>{c.ok ? "✓" : ""}</div>
            <span style={{ color: c.ok ? "#22C55E" : "#8892A4" }}>{c.label}</span>
          </div>
        ))}
      </div>
    );
  };

  if (success) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #0A0E1A, #0F1525)", padding: "80px 20px",
      }}>
        <div style={{
          maxWidth: 460, width: "100%", textAlign: "center",
          background: "rgba(15,21,37,0.95)", border: "1px solid rgba(34,197,94,0.25)",
          borderRadius: 20, padding: "48px 40px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px",
            background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <CheckCircle size={36} color="#22C55E" />
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 12 }}>
            Compte créé ! 🎉
          </h2>
          <p style={{ color: "#8892A4", fontSize: "0.9rem", marginBottom: 24, lineHeight: 1.7 }}>
            Un email de confirmation a été envoyé à <strong style={{ color: "#E8EAF0" }}>{email}</strong>.
            <br />Clique sur le lien dans l'email pour activer ton compte.
          </p>
          <div style={{
            background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: 10, padding: "14px 18px", fontSize: "0.83rem", color: "#C9A84C",
            marginBottom: 28, textAlign: "left",
          }}>
            💡 Vérifie aussi ton dossier <strong>Spam/Courrier indésirable</strong> si tu ne reçois pas l'email dans 2 minutes.
          </div>
          <Link href="/login">
            <button style={{
              padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: "0.9rem",
              background: "linear-gradient(135deg, #C9A84C, #F0C96B)",
              color: "#0A0E1A", border: "none", cursor: "pointer",
            }}>
              Aller à la connexion →
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0A0E1A 0%, #0F1525 50%, #0A0E1A 100%)",
      padding: "80px 20px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "15%", right: "15%", width: 350, height: 350,
        background: "radial-gradient(circle, rgba(201,168,76,0.06), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        width: "100%", maxWidth: 500,
        background: "rgba(15,21,37,0.95)",
        border: "1px solid rgba(201,168,76,0.2)",
        borderRadius: 20, padding: "44px 40px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        backdropFilter: "blur(20px)",
        position: "relative", zIndex: 1,
      }}>
        {/* Logo & Title */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{
              width: 44, height: 44, margin: "0 auto 12px",
              background: "linear-gradient(135deg, #C9A84C, #F0C96B)",
              borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", fontWeight: 900, color: "#0A0E1A",
            }}>MC</div>
          </Link>
          <h1 style={{ fontSize: "1.55rem", fontWeight: 800, marginBottom: 6 }}>
            Rejoins MarocCards 🇲🇦
          </h1>
          <p style={{ color: "#8892A4", fontSize: "0.88rem" }}>
            Inscription gratuite, sans engagement
          </p>
        </div>

        {/* Step Indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
          {[1, 2].map(s => (
            <div key={s} style={{ flex: 1, display: "flex", alignItems: "center", flexDirection: "column", gap: 4 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: step >= s ? "linear-gradient(135deg, #C9A84C, #F0C96B)" : "rgba(255,255,255,0.05)",
                border: `2px solid ${step >= s ? "#C9A84C" : "rgba(255,255,255,0.1)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.8rem", fontWeight: 700,
                color: step >= s ? "#0A0E1A" : "#8892A4",
              }}>{s}</div>
              <span style={{ fontSize: "0.7rem", color: step >= s ? "#C9A84C" : "#8892A4" }}>
                {s === 1 ? "Identifiants" : "Profil"}
              </span>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: 10, marginBottom: 18, color: "#EF4444", fontSize: "0.84rem",
          }}>
            <AlertCircle size={15} /> {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {step === 1 ? (
            <>
              {/* Google */}
              <button type="button" onClick={handleGoogleRegister} style={{
                width: "100%", padding: "12px", borderRadius: 10,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)",
                color: "#E8EAF0", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuer avec Google
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                <span style={{ color: "#8892A4", fontSize: "0.78rem" }}>ou</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: 6, color: "#8892A4" }}>Email</label>
                <div style={{ position: "relative" }}>
                  <Mail size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#8892A4" }} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ton@email.com" required
                    style={{ width: "100%", padding: "11px 13px 11px 40px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#E8EAF0", fontSize: "0.88rem", outline: "none" }}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = "#C9A84C"}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: 6, color: "#8892A4" }}>Mot de passe</label>
                <div style={{ position: "relative" }}>
                  <Lock size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#8892A4" }} />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                    style={{ width: "100%", padding: "11px 40px 11px 40px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#E8EAF0", fontSize: "0.88rem", outline: "none" }}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = "#C9A84C"}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#8892A4", cursor: "pointer" }}>
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {password && <PasswordStrength pwd={password} />}
              </div>

              {/* Confirm Password */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: 6, color: "#8892A4" }}>Confirmer le mot de passe</label>
                <div style={{ position: "relative" }}>
                  <Lock size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#8892A4" }} />
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" required
                    style={{
                      width: "100%", padding: "11px 13px 11px 40px",
                      background: confirmPassword && confirmPassword !== password ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${confirmPassword && confirmPassword !== password ? "rgba(239,68,68,0.4)" : confirmPassword && confirmPassword === password ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: 10, color: "#E8EAF0", fontSize: "0.88rem", outline: "none",
                    }}
                  />
                </div>
              </div>

              <button type="submit" style={{
                width: "100%", padding: "13px", marginTop: 4,
                background: "linear-gradient(135deg, #C9A84C, #F0C96B)",
                color: "#0A0E1A", border: "none", borderRadius: 10,
                fontSize: "0.93rem", fontWeight: 700, cursor: "pointer",
              }}>
                Continuer →
              </button>
            </>
          ) : (
            <>
              {/* Username */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: 6, color: "#8892A4" }}>
                  Nom d'utilisateur <span style={{ color: "#C9A84C" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <User size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#8892A4" }} />
                  <input type="text" value={username} onChange={e => { setUsername(e.target.value); checkUsername(e.target.value); }}
                    placeholder="ex: casa_collector" required minLength={3} maxLength={20}
                    style={{ width: "100%", padding: "11px 13px 11px 40px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#E8EAF0", fontSize: "0.88rem", outline: "none" }}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = "#C9A84C"}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
                <p style={{ fontSize: "0.73rem", color: "#8892A4", marginTop: 5 }}>3-20 caractères, ce nom sera visible par tous</p>
              </div>

              {/* City */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: 6, color: "#8892A4" }}>Ville</label>
                <select value={city} onChange={e => setCity(e.target.value)} required
                  style={{ width: "100%", padding: "11px 13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: city ? "#E8EAF0" : "#8892A4", fontSize: "0.88rem", outline: "none", cursor: "pointer" }}
                  onFocus={e => (e.target as HTMLElement).style.borderColor = "#C9A84C"}
                  onBlur={e => (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"}
                >
                  <option value="" style={{ background: "#0F1525" }}>Choisir ta ville</option>
                  {CITIES.map(c => <option key={c} value={c} style={{ background: "#0F1525" }}>{c}</option>)}
                </select>
              </div>

              {/* Role */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: 10, color: "#8892A4" }}>
                  Tu veux...
                </label>
                <div style={{ display: "flex", gap: 12 }}>
                  {[
                    { id: "buyer", icon: "🛒", title: "Acheter des cartes", desc: "Parcourir et acheter" },
                    { id: "seller", icon: "🏪", title: "Vendre mes cartes", desc: "Créer des annonces" },
                  ].map(r => (
                    <div key={r.id} onClick={() => setRole(r.id as "buyer" | "seller")} style={{
                      flex: 1, padding: "14px 12px", borderRadius: 12, cursor: "pointer",
                      border: `2px solid ${role === r.id ? "#C9A84C" : "rgba(255,255,255,0.08)"}`,
                      background: role === r.id ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.03)",
                      textAlign: "center", transition: "all 0.2s",
                    }}>
                      <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>{r.icon}</div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: role === r.id ? "#C9A84C" : "#E8EAF0", marginBottom: 2 }}>{r.title}</div>
                      <div style={{ fontSize: "0.72rem", color: "#8892A4" }}>{r.desc}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.73rem", color: "#8892A4", marginTop: 8 }}>Tu pourras changer ça plus tard dans ton profil.</p>
              </div>

              {/* Terms */}
              <div style={{
                background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 10, padding: "12px 14px", fontSize: "0.78rem", color: "#8892A4",
                display: "flex", gap: 10, alignItems: "flex-start",
              }}>
                <ShieldCheck size={15} style={{ color: "#C9A84C", marginTop: 1, flexShrink: 0 }} />
                En créant un compte, tu acceptes nos{" "}
                <Link href="/terms" style={{ color: "#C9A84C" }}>Conditions d'utilisation</Link>{" "}
                et notre{" "}
                <Link href="/privacy" style={{ color: "#C9A84C" }}>Politique de confidentialité</Link>.
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button type="button" onClick={() => setStep(1)} style={{
                  flex: 1, padding: "12px", borderRadius: 10, fontWeight: 600, fontSize: "0.9rem",
                  background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                  color: "#E8EAF0", cursor: "pointer",
                }}>← Retour</button>
                <button type="submit" disabled={loading} style={{
                  flex: 2, padding: "12px",
                  background: loading ? "rgba(201,168,76,0.5)" : "linear-gradient(135deg, #C9A84C, #F0C96B)",
                  color: "#0A0E1A", border: "none", borderRadius: 10,
                  fontSize: "0.93rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                }}>
                  {loading ? "Création en cours..." : "🎉 Créer mon compte"}
                </button>
              </div>
            </>
          )}
        </form>

        <p style={{ textAlign: "center", marginTop: 22, fontSize: "0.85rem", color: "#8892A4" }}>
          Déjà un compte ?{" "}
          <Link href="/login" style={{ color: "#C9A84C", fontWeight: 600 }}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
