"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Contact() {
  const waRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (waRef.current) {
      gsap.to(waRef.current, {
        boxShadow: "0 0 25px rgba(234, 103, 125, 0.4)",
        scale: 1.02,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, { scope: waRef });

  return (
    <section id="contacto" className="px-6 md:px-12 pt-4 pb-16 md:pt-8 md:pb-24 w-full flex justify-center bg-[var(--color-bg)] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/5 blur-[120px] rounded-[100%] pointer-events-none -z-10" />

      <div className="w-full max-w-[800px] flex flex-col items-center text-center relative z-10">
        <h2 className="font-[family-name:var(--font-heading)] italic text-4xl md:text-5xl mb-6" style={{ color: "var(--color-text)" }}>
          Contact Us
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-12" style={{ color: "var(--color-text-muted)" }}>
          Ready to order your custom cake? Reach out to us through your preferred channel.
        </p>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-[650px] justify-center items-center">
          {/* SMS */}
          <a 
            href="sms:+18626680038" 
            className="w-full md:w-auto min-w-[180px] flex justify-center items-center gap-3 py-4 md:py-5 px-6 rounded-2xl bg-[var(--color-bg-card)] shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 group border border-[#E8E0DA]/50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"></path>
            </svg>
            <span className="text-[12px] uppercase tracking-widest font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
              Text SMS
            </span>
          </a>
          
          {/* WhatsApp */}
          <a 
            ref={waRef}
            href="https://wa.me/18626680038" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full md:w-auto min-w-[200px] flex justify-center items-center gap-3 py-4 md:py-5 px-6 rounded-2xl text-white transition-all duration-300 hover:-translate-y-1" 
            style={{ background: "var(--color-primary)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
            </svg>
            <span className="text-[12px] uppercase tracking-widest font-semibold">
              WhatsApp
            </span>
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/cakes_byyas_/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full md:w-auto min-w-[180px] flex justify-center items-center gap-3 py-4 md:py-5 px-6 rounded-2xl bg-[var(--color-bg-card)] shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 group border border-[#E8E0DA]/50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="text-[12px] uppercase tracking-widest font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
              Instagram
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
