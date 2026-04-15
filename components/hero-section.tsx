"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const sprintLink = "https://sandbox.asaas.com/c/aht15kd7eyewvenu";
  const demoLink =
    "https://wa.me/5511951276991?text=Quero%20agendar%20a%20demo%20do%20Contaflow";

  return (
    <section
      id="produtos"
      className="relative py-24 md:py-36 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15,76,92,0.85), rgba(26,43,95,0.9)), url('/contaflow-hero.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F4C5C]/60 via-[#1A2B5F]/70 to-black/85 -z-10"></div>

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        <Badge className="bg-[#4ECDC4]/20 text-[#4ECDC4] border-[#4ECDC4]/40 mb-6 text-xs tracking-wider">
          BETA FECHADO • EARLY ADOPTERS
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl">
          Contabilidade que roda sozinha — com IA que respeita a LGPD
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl">
          Categorização automática de notas fiscais, lembretes fiscais por cliente
          via WhatsApp e chatbot que responde dúvidas. Implementamos em 48h no seu
          escritório.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button
            asChild
            size="lg"
            className="bg-[#FFB627] hover:bg-[#ffc43d] text-[#0F172A] font-semibold"
          >
            <a href={sprintLink} target="_blank" rel="noopener noreferrer">
              Sprint Express 48h — R$ 997
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10"
          >
            <a href={demoLink} target="_blank" rel="noopener noreferrer">
              Agendar demo
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
