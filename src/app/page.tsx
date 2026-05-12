import type { Metadata } from "next";
import productsData from "@/data/products.json";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SignatureCreations from "@/components/SignatureCreations";
import PricingMenu from "@/components/PricingMenu";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionDivider from "@/components/SectionDivider";

type Props = {
  searchParams: Promise<{ cake?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const cakeId = resolvedSearchParams.cake;

  // Find the cake in the products data to build custom OpenGraph cards
  const cake = productsData.find((p) => p.id === cakeId);

  if (cake) {
    return {
      title: `${cake.name} | Cakes by Yas`,
      description: `${cake.desc} Handcrafted artisanal cakes in Spring & The Woodlands, TX.`,
      openGraph: {
        title: `${cake.name} | Cakes by Yas`,
        description: cake.desc,
        type: "website",
        images: [
          {
            url: cake.image,
            width: 1200,
            height: 630,
            alt: cake.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${cake.name} | Cakes by Yas`,
        description: cake.desc,
        images: [cake.image],
      },
    };
  }

  // Fallback to layout.tsx defaults if no dynamic query parameter is present
  return {};
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SectionDivider variant="aurora" />
      <SignatureCreations />
      <PricingMenu />
      <SectionDivider variant="ribbon" />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
