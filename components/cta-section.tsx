import { Button } from "@/components/ui/button";

export function CtaSection() {
  const sprintLink = "https://sandbox.asaas.com/c/aht15kd7eyewvenu";
  const waLink =
    "https://wa.me/5511951276991?text=Quero%20falar%20sobre%20o%20Contaflow%20para%20meu%20escrit%C3%B3rio";

  return (
    <section
      id="contato"
      className="py-24 md:py-32 bg-[#0A1520] border-t border-white/5"
    >
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          Pronto para devolver horas da sua semana?
        </h2>
        <p className="mt-5 text-lg text-white/65 leading-relaxed max-w-2xl mx-auto">
          Comece pela Sprint Express de 48h. Se não fizer sentido pro seu
          escritório, você tem 7 dias para pedir reembolso.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
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
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              Conversar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
