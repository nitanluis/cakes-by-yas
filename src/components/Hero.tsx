"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Entrance timeline ──
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Title lines slide up with stagger
    tl.from(".hero-title-line", {
      y: 100,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      delay: 0.2,
    })
    // Overline
    .from(".hero-overline", {
      y: 15,
      opacity: 0,
      duration: 0.8,
    }, "-=0.7")
    // Subtitle and CTA
    .from(".hero-subtitle", {
      y: 25,
      opacity: 0,
      duration: 0.9,
    }, "-=0.5")
    .from(".hero-cta", {
      y: 15,
      opacity: 0,
      duration: 0.7,
    }, "-=0.5")
    // Image reveal (both mobile and desktop)
    .from(imageRef.current, {
      scale: 1.05,
      opacity: 0,
      duration: 1.6,
      ease: "power2.out",
    }, 0.1);

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
        
        {/* Top: Image Block — cropped to the beautiful part */}
        <div ref={imageRef} className="relative w-full" style={{ height: '50svh', minHeight: '280px' }}>
          <Image
            src="/images/hero_created_hq.jpg"
            alt="Artisanal custom cake by Cakes by Yas featuring fresh flowers"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_35%]"
          />
          {/* Soft fade to background at bottom — tall for seamless blend */}
          <div 
            className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, var(--color-bg) 100%)`,
            }}
          />
        </div>

        {/* Bottom: Brand Content Block — pulled up into image fade for unity */}
        <div className="flex-1 flex flex-col justify-center px-5 pb-8 -mt-24 relative z-10">
          
          {/* Overline */}
          <p
            className="hero-overline text-[10px] uppercase tracking-[0.3em] mb-4 font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            Artisan Cake Studio · Spring, TX
          </p>

          {/* Title — Large Brand Name */}
          <div className="mb-3">
            <h1>
              <span
                className="hero-title-line block font-[family-name:var(--font-heading)] text-[13vw] font-normal italic leading-[0.9] tracking-tight"
                style={{ color: "var(--color-text)" }}
              >
                Cakes By <span className="relative inline-block" style={{ color: "var(--color-primary)" }}>
                  Yas.
                  <svg className="absolute -top-1 -right-4 w-4 h-4 text-[var(--color-primary)] fill-current sparkle-animate-1" viewBox="0 0 24 24">
                    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z"/>
                  </svg>
                </span>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="hero-subtitle text-[13px] max-w-[320px] leading-relaxed mb-6"
            style={{ color: "var(--color-text-muted)", letterSpacing: "0.02em" }}
          >
            Handcrafted celebration cakes and bespoke pastry design,
            made with love to elevate your most unforgettable moments.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex gap-3">
            <button
              type="button"
              onClick={() => document.getElementById('pasteles')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-semibold border touch-manipulation cursor-pointer rounded-[6px]"
              style={{
                color: "var(--color-text)",
                borderColor: "var(--color-text)",
                background: "transparent",
              }}
            >
              Our Creations
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-semibold border touch-manipulation cursor-pointer rounded-[6px]"
              style={{
                color: "var(--color-bg)",
                borderColor: "var(--color-primary)",
                background: "var(--color-primary)",
              }}
            >
              Our Menu
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* DESKTOP HERO — Full-screen immersive background        */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="hidden md:block" style={{ height: "100svh", minHeight: "600px" }}>
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
          {/* Left fade into bg */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to right,
                var(--color-bg) 0%,
                rgba(253,248,248,0.9) 20%,
                rgba(253,248,248,0.4) 45%,
                transparent 70%
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
        <div className="relative z-10 h-full flex flex-col justify-between px-12 lg:px-20 max-w-none w-full">
          
          {/* Spacer for navbar */}
          <div className="pt-36" />

          {/* Main content */}
          <div className="hero-content-block flex-1 flex flex-col justify-center max-w-[800px]">
            
            {/* Overline */}
            <p
              className="hero-overline text-xs uppercase tracking-[0.3em] mb-8 font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              Artisan Cake Studio · Spring, TX
            </p>

            {/* Title */}
            <div className="mb-5">
              <h1>
                <span
                  className="hero-title-line block font-[family-name:var(--font-heading)] text-[clamp(3rem,7vw,6.5rem)] font-normal italic leading-[0.95] tracking-tight whitespace-nowrap"
                  style={{ color: "var(--color-text)" }}
                >
                  Cakes By <span className="relative inline-block" style={{ color: "var(--color-primary)" }}>
                    Yas.
                    <svg className="absolute -top-3 -right-6 w-6 h-6 text-[var(--color-primary)] fill-current sparkle-animate-1" viewBox="0 0 24 24">
                      <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z"/>
                    </svg>
                  </span>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              className="hero-subtitle text-base max-w-[360px] leading-relaxed mb-10"
              style={{ color: "var(--color-text-muted)", letterSpacing: "0.02em" }}
            >
              Handcrafted celebration cakes and bespoke pastry design,
              made with love to elevate your most unforgettable moments.
            </p>

            {/* CTA */}
            <div className="hero-cta flex flex-wrap gap-4">
              <a
                href="#pasteles"
                className="inline-block px-8 py-3.5 text-[12px] uppercase tracking-[0.2em] font-semibold border transition-all duration-500 hover:shadow-lg rounded-[6px]"
                style={{
                  color: "var(--color-text)",
                  borderColor: "var(--color-text)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-text)";
                  e.currentTarget.style.color = "var(--color-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--color-text)";
                }}
              >
                Our Creations
              </a>
              <a
                href="#menu"
                className="inline-block px-8 py-3.5 text-[12px] uppercase tracking-[0.2em] font-semibold border transition-all duration-500 hover:shadow-lg rounded-[6px]"
                style={{
                  color: "var(--color-bg)",
                  borderColor: "var(--color-primary)",
                  background: "var(--color-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-primary)";
                  e.currentTarget.style.color = "var(--color-bg)";
                }}
              >
                Our Menu
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
      </div>
    </section>
  );
}
