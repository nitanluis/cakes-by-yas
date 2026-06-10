"use client";

import { useState, useEffect, useRef } from "react";
import React from "react";
import Link from "next/link";

const NAV_LINKS_LEFT = [
  { label: "The Creations", href: "/#pasteles" },
  { label: "Our Menu", href: "/#menu" },
];

const NAV_LINKS_RIGHT = [
  { label: "Our Story", href: "/#about" },
  { label: "Inquire", href: "/#contacto" },
];

const WHATSAPP_URL =
  `https://wa.me/18626680038?text=${encodeURIComponent(
    (() => {
      const eSparkles = String.fromCodePoint(0x2728);
      const eCake = String.fromCodePoint(0x1F382);
      
      return `${eSparkles} CAKES BY YAS ${eCake} NEW INQUIRY ${eSparkles}\n` +
        `-----------------------------------------\n\n` +
        `Hello, Yas! I would love to make an inquiry from your signature artisan menu.\n\n` +
        `Could you please provide me with more details and check availability for custom cake designs?\n\n` +
        `Thank you so much!`;
    })()
  )}`;

const NavLink = ({ label, href }: { label: string; href: string }) => (
  <Link
    href={href}
    className="nav-link-shimmer text-[13px] md:text-sm italic font-[family-name:var(--font-heading)] transition-colors duration-300 hover:text-[var(--color-primary)]"
    style={{ color: "var(--color-text)" }}
  >
    {label}
  </Link>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scrolled style transition (threshold past 120px)
      setScrolled(currentScrollY > 120);
      
      // Hide on scroll down, show on scroll up logic (threshold 200px to avoid initial jumpiness)
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      setLastScrollY(currentScrollY);

      // Scroll progress hilo de seda
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((currentScrollY / totalScroll) * 100);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock scroll when mobile overlay is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-elegant ${
          visible || mobileOpen ? "navbar-visible" : "navbar-hidden"
        } ${
          scrolled 
            ? "bg-[var(--color-bg)]/80 backdrop-blur-xl shadow-sm py-3 md:py-4 border-b border-[#E8E0DA]/30" 
            : "bg-transparent py-5 md:py-8"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex items-center justify-between md:grid md:grid-cols-3">
          
          {/* Mobile menu spacer */}
          <div className="md:hidden w-[40px] shrink-0"></div>
          
          {/* 1. Left Column: Links (Desktop only) */}
          <div className="hidden md:flex items-center justify-start gap-6 lg:gap-8">
            {NAV_LINKS_LEFT.map((link) => (
              <NavLink key={link.href} label={link.label} href={link.href} />
            ))}
          </div>

          {/* 2. Center Column: Logo */}
          <div className="flex items-center justify-center">
            <Link 
              href="/" 
              onClick={handleLogoClick}
              className="flex items-center justify-center shrink-0 w-auto transition-transform duration-500 ease-elegant hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              <img 
                src="/logo.png" 
                alt="Cakes By Yas" 
                className={`w-auto object-contain transition-all duration-500 ease-elegant ${
                  scrolled 
                    ? "h-10 md:h-12" 
                    : "h-14 md:h-16 lg:h-[72px]"
                }`}
              />
            </Link>
          </div>

          {/* 3. Right Column: Links + Action Button (Desktop) / Hamburger (Mobile) */}
          <div className="flex items-center justify-end">
            {/* Desktop right content */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <div className="flex items-center gap-6 lg:gap-8">
                {NAV_LINKS_RIGHT.map((link) => (
                  <NavLink key={link.href} label={link.label} href={link.href} />
                ))}
              </div>

              {/* Instagram link pill */}
              <a 
                href="https://www.instagram.com/cakes_byyas_/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ig-pill group" 
                aria-label="Instagram"
              >
                <svg className="ig-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="ig-text">Follow</span>
              </a>

              {/* Persistent Premium CTA */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-primary px-6 py-2.5 text-[10px] lg:text-[11px] font-semibold uppercase tracking-widest text-[#FBF7F4] rounded shadow-sm transition-all duration-500 ease-elegant hover:shadow-md hover:-translate-y-0.5"
                style={{ background: "var(--color-primary)" }}
              >
                Inquire
              </a>
            </div>

            {/* Mobile Hamburger — Centered touch point */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col items-end justify-center gap-2 w-[40px] shrink-0 z-50 relative group"
              aria-label="Toggle menu"
            >
              <span
                className={`h-[2px] rounded-full pointer-events-none transition-all duration-300 ${
                  mobileOpen ? "w-7 rotate-45 translate-y-[10px]" : "w-7"
                }`}
                style={{ background: "var(--color-primary)" }}
              />
              <span
                className={`h-[2px] rounded-full pointer-events-none transition-all duration-300 ${
                  mobileOpen ? "w-0 opacity-0" : "w-5 group-hover:w-7"
                }`}
                style={{ background: "var(--color-primary)" }}
              />
              <span
                className={`h-[2px] rounded-full pointer-events-none transition-all duration-300 ${
                  mobileOpen ? "w-7 -rotate-45 -translate-y-[10px]" : "w-6 group-hover:w-7"
                }`}
                style={{ background: "var(--color-primary)" }}
              />
            </button>
          </div>
        </div>

        {/* Scroll Progress Line — "Hilo de Seda" */}
        <div 
          className="absolute bottom-0 left-0 h-[1.5px] bg-[var(--color-primary)] transition-all duration-100 ease-out z-50"
          style={{ width: `${scrollProgress}%` }}
        />
      </nav>

      {/* Immersive Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay md:hidden flex flex-col justify-between pt-32 pb-12 px-8 ${
          mobileOpen ? "open" : ""
        }`}
      >
        {/* Navigation Links */}
        <div className="flex flex-col items-center gap-6 mt-6">
          {[...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="mobile-menu-link text-3xl font-[family-name:var(--font-heading)] italic tracking-wide transition-colors hover:text-[var(--color-primary)]"
              style={{ color: "var(--color-text)" }}
            >
              {link.label}
            </Link>
          ))}
          
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mobile-menu-link mt-8 hero-cta-primary px-8 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#FBF7F4] rounded text-center w-full max-w-[260px] shadow-sm transition-all duration-500 ease-elegant"
            style={{ background: "var(--color-primary)" }}
          >
            Inquire Now
          </a>
        </div>

        {/* Contact and Trust Footer info */}
        <div className="mobile-menu-link flex flex-col items-center gap-6 border-t border-[#E8E0DA]/40 pt-8 w-full max-w-[280px] mx-auto">
          <a 
            href="https://www.instagram.com/cakes_byyas_/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ig-pill group flex items-center gap-2.5 px-4 py-2" 
            aria-label="Instagram"
          >
            <svg className="ig-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="ig-text">Follow @cakes_byyas_</span>
          </a>

          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-semibold" style={{ color: "var(--color-text-muted)" }}>
              Made with Love
            </p>
            <p className="text-[11px] opacity-60 mt-1 font-light" style={{ color: "var(--color-text)" }}>
              Spring &amp; The Woodlands, Texas
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
