# Prompt for ChatGPT: Cake Studio Web App Optimization

Copy and paste the content below into ChatGPT to get expert advice on improving the design, code, and copy of your landing page.

---

```markdown
Hi ChatGPT! I am building a high-end, premium landing page for **"Cakes by Yas"**, an artisanal custom cake studio based in Spring & The Woodlands, Texas. 

I need your help as an expert frontend developer, UI/UX designer, and luxury brand copywriter to review my architecture, suggest aesthetic enhancements, and help me implement new features or refinements.

Here is the context of my project:

### 1. Technology Stack
*   **Framework:** Next.js 16 (App Router) & React 19
*   **Styling:** Tailwind CSS v4 (using CSS variables in `globals.css` for design tokens)
*   **Animations:** GSAP (GreenSock) with `@gsap/react` for scroll-driven parallax and entrance transitions
*   **Language:** TypeScript / TSX

### 2. Design System & Brand Identity
*   **Vibe:** Minimalist, editorial luxury, romantic, warm, and highly polished.
*   **Colors:**
    *   Background: Warm off-white/cream (`#FDF8F8` / `#F5F0EB`)
    *   Primary: Rose Coral / Soft Pink (`var(--color-primary)`)
    *   Text: Dark Charcoal (`var(--color-text)`)
    *   Muted text: Warm gray (`var(--color-text-muted)`)
*   **Typography:**
    *   Headings: *Playfair Display* (Elegant, classic, italicized details)
    *   Body & Buttons: *Inter* (Clean, high-tracking, legible, modern)

### 3. Current Project Structure
*   `src/app/layout.tsx`: Configures global fonts, default metadata, and JSON-LD structured data.
*   `src/app/page.tsx`: Sets up dynamic server-side metadata to generate custom Open Graph previews when customers share links containing a query parameter (e.g., `?cake=red-velvet`).
*   `src/components/Navbar.tsx`: Transparent at top, blurs and shrinks on scroll. Displays the cropped logo `logo.png` (aspect ratio ~2.68:1), centered links, and an expanding order CTA.
*   `src/components/Hero.tsx`: Dynamic parallax banner, location stamp, and custom logo.
*   `src/components/SignatureCreations.tsx`: Interactive grid showcasing specific cakes. Supports deep-linking (opens details modal automatically if a query parameter matches on load).
*   `src/components/PricingMenu.tsx` & `src/components/Menu.tsx`: Interactive menus for flavors, fillings, and sizes.
*   `src/components/Contact.tsx` & `src/components/Footer.tsx`: Sophisticated contacts section and legal/Cottage Law disclaimers.

---

### What I need your help with (Choose one or more to begin):

#### Option A: UI/UX & Aesthetics Refinement
*   Suggest modern visual elements to make the landing page feel even more " haute couture" or boutique.
*   Propose CSS grid layouts or Bento Grid improvements for the cake showcase.
*   Suggest micro-interactions (hover states, subtle transition curves, custom cursors, or button shimmers) that make the website feel alive.

#### Option B: GSAP Animation Polish
*   Help me write clean GSAP timelines using the `@gsap/react` hook.
*   Create an elegant entrance animation sequence for page elements on initial load.
*   Implement smooth scroll-driven parallax animations using `ScrollTrigger`.

#### Option C: Copywriting & Tone of Voice
*   Refine the hero copy, subtitles, and section headers to sound more premium, exclusive, and appetizing.
*   Help write evocative descriptions for our signature cakes that entice clients to order.

#### Option D: React & Tailwind CSS v4 Code Review
*   Refactor components to follow best practices for Next.js App Router and React 19.
*   Show me how to implement complex responsive layouts utilizing Tailwind CSS v4's modern features.

---

### To get started:
Please ask me what section/component you want to look at first, or suggest 3 immediate visual improvements I can apply to a luxury artisanal website of this caliber.
```
