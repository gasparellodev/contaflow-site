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
    a: "Três portas: Diagnóstico Express R$ 997 (48h, relatório com 3 quick-wins), Diagnóstico Completo R$ 1.497 (5 dias, com prova de conceito IA), e Contaflow Essencial R$ 697/mês + setup R$ 1.997 (plataforma rodando). O setup é abatido em 50% pelo valor do Diagnóstico Completo.",
  },
  {
    q: "Quanto tempo para implantar?",
    a: "O Diagnóstico Express entrega em 48h um relatório priorizado. A ativação técnica real (integração com seu sistema, treinamento do chatbot, conexão WhatsApp) acontece nas 1-2 semanas seguintes, mediante upgrade para o plano Essencial.",
  },
  {
    q: "Para quantos clientes funciona?",
    a: "O plano Essencial cobre até 50 clientes ativos no seu escritório. Planos maiores (Pro: até 200, Scale: ilimitado) são sob consulta. Escritórios muito pequenos (< 10 clientes) podem não justificar o investimento — nesse caso, recomendamos o Diagnóstico Express para avaliar antes.",
  },
  {
    q: "E se eu cancelar?",
    a: "Diagnóstico Express: 7 dias de reembolso total se não encontrar ganhos acionáveis. Contaflow Essencial: cancelamento a qualquer momento, sem multa, sem fidelidade. Você sai com todos os dados em formato aberto (CSV, SPED).",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-[#0A1520]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-[#4ECDC4] uppercase mb-5">
            Perguntas frequentes
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            O que os contadores perguntam
          </h2>
        </div>
        <div className="divide-y divide-white/5 border-y border-white/5">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group py-5 [&[open]>summary>svg]:rotate-45"
              data-reveal=""
            >
              <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-white leading-snug">
                  {f.q}
                </h3>
                <svg
                  className="w-5 h-5 text-[#4ECDC4] flex-shrink-0 mt-1 transition-transform"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </summary>
              <p className="mt-4 text-white/65 leading-relaxed max-w-3xl">
                {f.a}
              </p>
            </details>
          ))}
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
