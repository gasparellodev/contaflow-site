import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

const screens = [
  {
    slug: "01-inbox",
    title: "Inbox de pendências",
    desc: "Sua fila do dia — todas as aprovações, lembretes e mensagens de clientes numa única lista por prazo fiscal. Fim de mês vira rotina, não corrida.",
  },
  {
    slug: "02-clientes",
    title: "Lista de clientes",
    desc: "Todos os seus clientes com status real: regime tributário, pendências, próximo prazo, último contato. Busca e filtros por segundo.",
  },
  {
    slug: "03-cliente-detail",
    title: "Visão 360 do cliente",
    desc: "Tudo de um cliente numa tela: documentos, conversas WhatsApp, lembretes, histórico. Reunião de fechamento em 2 minutos.",
  },
  {
    slug: "04-documentos",
    title: "Inbox de documentos com IA",
    desc: "Upload de XML, PDF de boleto ou extrato bancário. A IA sugere a categorização contábil. Você revisa em 30 segundos, não 3 minutos por nota.",
  },
  {
    slug: "05-conversas",
    title: "Conversas WhatsApp",
    desc: "O canal principal do contador BR, agora organizado: todas as conversas com contexto do cliente, chatbot IA respondendo as repetitivas.",
  },
  {
    slug: "06-calendario",
    title: "Calendário fiscal",
    desc: "Matriz obrigação × cliente. DAS, DCTF, SPED, DEFIS. Dispare lembretes WhatsApp em massa sem planilha no meio.",
  },
  {
    slug: "07-chatbot",
    title: "Chatbot treinável",
    desc: "Knowledge base para seu escritório: FAQ contábil, playground de teste antes de ativar. White-label para seus clientes.",
  },
  {
    slug: "08-dashboard",
    title: "Dashboard do escritório",
    desc: "KPIs que importam: MRR dos clientes, documentos processados, horas economizadas pela IA. Prova concreta de valor.",
  },
  {
    slug: "09-auditoria",
    title: "Trilha de auditoria",
    desc: "Append-only, imutável, exportável em formato CRC. Quem fez o quê, quando e a partir de qual IP. Compliance sem dor.",
  },
  {
    slug: "10-settings",
    title: "Configurações",
    desc: "Conta, sócios, usuários e integrações com Domínio, Focus NFe, Omie, SERPRO. Faturamento Asaas recorrente.",
  },
];

export const metadata = {
  title: "Contaflow — 10 telas do sistema",
  description:
    "Galeria completa das 10 telas do Contaflow: Inbox, Clientes, Documentos com IA, Conversas WhatsApp, Calendário fiscal, Chatbot, Dashboard, Auditoria e mais.",
};

export default function ProdutoPage() {
  return (
    <div className="min-h-screen bg-[#0A1520]">
      <Header />
      <main>
        <section className="py-20 md:py-28 bg-[#0A1520]">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-[#4ECDC4] uppercase mb-5">
                Galeria do produto
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                As 10 telas do Contaflow
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
                Cada tela foi desenhada para um momento real do seu escritório.
                Densidade de dados como você precisa, com IA fazendo o trabalho
                operacional invisível.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FFB627] hover:bg-[#ffc43d] text-[#0A1520] font-semibold"
                >
                  <Link
                    href="https://sandbox.asaas.com/c/aht15kd7eyewvenu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sprint Express 48h — R$ 997
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white"
                >
                  <Link href="/#video-demo">Assistir demo 45s</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-6 max-w-6xl space-y-16">
            {screens.map((s, i) => (
              <article
                key={s.slug}
                id={s.slug}
                className="grid lg:grid-cols-5 gap-8 items-start scroll-mt-20"
              >
                <div className="lg:col-span-2">
                  <span className="inline-block text-[11px] font-bold tracking-[0.15em] text-[#4ECDC4] uppercase mb-3">
                    Tela {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                    {s.title}
                  </h2>
                  <p className="text-white/60 leading-relaxed">{s.desc}</p>
                </div>
                <div className="lg:col-span-3 bg-[#0F1B2A] border border-white/5 rounded-xl overflow-hidden shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/screens/${s.slug}.png`}
                    alt={s.title}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-24 bg-[#0F1B2A] border-t border-white/5">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Pronto para ver funcionando no seu escritório?
            </h2>
            <p className="mt-5 text-lg text-white/65 leading-relaxed">
              48h para diagnóstico com 3 quick-wins implementados em um cliente
              seu. R$ 997 à vista. 7 dias para reembolso se não fizer sentido.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#FFB627] hover:bg-[#ffc43d] text-[#0A1520] font-semibold"
              >
                <Link
                  href="https://sandbox.asaas.com/c/aht15kd7eyewvenu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Começar Sprint Express
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white"
              >
                <Link
                  href="https://wa.me/5511951276991?text=Quero%20agendar%20demo%20Contaflow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar demo
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
