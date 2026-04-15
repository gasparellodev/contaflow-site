"use client";

import { useState } from "react";
import Link from "next/link";

const screens = [
  {
    slug: "01-inbox",
    title: "Inbox de pendências",
    blurb:
      "Sua fila do dia — pendências por cliente em prazo fiscal, em um canal só.",
  },
  {
    slug: "04-documentos",
    title: "Documentos com IA",
    blurb:
      "Upload de XML/PDF e a IA categoriza. Você revisa em 30 segundos, não em 3 minutos.",
  },
  {
    slug: "05-conversas",
    title: "Conversas WhatsApp",
    blurb:
      "Todas as conversas dos clientes num canal só, com chatbot IA respondendo as repetitivas.",
  },
  {
    slug: "06-calendario",
    title: "Calendário fiscal",
    blurb:
      "Matriz obrigação × cliente. Dispara lembretes WhatsApp em massa sem planilha.",
  },
];

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const current = screens[active];

  return (
    <section id="produto" className="py-24 md:py-32 bg-[#0A1520]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-[#4ECDC4] uppercase mb-5">
            Veja o sistema em funcionamento
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            O que você usa no seu escritório
          </h2>
          <p className="mt-5 text-lg text-white/60 leading-relaxed">
            Quatro telas do dia a dia. Plataforma completa em{" "}
            <Link
              href="/produto"
              className="text-[#4ECDC4] underline underline-offset-4 hover:text-white transition-colors"
            >
              /produto
            </Link>
            .
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Screenshot grande */}
          <div className="lg:col-span-3 bg-[#0F1B2A] border border-white/5 rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/screens/${current.slug}.png`}
              alt={current.title}
              className="w-full h-auto block"
              loading="lazy"
            />
            <div className="p-6 border-t border-white/5">
              <h3 className="text-white font-semibold text-lg">
                {current.title}
              </h3>
              <p className="text-white/60 text-sm mt-2 leading-relaxed">
                {current.blurb}
              </p>
            </div>
          </div>

          {/* Seletor lateral */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {screens.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => setActive(i)}
                className={`text-left bg-[#0F1B2A] rounded-xl p-5 border transition-all ${
                  i === active
                    ? "border-[#4ECDC4] bg-[#4ECDC4]/5"
                    : "border-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-md text-[11px] font-bold mt-0.5 flex-shrink-0 ${
                      i === active
                        ? "bg-[#4ECDC4] text-[#0A1520]"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-semibold text-sm ${
                        i === active ? "text-white" : "text-white/80"
                      }`}
                    >
                      {s.title}
                    </h4>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">
                      {s.blurb}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 items-center justify-between bg-[#0F1B2A] border border-white/5 rounded-xl p-5">
          <p className="text-white/70 text-sm">
            Quer ver tudo? Abra a{" "}
            <Link
              href="/produto"
              className="text-[#4ECDC4] underline underline-offset-4"
            >
              galeria completa com as 10 telas
            </Link>{" "}
            ou assista ao{" "}
            <a
              href="#video-demo"
              className="text-[#4ECDC4] underline underline-offset-4"
            >
              vídeo de 45 segundos
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
