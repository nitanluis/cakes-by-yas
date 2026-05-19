"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const MENU_ITEMS = [
  { id: 1, title: "Pastel Boda Íntima", desc: "Diseño minimalista con flores naturales y crema blanca.", price: "$145+" },
  { id: 2, title: "Classic Birthday", desc: "Bizcocho tradicional con esferas decorativas en oro.", price: "$85+" },
  { id: 3, title: "Lightning theme", desc: "Pastel temático infantil personalizado con toppers.", price: "$95+" },
  { id: 4, title: "Vintage Heart", desc: "Diseño en forma de corazón con glaseado retro.", price: "$75+" },
  { id: 5, title: "Pink Glamour", desc: "Base rosada con drips dorados y coronas de fondant.", price: "$110+" },
  { id: 6, title: "Baby Shower", desc: "Tonos pastel suaves con decoración de galletas/macarons.", price: "$90+" },
  { id: 7, title: "Textured Elegance", desc: "Betún rústico texturizado con detalles botánicos.", price: "$120+" },
  { id: 8, title: "Tiered Celebration", desc: "Pastel de dos pisos ideal para grandes eventos.", price: "$180+" },
  { id: 9, title: "Choco Drip", desc: "Pastel alto con goteo de chocolate y fresas frescas.", price: "$85+" },
  { id: 10, title: "Modern Abstract", desc: "Manchas de color, hoja de oro y técnica en crema.", price: "$105+" },
  { id: 11, title: "Flan Napolitano", desc: "The traditional dessert with our special touch.", price: "$45" },
  { id: 12, title: "Number Cake", desc: "Number shaped cake with cookie and fruits.", price: "$70+" },
  { id: 13, title: "Custom Masterpiece", desc: "You imagine it, we create it custom.", price: "Quote" },
];

