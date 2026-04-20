import { Button } from "@/components/ui/button";

export function Header() {
  const sprintLink = "https://sandbox.asaas.com/c/aht15kd7eyewvenu";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0A1520]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0A1520]/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <a href="/" className="flex items-center" aria-label="Contaflow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/contaflow-logo.png"
            alt="Contaflow"
            className="h-7 w-auto"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a
            href="#dores"
            className="text-white/70 hover:text-white transition-colors"
          >
            Por que
          </a>
          <a
            href="#ofertas"
            className="text-white/70 hover:text-white transition-colors"
          >
            Ofertas
          </a>
          <a
            href="#contato"
            className="text-white/70 hover:text-white transition-colors"
          >
            Contato
          </a>
        </nav>

        <Button
          asChild
          size="sm"
          className="bg-[#FFB627] hover:bg-[#ffc43d] text-[#0A1520] font-semibold"
        >
          <a href={sprintLink} target="_blank" rel="noopener noreferrer">
            Sprint R$ 997
          </a>
        </Button>
      </div>
    </header>
  );
}
