"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const WA_URL = "https://wa.me/18626680038";
const IG_URL = "https://www.instagram.com/cakes_byyas_/";
const SMS_URL = "sms:18626680038";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    // Initial entrance
    gsap.fromTo(
      btnRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 1.5 }
    );
  }, { scope: containerRef });

  useEffect(() => {
    if (!menuRef.current) return;
    
    if (isOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "back.out(1.2)"
      });
      gsap.fromTo(
        menuRef.current.querySelectorAll('.contact-item'),
        { opacity: 0, x: 15 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.4, ease: "power2.out", delay: 0.1 }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: 15,
        scale: 0.95,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [isOpen]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50 flex flex-col items-end">
      {/* Glass Menu */}
      <div 
        ref={menuRef}
        className="mb-4 flex flex-col gap-1 p-2 bg-[var(--color-bg-card)]/85 backdrop-blur-2xl border border-[var(--color-border)] rounded-2xl shadow-image opacity-0 pointer-events-none scale-95 translate-y-4"
        style={{ transformOrigin: "bottom right" }}
      >
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="contact-item flex items-center gap-4 px-5 py-3.5 rounded-xl hover:bg-[var(--color-bg)] transition-colors group">
          <div className="w-10 h-10 rounded-[10px] bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform duration-300">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <span className="text-[15px] font-medium text-[var(--color-text)] pr-4">WhatsApp</span>
        </a>
        
        <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="contact-item flex items-center gap-4 px-5 py-3.5 rounded-xl hover:bg-[var(--color-bg)] transition-colors group">
          <div className="w-10 h-10 rounded-[10px] bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </div>
          <span className="text-[15px] font-medium text-[var(--color-text)] pr-4">Instagram</span>
        </a>
        
        <a href={SMS_URL} className="contact-item flex items-center gap-4 px-5 py-3.5 rounded-xl hover:bg-[var(--color-bg)] transition-colors group">
          <div className="w-10 h-10 rounded-[10px] bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF] group-hover:scale-110 transition-transform duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <span className="text-[15px] font-medium text-[var(--color-text)] pr-4">Mensaje (SMS)</span>
        </a>
      </div>

      {/* Main Pill Button */}
      <button
        ref={btnRef}
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-4 rounded-full shadow-image flex items-center gap-3 transition-all duration-500 relative overflow-hidden group hover:scale-[1.02] active:scale-95"
        style={{ 
          background: isOpen ? "var(--color-primary)" : "var(--color-text)", 
          color: isOpen ? "var(--color-bg)" : "var(--color-bg)" 
        }}
        aria-label="Toggle contact menu"
      >
        <span className="text-[13px] font-bold tracking-[0.1em] uppercase">
          {isOpen ? "Cerrar" : "Order Now"}
        </span>
        <div className="relative w-5 h-5 flex items-center justify-center">
          <svg 
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className={`absolute transition-transform duration-500 ease-elegant ${isOpen ? "rotate-135 scale-100" : "rotate-0 scale-100"}`}
          >
            <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </button>
    </div>
  );
}
