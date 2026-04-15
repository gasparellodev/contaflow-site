import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Contaflow — Automação Contábil com IA | GaspLab",
  description:
    "Automação contábil com IA para escritórios brasileiros. Categorização automática de NFs, lembretes fiscais via WhatsApp e chatbot. Implementação em 48h.",
  openGraph: {
    title: "Contaflow — Automação Contábil com IA",
    description:
      "Implementação em 48h. Reduza horas de lançamentos com IA que respeita a LGPD.",
    images: ["/contaflow-og.jpeg"],
  },
  generator: "GaspLab",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
