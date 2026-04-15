"use client";

import { Button } from "@/components/ui/button";

type Offer = {
  slug: string;
  badge?: string;
  name: string;
  price: string;
  priceSub: string;
  desc: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

const offers: Offer[] = [
  {
    slug: "sprint-express",
    name: "Sprint Express 48h",
    price: "R$ 997",
    priceSub: "à vista (PIX/Asaas)",
    desc:
      "Auditoria enxuta com 3 quick-wins de automação — entregue em 48 horas.",
    features: [
      "1 reunião de 1 hora",
      "Relatório de 5 páginas em 48h",
      "3 quick-wins priorizados",
      "Estimativa de horas economizadas",
    ],
    ctaLabel: "Comprar agora",
    ctaHref: "https://sandbox.asaas.com/c/aht15kd7eyewvenu",
  },
  {
    slug: "diagnostico",
    badge: "MAIS PROCURADO",
    featured: true,
    name: "Diagnóstico Completo",
    price: "R$ 1.497",
    priceSub: "à vista ou 3x R$ 599",
    desc:
      "Auditoria completa + mapa de automação + PoC de IA aplicada a um cliente seu.",
    features: [
      "Entrega em 5 dias úteis",
      "Mapa de automação priorizado",
      "Prova de conceito IA",
      "50% abate o setup do Contaflow",
    ],
    ctaLabel: "Comprar agora",
    ctaHref: "https://sandbox.asaas.com/c/qlzccj7ltm7m2lgl",
  },
  {
    slug: "contaflow-essencial",
    name: "Contaflow Essencial",
    price: "R$ 697",
    priceSub: "/mês + setup R$ 1.997",
    desc:
      "Plataforma completa para escritórios com até 50 clientes ativos.",
    features: [
      "1º mês grátis se fechar até 30/04",
      "Categorização automática de NFs",
      "Lembretes WhatsApp por cliente",
      "Chatbot white-label",
    ],
    ctaLabel: "Agendar demo",
    ctaHref:
      "https://wa.me/5511951276991?text=Quero%20agendar%20demo%20do%20Contaflow",
  },
];

export function PlansSection() {
  return (
    <section id="planos" className="py-20 md:py-28 bg-[#0A0E1A]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Como começar hoje
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Três portas de entrada — escolha a que faz sentido pro momento do
            seu escritório.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {offers.map((o) => (
            <div
              key={o.slug}
              className={`relative bg-[#1E293B] border rounded-2xl p-8 flex flex-col ${
                o.featured
                  ? "border-[#FFB627] shadow-[0_0_40px_-10px_rgba(255,182,39,0.35)]"
                  : "border-white/10"
              }`}
            >
              {o.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFB627] text-[#0F172A] text-[11px] font-bold tracking-wider px-3 py-1 rounded-full">
                  {o.badge}
                </span>
              )}
              <div className="text-xs font-bold uppercase tracking-wider text-white/50">
                {o.name}
              </div>
              <div className="mt-3">
                <span className="text-4xl md:text-5xl font-extrabold text-white">
                  {o.price}
                </span>
                <div className="text-sm text-white/50 mt-1">{o.priceSub}</div>
              </div>
              <p className="mt-5 text-white/70 text-sm leading-relaxed min-h-[60px]">
                {o.desc}
              </p>
              <ul className="mt-6 space-y-2 flex-1">
                {o.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 text-sm text-white/80 leading-snug"
                  >
                    <span className="text-[#4ECDC4] font-bold">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-8 w-full ${
                  o.featured
                    ? "bg-[#FFB627] hover:bg-[#ffc43d] text-[#0F172A] font-semibold"
                    : "bg-[#4ECDC4] hover:bg-[#5fd8cf] text-[#0F172A] font-semibold"
                }`}
              >
                <a href={o.ctaHref} target="_blank" rel="noopener noreferrer">
                  {o.ctaLabel}
                </a>
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/40 max-w-2xl mx-auto">
          Métricas de redução de tempo são baseadas em pilotos internos;
          resultados variam por escritório. Dados tratados em conformidade com a
          LGPD.
        </p>
      </div>
    </section>
  );
}
