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
  metadataBase: new URL("https://contaflow.gasplab.com.br"),
  title: "Contaflow — Automação contábil com IA",
  description:
    "Categorização automática de NFs, lembretes fiscais por cliente via WhatsApp e chatbot para seu escritório contábil. Implantação em 48h. Dados em conformidade com a LGPD.",
  openGraph: {
    title: "Contaflow — Automação contábil com IA",
    description:
      "Devolva 5–10h por semana ao seu escritório. Implantação em 48h, sem dependência.",
    images: ["/contaflow-og.jpeg"],
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/favicon-contaflow.png",
  },
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
