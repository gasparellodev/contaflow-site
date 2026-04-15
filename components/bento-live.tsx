"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

/* -------------------------------------------------------------------- */
/*  Card wrapper                                                         */
/* -------------------------------------------------------------------- */

function Card({
  className = "",
  label,
  title,
  children,
}: {
  className?: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 ring-1 ring-white/[0.03] transition-colors hover:border-white/15 hover:ring-[#4ECDC4]/20 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px at var(--x,50%) var(--y,50%), rgba(78,205,196,0.12), transparent 70%)",
        }}
      />
      <div className="relative flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
            {label}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#4ECDC4]" />
        </div>
        <div className="flex-1">{children}</div>
        <h3 className="mt-6 text-lg font-medium text-white">{title}</h3>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */
/*  1. Inbox live                                                        */
/* -------------------------------------------------------------------- */

const INBOX_ITEMS = [
  { nf: "NF-e 00123", cliente: "Padaria Central", valor: "R$ 2.840", cat: "Custo operacional" },
  { nf: "NF-e 00124", cliente: "TechLab ME", valor: "R$ 12.500", cat: "Serviço prestado" },
  { nf: "NF-e 00125", cliente: "Farmácia Rosa", valor: "R$ 890", cat: "Mercadoria" },
  { nf: "NF-e 00126", cliente: "Studio Creative", valor: "R$ 4.200", cat: "Serviço prestado" },
];

function InboxLive() {
  const [items, setItems] = useState(INBOX_ITEMS.slice(0, 2));
  useEffect(() => {
    let i = 2;
    const id = setInterval(() => {
      setItems((prev) => {
        const next = [...prev, INBOX_ITEMS[i % INBOX_ITEMS.length]];
        if (next.length > 4) next.shift();
        return next;
      });
      i++;
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-2">
      <AnimatePresence initial={false}>
        {items.map((it, idx) => (
          <motion.div
            key={`${it.nf}-${idx}`}
            layout
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5 text-xs"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#4ECDC4]/10 text-[#4ECDC4]">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4M7 3h10l4 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4z" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="font-mono text-white/80">{it.nf}</div>
                <div className="truncate text-white/40">{it.cliente}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline rounded-full bg-[#4ECDC4]/10 px-2 py-0.5 text-[10px] text-[#4ECDC4]">
                {it.cat}
              </span>
              <span className="font-mono text-white/90">{it.valor}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  2. WhatsApp bot                                                      */
/* -------------------------------------------------------------------- */

const WA_SEQUENCE = [
  { who: "client", text: "Oi, quando vence o DAS esse mês?" },
  { who: "typing" },
  { who: "bot", text: "Seu DAS do MEI vence em 20/04. Boleto já disponível 📎" },
];

function WhatsAppLive() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 6), 2000);
    return () => clearInterval(id);
  }, []);

  const visible = WA_SEQUENCE.slice(0, Math.min(step + 1, WA_SEQUENCE.length));

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence initial={false}>
        {visible.map((m, i) => (
          <motion.div
            key={`${step}-${i}`}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${
              m.who === "client"
                ? "self-start bg-white/[0.06] text-white/80"
                : m.who === "typing"
                ? "self-end bg-[#4ECDC4]/15 text-[#4ECDC4]"
                : "self-end bg-[#4ECDC4]/20 text-white"
            }`}
          >
            {m.who === "typing" ? (
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" style={{ animationDelay: "300ms" }} />
              </span>
            ) : (
              m.text
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  3. Calendar                                                          */
/* -------------------------------------------------------------------- */

const EVENTS = [
  { d: 5, label: "DAS MEI", color: "bg-[#4ECDC4]/20 text-[#4ECDC4]" },
  { d: 14, label: "SPED", color: "bg-[#FFB627]/20 text-[#FFB627]" },
  { d: 20, label: "DCTF", color: "bg-[#7A5EFF]/20 text-[#B7A4FF]" },
];

function CalendarLive() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  return (
    <div ref={ref}>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 21 }).map((_, i) => {
          const d = i + 1;
          const ev = EVENTS.find((e) => e.d === d);
          return (
            <div
              key={d}
              className="relative aspect-square rounded-md border border-white/5 bg-white/[0.015] text-[9px] text-white/30"
            >
              <span className="absolute left-1 top-0.5">{d}</span>
              {ev && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{
                    delay: EVENTS.indexOf(ev) * 0.35,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`absolute inset-x-0.5 bottom-0.5 truncate rounded-sm px-1 text-[8px] font-medium ${ev.color}`}
                >
                  {ev.label}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  4. Approval                                                          */
/* -------------------------------------------------------------------- */

function ApprovalLive() {
  const [state, setState] = useState<"idle" | "pressed" | "done">("idle");
  useEffect(() => {
    const id = setInterval(() => {
      setState("pressed");
      setTimeout(() => setState("done"), 350);
      setTimeout(() => setState("idle"), 1800);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-3">
      <motion.button
        animate={{
          scale: state === "pressed" ? 0.96 : 1,
          backgroundColor:
            state === "done" ? "#4ECDC4" : "rgba(255,255,255,1)",
        }}
        transition={{ duration: 0.2 }}
        className="relative overflow-hidden rounded-full px-7 py-3 text-sm font-semibold text-[#050B15]"
      >
        <AnimatePresence mode="wait">
          {state === "done" ? (
            <motion.span
              key="done"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Aprovado
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
            >
              Aprovar categoria
            </motion.span>
          )}
        </AnimatePresence>
        {state === "pressed" && (
          <motion.span
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4ECDC4]/40"
          />
        )}
      </motion.button>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
        1 clique · sem planilha
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  5. Dashboard                                                         */
/* -------------------------------------------------------------------- */

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) {
      setVal(0);
      return;
    }
    let start: number | null = null;
    let id = 0;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / 900, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val.toLocaleString("pt-BR")}{suffix}</span>;
}

function Sparkline() {
  const pts = [12, 18, 15, 22, 28, 25, 34, 38, 42, 39, 48, 52];
  const w = 120;
  const h = 32;
  const max = Math.max(...pts);
  const d = pts
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * w} ${h - (v / max) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <motion.path
        d={d}
        fill="none"
        stroke="#4ECDC4"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
    </svg>
  );
}

function DashboardLive() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">NFs / mês</div>
        <div className="mt-1 text-2xl font-semibold text-white">
          <Counter to={1248} />
        </div>
        <div className="mt-1 text-[10px] text-[#4ECDC4]">+23%</div>
      </div>
      <div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">Horas salvas</div>
        <div className="mt-1 text-2xl font-semibold text-white">
          <Counter to={64} suffix="h" />
        </div>
        <div className="mt-1"><Sparkline /></div>
      </div>
      <div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">Precisão IA</div>
        <div className="mt-1 text-2xl font-semibold text-white">
          <Counter to={97} suffix="%" />
        </div>
        <div className="mt-1 text-[10px] text-white/40">supervisão ativa</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  6. Audit log                                                         */
/* -------------------------------------------------------------------- */

const AUDIT_LINES = [
  { t: "14:02", u: "IA", a: "categorizou NF-125 → Serviço" },
  { t: "14:03", u: "Vinicius", a: "aprovou categoria" },
  { t: "14:07", u: "IA", a: "enviou DAS vence 20/04 → Padaria" },
  { t: "14:12", u: "IA", a: "detectou duplicata NF-119" },
  { t: "14:18", u: "Mariana", a: "revisou DCTF março" },
];

function AuditLive() {
  const [visible, setVisible] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible((v) => (v >= AUDIT_LINES.length ? 1 : v + 1));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-1 font-mono text-[10px]">
      {AUDIT_LINES.slice(0, visible).map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-2 text-white/50"
        >
          <span className="text-white/30">{l.t}</span>
          <span className="text-[#4ECDC4]">{l.u}</span>
          <span className="truncate text-white/70">{l.a}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Main                                                                 */
/* -------------------------------------------------------------------- */

export function BentoLive() {
  return (
    <section id="produto" className="relative bg-[#050B15] py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/60">
              <span className="h-1 w-1 rounded-full bg-[#4ECDC4]" />
              Dentro do Contaflow
            </div>
            <h2 className="display-lg max-w-xl text-balance text-4xl text-white sm:text-5xl md:text-[64px]">
              Isto não é um print. <br />
              <span className="text-white/45">É o produto rodando.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/55">
            Cada bloco abaixo é um componente real do Contaflow — exatamente como
            aparece no seu escritório, em loop ao vivo.
          </p>
        </div>

        <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:grid-cols-4">
          <Card
            className="md:col-span-2 md:row-span-2"
            label="Inbox · NF-e"
            title="NFs chegam, a IA categoriza, você revisa."
          >
            <InboxLive />
          </Card>

          <Card
            className="md:col-span-1"
            label="WhatsApp · Chatbot"
            title="Cliente pergunta. Bot responde."
          >
            <WhatsAppLive />
          </Card>

          <Card
            className="md:col-span-1"
            label="Aprovação"
            title="1 clique. Sem planilha."
          >
            <ApprovalLive />
          </Card>

          <Card
            className="md:col-span-1 md:row-span-2"
            label="Calendário fiscal"
            title="DAS, SPED, DCTF — agendados."
          >
            <CalendarLive />
          </Card>

          <Card
            className="md:col-span-1"
            label="Auditoria"
            title="Rastro de tudo o que a IA tocou."
          >
            <AuditLive />
          </Card>

          <Card
            className="md:col-span-2"
            label="Dashboard"
            title="Métricas do escritório, em tempo real."
          >
            <DashboardLive />
          </Card>
        </div>
      </div>
    </section>
  );
}
