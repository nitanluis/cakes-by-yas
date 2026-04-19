import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cakes by Yas | Pasteles Artesanales en Spring & The Woodlands, TX",
  description:
    "Diseños artesanales de pasteles personalizados para tus celebraciones. Repostería premium y flanes caseros en Spring, The Woodlands y Houston, Texas. Cotiza por WhatsApp.",
  keywords: [
    "Pasteles personalizados Spring TX",
    "Repostería artesanal The Woodlands",
    "Custom cakes Houston Texas",
    "Pasteles de cumpleaños Spring",
    "Flanes caseros Houston",
    "Cakes by Yas",
    "Bakery Spring Texas",
  ],
  openGraph: {
    title: "Cakes by Yas | Arte Comestible para Tus Momentos Más Dulces",
    description:
      "Pasteles artesanales personalizados y flanes caseros. Hechos con amor en Spring, Texas.",
    type: "website",
    locale: "es_US",
    images: [
      {
        url: "/images/hero-cake.png",
        width: 1200,
        height: 630,
        alt: "Pastel artesanal elegante de Cakes by Yas con corona dorada y mariposas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cakes by Yas | Pasteles Artesanales en Texas",
    description:
      "Arte comestible para tus momentos más dulces. Cotiza por WhatsApp.",
    images: ["/images/hero-cake.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "Cakes by Yas",
    description:
      "Diseños artesanales de pasteles personalizados y flanes caseros. Homemade with love.",
    url: "https://cakes-by-yas.vercel.app",
    telephone: "+18626680038",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Spring",
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Spring, Texas" },
      { "@type": "City", name: "The Woodlands, Texas" },
      { "@type": "City", name: "Houston, Texas" },
    ],
    priceRange: "$$",
    image: "/images/hero-cake.png",
    sameAs: ["https://www.instagram.com/cakes_byyas_/"],
  };

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
