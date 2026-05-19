"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

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
        className="w-full pt-10 pb-36 md:pt-16 md:pb-32 px-5 sm:px-6 md:px-12 border-t border-[rgba(0,0,0,0.05)]"
        style={{ background: "#F5F0EB" }}
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
                style={{ color: "var(--color-text)" }}
              >
                Cakes by Yas.
              </h2>
            </div>
            <p
              className="text-xs max-w-[280px] leading-relaxed mx-auto md:mx-0"
              style={{ color: "var(--color-text-muted)" }}
            >
              Edible art for your sweetest moments. Handcrafted in Spring, Texas.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-row justify-center md:justify-end gap-12 sm:gap-16 text-left flex-1">
            <div>
              <h4
                className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                Navigate
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Home", href: "/#inicio" },
                  { label: "Creations", href: "/#pasteles" },
                  { label: "Menu", href: "/#menu" },
                  { label: "About", href: "/#about" },
                  { label: "Contact", href: "/#contacto" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs transition-colors duration-300 hover:text-[var(--color-primary)]"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                Connect
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="https://wa.me/18626680038"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs transition-colors duration-300 hover:text-[var(--color-primary)]"
                    style={{ color: "var(--color-text-muted)" }}
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
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="sms:18626680038"
                    className="text-xs transition-colors duration-300 hover:text-[var(--color-primary)]"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Text / SMS
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{ background: "rgba(0,0,0,0.06)" }}
        />

        {/* Texas Cottage Food Law Disclaimer */}
        <div className="mb-6">
          <p
            className="text-[10px] sm:text-[11px] leading-relaxed max-w-[800px] mx-auto text-center md:text-left"
            style={{ color: "var(--color-text-muted)", opacity: 0.8 }}
          >
            <strong style={{ color: "var(--color-text)" }}>Texas Cottage Food Law Disclosure:</strong>{" "}
            This product is made in a home kitchen that is not subject to state inspection or regulation, 
            and that may also process common food allergens such as tree nuts, peanuts, eggs, soy, wheat, 
            milk, and fish. This product is not intended for resale.
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] sm:text-[11px]" style={{ color: "var(--color-text-muted)", opacity: 0.7 }}>
            © {new Date().getFullYear()} Cakes by Yas. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-[11px]" style={{ color: "var(--color-text-muted)", opacity: 0.7 }}>
            Made with 💕 in Spring, Texas
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
