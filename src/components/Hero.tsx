"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Fade in text elements
    tl.from(".hero-element", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      delay: 0.2
    })
    // Scale up the image gracefully
    .from(imageWrapperRef.current, {
      scale: 0.95,
      opacity: 0,
      y: 60,
      duration: 1.5,
      ease: "power2.out"
    }, "-=0.8");

    // Continuous floating animation for glow
    gsap.to(glowRef.current, {
      y: -20,
      scale: 1.05,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Continuous rotation for sparkle
    gsap.to(sparkleRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "linear"
    });

  }, { scope: containerRef });

  return (
    <section id="inicio" className="w-full relative flex flex-col items-center pt-32 md:pt-40 pb-8 md:pb-12 px-6 overflow-hidden">
      
      {/* Subtle top left ambient light */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div ref={containerRef} className="w-full max-w-[1200px] flex flex-col items-center justify-center text-center z-10 relative">
        
        {/* Subtle Overline Content */}
        <p className="hero-element text-xs md:text-sm uppercase tracking-[0.2em] mb-6 font-medium" style={{ color: "var(--color-primary)" }}>
          Made with Love in Texas
        </p>

        {/* Elegant Heading — Single Line */}
        <div className="hero-element relative inline-block">
          {/* Decorative Sparkle */}
          <svg 
            ref={sparkleRef}
            className="absolute -top-4 -right-8 md:-top-6 md:-right-12 w-8 md:w-12 h-8 md:h-12 opacity-80" 
            style={{ color: "var(--color-accent)" }}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
          >
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" opacity="0.3" />
          </svg>
          
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl md:text-8xl lg:text-[110px] font-normal italic leading-[1] mb-6 tracking-tight whitespace-nowrap">
            Cakes <span className="text-[var(--color-primary)] relative">
              By Yas.
            </span>
          </h1>
        </div>

        {/* Description */}
        <p className="hero-element text-base md:text-lg max-w-[500px] mx-auto mb-8 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          Handcrafted cakes and passionate pastry design to elevate your most unforgettable moments.
        </p>

        {/* Primary CTA */}
        <div className="hero-element flex items-center justify-center mb-10 md:mb-12">
          <a
            href="#pasteles"
            className="px-8 py-3.5 text-[13px] md:text-sm font-bold uppercase tracking-widest text-[#FBF7F4] rounded-full shadow-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: "var(--color-primary)" }}
          >
            View Menu
          </a>
        </div>

        {/* Hero Image Presentation */}
        <div className="relative w-full max-w-[1000px] mt-2 md:mt-4">
          {/* Ambient Glow behind image */}
          <div 
            ref={glowRef}
            className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] opacity-20 blur-[60px] rounded-[3rem] -z-10"
          />
          
          <div 
            ref={imageWrapperRef}
            className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-image border border-white/40"
          >
            <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none mix-blend-multiply" />
            <Image
              src="/images/hero-cake-new.jpeg"
              alt="Artisanal custom cake by Cakes by Yas"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              className="object-cover object-center transition-transform duration-[10s] hover:scale-105"
            />
          </div>

          {/* Rotating Premium Badge */}
          <div className="hero-element absolute -bottom-4 -right-2 md:bottom-4 md:-right-4 z-20 w-28 h-28 md:w-36 md:h-36 pointer-events-none drop-shadow-2xl bg-white/40 backdrop-blur-md rounded-full p-2 border border-white/60">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_12s_linear_infinite]">
              <path id="curve" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="transparent" />
              <text fontSize="11" fontWeight="bold" letterSpacing="1.8" fill="var(--color-primary)" className="uppercase">
                <textPath href="#curve" startOffset="0%">
                  100% CUSTOM DESIGN • MADE WITH LOVE • 
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl md:text-3xl drop-shadow-sm">✨</span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
