import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import {
  ShoppingBag, Package, Star, Bell, TrendingUp,
  Plus, Eye, Heart, Shield, AlertTriangle
} from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?redirect=/dashboard')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: myListings } = await supabase
    .from('listings')
    .select('*, cards(name, game)')
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: myOrders } = await supabase
    .from('orders')
    .select('*, listings(*, cards(name))')
    .eq('buyer_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: myWantlist } = await supabase
    .from('wantlist')
    .select('*, cards(name, game)')
    .eq('user_id', user.id)
    .limit(5)

  const stats = [
    { label: "Annonces actives", value: myListings?.filter(l => l.status === 'active').length || 0, icon: <Package size={20} />, color: "#C9A84C" },
    { label: "Commandes passées", value: myOrders?.length || 0, icon: <ShoppingBag size={20} />, color: "#4F8EF7" },
    { label: "Ma note", value: profile?.rating ? `${profile.rating.toFixed(1)}★` : "—", icon: <Star size={20} />, color: "#F59E0B" },
    { label: "Ventes réalisées", value: profile?.sales_count || 0, icon: <TrendingUp size={20} />, color: "#22C55E" },
  ]

  const STATUS_LABELS: Record<string, { label: string; color: string }> = {
    active: { label: "Active", color: "#22C55E" },
    pending: { label: "En attente", color: "#F59E0B" },
    sold: { label: "Vendue", color: "#8892A4" },
    suspended: { label: "Suspendue", color: "#EF4444" },
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0E1A" }}>
      <Navbar />
      <div style={{ paddingTop: 70 }}>

        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #0F1525, #151D35)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          padding: "40px",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 60, height: 60, borderRadius: "50%",
                background: "linear-gradient(135deg, #C9A84C, #F0C96B)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", fontWeight: 900, color: "#0A0E1A",
              }}>
                {profile?.username?.[0]?.toUpperCase() || "?"}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h1 style={{ fontSize: "1.4rem", fontWeight: 800 }}>
                    Bonjour, {profile?.username || "joueur"} ! 👋
                  </h1>
                  {profile?.is_verified && (
                    <span style={{
                      padding: "3px 10px", borderRadius: 50, fontSize: "0.72rem", fontWeight: 700,
                      background: "rgba(34,197,94,0.15)", color: "#22C55E",
                      border: "1px solid rgba(34,197,94,0.3)",
                    }}>✓ Vendeur Agréé</span>
                  )}
                  {profile?.is_admin && (
                    <span style={{
                      padding: "3px 10px", borderRadius: 50, fontSize: "0.72rem", fontWeight: 700,
                      background: "rgba(239,68,68,0.15)", color: "#EF4444",
                      border: "1px solid rgba(239,68,68,0.3)",
                    }}>🛡️ Admin</span>
                  )}
                </div>
                <p style={{ color: "#8892A4", fontSize: "0.88rem" }}>
                  📍 {profile?.city || "Maroc"} · Membre depuis {new Date(profile?.created_at || Date.now()).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
            <Link href="/sell">
              <button style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 10,
                background: "linear-gradient(135deg, #C9A84C, #F0C96B)",
                color: "#0A0E1A", border: "none", fontWeight: 700,
                fontSize: "0.9rem", cursor: "pointer",
              }}>
                <Plus size={18} /> Poster une annonce
              </button>
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px" }}>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
            {stats.map(s => (
              <div key={s.label} style={{
                background: "#111827", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14, padding: "22px 24px",
                display: "flex", alignItems: "center", gap: 16,
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12,
                  background: `${s.color}15`, border: `1px solid ${s.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: s.color,
                }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: "0.78rem", color: "#8892A4" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Not verified warning */}
          {!profile?.is_verified && profile?.role === "seller" && (
            <div style={{
              background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: 14, padding: "18px 22px", marginBottom: 30,
              display: "flex", alignItems: "flex-start", gap: 14,
            }}>
              <AlertTriangle size={20} style={{ color: "#F59E0B", marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, color: "#F59E0B", marginBottom: 4 }}>
                  Tu es vendeur standard — deviens agréé !
                </div>
                <div style={{ fontSize: "0.84rem", color: "#8892A4" }}>
                  Après 10 ventes réussies avec 4.5★ minimum, tu obtiens automatiquement le badge Vendeur Agréé ✅.
                  Les vendeurs agréés n'ont plus besoin de poster une vidéo pour chaque carte.
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

            {/* My Listings */}
            <div style={{
              background: "#111827", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, overflow: "hidden",
            }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                  <Package size={18} style={{ color: "#C9A84C" }} /> Mes annonces
                </h2>
                <Link href="/sell" style={{ fontSize: "0.78rem", color: "#C9A84C" }}>+ Ajouter</Link>
              </div>
              <div style={{ padding: "12px 0" }}>
                {myListings && myListings.length > 0 ? myListings.map((listing: any) => (
                  <div key={listing.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{listing.cards?.name || "Carte"}</div>
                      <div style={{ fontSize: "0.75rem", color: "#8892A4" }}>{listing.cards?.game} · {listing.condition}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontWeight: 700, color: "#C9A84C", fontSize: "0.9rem" }}>{listing.price} MAD</span>
                      <span style={{
                        padding: "2px 8px", borderRadius: 20, fontSize: "0.68rem", fontWeight: 600,
                        background: `${STATUS_LABELS[listing.status]?.color || "#8892A4"}20`,
                        color: STATUS_LABELS[listing.status]?.color || "#8892A4",
                        border: `1px solid ${STATUS_LABELS[listing.status]?.color || "#8892A4"}40`,
                      }}>{STATUS_LABELS[listing.status]?.label || listing.status}</span>
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: "32px 24px", textAlign: "center", color: "#8892A4", fontSize: "0.88rem" }}>
                    <Package size={32} style={{ marginBottom: 10, opacity: 0.4, display: "block", margin: "0 auto 10px" }} />
                    Aucune annonce pour l'instant.<br />
                    <Link href="/sell" style={{ color: "#C9A84C" }}>Poste ta première carte →</Link>
                  </div>
                )}
              </div>
            </div>

            {/* My Orders */}
            <div style={{
              background: "#111827", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, overflow: "hidden",
            }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                  <ShoppingBag size={18} style={{ color: "#4F8EF7" }} /> Mes commandes
                </h2>
                <Link href="/orders" style={{ fontSize: "0.78rem", color: "#C9A84C" }}>Voir tout</Link>
              </div>
              <div style={{ padding: "12px 0" }}>
                {myOrders && myOrders.length > 0 ? myOrders.map((order: any) => (
                  <div key={order.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{order.listings?.cards?.name || "Carte"}</div>
                      <div style={{ fontSize: "0.75rem", color: "#8892A4" }}>
                        {new Date(order.created_at).toLocaleDateString("fr-FR")}
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: "#4F8EF7", fontSize: "0.9rem" }}>{order.total} MAD</div>
                  </div>
                )) : (
                  <div style={{ padding: "32px 24px", textAlign: "center", color: "#8892A4", fontSize: "0.88rem" }}>
                    <ShoppingBag size={32} style={{ marginBottom: 10, opacity: 0.4, display: "block", margin: "0 auto 10px" }} />
                    Aucune commande pour l'instant.<br />
                    <Link href="/cards" style={{ color: "#C9A84C" }}>Explorer les cartes →</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Want List */}
            <div style={{
              background: "#111827", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, overflow: "hidden",
            }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                  <Heart size={18} style={{ color: "#EF4444" }} /> Ma Want List
                </h2>
                <Link href="/wantlist" style={{ fontSize: "0.78rem", color: "#C9A84C" }}>Gérer</Link>
              </div>
              <div style={{ padding: "12px 0" }}>
                {myWantlist && myWantlist.length > 0 ? myWantlist.map((w: any) => (
                  <div key={w.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{w.cards?.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#8892A4" }}>{w.cards?.game}</div>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#8892A4" }}>Budget max: {w.max_price || "—"} MAD</span>
                  </div>
                )) : (
                  <div style={{ padding: "32px 24px", textAlign: "center", color: "#8892A4", fontSize: "0.88rem" }}>
                    <Heart size={32} style={{ marginBottom: 10, opacity: 0.4, display: "block", margin: "0 auto 10px" }} />
                    Ta want list est vide.<br />
                    <Link href="/wantlist" style={{ color: "#C9A84C" }}>Ajouter des cartes →</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              background: "#111827", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: "24px",
            }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                <Bell size={18} style={{ color: "#F59E0B" }} /> Actions rapides
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { href: "/sell", icon: <Plus size={16} />, label: "Poster une nouvelle annonce", color: "#C9A84C" },
                  { href: "/cards", icon: <Eye size={16} />, label: "Parcourir toutes les cartes", color: "#4F8EF7" },
                  { href: "/wantlist", icon: <Heart size={16} />, label: "Gérer ma Want List", color: "#EF4444" },
                  { href: "/profile", icon: <Shield size={16} />, label: "Modifier mon profil", color: "#22C55E" },
                  ...(profile?.is_admin ? [{ href: "/admin", icon: <Shield size={16} />, label: "🛡️ Tableau de bord Admin", color: "#EF4444" }] : []),
                ].map(action => (
                  <Link key={action.href} href={action.href}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                      borderRadius: 10, border: "1px solid rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.2s",
                      color: "#8892A4", fontSize: "0.86rem",
                    }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = `${action.color}0d`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${action.color}30`;
                        (e.currentTarget as HTMLElement).style.color = action.color;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                        (e.currentTarget as HTMLElement).style.color = "#8892A4";
                      }}
                    >
                      <span style={{ color: action.color }}>{action.icon}</span>
                      {action.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
