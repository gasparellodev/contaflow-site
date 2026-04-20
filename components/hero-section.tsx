"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const sprintLink = "https://sandbox.asaas.com/c/aht15kd7eyewvenu";
  const demoLink =
    "https://wa.me/5511951276991?text=Quero%20agendar%20a%20demo%20do%20Contaflow";
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const bg = heroRef.current?.querySelector<HTMLElement>("[data-hero-bg]");
    if (!bg) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        bg.style.transform = `translate3d(0, ${Math.min(y * 0.18, 120)}px, 0) scale(${1 + Math.min(y * 0.0003, 0.05)})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative overflow-hidden bg-[#0A1520]"
    >
      <div
        data-hero-bg
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: "url('/screens/hero-3d-laptop.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0A1520] via-[#0A1520]/90 to-[#0A1520]/40 md:to-transparent"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-6 py-24 md:py-40 max-w-6xl">
        <div className="max-w-2xl" data-reveal="">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-[#4ECDC4] uppercase mb-6">
            Beta fechado · Early adopters
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            O operacional do seu escritório, no{" "}
            <span className="text-[#4ECDC4]">automático supervisionado</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/75 max-w-xl leading-relaxed">
            Diagnóstico em 48 horas e ativação guiada em 7 dias. IA categoriza
            NFs, envia lembretes fiscais no WhatsApp e responde dúvidas — você
            permanece no controle.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#FFB627] hover:bg-[#ffc43d] text-[#0A1520] font-semibold"
            >
              <a href={sprintLink} target="_blank" rel="noopener noreferrer">
                Diagnóstico Express 48h — R$ 997
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white"
            >
              <a href={demoLink} target="_blank" rel="noopener noreferrer">
                Agendar demo
              </a>
            </Button>
          </div>
          <p className="mt-8 text-xs text-white/60 max-w-lg leading-relaxed">
            Produto em beta fechado · Métricas de pilotos internos · Resultados
            variam por escritório · Dados tratados em conformidade com a LGPD
          </p>
        </div>
      </div>
    </section>
  );
}
