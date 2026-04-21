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
      className="px-2 pb-2 w-full flex justify-center"
    >
      <div 
        className="w-full rounded-[2rem] md:rounded-[3rem] py-16 sm:py-24 px-8 md:px-16"
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
                className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold italic"
                style={{ color: "var(--color-text-light)" }}
              >
                Cakes by Yas
              </h2>
            </div>
            <p
              className="text-base max-w-sm leading-relaxed"
              style={{ color: "rgba(253,248,248,0.6)" }}
            >
              Homemade with love. Edible art for your sweetest moments.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-center sm:text-left">
            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-[0.15em] mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                Navigation
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "#inicio" },
                  { label: "Menu", href: "#pasteles" },
                  { label: "Creations", href: "#collections" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-300 hover:text-[var(--color-primary)]"
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
                className="text-sm font-semibold uppercase tracking-[0.15em] mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                Contact
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://wa.me/18626680038"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-300 hover:text-[var(--color-primary)]"
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
                    className="text-sm transition-colors duration-300 hover:text-[var(--color-primary)]"
                    style={{ color: "rgba(253,248,248,0.5)" }}
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
                Location
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(253,248,248,0.5)" }}
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
          style={{ background: "rgba(253,248,248,0.08)" }}
        />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(253,248,248,0.35)" }}>
            © {new Date().getFullYear()} Cakes by Yas. All rights
            reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(253,248,248,0.35)" }}>
            Made with 💕 in Spring, Texas
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
