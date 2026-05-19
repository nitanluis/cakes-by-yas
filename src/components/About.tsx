"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".about-animate"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="px-6 md:px-12 pt-8 pb-2 md:pt-16 md:pb-8 w-full flex justify-center bg-[var(--color-bg)] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[var(--color-secondary)]/10 blur-[120px] rounded-[100%] pointer-events-none -z-10" />

      <div className="w-full max-w-[1000px] flex flex-col items-center text-center relative z-10">
        <h2 className="about-animate font-[family-name:var(--font-heading)] italic text-4xl md:text-6xl mb-10" style={{ color: "var(--color-text)" }}>
          Our Story
        </h2>
        
        <p className="about-animate text-[14px] md:text-[18px] leading-[2.2] mb-12 px-4 md:px-12 font-light" style={{ color: "var(--color-text-muted)" }}>
          Cakes by Yas was born from a vision of artisanal excellence and Dominican heritage, nurtured by a passion for creating unforgettable celebrations. Our journey began with a simple desire: to offer a haven where guests could experience the perfect balance of traditional flavor and modern elegance.
        </p>
        
        <div className="about-animate w-full max-w-[800px] h-[1px] my-8 md:my-10" style={{ background: "linear-gradient(90deg, transparent, rgba(234, 103, 125, 0.3), transparent)" }} />
        
        <p className="about-animate font-[family-name:var(--font-heading)] italic text-2xl md:text-3xl px-8 md:px-16 leading-relaxed" style={{ color: "var(--color-primary)" }}>
          &ldquo;Our dedication to artisanal detail is the heart and soul behind every exceptional creation.&rdquo;
        </p>

        <div className="about-animate w-full max-w-[600px] h-[1px] my-10" style={{ background: "linear-gradient(90deg, transparent, rgba(234, 103, 125, 0.3), transparent)" }} />
      </div>
    </section>
  );
}
