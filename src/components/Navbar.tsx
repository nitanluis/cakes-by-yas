"use client";

import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";

const NAV_LINKS_LEFT = [
  { label: "Menu", href: "/#pasteles" },
];

const NAV_LINKS_RIGHT = [
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contacto" },
];

const WHATSAPP_URL =
  "https://wa.me/18626680038?text=Hola%20Yas!%20I'd%20like%20to%20order%20a%20custom%20cake.";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-elegant ${
        scrolled ? "bg-[var(--color-bg-card)]/90 backdrop-blur-md shadow-sm py-4 border-b border-[#E8E0DA]/50" : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex items-center justify-between">
        
        {/* Spacer for mobile to balance flex layout with hamburger */}
        <div className="md:hidden w-8 h-8"></div>

        {/* Logo - Absolute centered on mobile, left-aligned on desktop */}
        <Link 
          href="/" 
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center shrink-0 w-auto flex-nowrap gap-2 md:gap-3 transition-transform duration-500 ease-elegant hover:-translate-y-0.5 hover:scale-[1.02]"
        >
          <img 
            src="/isotipo.png" 
            alt="Cakes By Yas Icon" 
            className="w-10 h-10 md:w-14 md:h-14 object-contain"
          />
          <span
            className="font-[family-name:var(--font-heading)] italic font-semibold text-2xl lg:text-3xl"
            style={{ color: "var(--color-primary)" }}
          >
            Cakes By Yas.
          </span>
        </Link>

        {/* Desktop Links (Centered) */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 flex-nowrap gap-8">
          <div className="flex items-center gap-8">
            {NAV_LINKS_LEFT.map((link) => (
              <NavLink key={link.href} label={link.label} href={link.href} />
            ))}
          </div>

          {/* Dynamic Expanding CTA Button */}
          <div 
            className={`flex items-center justify-center transition-all duration-700 ease-elegant overflow-hidden whitespace-nowrap ${
              scrolled ? "w-[180px] opacity-100 mx-8" : "w-0 opacity-0 mx-0 pointer-events-none"
            }`}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#FBF7F4] rounded shadow-sm transition-all duration-300 hover:opacity-90 w-full text-center hover:-translate-y-0.5"
              style={{ background: "var(--color-primary)" }}
            >
              Order Now
            </a>
          </div>

          <div className="flex items-center gap-8">
            {NAV_LINKS_RIGHT.map((link) => (
              <NavLink key={link.href} label={link.label} href={link.href} />
            ))}
          </div>
        </div>

        {/* Desktop Socials — IG expanding pill */}
        <div className="hidden md:flex items-center justify-end w-auto">
          <a href="https://www.instagram.com/cakes_byyas_/" target="_blank" rel="noopener noreferrer" className="ig-pill group" aria-label="Instagram">
            <svg className="ig-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="ig-text">Follow</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 shrink-0"
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-6 transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
            style={{ background: "var(--color-text)" }}
          />
          <span
            className={`h-px w-6 transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
            style={{ background: "var(--color-text)" }}
          />
          <span
            className={`h-px w-6 transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
            style={{ background: "var(--color-text)" }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-500 ease-elegant bg-[var(--color-bg-card)] shadow-medium border-b border-[#E8E0DA]/50 ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-6 py-8 px-6">
          {[...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-lg italic font-[family-name:var(--font-heading)] transition-colors hover:text-[var(--color-primary)]"
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
            className="mt-4 px-8 py-3 text-[11px] font-semibold uppercase tracking-widest text-[#FBF7F4] rounded text-center w-full max-w-[200px]"
            style={{ background: "var(--color-primary)" }}
          >
            Order Now
          </a>
          
          <div className="flex items-center justify-center gap-6 mt-4">
            <a href="https://www.instagram.com/cakes_byyas_/" target="_blank" rel="noopener noreferrer" className="ig-pill group" aria-label="Instagram">
              <svg className="ig-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <span className="ig-text">Follow</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
