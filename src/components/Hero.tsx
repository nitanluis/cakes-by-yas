"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const WHATSAPP_URL =
  "https://wa.me/18626680038?text=Hola%20Yas!%20Vi%20tu%20p%C3%A1gina%20y%20me%20gustar%C3%ADa%20consultar%20por%20un%20pastel...";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        imageRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4 }
      )
        .fromTo(
          titleRef.current,
          { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1 },
          "-=0.8"
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4"
    >
      {/* Background Image with Overlay */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src="/images/hero-cake.png"
          alt="Pastel artesanal elegante con corona dorada, mariposas y esferas decorativas - Cakes by Yas"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(45,27,20,0.55) 0%, rgba(45,27,20,0.75) 60%, rgba(253,246,240,1) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="mb-4">
          <span
            className="inline-block px-5 py-2 text-sm font-medium tracking-[0.15em] uppercase rounded-full border"
            style={{
              color: "rgba(253,246,240,0.9)",
              borderColor: "rgba(253,246,240,0.25)",
              background: "rgba(253,246,240,0.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            ✦ Repostería Artesanal ✦
          </span>
        </div>

        <h1
          ref={titleRef}
          className="font-[family-name:var(--font-cormorant)] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 leading-[0.95] tracking-tight"
          style={{ color: "var(--color-text-light)" }}
        >
          Cakes by Yas
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl font-light mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ color: "rgba(253,246,240,0.85)" }}
        >
          Arte comestible para tus momentos más dulces
        </p>

        <a
          ref={ctaRef}
          href="#pasteles"
          className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          style={{
            background: "var(--color-primary)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          Ver Pasteles
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </a>
      </div>

      {/* Decorative bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 h-16 z-10">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60V30C240 0 480 0 720 15C960 30 1200 45 1440 30V60H0Z"
            fill="#FDF6F0"
          />
        </svg>
      </div>
    </section>
  );
}
