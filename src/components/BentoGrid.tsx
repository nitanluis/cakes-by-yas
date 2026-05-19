"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_URL =
  `https://wa.me/18626680038?text=${encodeURIComponent(
    `✨ CAKES BY YAS • NEW INQUIRY ✨\n` +
    `-----------------------------------------\n\n` +
    `Hello, Yas! I would love to make an inquiry from your signature artisan menu.\n\n` +
    `Could you please provide me with more details and check availability for my order?\n\n` +
    `Thank you so much!`
  )}`;

export default function BentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Fade & Slide Up Stagger
      const blocks = gsap.utils.toArray<HTMLElement>(".bento-block");
      blocks.forEach((block, i) => {
        gsap.fromTo(
          block,
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            delay: i * 0.08,
            force3D: true,
          }
        );
      });

      // 2. Cinematic Parallax Float Effect on Images (Desktop & Tablet)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 640px)", () => {
        const images = gsap.utils.toArray<HTMLElement>(".bento-block img");
        images.forEach((img) => {
          gsap.fromTo(img, 
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pasteles" className="py-16 sm:py-24 px-4">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            Our Creations
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl md:text-6xl font-semibold">
            Every cake tells a story
          </h2>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 auto-rows-[280px] sm:auto-rows-[320px]"
        >
          {/* Block 1: Signature Cake — spans 2x2 */}
          <div className="bento-block group relative overflow-hidden rounded-3xl md:col-span-2 md:row-span-2 cursor-pointer">
            <Image
              src="/images/signature-cake.png"
              alt="Pastel signature de diseño con decoración de silueta y flores rosas"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span
                className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full mb-3"
                style={{ background: "var(--color-primary)" }}
              >
                Signature
              </span>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-semibold text-white mb-2">
                Signature Cakes
              </h3>
              <p className="text-white/80 text-sm max-w-sm">
                Every creation is a unique piece of art, designed to celebrate your special moments.
              </p>
            </div>
          </div>

          {/* Block 2: Location Badge */}
          <div
            className="bento-block relative overflow-hidden rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
            style={{ background: "var(--color-bg-block)" }}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--color-secondary)" }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-semibold mb-2">
                Spring & The Woodlands
              </h3>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Serving the Houston, TX area. Deliveries available for events and celebrations.
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              {["Spring", "The Woodlands", "Houston"].map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{
                    background: "var(--color-secondary)",
                    color: "var(--color-primary)",
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Block 3: Flan Specialty */}
          <div className="bento-block group relative overflow-hidden rounded-3xl cursor-pointer">
            <Image
              src="/images/flan-specialty.png"
              alt="Flan casero con caramelo dorado - especialidad de Cakes by Yas"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span
                className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full mb-2"
                style={{ background: "var(--color-accent)" }}
              >
                Specialty
              </span>
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white">
                Homemade Flans
              </h3>
            </div>
          </div>

          {/* Block 4: The Baker — spans 1x2 vertically */}
          <div
            className="bento-block group relative overflow-hidden rounded-3xl md:row-span-2 cursor-pointer"
          >
            <Image
              src="/images/baker-portrait.png"
              alt="Yasleidy Fernandez, la pastelera artesanal detrás de Cakes by Yas"
              fill
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span
                className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full mb-3"
                style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
              >
                The Artist
              </span>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-white mb-2">
                Made with Love
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Artisanal designs with passion in every detail. Registered under the cottage food law with Food Handler certification.
              </p>
            </div>
          </div>

          {/* Block 5: Specialties (2x1) */}
          <div
            id="especialidades"
            className="bento-block group relative overflow-hidden rounded-3xl md:col-span-2 cursor-pointer"
          >
            <Image
              src="/images/specialties.png"
              alt="Variedad de postres artesanales: cupcakes, macarons, flan y galletas decoradas"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-semibold text-white mb-2">
                Specialties
              </h3>
              <p className="text-white/80 text-sm">
                Cupcakes, macarons, decorated cookies, and more. Every bite is an experience.
              </p>
            </div>
          </div>

          {/* Block 6: CTA (2x1) */}
          <div
            className="bento-block relative overflow-hidden rounded-3xl md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center text-center p-8 sm:p-12"
            style={{
              background: "linear-gradient(135deg, var(--color-primary) 0%, #c44d62 100%)",
            }}
          >
            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-white mb-3">
              Ready to order?
            </h3>
            <p className="text-white/85 text-base mb-6 max-w-md">
              Every cake is custom. Tell us your idea and we&apos;ll make it a reality.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-base font-bold rounded-md transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              style={{ color: "var(--color-primary)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
