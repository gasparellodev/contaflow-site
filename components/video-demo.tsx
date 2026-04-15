export function VideoDemo() {
  return (
    <section
      id="video-demo"
      className="py-24 md:py-32 bg-[#0F1B2A] border-y border-white/5"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-[#4ECDC4] uppercase mb-5">
            Demo de 45 segundos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            O Contaflow em 45 segundos
          </h2>
          <p className="mt-5 text-lg text-white/60 leading-relaxed">
            Mostra o fluxo real: cliente manda NF no WhatsApp, IA categoriza,
            você aprova em 1 clique.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#0A1520] aspect-video shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
          <video
            src="/demo.mp4"
            poster="/screens/01-inbox.png"
            controls
            playsInline
            preload="metadata"
            className="w-full h-full block"
          >
            Seu navegador não suporta vídeo HTML5.{" "}
            <a href="/demo.mp4" className="text-[#4ECDC4] underline">
              Baixar MP4
            </a>
            .
          </video>
        </div>
      </div>
    </section>
  );
}
