const pains = [
  {
    icon: "📊",
    title: "Categorizar NFs manualmente",
    body:
      "Nossa IA sugere o lançamento contábil. Você revisa em 30 segundos — não em 3 minutos por nota.",
  },
  {
    icon: "⏰",
    title: "Obrigações fiscais esquecidas",
    body:
      "Lembretes automáticos via WhatsApp por cliente para DAS, DCTF, DEFIS e o que mais vencer.",
  },
  {
    icon: "📄",
    title: "Boletos e extratos digitados",
    body:
      "Suba o PDF — a IA extrai e lança. Sem passar número por número pro seu sistema.",
  },
  {
    icon: "💬",
    title: "Dúvidas recorrentes de clientes",
    body:
      "Chatbot white-label responde o dia-a-dia. Você entra quando é questão técnica de verdade.",
  },
];

export function AboutSection() {
  return (
    <section id="dores" className="py-24 md:py-32 bg-[#0A1520]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-2xl mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-[#4ECDC4] uppercase mb-5">
            O que muda na sua semana
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            O que sugamos das suas semanas
          </h2>
          <p className="mt-5 text-lg text-white/60 leading-relaxed">
            Todo contador reconhece essas horas perdidas. O Contaflow devolve
            elas — sem criar dependência tecnológica.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((p) => (
            <div
              key={p.title}
              className="bg-[#0F1B2A] border border-white/5 rounded-2xl p-7 transition-colors hover:border-[#4ECDC4]/30"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#4ECDC4]/10 text-2xl mb-5">
                {p.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 leading-snug">
                {p.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
