"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FRAMES = [
  {
    tag: "01 · Chega",
    title: "NF cai no email do cliente.",
    body: "Contaflow monitora a caixa, extrai o XML, valida CNPJ e anexa no inbox certo.",
    chip: "NF-e 00127 · Padaria Central",
  },
  {
    tag: "02 · Categoriza",
    title: "IA entende o que é.",
    body: "Detecta natureza da operação, sugere categoria e CFOP. Aprende com cada correção sua.",
    chip: "Categoria sugerida: Serviço prestado",
  },
  {
    tag: "03 · Responde",
    title: "Cliente recebe lembrete.",
    body: "No WhatsApp, já com o boleto e o prazo. Sem você digitar uma linha.",
    chip: "DAS vence 20/04 · boleto enviado",
  },
];

export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      className="relative bg-[#050B15]"
      style={{ height: "300vh" }}
    >
      {/* ambient glow */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 30%, rgba(78,205,196,0.18), transparent 55%), radial-gradient(ellipse at 30% 70%, rgba(122,94,255,0.14), transparent 60%)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Text column */}
          <div className="relative h-[60vh]">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/60">
              <span className="h-1 w-1 rounded-full bg-[#4ECDC4]" />
              12 segundos, do email ao cliente
            </div>
            <h2 className="display-lg mb-10 text-4xl text-white sm:text-5xl md:text-[56px]">
              Da caixa de entrada
              <br />
              <span className="text-white/50">ao cliente</span>
              <span className="text-[#4ECDC4]">.</span>
            </h2>

            <div className="relative h-72">
              {FRAMES.map((f, i) => {
                const start = i / FRAMES.length;
                const end = (i + 1) / FRAMES.length;
                const opacity = useTransform(
                  scrollYProgress,
                  [
                    Math.max(0, start - 0.05),
                    start + 0.05,
                    end - 0.05,
                    Math.min(1, end + 0.05),
                  ],
                  [0, 1, 1, 0]
                );
                const y = useTransform(
                  scrollYProgress,
                  [start, end],
                  [0, -20]
                );
                return (
                  <motion.div
                    key={i}
                    style={{ opacity, y }}
                    className="absolute inset-0"
                  >
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#4ECDC4]">
                      {f.tag}
                    </div>
                    <h3 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
                      {f.title}
                    </h3>
                    <p className="max-w-md text-white/60">{f.body}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress indicator */}
            <div className="mt-6 flex gap-2">
              {FRAMES.map((_, i) => {
                const start = i / FRAMES.length;
                const end = (i + 1) / FRAMES.length;
                const w = useTransform(
                  scrollYProgress,
                  [start, end],
                  ["0%", "100%"]
                );
                return (
                  <div
                    key={i}
                    className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/10"
                  >
                    <motion.div
                      style={{ width: w }}
                      className="h-full bg-[#4ECDC4]"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual stage */}
          <div className="relative mx-auto aspect-[4/3] w-full max-w-xl">
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0F1B2C] to-[#070d17] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
                <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
                <span className="h-2 w-2 rounded-full bg-[#28C840]" />
                <span className="ml-3 font-mono text-[10px] text-white/30">contaflow.app</span>
              </div>

              <div className="relative h-[calc(100%-40px)] p-6">
                {FRAMES.map((f, i) => {
                  const start = i / FRAMES.length;
                  const end = (i + 1) / FRAMES.length;
                  const opacity = useTransform(
                    scrollYProgress,
                    [
                      Math.max(0, start - 0.03),
                      start + 0.08,
                      end - 0.08,
                      Math.min(1, end + 0.03),
                    ],
                    [0, 1, 1, 0]
                  );
                  const scale = useTransform(
                    scrollYProgress,
                    [start, (start + end) / 2, end],
                    [0.92, 1, 1.04]
                  );
                  return (
                    <motion.div
                      key={i}
                      style={{ opacity, scale }}
                      className="absolute inset-6 flex items-center justify-center"
                    >
                      <FrameVisual index={i} chip={f.chip} />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* floor glow */}
            <div
              aria-hidden
              className="absolute -bottom-8 left-1/2 h-20 w-2/3 -translate-x-1/2 rounded-full bg-[#4ECDC4]/30 blur-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FrameVisual({ index, chip }: { index: number; chip: string }) {
  if (index === 0) {
    return (
      <div className="w-full max-w-sm">
        <div className="mb-3 flex items-center gap-2 text-[11px] text-white/40">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M4 6l8 6 8-6M4 6v12h16V6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          cliente@padaria.com.br
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-2 text-xs text-white/50">Anexo</div>
          <div className="flex items-center gap-3 rounded-lg border border-[#4ECDC4]/20 bg-[#4ECDC4]/[0.04] px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#4ECDC4]/15 text-[#4ECDC4]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs text-white/85">NF-e 00127.xml</div>
              <div className="text-[10px] text-white/40">{chip}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="w-full max-w-sm space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/60">NF-e 00127</span>
            <span className="font-mono text-[#4ECDC4]">R$ 4.200</span>
          </div>
          <div className="mt-3 space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-[11px]"
            >
              <span className="rounded-full bg-[#4ECDC4]/15 px-2 py-0.5 text-[#4ECDC4]">Serviço prestado</span>
              <span className="text-white/30">· CFOP 5933</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 text-[11px]"
            >
              <span className="rounded-full bg-[#7A5EFF]/15 px-2 py-0.5 text-[#B7A4FF]">ISS 5%</span>
              <span className="text-white/30">· retido na fonte</span>
            </motion.div>
          </div>
        </div>
        <div className="text-center text-[11px] text-white/45">{chip}</div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl border border-white/10 bg-[#0B1422] p-4">
        <div className="mb-2 flex items-center gap-2 text-[11px] text-white/40">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366]">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4A10 10 0 003.5 17.3L2 22l4.8-1.5A10 10 0 1020 4z" />
            </svg>
          </div>
          WhatsApp Contaflow
        </div>
        <div className="rounded-2xl bg-[#4ECDC4]/15 px-3 py-2.5 text-xs text-white/85">
          Olá! Seu DAS do MEI vence <b>20/04</b>. <br />
          Boleto já no anexo 📎
        </div>
        <div className="mt-2 text-right font-mono text-[10px] text-white/30">entregue ✓✓</div>
      </div>
      <div className="mt-3 text-center text-[11px] text-white/45">{chip}</div>
    </div>
  );
}
