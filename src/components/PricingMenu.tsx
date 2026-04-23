"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PHONE_NUMBER = "18626680038";

const FILLINGS = [
  "Dulce de Leche",
  "Strawberries & Cream Cheese",
  "Oreo",
  "Pastry Cream",
  "Nutella",
  "Pineapple"
];

type SizeOption = { label: string; price: string };

type MenuItem = {
  id: string;
  name: string;
  price: string | null;
  desc: string;
  sizes?: SizeOption[];
  requiresFilling?: boolean;
};

type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "classic",
    label: "Classics & Specialities",
    items: [
      { 
        id: "tres-leches",
        name: "Tres Leches Tradicional", 
        price: "$45", 
        desc: "Our classic, a sponge cake drenched in three types of milk.",
        requiresFilling: true,
      },
      { 
        id: "choco-tres-leches",
        name: "Chocolate Tres Leches", 
        price: "$48", 
        desc: "An indulgent version for cocoa lovers.",
        requiresFilling: true,
      },
      { 
        id: "house-flan",
        name: "House Flan", 
        price: "From $20", 
        desc: "A rich, creamy, and delicate classic.",
        sizes: [
          { label: "Small (4-6 servings)", price: "$20" },
          { label: "Medium (8-12 servings)", price: "$40" },
          { label: "Large (16-20 servings)", price: "$60" }
        ],
        requiresFilling: false,
      },
      { 
        id: "chocoflan",
        name: "Chocoflan / Vainillaflan", 
        price: "From $55", 
        desc: "The perfect half cake, half flan combination.",
        sizes: [
          { label: "Small (4-6 servings)", price: "$55" },
          { label: "Medium (8-12 servings)", price: "$75" }
        ],
        requiresFilling: false,
      },
      { 
        id: "dominican-cake",
        name: "Dominican Cake", 
        price: "Quote", 
        desc: "The traditional recipe, known for its moist texture and incomparable taste.",
        requiresFilling: true,
      }
    ]
  },
  {
    id: "dessert-tables",
    label: "Dessert Tables",
    items: [
      { id: "mini-tres-leches", name: "Mini Tres Leches", price: "$35", desc: "Priced per dozen. Perfect for parties." },
      { id: "mini-chocoflan", name: "Mini Chocoflan", price: "$40", desc: "Priced per dozen." },
      { id: "mini-jellies", name: "Mini Jellies", price: "$50", desc: "Various flavors available. Priced per dozen." },
      { id: "chinola-mousse", name: "Chinola/Parcha Mousse", price: "$20", desc: "Passion fruit mousse. Priced per dozen." },
      { id: "mini-flan", name: "Mini Flan", price: "$20", desc: "Priced per dozen." },
      { id: "mini-pecca", name: "Mini Pecca", price: "$25", desc: "Priced per dozen." },
    ]
  }
];

