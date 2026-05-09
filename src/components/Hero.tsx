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
    // Image reveal
    .from(imageRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 1.6,
      ease: "power2.out",
    }, 0.1)
    // Bottom bar
    .from(".hero-bottom", {
      y: 20,
      opacity: 0,
      duration: 0.6,
    }, "-=0.4");

    // ── Scroll-driven parallax ──
    // Gentle image parallax
    gsap.to(imageRef.current, {
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

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px", background: "var(--color-bg)" }}
    >
      {/* ── Full-screen background image ── */}
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/images/hero_created.png"
          alt="Artisanal custom cake by Cakes by Yas featuring fresh flowers"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Hide bottom-right watermark */}
        <div className="absolute bottom-0 right-0 w-[15vw] max-w-[200px] h-[8vh] max-h-[80px] bg-gradient-to-tl from-[#Eae8e6] via-[#Eae8e6]/80 to-transparent z-[1]" />
        {/* Desktop: left fade into bg */}
        <div
          className="absolute inset-0 hidden md:block"
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
        {/* Mobile: overlay for readability */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(253,248,248,0.80) 0%,
              rgba(253,248,248,0.55) 35%,
              rgba(253,248,248,0.65) 70%,
              rgba(253,248,248,0.85) 100%
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

      {/* ── Content Layer ── */}
      <div className="relative z-10 h-full flex flex-col justify-between px-5 sm:px-8 md:px-12 lg:px-20 max-w-none w-full">
        
        {/* Spacer for navbar */}
        <div className="pt-24 sm:pt-28 md:pt-36" />

        {/* Main content */}
        <div className="hero-content-block flex-1 flex flex-col justify-center max-w-[800px]">
          
          {/* Overline */}
          <p
            className="hero-overline text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.3em] mb-5 sm:mb-6 md:mb-8 font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            Artisan Cake Boutique · Spring, TX
          </p>

          {/* Title — Brand Name as Hero */}
          <div className="mb-4 md:mb-5">
            <h1>
              <span
                className="hero-title-line block font-[family-name:var(--font-heading)] text-[clamp(2.5rem,7vw,6.5rem)] font-normal italic leading-[0.95] tracking-tight whitespace-nowrap"
                style={{ color: "var(--color-text)" }}
              >
                Cakes By <span style={{ color: "var(--color-primary)" }}>Yas.</span>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="hero-subtitle text-[13px] sm:text-sm md:text-base max-w-[360px] leading-relaxed mb-7 sm:mb-8 md:mb-10"
            style={{ color: "var(--color-text-muted)", letterSpacing: "0.02em" }}
          >
            Handcrafted celebration cakes and bespoke pastry design,
            made with love to elevate your most unforgettable moments.
          </p>

          {/* CTA — Outline Button */}
          <div className="hero-cta flex flex-wrap gap-4">
            <a
              href="#pasteles"
              className="inline-block px-7 sm:px-8 py-3 sm:py-3.5 text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-semibold border transition-all duration-500 hover:shadow-lg"
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
              className="inline-block px-7 sm:px-8 py-3 sm:py-3.5 text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-semibold border transition-all duration-500 hover:shadow-lg"
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
        <div className="hero-bottom pb-6 sm:pb-8 md:pb-12 flex items-end justify-between">
          {/* Scroll indicator */}
          <div className="flex items-center gap-2.5 opacity-50">
            <div className="w-px h-8 sm:h-10 bg-current animate-pulse" style={{ color: "var(--color-text-muted)" }} />
            <span
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium"
              style={{ color: "var(--color-text-muted)", writingMode: "vertical-lr" }}
            >
              Scroll
            </span>
          </div>

          {/* Location stamp */}
          <p
            className="hidden sm:block text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-40"
            style={{ color: "var(--color-text-muted)" }}
          >
            Made with Love · Spring &amp; The Woodlands, Texas
          </p>
        </div>
      </div>
    </section>
  );
}
