"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import productsData from "@/data/products.json";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PHONE_NUMBER = "18626680038";

type CreationItem = {
  id: string;
  name: string;
  desc: string;
  image: string;
};

export default function SignatureCreations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<CreationItem | null>(null);

  // Auto-open modal and scroll to section if "cake" search param is present in URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const cakeId = params.get("cake");
    if (cakeId) {
      const item = productsData.find((p) => p.id === cakeId);
      if (item) {
        // We delay slightly to let GSAP/Hydration settle and ensure elements exist
        const timer = setTimeout(() => {
          setSelectedItem(item);
          const element = document.getElementById("pasteles");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useGSAP(() => {
    // Section header entrance
    gsap.fromTo(
      ".creations-header",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      }
    );
  }, { scope: containerRef });

  // Batch animate cards
  useGSAP(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".creation-card");
    if (cards.length === 0) return;

    // Set initial state immediately to avoid FOUC (flash of unstyled content)
    gsap.set(cards, { y: 30, opacity: 0, scale: 0.98 });

    ScrollTrigger.batch(cards, {
      onEnter: (elements) => {
        gsap.to(elements, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: "auto",
          clearProps: "opacity,transform"
        });
      },
      start: "top 90%",
      once: true
    });
  }, { scope: containerRef });

  // Handle modal animation
  useGSAP(() => {
    if (selectedItem) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        ".modal-content",
        { y: 40, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, delay: 0.1, ease: "back.out(1.2)" }
      );
    }
  }, [selectedItem]);

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setSelectedItem(null)
    });
    gsap.to(".modal-content", {
      y: 20, scale: 0.95, opacity: 0, duration: 0.3, ease: "power2.in"
    });
  };

  const getOrderMessage = (item: CreationItem | null | undefined) => {
    if (item && item.id !== 'custom') {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const shareUrl = `${origin}/?cake=${item.id}`;
      
      const messageText = `✨ CAKES BY YAS • NEW INQUIRY ✨\n` +
        `-----------------------------------------\n` +
        `Hello, Yas! I would love to make an inquiry from your signature artisan menu.\n` +
        `✦ PRODUCT: ${item.name}\n` +
        `✦ DESCRIPTION: ${item.desc}\n` +
        `✦ REFERENCE LINK: ${shareUrl}\n` +
        `Could you please provide me with more details and check availability for my order?\n` +
        `Thank you so much!`;
        
      return encodeURIComponent(messageText);
    }
    
    const customText = `✨ CAKES BY YAS • CUSTOM DESIGN ✨\n` +
      `-----------------------------------------\n\n` +
      `Hello, Yas! I would love to discuss a fully custom cake design for my next special occasion.\n\n` +
      `Could you let me know how we can get started to check availability and details?\n\n` +
      `Thank you so much!`;
      
    return encodeURIComponent(customText);
  };

  const handleOrder = (type: 'whatsapp' | 'sms', item?: CreationItem | null) => {
    const activeItem = item !== undefined ? item : selectedItem;
    const msg = getOrderMessage(activeItem);
    
    if (type === 'whatsapp') {
      window.open(`https://wa.me/${PHONE_NUMBER}?text=${msg}`, "_blank");
    } else {
      // Use ?body= for iOS and &body= for Android as a general fallback, 
      // but next/link doesn't support sms deeply, so standard HTML fallback works best:
      const userAgent = navigator.userAgent || navigator.vendor;
      if (/iPad|iPhone|iPod/.test(userAgent)) {
        window.location.href = `sms:${PHONE_NUMBER}&body=${msg}`;
      } else {
        window.location.href = `sms:${PHONE_NUMBER}?body=${msg}`;
      }
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedItem]);

  return (
    <>
      <section id="pasteles" className="w-full flex justify-center px-4 sm:px-6 md:px-12 py-16 md:py-24">
        <div ref={containerRef} className="w-full max-w-none xl:max-w-[1920px] px-0 md:px-8 flex flex-col items-center">
          
          {/* Header */}
          <div className="creations-header text-center mb-12 md:mb-16">
            <h2 className="relative inline-block font-[family-name:var(--font-heading)] italic text-4xl sm:text-5xl md:text-6xl mb-4" style={{ color: "var(--color-text)" }}>
              Signature Creations
              {/* Magic Sparkles */}
              <svg className="absolute -top-1.5 -left-5 w-4 h-4 text-[var(--color-primary)] fill-current sparkle-animate-2 pointer-events-none" viewBox="0 0 24 24">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" className="pointer-events-none"/>
              </svg>
              <svg className="absolute -bottom-1 -right-5 w-3.5 h-3.5 text-[var(--color-secondary)] fill-current sparkle-animate-1 pointer-events-none" viewBox="0 0 24 24">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" className="pointer-events-none"/>
              </svg>
            </h2>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-3" style={{ color: "var(--color-primary)" }}>
              Edible Works of Art
            </p>
            <p className="text-sm md:text-base max-w-[460px] mx-auto leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Each creation is a unique piece, handcrafted with premium ingredients and Dominican artisan tradition.
            </p>
          </div>

          {/* Interactive Gallery Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
            {productsData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="creation-card group relative rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm border border-[rgba(0,0,0,0.04)] transition-[box-shadow,border-color] duration-500 hover:shadow-xl hover:border-[rgba(234,103,125,0.15)]"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5"
                    >
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                          {item.desc}
                        </p>
                        <span className="inline-flex items-center gap-1.5 mt-3 text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-white/80">
                          Click to expand
                          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 sm:p-5 flex justify-between items-center">
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-bold transition-colors duration-300" style={{ color: "var(--color-primary)" }}>
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm mt-1.5 leading-relaxed line-clamp-2" style={{ color: "#000000" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 md:mt-16 text-center flex flex-col items-center">
            <p className="text-xs sm:text-sm md:text-base mb-5" style={{ color: "var(--color-text-muted)" }}>
              Don&apos;t see what you want? We create fully custom designs.
            </p>
            <button
              onClick={() => setSelectedItem({ id: 'custom', name: 'Custom Design', desc: 'A custom order designed perfectly for your occasion.', image: '/images/real_cakes/cake_1.png' })}
              className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[var(--color-text)] text-white font-semibold uppercase tracking-widest text-xs sm:text-sm rounded-[6px] overflow-hidden transition-all duration-500 md:hover:scale-105 shadow-md hover:shadow-xl"
            >
              <span className="relative z-10 pointer-events-none">Request Custom Design</span>
              <svg
                className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 group-hover:translate-x-1 pointer-events-none"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" className="pointer-events-none" />
              </svg>
              <div className="absolute inset-0 bg-[var(--color-primary)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] pointer-events-none" />
            </button>
          </div>

        </div>
      </section>

      {/* Expand Modal */}
      {selectedItem && (
        <div 
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 md:p-8 bg-black/60 backdrop-blur-md"
          style={{ opacity: 0 }}
          onClick={closeModal}
        >
          <div 
            className="modal-content relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 hover:bg-white/90 hover:text-black transition-colors"
            >
              <svg className="w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" className="pointer-events-none" />
              </svg>
            </button>

            {/* Left Image Side */}
            <div className="w-full md:w-3/5 h-[40vh] md:h-auto relative bg-gray-100">
              <Image
                src={selectedItem.image}
                alt={selectedItem.name}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Right Content Side */}
            <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col h-full bg-white overflow-y-auto">
              <div className="flex-grow">
                <h3 className="font-[family-name:var(--font-heading)] italic text-3xl md:text-4xl mb-4 font-bold" style={{ color: "var(--color-primary)" }}>
                  {selectedItem.name}
                </h3>
                <div className="w-12 h-0.5 bg-[var(--color-primary)] opacity-50 mb-6"></div>
                <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: "#000000" }}>
                  {selectedItem.desc}
                </p>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-8">
                  Pricing provided upon inquiry.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3 pt-6 border-t border-gray-100">
                <p className="text-xs uppercase tracking-widest text-center mb-4" style={{ color: "var(--color-text)" }}>
                  Choose ordering method
                </p>
                
                <button 
                  onClick={() => handleOrder('whatsapp')}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-[6px] bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" className="pointer-events-none" />
                  </svg>
                  <span className="pointer-events-none">Order via WhatsApp</span>
                </button>
                
                <button 
                  onClick={() => handleOrder('sms')}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-[6px] bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-5 5v-5z" className="pointer-events-none" />
                  </svg>
                  <span className="pointer-events-none">Order via SMS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

