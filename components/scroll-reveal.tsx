"use client";

import { useEffect } from "react";

/**
 * Ativa reveal em elementos com [data-reveal] quando entram na viewport.
 * Usa GSAP + ScrollTrigger via dynamic import para não pesar bundle inicial.
 * Respeita prefers-reduced-motion.
 */
export function ScrollReveal() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    if (mq.matches) {
      targets.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    // Estado inicial sem GSAP para evitar flash
    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(32px)";
      el.style.willChange = "opacity, transform";
    });

    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        targets.forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
        cleanup = () => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };
      }
    );

    return () => {
      cleanup?.();
    };
  }, []);

  return null;
}
