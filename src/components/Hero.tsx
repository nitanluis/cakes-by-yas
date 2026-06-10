"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ── Trust badge thumbnail sources ── */
const TRUST_THUMBS = [
  "/images/real_cakes/real_cake_1.jpeg",
  "/images/real_cakes/real_cake_5.jpeg",
  "/images/real_cakes/real_cake_7.jpeg",
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Entrance timeline ──
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Logo mask-reveal (cinematic wipe from left)
    tl.from(".hero-title-line", {
      clipPath: "inset(0 100% 0 0)",
      opacity: 0,
      duration: 1.4,
      ease: "power4.inOut",
      delay: 0.3,
    })
    // Overline fades in
    .from(".hero-overline", {
      y: 12,
      opacity: 0,
      duration: 0.8,
    }, "-=0.6")
    // Tagline slides up
    .from(".hero-tagline", {
      y: 20,
      opacity: 0,
      duration: 0.8,
    }, "-=0.4")
    // Subtitle
    .from(".hero-subtitle", {
      y: 20,
      opacity: 0,
      duration: 0.9,
    }, "-=0.4")
    // CTA
    .from(".hero-cta", {
      y: 15,
      opacity: 0,
      duration: 0.7,
    }, "-=0.4")
    // Image reveal (both mobile and desktop)
    .from(imageRef.current, {
      scale: 1.05,
      opacity: 0,
      duration: 1.6,
      ease: "power2.out",
    }, 0.1)
    // Trust badge entrance
    .from(".hero-trust", {
      y: 30,
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "back.out(1.4)",
    }, "-=0.6");

    // ── Desktop-only scroll-driven parallax ──
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      // Gentle image parallax
      gsap.to(".hero-desktop-image", {
        y: -60,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content fades out as user scrolls
      gsap.to(".hero-content-block", {
        y: -40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "10% top",
          end: "50% top",
          scrub: true,
        },
      });

      // Bottom bar fades
      gsap.to(".hero-bottom", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "5% top",
          end: "25% top",
          scrub: true,
        },
      });

      // Trust badge fades on scroll
      gsap.to(".hero-trust", {
        opacity: 0,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "8% top",
          end: "30% top",
          scrub: true,
        },
      });

      // Subtle darken
      gsap.to(overlayRef.current, {
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Trust badge gentle float
      gsap.to(".hero-trust", {
        y: "-=8",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative w-full overflow-hidden"
    >
      {/* ═══════════════════════════════════════════════════════ */}
      {/* MOBILE HERO — Editorial Split Layout                   */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="md:hidden flex flex-col" style={{ minHeight: '100svh' }}>
        
        {/* Top: Image Block — larger ratio for impact */}
        <div ref={imageRef} className="relative w-full" style={{ height: '55svh', minHeight: '320px' }}>
          <Image
            src="/images/hero_created_hq.jpg"
            alt="Artisanal custom cake by Cakes by Yas featuring fresh flowers"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_35%]"
          />
          {/* Soft fade to background at bottom */}
          <div 
            className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, var(--color-bg) 100%)`,
            }}
          />
        </div>

        {/* Bottom: Brand Content Block — centered on mobile */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-10 -mt-28 relative z-10">
          
          {/* Overline */}
          <p className="hero-overline typo-overline mb-3 opacity-70">
            Artisan Cake Studio · Spring, TX
          </p>

          {/* Decorative accent line */}
          <div className="w-8 h-px bg-[var(--color-primary)] opacity-40 mb-4" />

          {/* Title — Logo Image */}
          <div className="hero-title-line mb-2">
            <h1 className="sr-only">Cakes By Yas</h1>
            <img 
              src="/logo.png" 
              alt="Cakes By Yas" 
              className="h-16 sm:h-20 w-auto object-contain mx-auto"
            />
          </div>

          {/* Tagline — Playfair italic */}
          <p className="hero-tagline typo-intro mt-1 mb-6">
            Where Every Cake Tells a Story
          </p>

          {/* Subtitle */}
          <p className="hero-subtitle typo-body max-w-[300px] mb-7">
            Handcrafted celebration cakes and bespoke pastry design,
            made with love to elevate your most unforgettable moments.
          </p>

          {/* CTA — Single primary pill + text link */}
          <div className="hero-cta flex flex-col items-center gap-3 w-full">
            <button
              type="button"
              onClick={() => document.getElementById('pasteles')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-cta-primary typo-button inline-flex items-center justify-center gap-2.5 w-full max-w-[280px] px-8 py-3.5 rounded-full touch-manipulation cursor-pointer transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5"
              style={{
                color: "var(--color-bg)",
                background: "var(--color-primary)",
              }}
            >
              Explore Our Creations
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="typo-button inline-flex items-center gap-1.5 tracking-[0.15em] font-medium touch-manipulation cursor-pointer transition-colors duration-300 hover:text-[var(--color-primary)]"
              style={{ color: "var(--color-text-muted)" }}
            >
              View Full Menu
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* DESKTOP HERO — Full-screen immersive background        */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="hidden md:block h-svh min-h-[600px]">
        {/* Full-screen background image */}
        <div
          className="hero-desktop-image absolute inset-0"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/images/hero_created_hq.jpg"
            alt="Artisanal custom cake by Cakes by Yas featuring fresh flowers"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Hide bottom-right watermark */}
          <div className="absolute bottom-0 right-0 w-[15vw] max-w-[200px] h-[8vh] max-h-[80px] bg-gradient-to-tl from-[#Eae8e6] via-[#Eae8e6]/80 to-transparent z-[1]" />
          {/* Left fade into bg — angled gradient for editorial energy */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                105deg,
                var(--color-bg) 0%,
                rgba(253,248,248,0.92) 22%,
                rgba(253,248,248,0.5) 42%,
                transparent 62%
              )`,
            }}
          />
        </div>

        {/* Scroll darken overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black pointer-events-none z-[2]"
          style={{ opacity: 0 }}
        />

        {/* Content Layer */}
        <div className="relative z-10 h-full flex flex-col justify-between px-10 lg:px-20 xl:px-28 max-w-[1400px] mx-auto w-full">
          
          {/* Main content — pinned to optical center */}
          <div className="hero-content-block flex-1 flex flex-col justify-center max-w-[520px] pt-[18vh]">
            
            {/* Overline — Beat 1: Whisper */}
            <p className="hero-overline typo-overline mb-10 opacity-70">
              Artisan Cake Studio · Spring, TX
            </p>

            {/* Title — Beat 2: Shout (Logo + Tagline) */}
            <div className="hero-title-line mb-3">
              <h1 className="sr-only">Cakes By Yas</h1>
              <img 
                src="/logo.png" 
                alt="Cakes By Yas" 
                className="h-28 lg:h-32 xl:h-36 w-auto object-contain"
              />
            </div>

            {/* Tagline — Playfair italic (editorial voice) */}
            <p className="hero-tagline typo-intro text-lg lg:text-xl xl:text-[22px] mt-1 mb-9">
              Where Every Cake Tells a Story
            </p>

            {/* Subtitle */}
            <p className="hero-subtitle typo-body text-[15px] max-w-[420px] mb-10 lg:mb-12">
              Handcrafted celebration cakes and bespoke pastry design,
              made with love to elevate your most unforgettable moments.
            </p>

            {/* CTA — Beat 3: Invite (Single primary + text link) */}
            <div className="hero-cta flex flex-col items-start gap-4">
              <a
                href="#pasteles"
                className="hero-cta-primary typo-button group inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-500 ease-elegant hover:shadow-xl hover:-translate-y-0.5"
                style={{
                  color: "var(--color-bg)",
                  background: "var(--color-primary)",
                }}
              >
                Explore Our Creations
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#menu"
                className="typo-button inline-flex items-center gap-2 tracking-[0.15em] font-medium transition-colors duration-300 hover:text-[var(--color-primary)] ml-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                View Full Menu
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="hero-bottom pb-12 flex items-end justify-between">
            {/* Scroll indicator */}
            <div className="flex items-center gap-2.5 opacity-50">
              <div className="w-px h-10 bg-current animate-pulse" style={{ color: "var(--color-text-muted)" }} />
              <span
                className="text-[10px] uppercase tracking-[0.2em] font-medium"
                style={{ color: "var(--color-text-muted)", writingMode: "vertical-lr" }}
              >
                Scroll
              </span>
            </div>

            {/* Location stamp */}
            <p
              className="text-[10px] uppercase tracking-[0.2em] opacity-40"
              style={{ color: "var(--color-text-muted)" }}
            >
              Made with Love · Spring &amp; The Woodlands, Texas
            </p>
          </div>
        </div>

        {/* ── Trust Badge — glassmorphic social proof ── */}
        <div className="hero-trust hidden lg:flex items-center gap-4 glass-panel px-6 py-4 rounded-2xl absolute bottom-[18vh] right-[6vw] xl:right-[10vw] z-20">
          {/* Stacked mini cake thumbnails */}
          <div className="flex -space-x-2.5">
            {TRUST_THUMBS.map((src, i) => (
              <div key={i} className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image 
                  src={src} 
                  alt="" 
                  width={36} 
                  height={36}
                  className="object-cover w-full h-full" 
                />
              </div>
            ))}
          </div>
          <div>
            <p className="text-[13px] font-semibold" style={{ color: "var(--color-text)" }}>
              250+ Cakes Delivered
            </p>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
              Spring &amp; The Woodlands
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
