# 🍰 Cakes by Yas — Release Walkthrough & Architecture Guide

Welcome to the official **v1.4.0 Release Walkthrough**. This document outlines the technical details, architecture, and features introduced in this cycle to elevate **Cakes by Yas** into a world-class, ultra-fluid, conversion-focused luxury web application.

---

## 🗺️ Architectural Map

Here is the directory structure of the core components we built and optimized:

```text
src/
├── app/
│   ├── layout.tsx         # Global fonts, metadata defaults, and Schema.org JSON-LD
│   ├── page.tsx           # Server-side Dynamic Metadata Engine (Open Graph generation)
│   ├── globals.css        # Global layout tokens, touch resets, and "Destello de Azúcar" animations
│   └── icon.png           # High-resolution multi-browser favicon
│   └── apple-icon.png     # iOS native home-screen app icon
│
└── components/
    ├── Navbar.tsx         # Responsive brand header, mobile menu, and "Hilo de Seda" indicator
    ├── Hero.tsx           # Splash content and brand twinkle sparkles
    ├── BentoGrid.tsx      # Showcase grid with cinematic "Chiffon" image scroll-parallax
    ├── Menu.tsx           # Category item lists with GPU-accelerated hover effects
    ├── SignatureCreations.tsx # Product grid, deep-linking URL listener, and performance modales
    └── WhatsAppButton.tsx # Floating contact drawer with passive touch physics
```

---

## 🔑 Key Features & Technical Workings

### 1. 🌐 Server-Side Dynamic Metadata (Open Graph Engine)
*   **File:** [src/app/page.tsx](file:///c:/Users/arias/Desktop/Cakes/Landing%20Page%20Cake%20by%20Yas/src/app/page.tsx)
*   **How it works:** When a client chooses a signature cake and clicks "Order via WhatsApp", they share a link formatted as `https://cakesbyyas.com/?cake=intimate-wedding`. 
*   Next.js's Server Component intercepts this query parameter and dynamically renders specific meta-tags:
    *   `<meta property="og:title" content="Artisanal Cake: Intimate Wedding ...">`
    *   `<meta property="og:description" content="Vanilla cake with fresh flowers ...">`
    *   `<meta property="og:image" content="https://cakesbyyas.com/images/real_cakes/real_cake_1.jpeg">`
*   **Result:** WhatsApp and iMessage instantly fetch these tags and generate a gorgeous, visual preview card inside the chat bubble.

### 2. 🔗 Interactive Deep-Linking
*   **File:** [src/components/SignatureCreations.tsx](file:///c:/Users/arias/Desktop/Cakes/Landing%20Page%20Cake%20by%20Yas/src/components/SignatureCreations.tsx)
*   **How it works:** Inside the signature creations component, a reactive `useEffect` listens for the `?cake=` query parameter on load.
*   If found, the page executes a smooth scroll down to the `#pasteles` section and triggers the state variable `setSelectedItem(matchedCake)`, automatically popping open the interactive detail modal.

### 3. ⚡ Mobile-First GPU Performance Architecture
*   **Touch highlight resets:** Added `* { -webkit-tap-highlight-color: transparent; }` globally to remove standard browser gray boxes on click.
*   **Passive Listeners:** Registered native `touchstart` click-outside event handlers with `{ passive: true }` in [WhatsAppButton.tsx](file:///c:/Users/arias/Desktop/Cakes/Landing%20Page%20Cake%20by%20Yas/src/components/WhatsAppButton.tsx) to keep scrolling threads unblocked.
*   **GPU Compositing on Blurs:** Transferred modal blur transitions from frame-by-frame JS timers to static CSS classes (`backdrop-blur-md`), animating only the `opacity` property to guarantee **steady 60/120 FPS animations** on iOS and Android.
*   **Media-Queries Hover:** Extracted mouse hover listeners to Tailwind `md:hover:` to bypass mobile touch engine stickiness entirely.

### 4. 🎀 "Alta Costura" Decorative Touches
*   **"Hilo de Seda":** A delicate scroll indicator `div` anchored at the bottom of the sticky blurred `<nav>` container that dynamically adjusts its width percentage based on `window.scrollY`.
*   **"Destello de Azúcar" (Twinkling Sparkles):** Rotating and breathing CSS-animated SVGs next to premium header titles to add a touch of boutique magic.
*   **"Chiffon" Parallax:** A ScrollTrigger timeline that translates grid images `yPercent: -6` to `yPercent: 6` inside `overflow-hidden` containers, creating a gorgeous depth-of-field transition as you scroll.

---

## 🛠️ Guidelines for Future Updates

1.  **Adding New Cakes:**
    To add or modify signature cakes, edit `src/data/products.json`. The dynamic metadata engine in `page.tsx` and the deep-linking engine in `SignatureCreations.tsx` will automatically inherit the new cake details instantly.
2.  **Modifying Animations:**
    All GSAP and ScrollTrigger initializations use clean cleanup functions in their return callbacks (`ctx.revert()`). Always wrap your GSAP code in `useGSAP` or `gsap.context` to prevent memory leaks on client-side route changes.
3.  **Tailwind CSS Config:**
    The project leverages the blazing-fast **Tailwind CSS v4** engine. Design tokens (colors like Rose Coral `--color-primary`, fonts, shadows) are defined in `src/app/globals.css`.

---

✨ *Crafted with love and precision to make **Cakes by Yas** shine online!*
