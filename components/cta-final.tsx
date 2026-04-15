"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const sprintLink = "https://sandbox.asaas.com/c/aht15kd7eyewvenu";

export function CtaFinal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section
      id="contato"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#050B15] py-32 md:py-40"
    >
      {/* Animated blob */}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[160%] w-[160%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-70"
        viewBox="0 0 800 800"
      >
        <defs>
          <radialGradient id="blob1" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#7A5EFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#050B15" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="blob2" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFB627" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#050B15" stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.ellipse
          cx={300}
          cy={400}
          rx={260}
          ry={260}
          fill="url(#blob1)"
          animate={{ cx: [300, 500, 300], cy: [400, 350, 400] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx={520}
          cy={420}
          rx={220}
          ry={220}
          fill="url(#blob2)"
          animate={{ cx: [520, 320, 520], cy: [420, 480, 420] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/60"
        >
          <span className="h-1 w-1 rounded-full bg-[#4ECDC4]" />
          Último passo
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl text-4xl text-white sm:text-6xl md:text-[88px]"
        >
          Devolva sua semana.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-xl text-base text-white/65 sm:text-lg"
        >
          Diagnóstico em 48 horas. Reembolso em 7 dias se não for pra você.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <a
            href={sprintLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-9 py-4 text-base font-semibold text-[#050B15] shadow-[0_0_60px_rgba(78,205,196,0.4)] transition-all hover:scale-[1.03] hover:shadow-[0_0_80px_rgba(78,205,196,0.6)]"
          >
            <span className="absolute inset-0 shimmer" aria-hidden />
            <span className="relative">Começar Sprint 48h · R$ 997</span>
            <svg className="relative h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </a>
          <span className="text-xs text-white/40">
            Falando diretamente com o founder · sem SDR
          </span>
        </motion.div>
      </div>
    </section>
  );
}
