import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarocCards – Le Marché Marocain des Cartes à Collectionner",
  description: "Achète, vends et échange tes cartes MTG, Pokémon, Yu-Gi-Oh! en toute confiance. La plateforme dédiée aux joueurs marocains.",
  keywords: "cartes, TCG, Magic, Pokémon, Yu-Gi-Oh, Maroc, marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
