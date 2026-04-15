"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

const NAV = [
  { href: "#dores", label: "Por que" },
  { href: "#produto", label: "Sistema" },
  { href: "#faq", label: "FAQ" },
  { href: "#ofertas", label: "Ofertas" },
  { href: "#contato", label: "Contato" },
];

const sprintLink = "https://sandbox.asaas.com/c/aht15kd7eyewvenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0A1520]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0A1520]/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <a href="/" className="flex items-center" aria-label="Contaflow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/contaflow-logo.png"
            alt="Contaflow"
            className="h-7 w-auto"
            width={196}
            height={28}
          />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-white/70 hover:text-white transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            className="bg-[#FFB627] hover:bg-[#ffc43d] text-[#0A1520] font-semibold"
          >
            <a href={sprintLink} target="_blank" rel="noopener noreferrer">
              Diagnóstico R$ 997
            </a>
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="md:hidden p-2 -mr-2 text-white/80 hover:text-white transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#0A1520] border-white/10 w-[80vw] sm:w-[360px] flex flex-col gap-0 p-0"
          >
            <SheetTitle className="sr-only">Menu Contaflow</SheetTitle>
            <div className="p-6 border-b border-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/contaflow-logo.png"
                alt="Contaflow"
                className="h-7 w-auto"
                width={196}
                height={28}
              />
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {NAV.map((n) => (
                <SheetClose asChild key={n.href}>
                  <a
                    href={n.href}
                    className="px-3 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-md text-base"
                  >
                    {n.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto p-6 border-t border-white/5">
              <SheetClose asChild>
                <a
                  href={sprintLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#FFB627] hover:bg-[#ffc43d] text-[#0A1520] font-semibold py-3 rounded-md"
                >
                  Diagnóstico Express 48h — R$ 997
                </a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
