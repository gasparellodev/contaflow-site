import type React from "react";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { Grain } from "@/components/ui/grain";
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata = {
  metadataBase: new URL("https://contaflow.gasplab.com.br"),
  title: "Contaflow | Automação Contábil com IA e WhatsApp",
  description:
    "Software contábil com IA: categoriza NFs, envia lembretes fiscais no WhatsApp e responde clientes. Diagnóstico em 48h. Agende demo gratuita.",
  keywords: [
    "automação contábil",
    "IA para contador",
    "software contábil com IA",
    "chatbot contabilidade",
    "categorização NFe automática",
    "calendário fiscal WhatsApp",
    "alternativa Domínio Sistemas",
  ],
  alternates: {
    canonical: "https://contaflow.gasplab.com.br",
  },
  openGraph: {
    title: "Contaflow — Automação Contábil com IA",
    description:
      "Categorização automática de NFs, lembretes fiscais no WhatsApp e chatbot para escritórios contábeis brasileiros.",
    url: "https://contaflow.gasplab.com.br",
    siteName: "Contaflow",
    images: [
      {
        url: "/contaflow-og.jpeg",
        width: 1200,
        height: 630,
        alt: "Contaflow — dashboard de automação contábil com IA",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contaflow — Automação Contábil com IA",
    description: "Diagnóstico em 48h. 3 ofertas a partir de R$ 997.",
    images: ["/contaflow-og.jpeg"],
  },
  icons: {
    icon: "/favicon-contaflow.png",
    apple: "/favicon-contaflow.png",
  },
  authors: [{ name: "GaspLab", url: "https://gasplab.com.br" }],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://contaflow.gasplab.com.br/#org",
      name: "Contaflow",
      url: "https://contaflow.gasplab.com.br",
      logo: "https://contaflow.gasplab.com.br/contaflow-logo.png",
      parentOrganization: {
        "@type": "Organization",
        name: "GaspLab",
        url: "https://gasplab.com.br",
      },
      sameAs: ["https://gasplab.com.br"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+55-11-95127-6991",
          contactType: "sales",
          areaServed: "BR",
          availableLanguage: "Portuguese",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://contaflow.gasplab.com.br/#app",
      name: "Contaflow",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Plataforma SaaS de automação contábil com IA para escritórios brasileiros. Categoriza NFs, envia lembretes fiscais via WhatsApp e responde dúvidas com chatbot.",
      url: "https://contaflow.gasplab.com.br",
      offers: [
        {
          "@type": "Offer",
          name: "Diagnóstico Express 48h",
          price: "997",
          priceCurrency: "BRL",
          url: "https://sandbox.asaas.com/c/aht15kd7eyewvenu",
        },
        {
          "@type": "Offer",
          name: "Diagnóstico Completo",
          price: "1497",
          priceCurrency: "BRL",
          url: "https://sandbox.asaas.com/c/qlzccj7ltm7m2lgl",
        },
        {
          "@type": "Offer",
          name: "Contaflow Essencial (mensal)",
          price: "697",
          priceCurrency: "BRL",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "697",
            priceCurrency: "BRL",
            billingIncrement: "P1M",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LenisProvider />
          <Grain />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
