"use client";
import Link from "next/link";
import NavbarClient from "@/components/NavbarClient";

const STATS = [
  { num: "15 000+", label: "Cartes disponibles" },
  { num: "800+", label: "Vendeurs actifs" },
  { num: "5 jeux", label: "TCG supportés" },
  { num: "98%", label: "Avis positifs" },
];

const GAMES = [
  { emoji: "⚡", name: "Magic: The Gathering", count: "6 200+", badge: "Populaire", bg: "linear-gradient(135deg,#1a1a2e,#2a2a4a)" },
  { emoji: "🔴", name: "Pokémon TCG", count: "4 800+", badge: "🔥 Tendance", bg: "linear-gradient(135deg,#1f0a0a,#3a1515)" },
  { emoji: "⭐", name: "Yu-Gi-Oh!", count: "3 100+", badge: null, bg: "linear-gradient(135deg,#1a1500,#2a2200)" },
  { emoji: "🏴‍☠️", name: "One Piece Card Game", count: "900+", badge: null, bg: "linear-gradient(135deg,#180d28,#281545)" },
  { emoji: "🐉", name: "Dragon Ball Super", count: "700+", badge: null, bg: "linear-gradient(135deg,#1f1500,#3a2800)" },
];

const FEATURES = [
  { icon: "🎥", color: "#4F8EF7", title: "Vidéo d'authenticité obligatoire", desc: "Chaque vendeur non agréé filme sa carte recto/verso. Tu vois la carte avant d'acheter — fini les contrefaçons !" },
  { icon: "✅", color: "#C9A84C", title: "Vendeurs vérifiés et agréés", desc: "Les vendeurs agréés sont validés par notre équipe ou automatiquement après 10 ventes avec 4.5★ minimum." },
  { icon: "🔒", color: "#22C55E", title: "Paiement sécurisé (Escrow)", desc: "Ton argent est conservé jusqu'à réception confirmée. Remboursement garanti en cas de litige." },
  { icon: "🚩", color: "#EF4444", title: "Signalement communautaire", desc: "5 signalements = suspension automatique de l'annonce pour examen admin. La communauté protège la communauté." },
  { icon: "⭐", color: "#F59E0B", title: "Système d'avis transparent", desc: "Chaque transaction notée par les deux parties. Le score global de chaque vendeur est public." },
  { icon: "💬", color: "#4F8EF7", title: "Support trilingue FR / AR / EN", desc: "Messagerie interne + support disponible en 3 langues pour tous les joueurs marocains." },
];

const STEPS = [
  { icon: "👤", n: "01", title: "Crée ton compte", desc: "Inscription gratuite en 2 minutes. Email ou Google. Profil acheteur ou vendeur." },
  { icon: "🔍", n: "02", title: "Cherche ta carte", desc: "Recherche par nom, jeu, set ou rareté. Filtre par état, prix et vendeur agréé." },
  { icon: "🛒", n: "03", title: "Commande en sécurité", desc: "Paiement sécurisé ou à la livraison. Ton argent est protégé jusqu'à réception." },
  { icon: "📦", n: "04", title: "Reçois ta carte", desc: "Livraison à domicile ou point relais. Confirme la réception et laisse un avis." },
];

