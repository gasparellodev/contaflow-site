"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function SocialProofPremium() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  return (
    <section className="relative overflow-hidden bg-[#050B15] py-28 md:py-36" ref={ref}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(122,94,255,0.1), transparent 50%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/60">
            <span className="h-1 w-1 rounded-full bg-[#4ECDC4]" />
            Beta fechado · 2 escritórios parceiros
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="display-serif max-w-3xl text-3xl text-white/90 sm:text-4xl md:text-[56px]"
          >
            Eu mesmo atendo cada demo.
            <br />
            <span className="text-white/50">
              Se não fizer sentido, você não entra.
            </span>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="relative">
              <div className="absolute inset-0 animate-breath rounded-full bg-[#4ECDC4]/30 blur-lg" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#7A5EFF] text-lg font-semibold text-[#050B15] ring-2 ring-white/10">
                VG
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-white">
                Vinicius Gasparello
              </div>
              <div className="text-xs text-white/50">
                Founder · GaspLab & Contaflow · 9 anos em tech
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 lg:max-w-xs"
        >
          <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#4ECDC4]">
            Garantia
          </div>
          <div className="mb-3 text-3xl font-semibold text-white">7 dias</div>
          <p className="text-sm text-white/60">
            Fez a Sprint Express e não encaixou? Pede reembolso até o 7º dia.
            Sem pergunta, sem fricção.
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs text-white/40">
            <svg className="h-4 w-4 text-[#4ECDC4]" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Reembolso integral
          </div>
        </motion.div>
      </div>
    </section>
  );
}
