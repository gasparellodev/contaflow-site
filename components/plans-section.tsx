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
    priceSub: "à vista ou 3× R$ 599",
    desc:
      "Auditoria completa + mapa de automação + PoC de IA aplicada a um cliente seu.",
    features: [
      "Entrega em 5 dias úteis",
      "Mapa de automação priorizado",
      "Prova de conceito com dados seus",
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
      "1º mês grátis até 30/04",
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
    <section id="ofertas" className="py-24 md:py-32 bg-[#0F1B2A]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-[#4ECDC4] uppercase mb-5">
            Como começar
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Três portas de entrada
          </h2>
          <p className="mt-5 text-lg text-white/60 leading-relaxed">
            Escolha a que faz sentido pro momento do seu escritório.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((o) => (
            <div
              key={o.slug}
              className={`relative bg-[#0A1520] rounded-2xl p-8 flex flex-col border ${
                o.featured
                  ? "border-[#FFB627] shadow-[0_0_60px_-20px_rgba(255,182,39,0.4)]"
                  : "border-white/5"
              }`}
            >
              {o.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFB627] text-[#0A1520] text-[10px] font-bold tracking-[0.15em] px-3 py-1 rounded-full">
                  {o.badge}
                </span>
              )}
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">
                {o.name}
              </div>
              <div className="mt-4">
                <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  {o.price}
                </span>
                <div className="text-sm text-white/40 mt-1">{o.priceSub}</div>
              </div>
              <p className="mt-5 text-white/65 text-sm leading-relaxed min-h-[48px]">
                {o.desc}
              </p>
              <ul className="mt-6 space-y-2.5 flex-1">
                {o.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2.5 text-sm text-white/80 leading-snug"
                  >
                    <span className="text-[#4ECDC4] font-bold shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-8 w-full font-semibold ${
                  o.featured
                    ? "bg-[#FFB627] hover:bg-[#ffc43d] text-[#0A1520]"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                <a href={o.ctaHref} target="_blank" rel="noopener noreferrer">
                  {o.ctaLabel}
                </a>
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-white/40 max-w-2xl mx-auto">
          Métricas de redução de tempo são baseadas em pilotos internos;
          resultados variam por escritório. Dados tratados em conformidade com a
          LGPD.
        </p>
      </div>
    </section>
  );
}
