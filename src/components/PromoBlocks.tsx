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
    
    // Ambient holographic blob animation
    gsap.to(".holographic-blob", {
      rotation: 360,
      scale: 1.1,
      repeat: -1,
      yoyo: true,
      duration: 15,
      ease: "sine.inOut"
    });

    // "New page" modern entrance
    gsap.from(blocks, {
      y: 120,
      scale: 0.9,
      filter: "blur(20px)",
      opacity: 0,
      stagger: 0.25,
      duration: 1.6,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });
  }, { scope: containerRef });

  return (
    <section id="collections" className="relative px-6 md:px-12 py-24 md:py-40 w-full flex justify-center bg-[var(--color-bg)] overflow-hidden">
      
      {/* Holographic Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-full pointer-events-none opacity-40 mix-blend-multiply">
        <div className="holographic-blob absolute top-0 -left-[20%] w-[600px] h-[600px] bg-[var(--color-secondary)]/30 rounded-full blur-[100px]" />
        <div className="holographic-blob absolute bottom-0 -right-[20%] w-[500px] h-[500px] bg-[#E8A0B8]/20 rounded-full blur-[120px]" />
      </div>

      <div 
        ref={containerRef}
        className="w-full max-w-[1200px] flex flex-col gap-24 md:gap-32 relative z-10"
      >
        {FEATURED_ITEMS.map((item, idx) => (
          <div 
            key={idx} 
            className={`editorial-block flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-20 group`}
          >
            {/* Image Container with elegant glassmorphism */}
            <div className="relative w-full md:w-[55%] aspect-[4/5] md:aspect-square rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-image">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/20 to-transparent mix-blend-overlay z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover transition-all duration-[2s] ease-elegant group-hover:scale-110 group-hover:rotate-1" 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Typography */}
            <div className={`flex flex-col flex-1 w-full md:w-[45%] min-w-0 text-center ${idx % 2 === 1 ? 'md:text-right md:items-end' : 'md:text-left md:items-start'} z-20`}>
              <div className="mb-6 relative w-full">
                <h3 className={`font-[family-name:var(--font-heading)] text-5xl md:text-6xl italic lg:text-7xl text-[var(--color-text)] transition-transform duration-700 ease-elegant group-hover:scale-[1.02] ${idx % 2 === 1 ? 'origin-right' : 'origin-left'} break-words leading-tight whitespace-normal`}>
                  {item.title}
                </h3>
              </div>
              <p className="text-base md:text-lg text-[var(--color-text-muted)] max-w-[400px] leading-relaxed transition-colors duration-500 group-hover:text-[var(--color-text)] mb-10">
                {item.desc}
              </p>
              
              <div className="h-px w-full max-w-[100px] bg-[var(--color-primary)] transition-all duration-700 ease-elegant group-hover:max-w-full opacity-60" />
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}
