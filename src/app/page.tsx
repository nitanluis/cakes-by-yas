import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import MarqueeStrip from "@/components/MarqueeStrip";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <BentoGrid />
      <MarqueeStrip />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
