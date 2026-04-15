"use client";

import { useEffect, useState } from "react";
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
  { href: "#produto", label: "Produto" },
  { href: "#ofertas", label: "Preços" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

const sprintLink = "https://sandbox.asaas.com/c/aht15kd7eyewvenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#050B15]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
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
            className="rounded-full bg-white hover:bg-white/90 text-[#050B15] font-semibold px-4"
          >
            <a href={sprintLink} target="_blank" rel="noopener noreferrer">
              Sprint 48h · R$ 997
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
            className="bg-[#050B15] border-white/10 w-[80vw] sm:w-[360px] flex flex-col gap-0 p-0"
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
                  className="block w-full text-center bg-white hover:bg-white/90 text-[#050B15] font-semibold py-3 rounded-full"
                >
                  Sprint Express 48h — R$ 997
                </a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