const TESTIMONIALS = [
  { name: "Youssef El Mansouri", city: "Casablanca · Joueur MTG", text: '"Enfin une plateforme sérieuse ! J\'ai acheté 3 cartes MTG sans aucun problème. La vidéo d\'authenticité m\'a vraiment rassuré."', init: "Y" },
  { name: "Sara Benchekroun", city: "Rabat · Vendeuse agréée", text: '"J\'ai vendu 12 cartes Pokémon en 2 semaines. Le paiement à la livraison est parfait pour mes clients marocains."', init: "S" },
  { name: "Adam Tazi", city: "Marrakech · Collectionneur Yu-Gi-Oh!", text: '"J\'avais peur des contrefaçons, mais le système de vidéo change tout. Mon Blue-Eyes est arrivé en parfait état !"', init: "A" },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0E1A", color: "#E8EAF0" }}>
      <NavbarClient />

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "120px 20px 80px", position: "relative", overflow: "hidden",
      }}>
        {/* Background */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #0A0E1A 0%, #0F1525 40%, #0A0E1A 100%)",
        }} />
        <div style={{ position: "absolute", top: "20%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,142,247,0.08), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", right: "15%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.07), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to bottom, transparent, #0A0E1A)", pointerEvents: "none" }} />

        {/* Badge */}
        <div style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", borderRadius: 50, padding: "6px 18px", fontSize: "0.82rem", fontWeight: 600, marginBottom: 28 }}>
          <span className="pulse-dot" style={{ width: 6, height: 6, background: "#C9A84C", borderRadius: "50%", display: "inline-block" }} />
          Le 1er marché marocain de cartes à collectionner
        </div>

        {/* H1 */}
        <h1 style={{ position: "relative", zIndex: 2, fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1px" }}>
          Achète, vends et échange<br />
          tes cartes en toute{" "}
          <span style={{ background: "linear-gradient(135deg, #C9A84C, #F0C96B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            confiance
          </span>
        </h1>

        <p style={{ position: "relative", zIndex: 2, fontSize: "1.05rem", color: "#8892A4", maxWidth: 540, marginBottom: 40 }}>
          La plateforme dédiée aux joueurs marocains — MTG, Pokémon, Yu-Gi-Oh! et plus.<br />
          Sécurisée, transparente et 100% marocaine. 🇲🇦
        </p>

        <div style={{ position: "relative", zIndex: 2, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/cards">
            <button style={{ padding: "14px 32px", borderRadius: 10, background: "linear-gradient(135deg, #C9A84C, #F0C96B)", color: "#0A0E1A", border: "none", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>
              🔍 Explorer les cartes
            </button>
          </Link>
          <Link href="/register">
            <button style={{ padding: "13px 30px", borderRadius: 10, background: "transparent", border: "1.5px solid rgba(255,255,255,0.2)", color: "#E8EAF0", fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>
              Vendre mes cartes →
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", gap: 50, justifyContent: "center", marginTop: 60, flexWrap: "wrap" }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#C9A84C" }}>{s.num}</div>
              <div style={{ fontSize: "0.8rem", color: "#8892A4", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      <div style={{ display: "flex", justifyContent: "center", padding: "0 20px 60px", marginTop: -30, position: "relative", zIndex: 10 }}>
        <div style={{ background: "rgba(15,21,37,0.97)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 16, padding: "22px 26px", width: "100%", maxWidth: 820, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ display: "flex", gap: 7, marginBottom: 14, flexWrap: "wrap" }}>
            {["Toutes les cartes", "⚡ Magic: TG", "🔴 Pokémon", "⭐ Yu-Gi-Oh!", "🏴‍☠️ One Piece", "🐉 Dragon Ball"].map((t, i) => (
              <button key={t} style={{
                padding: "6px 14px", borderRadius: 8, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                border: "1px solid", transition: "all 0.2s",
                borderColor: i === 0 ? "#C9A84C" : "rgba(255,255,255,0.1)",
                background: i === 0 ? "#C9A84C" : "transparent",
                color: i === 0 ? "#0A0E1A" : "#8892A4",
              }}>{t}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input type="text" placeholder="Rechercher une carte, un set, un vendeur..." style={{ flex: 1, padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#E8EAF0", fontSize: "0.92rem", outline: "none" }} />
            <button style={{ padding: "12px 22px", borderRadius: 10, background: "linear-gradient(135deg, #C9A84C, #F0C96B)", color: "#0A0E1A", fontWeight: 700, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
              🔍 Rechercher
            </button>
          </div>
        </div>
      </div>

      {/* ── GAMES ── */}
      <section style={{ padding: "60px 20px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", padding: "4px 14px", borderRadius: 50, fontSize: "0.76rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>🎴 Collections</div>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, marginBottom: 10 }}>Tous vos jeux préférés</h2>
          <p style={{ color: "#8892A4" }}>Une base de données complète de milliers de cartes pour chaque univers</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 18, maxWidth: 1100, margin: "0 auto" }}>
          {GAMES.map(g => (
            <Link key={g.name} href={`/cards?game=${g.name}`} style={{ textDecoration: "none" }}>
              <div style={{ background: g.bg, border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "all 0.3s", position: "relative" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.borderColor = "#C9A84C"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                {g.badge && <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(10,14,26,0.85)", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C", fontSize: "0.7rem", fontWeight: 700, padding: "3px 8px", borderRadius: 50, backdropFilter: "blur(8px)" }}>{g.badge}</div>}
                <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem" }}>{g.emoji}</div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 3 }}>{g.name}</div>
                  <div style={{ fontSize: "0.76rem", color: "#8892A4" }}>{g.count} cartes disponibles</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 20px", background: "#0F1525" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", padding: "4px 14px", borderRadius: 50, fontSize: "0.76rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>📖 Guide</div>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, marginBottom: 10 }}>Comment ça marche ?</h2>
          <p style={{ color: "#8892A4" }}>Simple, rapide et sécurisé — en 4 étapes</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 22, maxWidth: 1000, margin: "0 auto" }}>
          {STEPS.map(s => (
            <div key={s.n} style={{ textAlign: "center", padding: "32px 22px", background: "#111827", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
              <div style={{ width: 60, height: 60, borderRadius: 15, margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.7rem", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}>{s.icon}</div>
              <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#C9A84C", textTransform: "uppercase", letterSpacing: 1, marginBottom: 9 }}>Étape {s.n}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: "0.83rem", color: "#8892A4", lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES / TRUST ── */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", padding: "4px 14px", borderRadius: 50, fontSize: "0.76rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>🛡️ Sécurité</div>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, marginBottom: 10 }}>Pourquoi faire confiance à MarocCards ?</h2>
          <p style={{ color: "#8892A4" }}>On a pensé à chaque détail pour protéger acheteurs et vendeurs</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 22, maxWidth: 1100, margin: "0 auto" }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ display: "flex", gap: 16, padding: "26px", background: "#111827", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
              <div style={{ width: 48, height: 48, minWidth: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", background: `${f.color}15`, border: `1px solid ${f.color}25` }}>{f.icon}</div>
              <div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontSize: "0.81rem", color: "#8892A4", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SELLER TYPES ── */}
      <section style={{ padding: "80px 20px", background: "#0F1525" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", padding: "4px 14px", borderRadius: 50, fontSize: "0.76rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>🏪 Vendre</div>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, marginBottom: 10 }}>Deux types de vendeurs</h2>
          <p style={{ color: "#8892A4" }}>Un système transparent et progressif adapté à tous</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 26, maxWidth: 880, margin: "0 auto" }}>
          {[
            { icon: "👤", color: "#C9A84C", bg: "linear-gradient(135deg,#111827,#1a2235)", border: "rgba(201,168,76,0.15)", title: "Vendeur Standard", items: ["Inscription gratuite et immédiate", "Vidéo courte par carte (recto/verso)", "Annonce publiée après validation", "Devient agréé automatiquement après 10 ventes"], desc: "Tu commences à vendre immédiatement. Une étape vidéo est requise pour rassurer les acheteurs." },
            { icon: "✅", color: "#22C55E", bg: "linear-gradient(135deg,#0f1f10,#1a2a1a)", border: "rgba(34,197,94,0.2)", title: "Vendeur Agréé", items: ["Badge 'Vendeur Vérifié ✅' visible partout", "Pas d'obligation de vidéo par carte", "Priorité dans les résultats de recherche", "Accès aux statistiques et outils avancés"], desc: "Tu as prouvé ta fiabilité. Tu bénéficies d'une visibilité maximale et de la confiance immédiate." },
          ].map(t => (
            <div key={t.title} style={{ padding: "34px 28px", borderRadius: 18, border: `1px solid ${t.border}`, background: t.bg, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 150, height: 150, borderRadius: "50%", background: `radial-gradient(circle, ${t.color}15, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ fontSize: "2.4rem", marginBottom: 14 }}>{t.icon}</div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: 8, color: t.color }}>{t.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "#8892A4", lineHeight: 1.7, marginBottom: 18 }}>{t.desc}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {t.items.map(i => (
                  <li key={i} style={{ fontSize: "0.83rem", display: "flex", alignItems: "flex-start", gap: 8, color: "#8892A4" }}>
                    <span style={{ color: "#22C55E", fontWeight: 700, marginTop: 1 }}>✓</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", padding: "4px 14px", borderRadius: 50, fontSize: "0.76rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>💬 Communauté</div>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, marginBottom: 10 }}>Ce que disent nos membres</h2>
          <p style={{ color: "#8892A4" }}>Des joueurs de tout le Maroc nous font confiance</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "26px" }}>
              <div style={{ color: "#F59E0B", fontSize: "0.88rem", marginBottom: 12 }}>★★★★★</div>
              <p style={{ fontSize: "0.86rem", color: "#8892A4", lineHeight: 1.7, marginBottom: 18, fontStyle: "italic" }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #C9A84C, #F0C96B)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0E1A", fontWeight: 800 }}>{t.init}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>{t.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#8892A4" }}>📍 {t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ textAlign: "center", padding: "96px 20px", background: "linear-gradient(135deg,rgba(201,168,76,0.05),rgba(79,142,247,0.05))", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.7rem)", fontWeight: 900, marginBottom: 12 }}>
          Prêt à rejoindre la communauté{" "}
          <span style={{ background: "linear-gradient(135deg, #C9A84C, #F0C96B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>MarocCards ?</span>
        </h2>
        <p style={{ color: "#8892A4", marginBottom: 34, fontSize: "0.98rem" }}>Plus de 800 joueurs t'attendent déjà. Inscription gratuite, sans engagement.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/register">
            <button style={{ padding: "14px 32px", borderRadius: 10, background: "linear-gradient(135deg, #C9A84C, #F0C96B)", color: "#0A0E1A", border: "none", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>✨ Créer mon compte gratuit</button>
          </Link>
          <Link href="/cards">
            <button style={{ padding: "13px 28px", borderRadius: 10, background: "transparent", border: "1.5px solid rgba(255,255,255,0.2)", color: "#E8EAF0", fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>Voir les annonces →</button>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#060912", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "56px 20px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(3,1fr)", gap: 36, maxWidth: 1100, margin: "0 auto 44px", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#C9A84C,#F0C96B)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#0A0E1A", fontSize: "0.9rem" }}>MC</div>
              <span style={{ fontWeight: 800, fontSize: "1.2rem" }}><span style={{ color: "#C9A84C" }}>Maroc</span>Cards<span style={{ color: "#F0C96B", fontSize: "0.5em", verticalAlign: "super" }}>●</span>ma</span>
            </div>
            <p style={{ fontSize: "0.83rem", color: "#8892A4", lineHeight: 1.7, marginBottom: 18 }}>Le premier marché marocain dédié aux cartes à collectionner. Achat, vente et échange en toute sécurité.</p>
          </div>
          {[
            { title: "Marketplace", links: ["Acheter des cartes", "Vendre mes cartes", "Vendeurs agréés", "Nouvelles annonces", "Want List"] },
            { title: "Jeux", links: ["Magic: The Gathering", "Pokémon TCG", "Yu-Gi-Oh!", "One Piece", "Dragon Ball Super"] },
            { title: "Aide", links: ["Comment ça marche", "FAQ", "Contact & Support", "Conditions d'utilisation", "Confidentialité"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: "0.82rem", fontWeight: 700, marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>{col.title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: "0.81rem", color: "#8892A4" }}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 22, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: "0.78rem", color: "#8892A4" }}>© 2026 MarocCards.ma — Tous droits réservés 🇲🇦</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["🔒 Paiement sécurisé", "🇲🇦 100% Marocain", "✓ Anti-contrefaçon"].map(b => (
              <span key={b} style={{ padding: "3px 11px", borderRadius: 50, fontSize: "0.7rem", fontWeight: 600, border: "1px solid rgba(255,255,255,0.1)", color: "#8892A4" }}>{b}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
