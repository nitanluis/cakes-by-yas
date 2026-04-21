"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FEATURED_ITEMS = [
  {
    title: "Signature Designs",
    desc: "A hand-picked selection of our most loved custom cake designs and unique flavor combinations.",
    image: "/images/signature-new.jpeg",
  },
  {
    title: "Choco Flan",
    desc: "Our legendary homemade flan recipe, baked to slow perfection with rich golden caramel.",
    image: "/images/chocoflan-new.jpeg",
  }
];

export default function PromoBlocks() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const blocks = gsap.utils.toArray(".editorial-block");
    gsap.from(blocks, {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section id="collections" className="px-6 md:px-12 py-16 md:py-32 w-full flex justify-center bg-[var(--color-bg)]">
      <div 
        ref={containerRef}
        className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24"
      >
        {FEATURED_ITEMS.map((item, idx) => (
          <div key={idx} className="editorial-block flex flex-col group cursor-pointer">
            
            {/* Image Container with elegant hover and pastel pink background */}
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 shadow-soft" style={{ background: "var(--color-secondary)" }}>
              <div className="absolute inset-0 bg-[var(--color-secondary)]/20 mix-blend-multiply z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-contain sm:object-cover transition-transform duration-[1.5s] ease-elegant group-hover:scale-105" 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Typography */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-4 transition-all duration-500 group-hover:-translate-y-1">
                <h3 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl italic text-[var(--color-text)] transition-all duration-500 group-hover:text-[var(--color-primary)] group-hover:drop-shadow-[0_0_12px_rgba(234,103,125,0.5)] mb-4">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-[var(--color-text-muted)] max-w-[320px] leading-relaxed transition-colors duration-500 group-hover:text-[var(--color-text)]">
                {item.desc}
              </p>
              
              <div className="mt-8 h-px w-12 bg-[var(--color-primary)] transition-all duration-500 group-hover:w-24 group-hover:opacity-100 opacity-50" />
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}
