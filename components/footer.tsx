export function Footer() {
  return (
    <footer className="relative bg-[#040810] py-16">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4ECDC4]/40 to-transparent"
      />
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/contaflow-logo.png"
              alt="Contaflow"
              className="h-6 w-auto"
            />
            <p className="mt-5 text-sm text-white/50 max-w-sm leading-relaxed">
              Automação contábil com IA para escritórios brasileiros. Um
              produto{" "}
              <a
                href="https://gasplab.com.br"
                className="text-white/70 hover:text-white underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                GaspLab
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Ofertas</h3>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li>
                <a
                  href="#ofertas"
                  className="hover:text-white transition-colors"
                >
                  Sprint Express 48h
                </a>
              </li>
              <li>
                <a
                  href="#ofertas"
                  className="hover:text-white transition-colors"
                >
                  Diagnóstico Completo
                </a>
              </li>
              <li>
                <a
                  href="#ofertas"
                  className="hover:text-white transition-colors"
                >
                  Contaflow Essencial
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contato</h3>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li>
                <a
                  href="https://wa.me/5511951276991"
                  className="hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:vinicius@gasplab.com"
                  className="hover:text-white transition-colors"
                >
                  vinicius@gasplab.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/gasplab/"
                  className="hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row md:justify-between gap-3 text-xs text-white/35 font-mono">
          <p>© 2026 Contaflow · Built by GaspLab · Rio de Janeiro</p>
          <p>
            LGPD · Métricas de pilotos internos · Asaas sandbox
          </p>
        </div>
      </div>
    </footer>
  );
}
