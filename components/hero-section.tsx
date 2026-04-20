import { Button } from "@/components/ui/button";

export function HeroSection() {
  const sprintLink = "https://sandbox.asaas.com/c/aht15kd7eyewvenu";
  const demoLink =
    "https://wa.me/5511951276991?text=Quero%20agendar%20a%20demo%20do%20Contaflow";

  return (
    <section
      id="produtos"
      className="relative overflow-hidden bg-[#0A1520]"
    >
      {/* Background image — dashboard mockup sem texto embarcado */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: "url('/contaflow-hero-v2.jpeg')" }}
        aria-hidden
      />
      {/* Overlay gradiente sutil: escurece mais a esquerda (onde fica o texto) */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0A1520] via-[#0A1520]/80 to-transparent"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-6 py-24 md:py-36 max-w-6xl">
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-[#4ECDC4] uppercase mb-6">
            Beta fechado · Early adopters
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            Contabilidade que{" "}
            <span className="text-[#4ECDC4]">roda sozinha</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
            IA que categoriza NFs em 30 segundos, envia lembretes fiscais por
            cliente via WhatsApp e responde dúvidas sem você sair do lugar.
            Implantação em 48 horas.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#FFB627] hover:bg-[#ffc43d] text-[#0A1520] font-semibold"
            >
              <a href={sprintLink} target="_blank" rel="noopener noreferrer">
                Sprint Express 48h — R$ 997
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white"
            >
              <a href={demoLink} target="_blank" rel="noopener noreferrer">
                Agendar demo
              </a>
            </Button>
          </div>
          <p className="mt-8 text-xs text-white/40 max-w-lg">
            Dados tratados em conformidade com a LGPD. Métricas de pilotos
            internos — resultados variam por escritório.
          </p>
        </div>
      </div>
    </section>
  );
}
