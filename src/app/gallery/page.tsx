import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BentoGrid from "@/components/BentoGrid";
import Menu from "@/components/Menu";

export default function GalleryPage() {
  return (
    <main className="bg-[var(--color-bg)] min-h-screen pt-24 md:pt-32">
      <Navbar />
      
      <div className="text-center mb-8 px-6">
        <h1 className="font-[family-name:var(--font-heading)] italic text-5xl md:text-7xl mb-4" style={{ color: "var(--color-text)" }}>
          Photo Gallery
        </h1>
        <p className="text-sm md:text-base uppercase tracking-[0.2em] font-medium" style={{ color: "var(--color-primary)" }}>
          Our sweetest moments
        </p>
      </div>

      <BentoGrid />
      <div className="py-10"></div>
      <Menu />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
