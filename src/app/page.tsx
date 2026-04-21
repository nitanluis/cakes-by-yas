import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromoBlocks from "@/components/PromoBlocks";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SectionDivider variant="aurora" />
      <PromoBlocks />
      <SectionDivider variant="prism" />
      <Menu />
      <SectionDivider variant="ribbon" />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
