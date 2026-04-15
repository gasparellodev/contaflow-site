"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Como funciona o Contaflow?",
    a: "Uma camada de IA que se conecta aos canais que você já usa (WhatsApp, Domínio, Focus NFe). A IA categoriza NFs em 30 segundos, envia lembretes fiscais automáticos por cliente e responde dúvidas com chatbot treinado com suas respostas. Você revisa, aprova e permanece no controle.",
  },
  {
    q: "Preciso trocar meu Domínio, Alterdata ou Calima?",
    a: "Não. O Contaflow não substitui seu sistema contábil — é uma camada de automação por cima. Integramos via API para ler e sincronizar dados. Seu ERP atual continua a fonte da verdade contábil.",
  },
  {
    q: "Os dados ficam em conformidade com a LGPD?",
    a: "Sim. Dados criptografados em repouso, hospedagem em servidores brasileiros, isolamento multi-tenant (um cliente nunca vê dados de outro) e DPO formal. Contrato padrão de processamento de dados assinado na ativação.",
  },
  {
    q: "Quanto custa o Contaflow?",
    a: "Três portas: Sprint Express R$ 997 (48h, relatório com 3 quick-wins), Diagnóstico Completo R$ 1.497 (5 dias, com prova de conceito IA), e Contaflow Essencial R$ 697/mês + setup R$ 1.997 (plataforma rodando). O setup é abatido em 50% pelo valor do Diagnóstico Completo.",
  },
  {
    q: "Quanto tempo para implantar?",
    a: "A Sprint Express entrega em 48h um relatório priorizado. A ativação técnica real (integração com seu sistema, treinamento do chatbot, conexão WhatsApp) acontece nas 1-2 semanas seguintes, mediante upgrade para o plano Essencial.",
  },
  {
    q: "Para quantos clientes funciona?",
    a: "O plano Essencial cobre até 50 clientes ativos no seu escritório. Planos maiores (Pro: até 200, Scale: ilimitado) são sob consulta. Escritórios muito pequenos (< 10 clientes) podem não justificar o investimento — nesse caso, recomendamos a Sprint Express para avaliar antes.",
  },
  {
    q: "E se eu cancelar?",
    a: "Sprint Express: 7 dias de reembolso total se não encontrar ganhos acionáveis. Contaflow Essencial: cancelamento a qualquer momento, sem multa, sem fidelidade. Você sai com todos os dados em formato aberto (CSV, SPED).",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-[#050B15] py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-14">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/60">
            <span className="h-1 w-1 rounded-full bg-[#4ECDC4]" />
            Perguntas frequentes
          </div>
          <h2 className="display-lg text-4xl text-white sm:text-5xl md:text-[56px]">
            O que os contadores perguntam.
          </h2>
        </div>

        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="py-1">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <h3 className="text-base font-medium text-white md:text-lg">
                    {f.q}
                  </h3>
                  <motion.svg
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-1 h-5 w-5 shrink-0 text-[#4ECDC4]"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <path d="M10 4v12M4 10h12" />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-5 text-white/60 leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}
