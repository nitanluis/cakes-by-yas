"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Pasteles", href: "#pasteles" },
  { label: "Especialidades", href: "#especialidades" },
];

const WHATSAPP_URL =
  "https://wa.me/18626680038?text=Hola%20Yas!%20Vi%20tu%20p%C3%A1gina%20y%20me%20gustar%C3%ADa%20consultar%20por%20un%20pastel...";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      id="navbar"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out
        ${
          scrolled
            ? "w-[92%] max-w-3xl py-2.5 px-5 shadow-lg"
            : "w-[95%] max-w-4xl py-3.5 px-7"
        }
        rounded-full backdrop-blur-xl border border-white/30`}
      style={{
        background: scrolled
          ? "rgba(253, 246, 240, 0.85)"
          : "rgba(253, 246, 240, 0.6)",
      }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/isotipo.jpeg"
            alt="Cakes by Yas isotipo"
            width={36}
            height={36}
            className="rounded-full"
            priority
          />
          <span
            className="font-[family-name:var(--font-cormorant)] font-semibold text-lg tracking-tight"
            style={{ color: "var(--color-primary)" }}
          >
            Cakes by Yas
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-300 hover:text-[var(--color-primary)]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-sm font-semibold text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: "var(--color-primary)" }}
          >
            Cotizar
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-5 rounded-full transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
            style={{ background: "var(--color-text)" }}
          />
          <span
            className={`h-0.5 w-5 rounded-full transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
            style={{ background: "var(--color-text)" }}
          />
          <span
            className={`h-0.5 w-5 rounded-full transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
            style={{ background: "var(--color-text)" }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          mobileOpen ? "max-h-60 mt-4 pb-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium py-2 px-3 rounded-xl transition-colors duration-300 hover:bg-[var(--color-secondary)]/10"
              style={{ color: "var(--color-text)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-full text-center transition-all duration-300"
            style={{ background: "var(--color-primary)" }}
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
