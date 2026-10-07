"use client";

import React, { useEffect, useState, useRef } from "react";

export default function UnseenCursor() {
  const [mounted, setMounted] = useState(false);
  const [hoverState, setHoverState] = useState<"default" | "link" | "card" | "hidden">("default");
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsPointerDevice(true);
    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, select");
      const card = target.closest(".glass-panel, [data-cursor='view']");

      if (interactive) {
        setHoverState("link");
      } else if (card) {
        setHoverState("card");
      } else {
        setHoverState("default");
      }
    };

    const onMouseLeave = () => {
      setHoverState("hidden");
    };

    const onMouseEnter = () => {
      setHoverState("default");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth Lerp loop for trailing ring
    const render = () => {
      const ease = 0.16; // Smooth inertia dampening
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!mounted || !isPointerDevice) return null;

  const isHidden = hoverState === "hidden";
  const isLink = hoverState === "link";
  const isCard = hoverState === "card";

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Central Sharp Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-stone-900 transition-opacity duration-300 pointer-events-none ${
          isHidden ? "opacity-0" : isLink || isCard ? "opacity-0" : "opacity-90"
        }`}
      />

      {/* Trailing Luminous Smooth Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 rounded-full pointer-events-none flex items-center justify-center transition-all duration-300 ease-out ${
          isHidden
            ? "opacity-0 scale-50"
            : isLink
            ? "w-14 h-14 -ml-7 -mt-7 bg-rose-500/15 border border-rose-600/70 backdrop-blur-[2px] scale-110 shadow-md shadow-rose-900/10"
            : isCard
            ? "w-20 h-20 -ml-10 -mt-10 bg-stone-900/10 border border-stone-800/40 scale-100 shadow-lg shadow-stone-900/10 backdrop-blur-[1px]"
            : "w-10 h-10 border border-stone-800/40 opacity-75 scale-90"
        }`}
      >
        {isCard && (
          <span className="text-[9px] font-mono tracking-widest text-stone-900 font-bold uppercase animate-pulse">
            VIEW
          </span>
        )}
      </div>
    </div>
  );
}
