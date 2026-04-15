"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { AuroraBg } from "@/components/ui/aurora-bg";

const sprintLink = "https://sandbox.asaas.com/c/aht15kd7eyewvenu";

export function HeroCinematic() {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.8 });

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, -120]);
  const opacityOnScroll = useTransform(scrollY, [0, 500], [1, 0.4]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set((e.clientX - cx) / rect.width);
    my.set((e.clientY - cy) / rect.height);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const tDeskX = useTransform(sx, (v) => v * -28);
  const tDeskY = useTransform(sy, (v) => v * -16);
  const tPhone1X = useTransform(sx, (v) => v * 48);
  const tPhone1Y = useTransform(sy, (v) => v * 24);
  const tPhone2X = useTransform(sx, (v) => v * -52);
  const tPhone2Y = useTransform(sy, (v) => v * 28);

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#050B15]"
    >
      <AuroraBg intensity="normal" />

      {/* Grid overlay sutil */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <motion.div
        style={{ y: yParallax, opacity: opacityOnScroll }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-6 pt-28 pb-20 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/70 backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ECDC4] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ECDC4]" />
          </span>
          Beta fechado · 2 escritórios parceiros em SP
        </motion.div>

        {/* H1 display */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl max-w-5xl text-balance text-5xl text-white sm:text-6xl md:text-7xl lg:text-[96px]"
        >
          Seu escritório contábil{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#4ECDC4] via-[#7A5EFF] to-[#FFB627] bg-clip-text text-transparent">
              opera sozinho.
            </span>
          </span>
          <br />
          <span className="text-white/60">Você decide.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-2xl text-balance text-base text-white/65 sm:text-lg md:text-xl"
        >
          IA categoriza NFs, responde clientes no WhatsApp e agenda obrigações.
          <span className="text-white"> Você aprova, ela executa.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#ofertas"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#050B15] transition-transform hover:scale-[1.02]"
          >
            <span className="absolute inset-0 shimmer" aria-hidden />
            <span className="relative">Ver demo ao vivo</span>
            <svg
              className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <a
            href={sprintLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-white/85 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
          >
            Sprint 48h · <span className="text-[#FFB627]">R$ 997</span>
          </a>
        </motion.div>

        {/* Device stack */}
        <div
          className="relative mt-20 w-full max-w-5xl"
          style={{ perspective: 1800 }}
        >
          {/* Desktop central */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              x: tDeskX,
              y: tDeskY,
              transformStyle: "preserve-3d",
            }}
            className="relative mx-auto w-full max-w-4xl"
          >
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#141f30] to-[#070d17] p-2 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/5">
              <div className="flex items-center gap-1.5 px-3 pb-2 pt-1">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-[10px] font-mono text-white/30">
                  contaflow.app / inbox
                </span>
              </div>
              <div className="relative overflow-hidden rounded-xl bg-[#050B15]">
                <Image
                  src="/screens/01-inbox.png"
                  alt="Inbox Contaflow"
                  width={1600}
                  height={1000}
                  className="h-auto w-full"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050B15]/50 via-transparent to-transparent" />
              </div>
            </div>
            {/* Glow embaixo */}
            <div
              aria-hidden
              className="absolute -bottom-10 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-[#4ECDC4]/40 blur-3xl"
            />
          </motion.div>

          {/* Phone esquerda */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 60, rotate: -8 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: -8 }}
            transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              x: tPhone1X,
              y: tPhone1Y,
            }}
            className="absolute -left-4 bottom-[-40px] hidden w-48 md:block lg:-left-8 lg:w-60"
          >
            <div className="rounded-[32px] border border-white/10 bg-[#070d17] p-1.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
              <div className="overflow-hidden rounded-[26px] bg-[#050B15]">
                <Image
                  src="/screens/05-conversas.png"
                  alt="WhatsApp Contaflow"
                  width={600}
                  height={900}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Phone direita */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 60, rotate: 8 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 8 }}
            transition={{ duration: 1.1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              x: tPhone2X,
              y: tPhone2Y,
            }}
            className="absolute -right-4 bottom-[-60px] hidden w-48 md:block lg:-right-8 lg:w-60"
          >
            <div className="rounded-[32px] border border-white/10 bg-[#070d17] p-1.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
              <div className="overflow-hidden rounded-[26px] bg-[#050B15]">
                <Image
                  src="/screens/06-calendario.png"
                  alt="Calendário Contaflow"
                  width={600}
                  height={900}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="pointer-events-none mt-24 flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/30"
        >
          <span>scroll</span>
          <span className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
