"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-16 sm:py-24 px-4"
      style={{ background: "var(--color-bg-dark)" }}
    >
      <div className="footer-content max-w-[1280px] mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <Image
                src="/images/isotipo.jpeg"
                alt="Cakes by Yas isotipo"
                width={48}
                height={48}
                className="rounded-full"
                loading="lazy"
              />
              <h2
                className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold"
                style={{ color: "var(--color-text-light)" }}
              >
                Cakes by Yas
              </h2>
            </div>
            <p
              className="text-base max-w-sm leading-relaxed"
              style={{ color: "rgba(253,246,240,0.6)" }}
            >
              Homemade with love. Arte comestible para tus momentos más dulces.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-center sm:text-left">
            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-[0.15em] mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                Navegación
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Inicio", href: "#inicio" },
                  { label: "Pasteles", href: "#pasteles" },
                  { label: "Especialidades", href: "#especialidades" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-300 hover:text-[var(--color-primary)]"
                      style={{ color: "rgba(253,246,240,0.5)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-[0.15em] mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                Contacto
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://wa.me/18626680038"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-300 hover:text-[var(--color-primary)]"
                    style={{ color: "rgba(253,246,240,0.5)" }}
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/cakes_byyas_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-300 hover:text-[var(--color-primary)]"
                    style={{ color: "rgba(253,246,240,0.5)" }}
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-[0.15em] mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                Ubicación
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(253,246,240,0.5)" }}
              >
                Spring, TX
                <br />
                The Woodlands, TX
                <br />
                Houston, TX
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-8"
          style={{ background: "rgba(253,246,240,0.08)" }}
        />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(253,246,240,0.35)" }}>
            © {new Date().getFullYear()} Cakes by Yas. Todos los derechos
            reservados.
          </p>
          <p className="text-xs" style={{ color: "rgba(253,246,240,0.35)" }}>
            Hecho con 💕 en Spring, Texas
          </p>
        </div>
      </div>
    </footer>
  );
}
