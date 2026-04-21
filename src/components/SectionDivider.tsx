"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SectionDividerProps {
  variant?: "aurora" | "prism" | "ribbon";
}

export default function SectionDivider({ variant = "aurora" }: SectionDividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = dividerRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".divider-band"),
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      }
    );

    const shimmer = el.querySelector(".divider-sweep");
    if (shimmer) {
      gsap.fromTo(
        shimmer,
        { x: "-100%" },
        {
          x: "300%",
          duration: 3,
          ease: "power1.inOut",
          delay: 0.6,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    }
  }, { scope: dividerRef });

  const getGradient = () => {
    switch (variant) {
      case "prism":
        return "linear-gradient(90deg, transparent 0%, rgba(248,168,177,0.15) 15%, rgba(240,145,158,0.25) 30%, rgba(234,103,125,0.35) 50%, rgba(240,145,158,0.25) 70%, rgba(248,168,177,0.15) 85%, transparent 100%)";
      case "ribbon":
        return "linear-gradient(90deg, transparent 0%, rgba(234,103,125,0.1) 10%, rgba(248,168,177,0.3) 35%, rgba(255,255,255,0.4) 50%, rgba(248,168,177,0.3) 65%, rgba(234,103,125,0.1) 90%, transparent 100%)";
      default:
        return "linear-gradient(90deg, transparent 0%, rgba(248,168,177,0.08) 10%, rgba(234,103,125,0.2) 25%, rgba(248,168,177,0.35) 40%, rgba(240,145,158,0.3) 55%, rgba(234,103,125,0.2) 75%, rgba(248,168,177,0.08) 90%, transparent 100%)";
    }
  };

  const getHeight = () => {
    switch (variant) {
      case "prism": return "3px";
      case "ribbon": return "2px";
      default: return "2px";
    }
  };

  return (
    <div
      ref={dividerRef}
      className="w-full flex items-center justify-center py-4 md:py-6 px-6 relative"
    >
      <div className="w-full max-w-[1000px] relative flex items-center justify-center">
        <div
          className="divider-band w-full relative overflow-hidden rounded-full"
          style={{
            height: getHeight(),
            background: getGradient(),
            boxShadow:
              variant === "prism"
                ? "0 0 20px rgba(240,145,158,0.15), 0 0 40px rgba(248,168,177,0.08)"
                : variant === "ribbon"
                ? "0 0 16px rgba(248,168,177,0.12), 0 0 32px rgba(234,103,125,0.06)"
                : "0 0 24px rgba(234,103,125,0.1), 0 0 48px rgba(248,168,177,0.06)",
          }}
        >
          <div
            className="divider-sweep absolute top-0 bottom-0 left-0"
            style={{
              width: "30%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), rgba(255,255,255,0.9), rgba(255,255,255,0.7), transparent)",
              borderRadius: "inherit",
            }}
          />
        </div>
      </div>
    </div>
  );
}