export default function PricingMenu() {
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES[0].id);
  
  // Order Builder State
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, SizeOption>>({});
  const [selectedFillings, setSelectedFillings] = useState<Record<string, string>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" }
      }
    );
  }, { scope: containerRef });

  useGSAP(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll(".menu-item-card");
    gsap.fromTo(
      items,
      { y: 20, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", clearProps: "all" }
    );
  }, [activeTab]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleSizeSelect = (itemId: string, size: SizeOption) => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  const handleFillingSelect = (itemId: string, filling: string) => {
    setSelectedFillings(prev => ({ ...prev, [itemId]: filling }));
  };

  const generateOrderMessage = (item: MenuItem) => {
    const size = selectedSizes[item.id];
    const filling = selectedFillings[item.id];
    
    let msg = `Hola Yas! I'd like to order a ${item.name}.`;
    if (size) msg += `\nSize: ${size.label} (${size.price})`;
    if (filling) msg += `\nFlavor/Filling: ${filling}`;
    
    msg += `\nCan you give me more details?`;
    return encodeURIComponent(msg);
  };

  const activeCategory = MENU_CATEGORIES.find(c => c.id === activeTab);

  return (
    <section id="pasteles" className="w-full flex justify-center px-4 md:px-12 py-16 md:py-24 bg-[var(--color-bg)]">
      <div ref={containerRef} className="w-full max-w-[1000px] flex flex-col items-center">
        
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] italic text-5xl md:text-6xl mb-4" style={{ color: "var(--color-text)" }}>
            The Menu
          </h2>
          <p className="text-sm md:text-base uppercase tracking-[0.2em] font-medium" style={{ color: "var(--color-primary)" }}>
            Tap to Customize & Order
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="w-full max-w-[600px] flex flex-col sm:flex-row bg-white rounded-2xl md:rounded-full p-1.5 md:p-2 mb-10 shadow-sm border border-[rgba(0,0,0,0.05)]">
          {MENU_CATEGORIES.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setExpandedId(null); }}
                className={`flex-1 py-3 px-4 md:py-3.5 text-sm md:text-base font-semibold rounded-xl md:rounded-full transition-all duration-300 ${
                  isActive 
                    ? "bg-[var(--color-primary)] text-white shadow-md" 
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[rgba(234,103,125,0.05)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Order Builder List */}
        <div ref={listRef} className="w-full max-w-[800px] flex flex-col gap-4 md:gap-5 min-h-[400px]">
          {activeCategory?.items.map((item) => {
            const isExpanded = expandedId === item.id;
            const currentSize = selectedSizes[item.id];
            const currentFilling = selectedFillings[item.id];
            
            // Check if user has completed required selections to order
            const needsSize = !!item.sizes && item.sizes.length > 0;
            const needsFilling = !!item.requiresFilling;
            const isReadyToOrder = (!needsSize || currentSize) && (!needsFilling || currentFilling);

            return (
              <div 
                key={item.id}
                className={`menu-item-card group relative flex flex-col rounded-2xl bg-white shadow-sm border transition-all duration-500 overflow-hidden ${
                  isExpanded 
                    ? "border-[var(--color-primary)] shadow-md ring-1 ring-[var(--color-primary)] ring-opacity-20" 
                    : "border-[rgba(0,0,0,0.03)] hover:shadow-md hover:border-[rgba(234,103,125,0.2)] cursor-pointer"
                }`}
              >
                {/* Header (Always Visible) */}
                <div 
                  className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 select-none cursor-pointer"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="flex flex-col flex-1 pr-8 relative">
                    <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold transition-colors" style={{ color: "var(--color-primary)" }}>
                      {item.name}
                    </h3>
                    <p className="text-sm md:text-[15px] leading-relaxed mt-2" style={{ color: "var(--color-text-muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                  
                  {item.price && (
                    <div className="shrink-0 mt-1 sm:mt-0 flex items-center justify-between w-full sm:w-auto">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase" style={{ background: "rgba(234, 103, 125, 0.08)", color: "var(--color-primary)" }}>
                        {item.price}
                      </span>
                      {/* Mobile Expand Icon */}
                      <div className="sm:hidden w-8 h-8 flex items-center justify-center bg-[var(--color-bg)] rounded-full text-[var(--color-primary)]">
                        <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                      </div>
                    </div>
                  )}

                  {/* Desktop Expand Icon */}
                  <div className="hidden sm:flex absolute right-6 top-6 w-8 h-8 items-center justify-center bg-[var(--color-bg)] rounded-full text-[var(--color-primary)] transition-transform duration-300">
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>

                {/* Expanded Builder Area */}
                <div 
                  className={`transition-all duration-500 ease-in-out bg-[#FAFAFA] border-t border-[rgba(0,0,0,0.03)] overflow-hidden ${
                    isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-5 md:p-6 flex flex-col gap-6">
                    
                    {/* Size Selector */}
                    {needsSize && (
                      <div className="flex flex-col gap-3">
                        <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--color-text)" }}>1. Select Size</span>
                        <div className="flex flex-col gap-2">
                          {item.sizes!.map((size, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSizeSelect(item.id, size)}
                              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-300 ${
                                currentSize?.label === size.label 
                                  ? "border-[var(--color-primary)] bg-[rgba(234,103,125,0.05)] shadow-sm" 
                                  : "border-[rgba(0,0,0,0.08)] bg-white hover:border-[var(--color-primary)]"
                              }`}
                            >
                              <span className={`text-sm md:text-base ${currentSize?.label === size.label ? "font-semibold text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"}`}>{size.label}</span>
                              <span className={`text-sm font-bold ${currentSize?.label === size.label ? "text-[var(--color-primary)]" : "text-[var(--color-text)]"}`}>{size.price}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Filling Selector */}
                    {needsFilling && (
                      <div className="flex flex-col gap-3">
                        <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--color-text)" }}>
                          {needsSize ? "2. " : "1. "}Select Flavor/Filling
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {FILLINGS.map((fill, fIdx) => (
                            <button
                              key={fIdx}
                              onClick={() => handleFillingSelect(item.id, fill)}
                              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                                currentFilling === fill
                                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-md"
                                  : "border-[rgba(0,0,0,0.08)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                              }`}
                            >
                              {fill}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Checkout CTA */}
                    <div className="pt-4 mt-2 border-t border-[rgba(0,0,0,0.05)] flex flex-col gap-4">
                      {isReadyToOrder ? (
                        <>
                          <p className="text-sm font-medium text-center" style={{ color: "var(--color-text)" }}>
                            Perfect! How would you like to send your order?
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <a
                              href={`https://wa.me/${PHONE_NUMBER}?text=${generateOrderMessage(item)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-white shadow-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                              style={{ background: "#25D366" }} // WhatsApp Green
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                              Order via WhatsApp
                            </a>
                            <a
                              href={`sms:${PHONE_NUMBER}?body=${generateOrderMessage(item)}`}
                              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-white shadow-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                              style={{ background: "var(--color-text)" }}
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                              Send Text SMS
                            </a>
                          </div>
                        </>
                      ) : (
                        <div className="w-full py-3.5 px-4 rounded-xl font-bold text-center text-white opacity-50 cursor-not-allowed bg-[var(--color-primary)]">
                          Please select {needsSize && !currentSize ? "Size" : ""}{(needsSize && !currentSize) && (needsFilling && !currentFilling) ? " and " : ""}{needsFilling && !currentFilling ? "Flavor" : ""} to Order
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Decorative left line */}
                <div className={`absolute left-0 top-0 bottom-0 w-[4px] rounded-l-2xl transition-all duration-300 ${isExpanded ? "bg-[var(--color-primary)] opacity-100" : "bg-[var(--color-primary)] opacity-0 group-hover:opacity-100"}`} />
              </div>
            );
          })}
        </div>

        {/* Gallery CTA */}
        <div className="mt-16 text-center flex flex-col items-center">
          <p className="text-sm md:text-base text-[var(--color-text-muted)] mb-6 max-w-[400px]">
            Want to see our artistry in action? Browse our curated collection of real custom cakes.
          </p>
          <Link
            href="/gallery"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-text)] text-white font-semibold uppercase tracking-widest text-sm rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-md hover:shadow-xl"
          >
            <span className="relative z-10">View Photo Gallery</span>
            <svg 
              className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" 
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <div className="absolute inset-0 bg-[var(--color-primary)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-elegant" />
          </Link>
        </div>

      </div>
    </section>
  );
}
