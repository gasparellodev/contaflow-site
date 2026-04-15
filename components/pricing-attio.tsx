"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

type Offer = {
  slug: string;
  badge?: string;
  name: string;
  priceValue: number;
  priceLabel: string;
  priceSub: string;
  desc: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

const offers: Offer[] = [
  {
    slug: "sprint",
    name: "Sprint Express",
    priceValue: 997,
    priceLabel: "R$ 997",
    priceSub: "entrega em 48h",
    desc: "3 quick-wins de automação mapeados num cliente seu.",
    features: [
      "1h de discovery",
      "Relatório de 5 páginas em 48h",
      "3 quick-wins priorizados",
      "Estimativa de horas salvas",
    ],
    ctaLabel: "Começar Sprint",
    ctaHref: "https://sandbox.asaas.com/c/aht15kd7eyewvenu",
  },
  {
    slug: "diagnostico",
    badge: "Mais procurado",
    featured: true,
    name: "Diagnóstico Completo",
    priceValue: 1497,
    priceLabel: "R$ 1.497",
    priceSub: "ou 3× R$ 599 · 5 dias úteis",
    desc: "Auditoria completa, mapa de automação e PoC com dados seus.",
    features: [
      "Auditoria de 10 clientes seus",
      "Mapa de automação priorizado",
      "PoC de IA aplicada",
      "50% abate setup do Contaflow",
    ],
    ctaLabel: "Começar Diagnóstico",
    ctaHref: "https://sandbox.asaas.com/c/qlzccj7ltm7m2lgl",
  },
  {
    slug: "essencial",
    name: "Contaflow Essencial",
    priceValue: 697,
    priceLabel: "R$ 697",
    priceSub: "/mês · setup R$ 1.997",
    desc: "Plataforma completa para escritórios até 50 clientes.",
    features: [
      "1º mês grátis se fechar até 30/05",
      "Categorização NF automática",
      "WhatsApp por cliente",
      "Chatbot white-label",
    ],
    ctaLabel: "Agendar demo",
    ctaHref: "https://wa.me/5511951276991?text=Quero%20agendar%20demo%20do%20Contaflow",
  },
];

function PriceCounter({ to, inView }: { to: number; inView: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let id = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / 900, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to]);
  return <>R$ {n.toLocaleString("pt-BR")}</>;
}

function OfferCard({ o, index }: { o: Offer; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotX = useTransform(sy, (v) => v * -6);
  const rotY = useTransform(sx, (v) => v * 6);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        transformPerspective: 1600,
      }}
      className={`relative flex flex-col overflow-hidden rounded-3xl p-8 ${
        o.featured
          ? "border border-[#FFB627]/30 bg-gradient-to-b from-[#FFB627]/[0.08] to-white/[0.01]"
          : "border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-white/[0.01]"
      }`}
    >
      {o.featured && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-60"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(255,182,39,0.5), transparent 40%)",
              animation: "conic-spin 6s linear infinite",
              mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
              WebkitMask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: 1,
            }}
          />
          <span className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-[#FFB627] px-3 py-1 text-[10px] font-semibold tracking-wider text-[#050B15]">
            {o.badge?.toUpperCase()}
          </span>
        </>
      )}

      <div className={`text-[11px] font-mono uppercase tracking-[0.2em] ${o.featured ? "mt-6 text-[#FFB627]" : "text-white/40"}`}>
        {o.name}
      </div>

      <div className="mt-5">
        <div className="text-5xl font-semibold tracking-tight text-white">
          <PriceCounter to={o.priceValue} inView={inView} />
        </div>
        <div className="mt-1 text-xs text-white/45">{o.priceSub}</div>
      </div>

      <p className="mt-5 min-h-[40px] text-sm text-white/65">{o.desc}</p>

      <ul className="mt-6 flex-1 space-y-2.5">
        {o.features.map((f, i) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 + i * 0.06 }}
            className="flex gap-2.5 text-sm text-white/80"
          >
            <span className={`shrink-0 ${o.featured ? "text-[#FFB627]" : "text-[#4ECDC4]"}`}>
              ✓
            </span>
            {f}
          </motion.li>
        ))}
      </ul>

      <a
        href={o.ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
          o.featured
            ? "bg-[#FFB627] text-[#050B15] shadow-[0_0_40px_rgba(255,182,39,0.35)] hover:shadow-[0_0_60px_rgba(255,182,39,0.55)]"
            : "bg-white/[0.06] text-white ring-1 ring-inset ring-white/10 hover:bg-white/[0.1] hover:ring-white/20"
        }`}
      >
        {o.ctaLabel}
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </a>
    </motion.div>
  );
}

export function PricingAttio() {
  return (
    <section id="ofertas" className="relative bg-[#050B15] py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/60">
            <span className="h-1 w-1 rounded-full bg-[#4ECDC4]" />
            Como entra
          </div>
          <h2 className="display-lg mx-auto max-w-3xl text-4xl text-white sm:text-5xl md:text-[64px]">
            Escolha como entra.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/55">
            Três portas. Da auditoria de 48h à plataforma completa.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {offers.map((o, i) => (
            <OfferCard key={o.slug} o={o} index={i} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-xs text-white/35">
          Métricas baseadas em pilotos internos. Resultados variam por escritório.
          Dados em conformidade com a LGPD.
        </p>
      </div>
    </section>
  );
}
