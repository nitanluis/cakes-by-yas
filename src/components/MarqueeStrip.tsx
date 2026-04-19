"use client";

export default function MarqueeStrip() {
  const items = [
    "Pedidos Especiales",
    "Diseño Personalizado",
    "Spring TX",
    "The Woodlands",
    "Flanes Caseros",
    "Houston TX",
    "Cupcakes",
    "Pasteles de Boda",
  ];

  return (
    <section className="py-5 overflow-hidden" style={{ background: "var(--color-primary)" }}>
      <div className="flex whitespace-nowrap">
        <div className="marquee-track flex items-center gap-0 shrink-0">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center gap-4 px-4">
              <span className="text-white/90 font-medium text-sm sm:text-base tracking-wide uppercase">
                {item}
              </span>
              <span className="text-white/50 text-lg">✦</span>
            </span>
          ))}
        </div>
        <div className="marquee-track flex items-center gap-0 shrink-0" aria-hidden="true">
          {[...items, ...items].map((item, i) => (
            <span key={`dup-${i}`} className="flex items-center gap-4 px-4">
              <span className="text-white/90 font-medium text-sm sm:text-base tracking-wide uppercase">
                {item}
              </span>
              <span className="text-white/50 text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
