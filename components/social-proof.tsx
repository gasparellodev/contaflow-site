export function SocialProof() {
  return (
    <section className="py-20 md:py-28 bg-[#0F1B2A] border-y border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-6">
          <div
            className="md:col-span-2 bg-[#0A1520] border border-[#4ECDC4]/20 rounded-2xl p-8"
            data-reveal=""
          >
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-[#FFB627] uppercase mb-3">
              Beta fechado · vagas limitadas abril/maio
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
              Em beta com 2 escritórios parceiros em SP.{" "}
              <span className="text-white/60 font-normal">
                Founder atende pessoalmente cada demo — você fala comigo, não
                com um SDR.
              </span>
            </h3>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#0F4C5C] flex items-center justify-center text-[#0A1520] font-bold text-lg">
                VG
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  Vinicius Gasparello
                </p>
                <p className="text-white/50 text-xs mt-0.5">
                  Fundador · GaspLab &amp; Contaflow
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-[#0A1520] border border-white/5 rounded-2xl p-8 flex flex-col justify-center"
            data-reveal=""
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center text-xl">
                ✓
              </span>
              <h3 className="text-white font-semibold">Garantia 7 dias</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Se o Diagnóstico Express não mapear ganhos claros para o seu
              escritório,{" "}
              <span className="text-white">devolvemos os R$ 997</span> —
              sem burocracia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
