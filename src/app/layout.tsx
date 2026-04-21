import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cakes-by-yas.vercel.app"),
  title: "Cakes by Yas | Artisanal Cakes in Spring & The Woodlands, TX",
  description:
    "Handcrafted artisanal cakes for your sweetest celebrations. Premium custom cakes & homemade flans in Spring, The Woodlands & Houston, Texas.",
  keywords: [
    "Custom cakes Spring TX",
    "Artisanal bakery The Woodlands",
    "Custom cakes Houston Texas",
    "Birthday cakes Spring",
    "Homemade flan Houston",
    "Cakes by Yas",
    "Bakery Spring Texas",
  ],
  openGraph: {
    title: "Cakes by Yas | Edible Art for Your Sweetest Moments",
    description:
      "Handcrafted artisanal cakes & homemade flans. Made with love in Spring, Texas.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero-cake.png",
        width: 1200,
        height: 630,
        alt: "Elegant artisanal cake by Cakes by Yas with golden crown and butterflies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cakes by Yas | Artisanal Cakes in Texas",
    description:
      "Edible art for your sweetest moments. Order via WhatsApp.",
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
      "Handcrafted artisanal cakes and homemade flans. Made with love in Spring, Texas.",
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
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
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
