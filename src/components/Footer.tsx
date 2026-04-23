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
      className="w-full flex justify-center mt-auto"
    >
      <div 
        className="w-full pt-10 pb-28 md:pt-16 md:pb-32 px-6 md:px-12 border-t border-[rgba(0,0,0,0.05)]"
        style={{ background: "var(--color-bg-dark)" }}
      >
        <div className="footer-content max-w-[1400px] mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-10 relative">
          
          {/* Brand */}
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
              <img
                src="/isotipo.png"
                alt="Cakes by Yas isotipo"
                className="w-8 h-8 object-contain"
                loading="lazy"
              />
              <h2
                className="font-[family-name:var(--font-heading)] text-2xl font-bold italic"
                style={{ color: "var(--color-text-light)" }}
              >
                Cakes by Yas.
              </h2>
            </div>
            <p
              className="text-xs max-w-[280px] leading-relaxed mx-auto md:mx-0"
              style={{ color: "rgba(253,248,248,0.5)" }}
            >
              Edible art for your sweetest moments.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-row justify-center md:justify-end gap-12 sm:gap-20 text-left flex-1">
            <div>
              <h4
                className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                Menu
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Home", href: "#inicio" },
                  { label: "Cakes", href: "#pasteles" },
                  { label: "Creations", href: "#collections" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xs transition-colors duration-300 hover:text-[var(--color-primary)]"
                      style={{ color: "rgba(253,248,248,0.5)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                Social
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://wa.me/18626680038"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs transition-colors duration-300 hover:text-[var(--color-primary)]"
                    style={{ color: "rgba(253,248,248,0.5)" }}
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/cakes_byyas_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs transition-colors duration-300 hover:text-[var(--color-primary)]"
                    style={{ color: "rgba(253,248,248,0.5)" }}
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{ background: "rgba(253,248,248,0.06)" }}
        />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px]" style={{ color: "rgba(253,248,248,0.3)" }}>
            © {new Date().getFullYear()} Cakes by Yas. All rights reserved.
          </p>
          <p className="text-[11px]" style={{ color: "rgba(253,248,248,0.3)" }}>
            Made with 💕 in Spring, Texas
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
