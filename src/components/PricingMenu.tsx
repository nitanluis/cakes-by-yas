"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    setSelectedSizes(prev => {
      if (prev[itemId]?.label === size.label) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: size };
    });
  };

  const handleFillingSelect = (itemId: string, filling: string) => {
    setSelectedFillings(prev => {
      if (prev[itemId] === filling) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: filling };
    });
  };

  const generateOrderMessage = (item: MenuItem) => {
    const size = selectedSizes[item.id];
    const filling = selectedFillings[item.id];
    
    const productName = size ? `${item.name} (${size.label})` : item.name;
    const flavorName = filling || "Traditional";
    
    const msg = `✨ CAKES BY YAS • NEW INQUIRY ✨\n` +
      `-----------------------------------------\n` +
      `Hello, Yas! I would love to make an inquiry from your signature artisan menu.\n` +
      `✦ PRODUCT: ${productName}\n` +
      `✦ FLAVOR / FILLING: ${flavorName}\n` +
      `Could you please provide me with more details and check availability for my order?\n` +
      `Thank you so much!`;
      
    return encodeURIComponent(msg);
  };

  const activeCategory = MENU_CATEGORIES.find(c => c.id === activeTab);

  return (
    <section id="menu" className="w-full flex justify-center px-4 md:px-12 py-16 md:py-24 bg-[var(--color-bg)]">
      <div ref={containerRef} className="w-full max-w-none xl:max-w-[1920px] px-0 md:px-8 flex flex-col items-center">
        
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] italic text-5xl md:text-6xl mb-4" style={{ color: "var(--color-text)" }}>
            The Menu
          </h2>
          <p className="text-sm md:text-base uppercase tracking-[0.2em] font-medium" style={{ color: "var(--color-primary)" }}>
            Tap to Customize & Order
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="w-full max-w-[600px] flex flex-col sm:flex-row bg-white rounded-md p-1.5 md:p-2 mb-10 shadow-sm border border-[rgba(0,0,0,0.05)]">
          {MENU_CATEGORIES.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setExpandedId(null); }}
                className={`flex-1 py-3 px-4 md:py-3.5 text-sm md:text-base font-semibold rounded-md transition-all duration-300 active:scale-95 ${
                  isActive 
                    ? "bg-[var(--color-primary)] text-white shadow-md" 
                    : "text-[var(--color-text-muted)] md:hover:text-[var(--color-primary)] md:hover:bg-[rgba(234,103,125,0.05)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Order Builder List */}
        <div ref={listRef} className="w-full max-w-[1400px] flex flex-col gap-4 md:gap-5 min-h-[400px] pb-32 sm:pb-0">
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
                className={`menu-item-card group relative flex flex-col rounded-2xl bg-white shadow-sm border isolate ${
                  isExpanded 
                    ? "border-[var(--color-primary)] shadow-md ring-1 ring-[var(--color-primary)] ring-opacity-20" 
                    : "border-[rgba(0,0,0,0.03)] md:hover:shadow-md md:hover:border-[rgba(234,103,125,0.2)] cursor-pointer"
                }`}
                style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
              >
                {/* Header (Always Visible) */}
                <button 
                  type="button"
                  className="w-full text-left p-5 md:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] touch-manipulation"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="flex flex-col flex-1 pr-8 relative pointer-events-none">
                    <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold" style={{ color: "var(--color-primary)" }}>
                      {item.name}
                    </h3>
                    <p className="text-sm md:text-[15px] leading-relaxed mt-2" style={{ color: "var(--color-text-muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                  
                  {item.price && (
                    <div className="shrink-0 mt-1 sm:mt-0 flex items-center justify-between w-full sm:w-auto pointer-events-none">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase" style={{ background: "rgba(0, 0, 0, 0.04)", color: "#3A3A3A" }}>
                        {item.price}
                      </span>
                      {/* Mobile Expand Icon */}
                      <div className="sm:hidden w-8 h-8 flex items-center justify-center bg-[var(--color-bg)] rounded-full text-[var(--color-primary)]">
                        <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                      </div>
                    </div>
                  )}

                  {/* Desktop Expand Icon */}
                  <div className="hidden sm:flex absolute right-6 top-6 w-8 h-8 items-center justify-center bg-[var(--color-bg)] rounded-full text-[var(--color-primary)] pointer-events-none">
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </button>

                {/* Expanded Builder Area — CSS Grid row animation, NO overflow-hidden on interactive content */}
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateRows: isExpanded ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.4s ease-in-out',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    {(isExpanded || expandedId === null) && (
                    <div className="bg-[#FAFAFA] border-t border-[rgba(0,0,0,0.03)]">
                      <div className="p-5 md:p-6 flex flex-col gap-6">
                    
                        {/* Size Selector */}
                        {needsSize && (
                          <div className="flex flex-col gap-3">
                            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--color-text)" }}>1. Select Size</span>
                            <div className="flex flex-col gap-2">
                              {item.sizes!.map((size, sIdx) => (
                                <button
                                  key={sIdx}
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); handleSizeSelect(item.id, size); }}
                                  className={`flex items-center justify-between p-3 min-h-[48px] rounded-md border text-left transition-colors duration-150 touch-manipulation select-none ${
                                    currentSize?.label === size.label 
                                      ? "border-[var(--color-primary)] bg-[rgba(234,103,125,0.08)]" 
                                      : "border-[rgba(0,0,0,0.08)] bg-white md:hover:border-[var(--color-primary)]"
                                  }`}
                                  style={{ WebkitTapHighlightColor: 'rgba(234,103,125,0.15)' }}
                                >
                                  <span className={`pointer-events-none text-sm md:text-base ${currentSize?.label === size.label ? "font-semibold text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"}`}>{size.label}</span>
                                  <span className={`pointer-events-none text-sm font-bold ${currentSize?.label === size.label ? "text-[var(--color-primary)]" : "text-[var(--color-text)]"}`}>{size.price}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Filling Selector — vertical list on mobile for reliable taps */}
                        {needsFilling && (
                          <div className="flex flex-col gap-3">
                            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--color-text)" }}>
                              {needsSize ? "2. " : "1. "}Select Flavor/Filling
                            </span>
                            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-2">
                              {FILLINGS.map((fill, fIdx) => (
                                <button
                                  key={fIdx}
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); handleFillingSelect(item.id, fill); }}
                                  className={`w-full sm:w-auto px-4 py-3 sm:py-2 min-h-[48px] sm:min-h-0 rounded-md text-sm font-medium border transition-colors duration-150 touch-manipulation select-none text-left sm:text-center ${
                                    currentFilling === fill
                                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                                      : "border-[rgba(0,0,0,0.08)] bg-white text-[var(--color-text-muted)] md:hover:border-[var(--color-primary)] md:hover:text-[var(--color-primary)]"
                                  }`}
                                  style={{ WebkitTapHighlightColor: 'rgba(234,103,125,0.15)' }}
                                >
                                  <span className="pointer-events-none">{fill}</span>
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
                                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-md font-bold text-white touch-manipulation"
                                  style={{ background: "#25D366" }}
                                >
                                  <svg className="w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                                  <span className="pointer-events-none">Order via WhatsApp</span>
                                </a>
                                <a
                                  href={`sms:${PHONE_NUMBER}?body=${generateOrderMessage(item)}`}
                                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-md font-bold text-white touch-manipulation"
                                  style={{ background: "var(--color-text)" }}
                                >
                                  <svg className="w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                                  <span className="pointer-events-none">Send Text SMS</span>
                                </a>
                              </div>
                            </>
                          ) : (
                            <div className="w-full py-3.5 px-4 rounded-md font-bold text-center text-white opacity-50 cursor-not-allowed bg-[var(--color-primary)]">
                              Please select {needsSize && !currentSize ? "Size" : ""}{(needsSize && !currentSize) && (needsFilling && !currentFilling) ? " and " : ""}{needsFilling && !currentFilling ? "Flavor" : ""} to Order
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    )}
                  </div>
                </div>

                {/* Decorative left line */}
                <div className={`absolute left-0 top-0 bottom-0 w-[4px] rounded-l-2xl pointer-events-none ${isExpanded ? "bg-[var(--color-primary)] opacity-100" : "bg-[var(--color-primary)] opacity-0 group-hover:opacity-100"}`} style={{ transition: 'opacity 0.3s' }} />
              </div>
            );
          })}
        </div>

        {/* Gallery CTA Removed */}

      </div>
    </section>
  );
}