export default function Menu() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState<typeof MENU_ITEMS[0] | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animar título
      gsap.fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          }
        }
      );

      // Animar items del menú
      const items = gsap.utils.toArray<HTMLElement>(".menu-item");
      
      items.forEach((item) => {
        gsap.fromTo(item,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <section id="pasteles" className="px-6 md:px-12 pb-24 w-full flex justify-center bg-[var(--color-bg)] relative z-10">
        <div 
          ref={containerRef}
          className="w-full max-w-[1200px]"
        >
          <div ref={titleRef} className="text-center mb-16 pt-8">
            <h2 className="relative inline-block font-[family-name:var(--font-heading)] italic text-5xl md:text-7xl tracking-tight mb-4" style={{ color: "var(--color-text)" }}>
              The Menu
              {/* Magic Sparkles */}
              <svg className="absolute -top-2 -left-6 w-4 h-4 text-[var(--color-primary)] fill-current sparkle-animate-1" viewBox="0 0 24 24">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z"/>
              </svg>
              <svg className="absolute -bottom-1 -right-6 w-3 h-3 text-[var(--color-secondary)] fill-current sparkle-animate-2" viewBox="0 0 24 24">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z"/>
              </svg>
            </h2>
            <p className="text-sm md:text-base uppercase tracking-[0.1em] font-medium" style={{ color: "var(--color-primary)" }}>
              Edible works of art
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-4">
            {MENU_ITEMS.map((item) => (
              <div
                key={item.id}
                className="menu-item group relative flex items-center gap-6 py-4 px-4 -mx-4 rounded-2xl cursor-pointer transition-all duration-500 ease-elegant md:hover:-translate-y-1 md:hover:scale-[1.01] md:hover:bg-white/70 md:hover:shadow-[0_8px_32px_rgba(234,103,125,0.08),0_2px_8px_rgba(0,0,0,0.04)] md:hover:backdrop-blur-md md:hover:ring-1 md:hover:ring-[#F8A8B1]/20"
                onClick={() => setSelectedImage(item)}
              >
                {/* Left accent line — appears on hover */}
                <div
                  className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(180deg, var(--color-secondary), var(--color-primary), var(--color-accent))",
                    transition: "opacity 0.5s ease, top 0.5s ease, bottom 0.5s ease",
                  }}
                />

                {/* Imagen */}
                <div
                  className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden rounded-[1rem] shadow-soft"
                  style={{
                    transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  <div
                    className="absolute inset-0 z-10 bg-black/5 group-hover:bg-transparent pointer-events-none"
                    style={{ transition: "background 0.5s ease" }}
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none text-white drop-shadow-md" style={{ transition: "opacity 0.3s ease" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </div>
                  <Image
                    src={`/images/real_cakes/real_cake_${item.id}.jpeg`}
                    alt={item.title}
                    fill
                    className="object-cover"
                    style={{
                      transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                    sizes="(max-width: 768px) 80px, 96px"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = "scale(1.15)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                    }}
                  />
                  {/* Glow ring on hover */}
                  <div
                    className="absolute -inset-[2px] rounded-[1.1rem] opacity-0 group-hover:opacity-100 -z-10 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, var(--color-secondary), var(--color-primary))",
                      filter: "blur(6px)",
                      transition: "opacity 0.5s ease",
                    }}
                  />
                </div>

                {/* Contenido / Texto */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <div className="flex justify-between items-end mb-2 w-full">
                    <h3
                      className="text-lg sm:text-xl font-[family-name:var(--font-heading)] font-semibold truncate"
                      style={{
                        color: "var(--color-text)",
                        transition: "all 0.4s ease",
                      }}
                    >
                      <span className="group-hover:text-[var(--color-primary)]" style={{ transition: "color 0.4s ease" }}>
                        {item.title}
                      </span>
                    </h3>
                    <div className="price-dots mx-2" />
                    <span
                      className="text-sm sm:text-base font-semibold whitespace-nowrap"
                      style={{
                        color: "#3A3A3A",
                        transition: "all 0.4s ease",
                      }}
                    >
                      <span className="group-hover:drop-shadow-[0_0_6px_rgba(234,103,125,0.3)]" style={{ transition: "filter 0.4s ease" }}>
                        {item.price}
                      </span>
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed line-clamp-2"
                    style={{
                      color: "var(--color-text-muted)",
                      transition: "color 0.4s ease",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          style={{ background: "rgba(26, 23, 21, 0.6)", backdropFilter: "blur(6px)" }}
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-full max-w-[900px] flex flex-col md:flex-row bg-[var(--color-bg-card)] rounded-[2rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close window"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Left: Expanded Image */}
            <div className="w-full md:w-1/2 aspect-square relative bg-black/5">
              <Image
                src={`/images/real_cakes/real_cake_${selectedImage.id}.jpeg`}
                alt={selectedImage.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
                priority
              />
            </div>
            
            {/* Right: Content & Actions */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[var(--color-bg)]">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-3" style={{ color: "var(--color-primary)" }}>
                Selected Item
              </span>
              <h3 className="font-[family-name:var(--font-heading)] italic text-4xl md:text-5xl mb-4" style={{ color: "var(--color-text)" }}>
                {selectedImage.title}
              </h3>
              
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-text-muted)" }}>
                {selectedImage.desc}
              </p>
              
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-[#E8E0DA]">
                <span className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
                  {selectedImage.price}
                </span>
                <span className="text-xs uppercase tracking-wider text-gray-500">
                  Starting Price
                </span>
              </div>
              
              {/* WhatsApp CTA Button */}
              <a
                href={`https://wa.me/18626680038?text=${encodeURIComponent(
                  `✨ CAKES BY YAS • NEW INQUIRY ✨\n` +
                  `-----------------------------------------\n` +
                  `Hello, Yas! I would love to make an inquiry from your signature artisan menu.\n` +
                  `✦ PRODUCT: ${selectedImage.title}\n` +
                  `✦ STARTING PRICE: ${selectedImage.price}\n` +
                  `✦ DESCRIPTION: ${selectedImage.desc}\n` +
                  `Could you please provide me with more details and check availability for my order?\n` +
                  `Thank you so much!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-[6px] flex items-center justify-center gap-3 text-white font-semibold uppercase tracking-widest text-sm transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-1"
                style={{ background: "var(--color-primary)" }}
              >
                <span>Order via WhatsApp</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
