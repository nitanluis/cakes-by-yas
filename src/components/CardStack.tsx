"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
gsap.registerPlugin(useGSAP);

interface CardItem {
  id: string;
  name: string;
  desc: string;
  image: string;
  price?: string;
}

interface CardStackProps {
  items: CardItem[];
  onItemSelect: (item: CardItem) => void;
  offset?: number;      // Stack vertical/horizontal offset in pixels
  scaleStep?: number;   // Scale reduction per card in the stack
  dimStep?: number;     // Dimming/opacity step per card in the stack
  aspectRatio?: string; // Card aspect ratio
}

export default function CardStack({
  items,
  onItemSelect,
  offset = 12,
  scaleStep = 0.05,
  dimStep = 0.15,
  aspectRatio = "aspect-[4/3]"
}: CardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [activeCard, setActiveCard] = useState<CardItem | null>(null);
  const dragInfo = useRef({ startX: 0, startY: 0, isDragging: false, currentPointerId: -1, hasMoved: false });

  // Initialize cards state
  useEffect(() => {
    if (items && items.length > 0) {
      // Exclude the 'custom' action card from the stack, or keep it, let's keep all standard items
      const filterItems = items.filter(item => item.id !== "custom");
      setCards(filterItems);
      setActiveCard(filterItems[0]);
    }
  }, [items]);

  // Keep track of active card when cards array reorders
  useEffect(() => {
    if (cards.length > 0) {
      setActiveCard(cards[0]);
    }
  }, [cards]);

  // Premium details text animations when active card changes
  useGSAP(() => {
    if (!activeCard) return;
    
    // Animate details fade-in
    gsap.fromTo(
      ".active-card-details",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" }
    );
  }, [activeCard]);

  // Drag and Swipe Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag with left-click/primary touch and on the topmost card
    if (e.button !== 0) return;
    
    const cardEl = e.currentTarget;
    cardEl.setPointerCapture(e.pointerId);
    
    dragInfo.current = {
      startX: e.clientX,
      startY: e.clientY,
      isDragging: true,
      currentPointerId: e.pointerId,
      hasMoved: false
    };

    // Scale up topmost card slightly to feel responsive
    gsap.to(cardEl, {
      scale: 1.02,
      shadow: "0 25px 60px rgba(44, 36, 33, 0.2)",
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragInfo.current.isDragging || dragInfo.current.currentPointerId !== e.pointerId) return;

    const cardEl = e.currentTarget;
    const dx = e.clientX - dragInfo.current.startX;
    const dy = e.clientY - dragInfo.current.startY;

    // Track if a real dragging gesture occurred rather than a fast click click
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      dragInfo.current.hasMoved = true;
    }

    // Apply real-time movement and custom rotation based on horizontal pull
    gsap.set(cardEl, {
      x: dx,
      y: dy,
      rotation: dx * 0.04, // Subtly rotate card
      cursor: "grabbing"
    });

    // Animate behind card scale & brightness in real-time as you drag the top one
    if (deckRef.current) {
      const children = deckRef.current.children;
      if (children.length > 1) {
        const secondCard = children[children.length - 2] as HTMLElement; // Map orders correctly
        if (secondCard) {
          const dragDist = Math.sqrt(dx * dx + dy * dy);
          const progress = Math.min(1, dragDist / 150); // Fully scaled at 150px drag

          // Interpolate scale and brightness of card behind
          const targetScale = (1 - scaleStep) + (progress * scaleStep);
          const targetBrightness = (1 - dimStep) + (progress * dimStep);
          const targetYOffset = -offset + (progress * offset);

          gsap.set(secondCard, {
            scale: targetScale,
            filter: `brightness(${targetBrightness})`,
            y: targetYOffset,
            overwrite: "auto"
          });
        }
      }
    }
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragInfo.current.isDragging || dragInfo.current.currentPointerId !== e.pointerId) return;

    const cardEl = e.currentTarget;
    cardEl.releasePointerCapture(e.pointerId);
    
    dragInfo.current.isDragging = false;
    dragInfo.current.currentPointerId = -1;

    const dx = e.clientX - dragInfo.current.startX;
    const dy = e.clientY - dragInfo.current.startY;
    const dragDistance = Math.sqrt(dx * dx + dy * dy);
    const threshold = 120; // Swipe threshold in pixels

    if (dragDistance > threshold) {
      // Swipe Successful! Determine flyout angle
      const angle = Math.atan2(dy, dx);
      const velocity = Math.max(15, dragDistance / 10);
      const flyX = Math.cos(angle) * (window.innerWidth / 2 + 100);
      const flyY = Math.sin(angle) * (window.innerHeight / 2 + 100);

      // Slide card away
      gsap.to(cardEl, {
        x: flyX,
        y: flyY,
        rotation: (dx > 0 ? 30 : -30),
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          // Reorder state: move front card (index 0) to bottom (end)
          setCards(prev => [...prev.slice(1), prev[0]]);
          
          // Reset card element properties immediately so it goes to back position cleanly
          gsap.set(cardEl, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1 - (cards.length - 1) * scaleStep,
            filter: `brightness(${Math.max(0.1, 1 - (cards.length - 1) * dimStep)})`,
            zIndex: 1
          });
        }
      });
    } else {
      // Snap Back! Elastic bounce
      gsap.to(cardEl, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.5)"
      });

      // Snap behind card back to standard scale/brightness
      if (deckRef.current) {
        const children = deckRef.current.children;
        if (children.length > 1) {
          const secondCard = children[children.length - 2] as HTMLElement;
          if (secondCard) {
            gsap.to(secondCard, {
              scale: 1 - scaleStep,
              filter: `brightness(${1 - dimStep})`,
              y: -offset,
              duration: 0.5,
              ease: "back.out(1.2)"
            });
          }
        }
      }
    }
  };

  // Button triggers for Next (Right Arrow) and Previous (Left Arrow)
  const triggerNext = () => {
    if (cards.length < 2) return;
    
    // Find the current topmost card element
    if (deckRef.current) {
      const topCard = deckRef.current.lastElementChild as HTMLElement;
      if (topCard) {
        // Fly out to the right (Next direction)
        gsap.to(topCard, {
          x: 450,
          rotation: 20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            setCards(prev => [...prev.slice(1), prev[0]]);
            gsap.set(topCard, {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1
            });
          }
        });
      }
    }
  };

  const triggerPrev = () => {
    if (cards.length < 2) return;

    // Find the current topmost card element
    if (deckRef.current) {
      const topCard = deckRef.current.lastElementChild as HTMLElement;
      if (topCard) {
        // Fly out to the left (Prev direction)
        gsap.to(topCard, {
          x: -450,
          rotation: -20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            setCards(prev => [...prev.slice(1), prev[0]]);
            gsap.set(topCard, {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1
            });
          }
        });
      }
    }
  };

  // Floating background glow micro-animation on stack hover
  const handleDeckEnter = () => {
    if (deckRef.current) {
      // Subtle float up
      gsap.to(deckRef.current, {
        y: -4,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleDeckLeave = () => {
    if (deckRef.current) {
      gsap.to(deckRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  // Order message generator for CTAs
  const getWhatsAppLink = (card: CardItem) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const shareUrl = `${origin}/?cake=${card.id}`;
    
    // Dynamic runtime emojis to bypass compiler/minifier string encoding bugs under Windows
    const eSparkles = String.fromCodePoint(0x2728);
    const eCake = String.fromCodePoint(0x1F382);
    const eShortcake = String.fromCodePoint(0x1F370);
    const eMemo = String.fromCodePoint(0x1F4DD);
    const eLink = String.fromCodePoint(0x1F517);

    const msg = `${eSparkles} CAKES BY YAS ${eCake} GALLERY SWIPE ${eSparkles}\n` +
      `-----------------------------------------\n` +
      `Hello, Yas! I was swiping through your stunning creations deck and fell in love with:\n\n` +
      `${eShortcake} CAKE NAME: ${card.name}\n` +
      `${eMemo} DESCRIPTION: ${card.desc}\n` +
      `${eLink} LINK: ${shareUrl}\n\n` +
      `Could we check availability and details for ordering this masterpiece?\n` +
      `Thank you so much!`;
    return `https://wa.me/18626680038?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      {/* ── CARD STACK DECK ── */}
      <div 
        className="relative w-full max-w-[92vw] sm:max-w-[540px] md:max-w-[720px] aspect-[4/3] flex items-center justify-center select-none"
        onMouseEnter={handleDeckEnter}
        onMouseLeave={handleDeckLeave}
        style={{ perspective: "1000px" }}
      >
        {/* Navigation arrow buttons for Desktop (floating beside stack) */}
        <button
          onClick={triggerPrev}
          className="absolute -left-12 lg:-left-16 z-30 hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-white/80 border border-gray-200/50 shadow-soft hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Previous card"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={triggerNext}
          className="absolute -right-12 lg:-right-16 z-30 hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-white/80 border border-gray-200/50 shadow-soft hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Next card"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Swipe visual hints for mobile */}
        <div className="absolute top-2 right-4 text-[9px] uppercase tracking-widest text-gray-400 font-semibold md:hidden pointer-events-none animate-pulse flex items-center gap-1 z-20">
          <span>Swipe deck</span>
          <svg className="w-3 h-3 text-[var(--color-primary)] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l4-4m0 0l4 4m-4-4v18" />
          </svg>
        </div>

        {/* Stack elements */}
        <div 
          ref={deckRef} 
          className="relative w-[90%] h-[90%] flex items-center justify-center"
        >
          {cards.slice().reverse().map((card, revIndex, arr) => {
            // Because we slice and reverse, the topmost card is the LAST rendered element in HTML,
            // which handles z-index and mouse hover overlays natively!
            // Let's compute actual indexes relative to the source cards state
            const actualIndex = arr.length - 1 - revIndex;
            const isTop = actualIndex === 0;
            const brightness = Math.max(0.1, 1 - actualIndex * dimStep);
            
            // Limit rendering depth to top 4 cards for optimal performance
            if (actualIndex > 3) return null;

            return (
              <div
                key={card.id}
                onPointerDown={isTop ? handlePointerDown : undefined}
                onPointerMove={isTop ? handlePointerMove : undefined}
                onPointerUp={isTop ? handlePointerUpOrCancel : undefined}
                onPointerCancel={isTop ? handlePointerUpOrCancel : undefined}
                onClick={isTop ? (e) => {
                  // Prevent expanding details modal on drag gesture
                  if (dragInfo.current.hasMoved) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  onItemSelect(card);
                } : undefined}
                className={`absolute w-full h-full rounded-[24px] overflow-hidden bg-white shadow-medium border-2 border-white/90 select-none ${
                  isTop ? "cursor-grab active:cursor-grabbing hover:shadow-image" : "pointer-events-none"
                }`}
                style={{
                  zIndex: cards.length - actualIndex,
                  transformOrigin: "bottom center",
                  transform: `translateY(${-actualIndex * offset}px) scale(${1 - actualIndex * scaleStep})`,
                  filter: `brightness(${brightness})`,
                  touchAction: "none",
                  transition: isTop ? "box-shadow 0.3s ease, border-color 0.3s ease" : "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                }}
              >
                {/* Visual Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none z-10" />
                
                {/* Expand icon on top card hover */}
                {isTop && (
                  <div className="absolute inset-0 z-20 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white drop-shadow-lg pointer-events-none">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                      </svg>
                    </div>
                  </div>
                )}

                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 540px, 720px"
                  priority={actualIndex < 2}
                  loading={actualIndex >= 2 ? "lazy" : undefined}
                  className="object-cover pointer-events-none"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── ACTIVE CARD DETAILS PANEL ── */}
      {activeCard && (
        <div className="active-card-details mt-8 w-full max-w-[92vw] sm:max-w-[540px] md:max-w-[720px] text-center px-4 flex flex-col items-center">
          <h3 className="font-[family-name:var(--font-heading)] italic text-2xl sm:text-3xl font-bold mb-2" style={{ color: "var(--color-primary)" }}>
            {activeCard.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest font-medium mb-3">
            Dominican Artisan Cake
          </p>
          <div className="w-12 h-0.5 bg-[var(--color-primary)] opacity-40 mb-4" />
          <p className="text-sm leading-relaxed mb-6 min-h-[48px] line-clamp-3" style={{ color: "var(--color-text-muted)" }}>
            {activeCard.desc}
          </p>

          {/* Call-to-actions */}
          <div className="flex w-full gap-3 justify-center items-center">
            <button
              onClick={() => onItemSelect(activeCard)}
              className="py-3 px-5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors rounded-[6px]"
            >
              See Details
            </button>
            <a
              href={getWhatsAppLink(activeCard)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-3 px-6 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:opacity-90 rounded-[6px]"
              style={{ background: "var(--color-primary)" }}
            >
              <span>Order via WhatsApp</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
