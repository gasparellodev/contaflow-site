// Gera 10 telas HTML + renderiza para PNG 1440x900 via Playwright.
// Dados brasileiros realistas (CNPJs válidos, empresas fictícias SP/RJ/MG).
//
// Uso: node scripts/gen-screens.mjs
// Saida: public/screens/<slug>.png + public/screens/<slug>.html

import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "public", "screens");
await fs.mkdir(OUT, { recursive: true });

// Paleta Contaflow
const TOK = {
  bg: "#0A1520",
  surface: "#0F1B2A",
  surface2: "#162234",
  border: "rgba(255,255,255,0.08)",
  borderSoft: "rgba(255,255,255,0.04)",
  teal: "#4ECDC4",
  amber: "#FFB627",
  red: "#EF4444",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  textDim: "#64748B",
};

// Shell base com sidebar + topbar consistente
const shell = ({ title, active, content }) => `<!DOCTYPE html><html lang="pt-BR"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} — Contaflow</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',sans-serif;font-variant-numeric:tabular-nums}
html,body{background:${TOK.bg};color:${TOK.text};height:100vh;overflow:hidden}
.app{display:grid;grid-template-columns:240px 1fr;height:100vh}
aside{background:${TOK.surface};border-right:1px solid ${TOK.border};padding:20px 12px;display:flex;flex-direction:column;gap:4px}
.logo{display:flex;align-items:center;gap:8px;padding:4px 8px 16px;border-bottom:1px solid ${TOK.border};margin-bottom:12px}
.logo .g{width:28px;height:28px;background:${TOK.teal};border-radius:6px;display:grid;place-items:center;color:${TOK.bg};font-weight:800;font-size:18px}
.logo .wm{font-weight:700;font-size:15px;letter-spacing:-0.01em}
.logo .wm span{color:${TOK.teal}}
nav{display:flex;flex-direction:column;gap:2px}
nav a{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:6px;color:${TOK.textMuted};text-decoration:none;font-size:13px;font-weight:500}
nav a.active{background:${TOK.teal}15;color:${TOK.teal}}
nav a:hover:not(.active){background:${TOK.surface2};color:${TOK.text}}
nav .ico{width:16px;height:16px;flex-shrink:0}
.sidefoot{margin-top:auto;padding-top:12px;border-top:1px solid ${TOK.border};font-size:12px;color:${TOK.textDim}}
main{overflow:hidden;display:flex;flex-direction:column}
.topbar{padding:16px 32px;border-bottom:1px solid ${TOK.border};display:flex;align-items:center;justify-content:space-between;background:${TOK.bg}}
.topbar h1{font-size:18px;font-weight:600;letter-spacing:-0.01em}
.topbar .actions{display:flex;gap:8px}
.btn{padding:7px 12px;border-radius:6px;font-size:13px;font-weight:500;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
.btn-primary{background:${TOK.amber};color:${TOK.bg};font-weight:600}
.btn-secondary{background:${TOK.surface2};color:${TOK.text};border:1px solid ${TOK.border}}
.btn-teal{background:${TOK.teal};color:${TOK.bg};font-weight:600}
.content{padding:24px 32px;overflow:auto;flex:1}
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.kpi{background:${TOK.surface};border:1px solid ${TOK.border};border-radius:10px;padding:16px}
.kpi .lb{font-size:11px;font-weight:600;color:${TOK.textMuted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px}
.kpi .vl{font-size:26px;font-weight:700;letter-spacing:-0.02em}
.kpi .dt{font-size:12px;color:${TOK.teal};margin-top:4px}
.kpi .dt.neg{color:${TOK.red}}
.card{background:${TOK.surface};border:1px solid ${TOK.border};border-radius:10px;overflow:hidden}
.card-hd{padding:14px 18px;border-bottom:1px solid ${TOK.border};display:flex;justify-content:space-between;align-items:center}
.card-hd h3{font-size:14px;font-weight:600}
.card-hd .hint{font-size:12px;color:${TOK.textMuted}}
table{width:100%;border-collapse:collapse}
th{text-align:left;padding:12px 18px;font-size:11px;font-weight:600;color:${TOK.textMuted};text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid ${TOK.border};background:${TOK.surface}}
td{padding:14px 18px;font-size:13px;border-bottom:1px solid ${TOK.borderSoft};color:${TOK.text}}
td.num{text-align:right;font-variant-numeric:tabular-nums}
td.muted{color:${TOK.textMuted}}
tr:hover td{background:${TOK.surface2}}
.badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600}
.badge-ok{background:${TOK.teal}20;color:${TOK.teal}}
.badge-warn{background:${TOK.amber}20;color:${TOK.amber}}
.badge-red{background:${TOK.red}20;color:${TOK.red}}
.badge-n{background:${TOK.surface2};color:${TOK.textMuted}}
.pill{padding:2px 10px;border-radius:999px;font-size:11px;font-weight:600;background:${TOK.surface2};color:${TOK.textMuted}}
.grid2{display:grid;grid-template-columns:2fr 1fr;gap:16px}
.empty{padding:40px;text-align:center;color:${TOK.textMuted}}
.flex{display:flex}
.gap4{gap:4px}.gap8{gap:8px}.gap12{gap:12px}.gap16{gap:16px}
.mono{font-family:'Geist Mono',monospace;font-size:12px}
.avatar{width:28px;height:28px;border-radius:50%;background:${TOK.teal}40;color:${TOK.teal};display:grid;place-items:center;font-size:11px;font-weight:600}
</style></head><body><div class="app">
<aside>
  <div class="logo"><div class="g">G</div><div class="wm">Conta<span>flow</span></div></div>
  <nav>
    <a href="#" class="${active==='inbox'?'active':''}"><span class="ico">📥</span> Inbox</a>
    <a href="#" class="${active==='clientes'?'active':''}"><span class="ico">👥</span> Clientes</a>
    <a href="#" class="${active==='docs'?'active':''}"><span class="ico">📄</span> Documentos</a>
    <a href="#" class="${active==='conversas'?'active':''}"><span class="ico">💬</span> Conversas</a>
    <a href="#" class="${active==='calendario'?'active':''}"><span class="ico">📅</span> Calendário Fiscal</a>
    <a href="#" class="${active==='chatbot'?'active':''}"><span class="ico">🤖</span> Chatbot</a>
    <a href="#" class="${active==='dashboard'?'active':''}"><span class="ico">📊</span> Dashboard</a>
    <a href="#" class="${active==='auditoria'?'active':''}"><span class="ico">🛡️</span> Auditoria</a>
    <a href="#" class="${active==='settings'?'active':''}"><span class="ico">⚙️</span> Configurações</a>
  </nav>
  <div class="sidefoot"><div style="display:flex;align-items:center;gap:8px"><div class="avatar">VG</div><div><div style="color:${TOK.text};font-weight:500;font-size:12px">Vinicius G.</div><div style="font-size:11px">Silva & Associados</div></div></div></div>
</aside>
<main>${content}</main>
</div></body></html>`;

const screens = [
  {
    slug: "01-inbox",
    title: "Inbox — Pendências",
    active: "inbox",
    blurb: "Sua fila do dia — pendências por cliente em prazo fiscal.",
    content: `
<div class="topbar"><h1>Inbox</h1>
  <div class="actions">
    <button class="btn btn-secondary">Filtrar</button>
    <button class="btn btn-primary">Aprovar selecionados (3)</button>
  </div>
</div>
<div class="content">
<div class="flex gap8" style="margin-bottom:16px">
  <span class="pill" style="background:${TOK.teal}20;color:${TOK.teal}">Todas (18)</span>
  <span class="pill">Urgentes (4)</span>
  <span class="pill">Hoje (7)</span>
  <span class="pill">Esta semana (11)</span>
  <span class="pill">Aprovadas (234)</span>
</div>
<div class="card">
<table>
<thead><tr><th style="width:32px"><input type="checkbox"></th><th>Cliente</th><th>Tipo</th><th>Resumo</th><th>Prazo</th><th>Ação</th></tr></thead>
<tbody>
<tr><td><input type="checkbox" checked></td><td><div style="font-weight:600">Mercado Vila Verde ME</div><div class="muted" style="font-size:11px">15.234.567/0001-82</div></td><td><span class="badge badge-warn">NF Entrada</span></td><td>Categorizar NFe #00042 — Fornecedor Alpha Distribuidora</td><td>Hoje 18h</td><td><button class="btn btn-teal">Revisar</button></td></tr>
<tr><td><input type="checkbox" checked></td><td><div style="font-weight:600">Padaria do Zé Ltda</div><div class="muted" style="font-size:11px">28.456.789/0001-51</div></td><td><span class="badge badge-red">DAS</span></td><td>DAS competência 03/2026 vence em 3 dias</td><td>20/04 20h</td><td><button class="btn btn-teal">Enviar</button></td></tr>
<tr><td><input type="checkbox" checked></td><td><div style="font-weight:600">Tech4Good Consultoria</div><div class="muted" style="font-size:11px">41.892.103/0001-70</div></td><td><span class="badge badge-warn">Extrato</span></td><td>Extrato bancário Itaú — 34 lançamentos aguardando</td><td>Hoje 17h</td><td><button class="btn btn-teal">Revisar</button></td></tr>
<tr><td><input type="checkbox"></td><td><div style="font-weight:600">Dra. Mariana Oliveira</div><div class="muted" style="font-size:11px">15.678.432/0001-05</div></td><td><span class="badge badge-ok">WhatsApp</span></td><td>Cliente perguntou: "preciso emitir nota de serviço hoje?"</td><td>Amanhã 09h</td><td><button class="btn btn-teal">Responder</button></td></tr>
<tr><td><input type="checkbox"></td><td><div style="font-weight:600">Café da Praça SP Ltda</div><div class="muted" style="font-size:11px">52.014.981/0001-34</div></td><td><span class="badge badge-warn">DCTF</span></td><td>DCTF mensal fev/2026 — documentos prontos</td><td>22/04</td><td><button class="btn btn-secondary">Agendar</button></td></tr>
<tr><td><input type="checkbox"></td><td><div style="font-weight:600">Estúdio Moldura & Arte</div><div class="muted" style="font-size:11px">09.113.562/0001-22</div></td><td><span class="badge badge-n">NF Serviço</span></td><td>NFSe emitida — classificar em Receita Bruta</td><td>23/04</td><td><button class="btn btn-teal">Revisar</button></td></tr>
<tr><td><input type="checkbox"></td><td><div style="font-weight:600">Oficina Pedro Motos</div><div class="muted" style="font-size:11px">72.341.092/0001-18</div></td><td><span class="badge badge-warn">Boleto</span></td><td>Boleto Sicredi R$ 12.480,00 — extrair dados</td><td>24/04</td><td><button class="btn btn-teal">Revisar</button></td></tr>
</tbody>
</table>
</div>
<div style="margin-top:16px;color:${TOK.textMuted};font-size:12px">Atualizado em 15/04/2026 · 14:23 · IA processou 127 documentos nas últimas 24h</div>
</div>
`,
  },
  {
    slug: "02-clientes",
    title: "Clientes",
    active: "clientes",
    blurb: "Seus clientes com status de pendências, regime e próximo prazo.",
    content: `
<div class="topbar"><h1>Clientes</h1>
<div class="actions"><button class="btn btn-secondary">Importar CSV</button><button class="btn btn-primary">+ Adicionar cliente</button></div>
</div>
<div class="content">
<div class="flex gap8" style="margin-bottom:16px">
  <input style="flex:1;max-width:320px;padding:8px 12px;border-radius:6px;background:${TOK.surface};border:1px solid ${TOK.border};color:${TOK.text};font-size:13px" placeholder="Buscar por nome, CNPJ ou pendência…">
  <button class="btn btn-secondary">Regime tributário ▾</button>
  <button class="btn btn-secondary">Status ▾</button>
</div>
<div class="card">
<table>
<thead><tr><th>Cliente</th><th>CNPJ</th><th>Regime</th><th>Pendências</th><th>Próximo prazo</th><th>Último contato</th><th>Status</th></tr></thead>
<tbody>
<tr><td><div style="font-weight:600">Mercado Vila Verde ME</div></td><td class="mono">15.234.567/0001-82</td><td>Simples</td><td class="num"><span class="badge badge-red">4</span></td><td>DAS 20/04</td><td class="muted">Hoje 11:02</td><td><span class="badge badge-ok">Ativo</span></td></tr>
<tr><td><div style="font-weight:600">Padaria do Zé Ltda</div></td><td class="mono">28.456.789/0001-51</td><td>Lucro Presumido</td><td class="num"><span class="badge badge-warn">2</span></td><td>DCTF 22/04</td><td class="muted">Ontem 16:30</td><td><span class="badge badge-ok">Ativo</span></td></tr>
<tr><td><div style="font-weight:600">Tech4Good Consultoria</div></td><td class="mono">41.892.103/0001-70</td><td>Lucro Real</td><td class="num"><span class="badge badge-warn">3</span></td><td>SPED 30/04</td><td class="muted">3 dias atrás</td><td><span class="badge badge-ok">Ativo</span></td></tr>
<tr><td><div style="font-weight:600">Dra. Mariana Oliveira</div></td><td class="mono">15.678.432/0001-05</td><td>Simples</td><td class="num"><span class="badge badge-n">0</span></td><td>DAS 20/04</td><td class="muted">5 dias atrás</td><td><span class="badge badge-ok">Ativo</span></td></tr>
<tr><td><div style="font-weight:600">Café da Praça SP Ltda</div></td><td class="mono">52.014.981/0001-34</td><td>Simples</td><td class="num"><span class="badge badge-warn">1</span></td><td>DCTF 22/04</td><td class="muted">6 dias atrás</td><td><span class="badge badge-ok">Ativo</span></td></tr>
<tr><td><div style="font-weight:600">Estúdio Moldura & Arte</div></td><td class="mono">09.113.562/0001-22</td><td>MEI</td><td class="num"><span class="badge badge-n">0</span></td><td>DAS MEI 20/04</td><td class="muted">2 semanas</td><td><span class="badge badge-ok">Ativo</span></td></tr>
<tr><td><div style="font-weight:600">Oficina Pedro Motos</div></td><td class="mono">72.341.092/0001-18</td><td>Simples</td><td class="num"><span class="badge badge-warn">1</span></td><td>DAS 20/04</td><td class="muted">1 semana</td><td><span class="badge badge-ok">Ativo</span></td></tr>
<tr><td><div style="font-weight:600">Clínica Viva Saúde</div></td><td class="mono">37.829.501/0001-96</td><td>Lucro Presumido</td><td class="num"><span class="badge badge-n">0</span></td><td>DCTF 22/04</td><td class="muted">Hoje 08:15</td><td><span class="badge badge-ok">Ativo</span></td></tr>
<tr><td><div style="font-weight:600">João Paulo Soares ME</div></td><td class="mono">18.290.374/0001-48</td><td>Simples</td><td class="num"><span class="badge badge-n">0</span></td><td>DAS 20/04</td><td class="muted">3 dias atrás</td><td><span class="badge badge-n">Pausado</span></td></tr>
</tbody>
</table>
</div>
<div style="margin-top:16px;color:${TOK.textMuted};font-size:12px;display:flex;justify-content:space-between"><span>Mostrando 9 de 32 clientes</span><span>Página 1 de 4 · Anterior · Próximo</span></div>
</div>
`,
  },
  {
    slug: "03-cliente-detail",
    title: "Mercado Vila Verde ME",
    active: "clientes",
    blurb: "Visão 360 do cliente — documentos, conversas, lembretes, histórico.",
    content: `
<div class="topbar">
  <div><div style="font-size:12px;color:${TOK.textMuted}">Clientes / Mercado Vila Verde ME</div><h1>Mercado Vila Verde ME <span style="font-size:13px;color:${TOK.textMuted};font-weight:400">· 15.234.567/0001-82 · Simples Nacional</span></h1></div>
  <div class="actions"><button class="btn btn-secondary">Editar</button><button class="btn btn-primary">+ Novo lançamento</button></div>
</div>
<div class="content">
<div class="flex gap8" style="margin-bottom:20px;border-bottom:1px solid ${TOK.border};padding-bottom:0">
  <a style="padding:8px 14px;border-bottom:2px solid ${TOK.teal};color:${TOK.teal};font-weight:600;font-size:13px">Visão geral</a>
  <a style="padding:8px 14px;color:${TOK.textMuted};font-size:13px">Documentos (127)</a>
  <a style="padding:8px 14px;color:${TOK.textMuted};font-size:13px">Conversas (89)</a>
  <a style="padding:8px 14px;color:${TOK.textMuted};font-size:13px">Lembretes (12)</a>
  <a style="padding:8px 14px;color:${TOK.textMuted};font-size:13px">Histórico</a>
</div>
<div class="grid2">
<div>
<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
<div class="kpi"><div class="lb">Faturamento Mar/2026</div><div class="vl">R$ 142.380,50</div><div class="dt">+12,3%</div></div>
<div class="kpi"><div class="lb">NFs no mês</div><div class="vl">87</div><div class="dt">45 entrada · 42 saída</div></div>
<div class="kpi"><div class="lb">Pendências</div><div class="vl" style="color:${TOK.amber}">4</div><div class="dt neg">DAS vence em 3d</div></div>
</div>
<div class="card">
<div class="card-hd"><h3>Últimas conversas WhatsApp</h3><span class="hint">Ver todas</span></div>
<div style="padding:4px 0">
<div style="padding:14px 18px;border-bottom:1px solid ${TOK.borderSoft};display:flex;gap:12px"><div class="avatar" style="background:${TOK.amber}30;color:${TOK.amber}">MV</div><div style="flex:1"><div style="font-size:13px;font-weight:600">Maria — gerente Vila Verde</div><div style="font-size:13px;color:${TOK.textMuted};margin-top:2px">Enviei as notas da semana, qualquer coisa me avisa.</div><div style="font-size:11px;color:${TOK.textDim};margin-top:4px">Hoje, 11:02 · Respondida pelo chatbot</div></div></div>
<div style="padding:14px 18px;border-bottom:1px solid ${TOK.borderSoft};display:flex;gap:12px"><div class="avatar" style="background:${TOK.amber}30;color:${TOK.amber}">MV</div><div style="flex:1"><div style="font-size:13px;font-weight:600">Maria — gerente Vila Verde</div><div style="font-size:13px;color:${TOK.textMuted};margin-top:2px">Oi Vinicius, o DAS desse mês já saiu? O dono tá me perguntando.</div><div style="font-size:11px;color:${TOK.textDim};margin-top:4px">Ontem 16:47 · Escalada para humano</div></div></div>
</div>
</div>
</div>
<div>
<div class="card" style="margin-bottom:16px">
<div class="card-hd"><h3>Próximas obrigações</h3></div>
<div style="padding:4px 18px">
<div style="padding:12px 0;border-bottom:1px solid ${TOK.borderSoft}"><div style="font-size:13px;font-weight:600">DAS Simples · comp. 03/2026</div><div style="font-size:12px;color:${TOK.amber};margin-top:2px">Vence 20/04 · R$ 4.284,27</div></div>
<div style="padding:12px 0;border-bottom:1px solid ${TOK.borderSoft}"><div style="font-size:13px;font-weight:600">DEFIS 2025</div><div style="font-size:12px;color:${TOK.textMuted};margin-top:2px">Vence 31/05</div></div>
<div style="padding:12px 0"><div style="font-size:13px;font-weight:600">SPED Contribuições</div><div style="font-size:12px;color:${TOK.textMuted};margin-top:2px">Vence 30/04</div></div>
</div>
</div>
<div class="card">
<div class="card-hd"><h3>Dados cadastrais</h3></div>
<div style="padding:14px 18px;font-size:13px;line-height:1.8">
<div><span style="color:${TOK.textMuted}">Razão social:</span> Mercado Vila Verde ME</div>
<div><span style="color:${TOK.textMuted}">CNPJ:</span> 15.234.567/0001-82</div>
<div><span style="color:${TOK.textMuted}">Endereço:</span> Rua das Acácias, 450 · Vila Madalena · SP</div>
<div><span style="color:${TOK.textMuted}">Contato:</span> (11) 99876-5432 · dono@vilaverde.com.br</div>
</div>
</div>
</div>
</div>
</div>
`,
  },
  {
    slug: "04-documentos",
    title: "Documentos — Inbox de NFs",
    active: "docs",
    blurb: "Upload de XML/PDF. IA categoriza. Você revisa em 30s.",
    content: `
<div class="topbar"><h1>Documentos</h1><div class="actions"><button class="btn btn-secondary">Upload em lote</button><button class="btn btn-primary">+ Novo documento</button></div></div>
<div class="content">
<div class="flex gap8" style="margin-bottom:16px">
  <span class="pill" style="background:${TOK.teal}20;color:${TOK.teal}">Aguardando revisão (12)</span>
  <span class="pill">Aprovados (1.247)</span>
  <span class="pill">Rejeitados (3)</span>
</div>
<div class="card">
<table>
<thead><tr><th>Cliente</th><th>Documento</th><th>Emitente</th><th>Valor</th><th>Sugestão IA</th><th>Confiança</th><th>Ação</th></tr></thead>
<tbody>
<tr><td><div style="font-weight:600">Mercado Vila Verde ME</div><div class="muted" style="font-size:11px">15.234.567/0001-82</div></td><td>NFe #00042</td><td>Alpha Distribuidora SA</td><td class="num">R$ 8.420,00</td><td><span style="color:${TOK.teal}">Custo de mercadoria vendida</span></td><td><span class="badge badge-ok">96%</span></td><td><button class="btn btn-teal">Aprovar</button></td></tr>
<tr><td><div style="font-weight:600">Padaria do Zé Ltda</div></td><td>NFe #04712</td><td>Moinho Primavera</td><td class="num">R$ 2.150,80</td><td><span style="color:${TOK.teal}">Matéria-prima</span></td><td><span class="badge badge-ok">94%</span></td><td><button class="btn btn-teal">Aprovar</button></td></tr>
<tr><td><div style="font-weight:600">Tech4Good Consultoria</div></td><td>NFSe #00134</td><td>Tech4Good (emissão)</td><td class="num">R$ 18.500,00</td><td><span style="color:${TOK.teal}">Receita de serviços prestados</span></td><td><span class="badge badge-ok">99%</span></td><td><button class="btn btn-teal">Aprovar</button></td></tr>
<tr><td><div style="font-weight:600">Oficina Pedro Motos</div></td><td>Boleto PDF</td><td>Sicredi</td><td class="num">R$ 12.480,00</td><td><span style="color:${TOK.amber}">Financiamento — pagar parcela</span></td><td><span class="badge badge-warn">78%</span></td><td><button class="btn btn-teal">Revisar</button></td></tr>
<tr><td><div style="font-weight:600">Café da Praça SP Ltda</div></td><td>Extrato Itaú</td><td>Itaú Unibanco</td><td class="num">34 lçtos</td><td><span style="color:${TOK.teal}">Reconciliação automática</span></td><td><span class="badge badge-ok">91%</span></td><td><button class="btn btn-teal">Revisar lote</button></td></tr>
<tr><td><div style="font-weight:600">Dra. Mariana Oliveira</div></td><td>NFSe #00018</td><td>Dra. Mariana (emissão)</td><td class="num">R$ 450,00</td><td><span style="color:${TOK.teal}">Consulta — receita</span></td><td><span class="badge badge-ok">98%</span></td><td><button class="btn btn-teal">Aprovar</button></td></tr>
<tr><td><div style="font-weight:600">Estúdio Moldura & Arte</div></td><td>NFe #00089</td><td>Molduras Premium</td><td class="num">R$ 1.890,00</td><td><span style="color:${TOK.amber}">Imobilizado? Verificar</span></td><td><span class="badge badge-warn">62%</span></td><td><button class="btn btn-teal">Revisar</button></td></tr>
</tbody>
</table>
</div>
<div style="margin-top:16px;padding:12px 16px;background:${TOK.surface};border:1px solid ${TOK.border};border-radius:8px;display:flex;align-items:center;gap:10px">
<span style="color:${TOK.teal};font-size:18px">✨</span>
<div style="font-size:12px;color:${TOK.textMuted}"><strong style="color:${TOK.text}">Contaflow IA</strong> categorizou 127 documentos nas últimas 24h · Precisão média 94% · <span style="color:${TOK.teal}">6h42min economizadas</span></div>
</div>
</div>
`,
  },
  {
    slug: "05-conversas",
    title: "Conversas WhatsApp",
    active: "conversas",
    blurb: "Todas as conversas dos clientes em um canal só — com chatbot IA.",
    content: `
<div class="topbar"><h1>Conversas</h1><div class="actions"><button class="btn btn-secondary">Filtrar por cliente</button><button class="btn btn-primary">Nova conversa</button></div></div>
<div class="content" style="padding:0;display:grid;grid-template-columns:320px 1fr;height:100%">
<div style="border-right:1px solid ${TOK.border};overflow:auto">
<div style="padding:12px 16px;border-bottom:1px solid ${TOK.border}"><input style="width:100%;padding:8px 10px;border-radius:6px;background:${TOK.surface};border:1px solid ${TOK.border};color:${TOK.text};font-size:13px" placeholder="Buscar conversa…"></div>
${[
  ['Maria — Vila Verde','Enviei as notas da semana, qualquer coisa…','11:02','0',true],
  ['Dono — Zé (Padaria)','O DAS desse mês já saiu?','Ontem','2',false],
  ['Ricardo — Tech4Good','Preciso da DRE de março','Ontem','1',false],
  ['Dra. Mariana','preciso emitir nota de serviço hoje?','5 dias','0',false],
  ['Pedro — Oficina','Esse boleto é do leasing','1 semana','0',false],
  ['Ana — Café da Praça','Obrigada pelo lembrete!','1 semana','0',false],
  ['João Paulo','CPF do sócio é…','2 semanas','0',false],
  ['Estúdio Moldura','Vou mandar NF agora','2 semanas','0',false],
].map(([n,m,t,u,act])=>`
<div style="padding:14px 16px;border-bottom:1px solid ${TOK.borderSoft};cursor:pointer${act?`;background:${TOK.surface2}`:''}">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
<span style="font-size:13px;font-weight:600">${n}</span>
<span style="font-size:11px;color:${TOK.textDim}">${t}</span>
</div>
<div style="display:flex;justify-content:space-between;align-items:center">
<span style="font-size:12px;color:${TOK.textMuted};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:220px">${m}</span>
${u!=='0'?`<span class="badge" style="background:${TOK.teal};color:${TOK.bg}">${u}</span>`:''}
</div>
</div>`).join('')}
</div>
<div style="display:flex;flex-direction:column;background:${TOK.bg}">
<div style="padding:14px 20px;border-bottom:1px solid ${TOK.border};display:flex;justify-content:space-between;align-items:center">
<div><div style="font-size:14px;font-weight:600">Maria — Vila Verde</div><div style="font-size:12px;color:${TOK.teal}">Online · Chatbot ativo</div></div>
<div class="flex gap8"><button class="btn btn-secondary">Abrir cliente</button><button class="btn btn-secondary">Escalar p/ humano</button></div>
</div>
<div style="flex:1;padding:20px 20px;overflow:auto;display:flex;flex-direction:column;gap:12px">
<div style="align-self:flex-start;max-width:60%;background:${TOK.surface};padding:10px 14px;border-radius:12px;border-top-left-radius:4px;font-size:13px">Oi Vinicius, tudo bem? Queria confirmar quais notas eu mando hoje.</div>
<div style="align-self:flex-start;font-size:11px;color:${TOK.textDim};margin-left:4px">Maria · 10:58</div>
<div style="align-self:flex-end;max-width:60%;background:${TOK.teal};color:${TOK.bg};padding:10px 14px;border-radius:12px;border-top-right-radius:4px;font-size:13px">Oi Maria! Pode mandar todas as NFs de entrada e saída da semana, e os boletos pagos. Vou categorizar aqui.</div>
<div style="align-self:flex-end;font-size:11px;color:${TOK.textDim};margin-right:4px">Contaflow IA · 10:59 · <span style="color:${TOK.teal}">respondido em 47s</span></div>
<div style="align-self:flex-start;max-width:60%;background:${TOK.surface};padding:10px 14px;border-radius:12px;border-top-left-radius:4px;font-size:13px">Perfeito! Enviei as notas da semana, qualquer coisa me avisa. 🙏</div>
<div style="align-self:flex-start;font-size:11px;color:${TOK.textDim};margin-left:4px">Maria · 11:02 · <span>✓✓ lida</span></div>
<div style="background:${TOK.teal}10;border:1px solid ${TOK.teal}40;padding:10px 14px;border-radius:8px;font-size:12px;color:${TOK.teal}">✨ IA identificou: 8 anexos recebidos · 5 NFs entrada · 2 NFs saída · 1 boleto — adicionados à fila de revisão</div>
</div>
<div style="padding:14px 20px;border-top:1px solid ${TOK.border};display:flex;gap:10px"><input style="flex:1;padding:10px 14px;border-radius:8px;background:${TOK.surface};border:1px solid ${TOK.border};color:${TOK.text};font-size:13px" placeholder="Digite sua resposta…"><button class="btn btn-teal">Enviar</button></div>
</div>
</div>
`,
  },
  {
    slug: "06-calendario",
    title: "Calendário Fiscal",
    active: "calendario",
    blurb: "Matriz obrigação × cliente. Dispara lembretes WhatsApp em massa.",
    content: `
<div class="topbar"><h1>Calendário fiscal · Abril 2026</h1><div class="actions"><button class="btn btn-secondary">◂ Mar</button><button class="btn btn-secondary">Hoje</button><button class="btn btn-secondary">Mai ▸</button><button class="btn btn-primary">Disparar lembretes (9)</button></div></div>
<div class="content">
<div class="card">
<table>
<thead><tr><th style="min-width:180px">Cliente</th><th style="text-align:center">DAS Simples<br><span style="font-weight:400;text-transform:none;font-size:10px;color:${TOK.textMuted}">20/04</span></th><th style="text-align:center">DCTF<br><span style="font-weight:400;text-transform:none;font-size:10px;color:${TOK.textMuted}">22/04</span></th><th style="text-align:center">SPED<br><span style="font-weight:400;text-transform:none;font-size:10px;color:${TOK.textMuted}">30/04</span></th><th style="text-align:center">DEFIS<br><span style="font-weight:400;text-transform:none;font-size:10px;color:${TOK.textMuted}">31/05</span></th><th style="text-align:center">IRPJ<br><span style="font-weight:400;text-transform:none;font-size:10px;color:${TOK.textMuted}">31/07</span></th></tr></thead>
<tbody>
${[
  ['Mercado Vila Verde ME','warn','-','warn','warn','-'],
  ['Padaria do Zé Ltda','-','warn','warn','-','-'],
  ['Tech4Good Consultoria','-','-','warn','-','warn'],
  ['Dra. Mariana Oliveira','ok','-','-','-','-'],
  ['Café da Praça SP Ltda','-','warn','warn','ok','-'],
  ['Estúdio Moldura & Arte','warn','-','-','-','-'],
  ['Oficina Pedro Motos','warn','-','warn','-','-'],
  ['Clínica Viva Saúde','-','warn','warn','-','warn'],
  ['João Paulo Soares ME','n','-','-','-','-'],
].map(row=>`<tr><td style="font-weight:600">${row[0]}</td>${row.slice(1).map(c=>{
  if(c==='-') return `<td style="text-align:center;color:${TOK.textDim}">—</td>`;
  if(c==='ok') return `<td style="text-align:center"><span class="badge badge-ok">enviado</span></td>`;
  if(c==='warn') return `<td style="text-align:center"><span class="badge badge-warn">pendente</span></td>`;
  if(c==='n') return `<td style="text-align:center"><span class="badge badge-n">N/A</span></td>`;
  return '<td></td>';
}).join('')}</tr>`).join('')}
</tbody>
</table>
</div>
<div style="margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
<div class="card"><div class="card-hd"><h3>Próximos 7 dias</h3></div><div style="padding:16px 18px;font-size:13px">
<div style="padding:10px 0;border-bottom:1px solid ${TOK.borderSoft};display:flex;justify-content:space-between"><span><strong>20/04 seg</strong> · DAS Simples · 4 clientes</strong></span><span style="color:${TOK.amber}">pendente</span></div>
<div style="padding:10px 0;border-bottom:1px solid ${TOK.borderSoft};display:flex;justify-content:space-between"><span><strong>22/04 qua</strong> · DCTF · 4 clientes</span><span style="color:${TOK.textMuted}">agendado</span></div>
<div style="padding:10px 0;display:flex;justify-content:space-between"><span><strong>25/04 sex</strong> · FGTS · 7 clientes</span><span style="color:${TOK.textMuted}">agendado</span></div>
</div></div>
<div class="card"><div class="card-hd"><h3>Disparo automático WhatsApp</h3></div><div style="padding:16px 18px;font-size:13px">
<div style="padding:10px 0;border-bottom:1px solid ${TOK.borderSoft}">✅ Lembrete 7 dias antes · <span style="color:${TOK.textMuted}">Ativo</span></div>
<div style="padding:10px 0;border-bottom:1px solid ${TOK.borderSoft}">✅ Lembrete 3 dias antes · <span style="color:${TOK.textMuted}">Ativo</span></div>
<div style="padding:10px 0">✅ Lembrete no dia (09h) · <span style="color:${TOK.textMuted}">Ativo</span></div>
</div></div>
</div>
</div>
`,
  },
  {
    slug: "07-chatbot",
    title: "Chatbot Config",
    active: "chatbot",
    blurb: "Treine o chatbot com FAQ contábil e teste em playground.",
    content: `
<div class="topbar"><h1>Chatbot · Knowledge base</h1><div class="actions"><button class="btn btn-secondary">Importar FAQ</button><button class="btn btn-primary">+ Adicionar resposta</button></div></div>
<div class="content">
<div class="grid2">
<div class="card">
<div class="card-hd"><h3>Respostas treinadas</h3><span class="hint">42 ativas · 3 em revisão</span></div>
<table>
<thead><tr><th>Pergunta</th><th>Quando usar</th><th>Usos</th><th>Status</th></tr></thead>
<tbody>
<tr><td><div style="font-weight:600">Como emito uma nota fiscal?</div><div class="muted" style="font-size:11px">+ 12 variações</div></td><td>Cliente MEI ou Simples</td><td class="num">127</td><td><span class="badge badge-ok">Ativa</span></td></tr>
<tr><td><div style="font-weight:600">Quando vence meu DAS?</div><div class="muted" style="font-size:11px">+ 8 variações</div></td><td>Todos Simples/MEI</td><td class="num">89</td><td><span class="badge badge-ok">Ativa</span></td></tr>
<tr><td><div style="font-weight:600">Perdi minha senha do e-CAC, e agora?</div></td><td>Qualquer cliente</td><td class="num">34</td><td><span class="badge badge-ok">Ativa</span></td></tr>
<tr><td><div style="font-weight:600">Posso parcelar o Simples em atraso?</div><div class="muted" style="font-size:11px">+ 4 variações</div></td><td>Clientes Simples</td><td class="num">28</td><td><span class="badge badge-ok">Ativa</span></td></tr>
<tr><td><div style="font-weight:600">Como funciona o Fator R?</div></td><td>Prestadores de serviço</td><td class="num">12</td><td><span class="badge badge-warn">Revisão</span></td></tr>
</tbody>
</table>
</div>
<div class="card">
<div class="card-hd"><h3>Playground</h3><span class="hint">Teste antes de ativar</span></div>
<div style="padding:16px">
<div style="padding:12px;background:${TOK.bg};border-radius:8px;margin-bottom:10px;font-size:13px"><strong>Você (teste):</strong> "Oi, como emito nota pro meu cliente que não tem CNPJ?"</div>
<div style="padding:12px;background:${TOK.teal}10;border:1px solid ${TOK.teal}30;border-radius:8px;margin-bottom:10px;font-size:13px"><strong style="color:${TOK.teal}">Chatbot:</strong> Você pode emitir como pessoa física, usando o CPF do tomador. No portal municipal, selecione "Tomador sem CNPJ" e insira o CPF. Se for um valor alto (acima de R$ 10.000), me avisa que confirmo com o Vinicius a forma mais vantajosa.</div>
<div style="padding:10px;background:${TOK.surface2};border-radius:6px;font-size:11px;color:${TOK.textMuted}">Match: "Como emito uma nota fiscal?" · Confiança 87% · Tempo 1,2s</div>
<div style="margin-top:12px;display:flex;gap:8px"><input style="flex:1;padding:10px;border-radius:6px;background:${TOK.surface2};border:1px solid ${TOK.border};color:${TOK.text};font-size:13px" placeholder="Digite uma pergunta de teste…"><button class="btn btn-teal">Enviar</button></div>
</div>
</div>
</div>
</div>
`,
  },
  {
    slug: "08-dashboard",
    title: "Dashboard — KPIs do escritório",
    active: "dashboard",
    blurb: "Panorama mensal: clientes, faturamento processado, tempo economizado.",
    content: `
<div class="topbar"><h1>Dashboard · Março 2026</h1><div class="actions"><button class="btn btn-secondary">Exportar CSV</button><button class="btn btn-secondary">Compartilhar</button></div></div>
<div class="content">
<div class="kpi-grid">
<div class="kpi"><div class="lb">Clientes ativos</div><div class="vl">32</div><div class="dt">+3 no mês</div></div>
<div class="kpi"><div class="lb">MRR do escritório</div><div class="vl">R$ 24.800</div><div class="dt">+R$ 1.900 vs fev</div></div>
<div class="kpi"><div class="lb">Documentos processados</div><div class="vl">1.247</div><div class="dt">94% precisão IA</div></div>
<div class="kpi"><div class="lb">Horas economizadas</div><div class="vl" style="color:${TOK.teal}">47h</div><div class="dt">≈ 6 dias úteis</div></div>
</div>
<div class="grid2">
<div class="card"><div class="card-hd"><h3>Volume de NFs categorizadas</h3><span class="hint">últimos 30 dias</span></div>
<div style="padding:20px;height:260px;display:flex;align-items:flex-end;gap:6px;justify-content:space-around">
${[28,42,35,51,47,62,58,71,66,78,84,92,88,95,82,76,89,94,103,98,112,124,131,118,127,142,138,145,151,167].map(v=>`<div style="width:18px;background:${TOK.teal}60;height:${Math.round(v*1.4)}px;border-radius:3px 3px 0 0;position:relative"><div style="width:100%;background:${TOK.teal};height:${Math.round(v*0.6)}px;border-radius:3px 3px 0 0;position:absolute;bottom:0"></div></div>`).join('')}
</div>
<div style="padding:10px 20px 16px;display:flex;justify-content:space-between;font-size:11px;color:${TOK.textMuted}"><span>15 mar</span><span>1 abr</span><span>15 abr</span></div>
</div>
<div class="card">
<div class="card-hd"><h3>SLA de resposta WhatsApp</h3></div>
<div style="padding:20px;text-align:center">
<div style="font-size:42px;font-weight:800;color:${TOK.teal};letter-spacing:-0.02em">2min 14s</div>
<div style="color:${TOK.textMuted};font-size:13px;margin-top:6px">tempo médio de primeira resposta</div>
<div style="margin-top:16px;padding:10px;background:${TOK.surface2};border-radius:6px;font-size:11px;color:${TOK.textMuted}">Meta escritório: &lt; 5 min · <span style="color:${TOK.teal}">✓ batendo meta em 29 dias do mês</span></div>
</div>
</div>
</div>
<div style="margin-top:16px" class="card">
<div class="card-hd"><h3>Top 5 clientes por volume processado</h3></div>
<table>
<thead><tr><th>Cliente</th><th class="num">NFs</th><th class="num">R$ processado</th><th class="num">Hora/semana economizada</th></tr></thead>
<tbody>
<tr><td>Tech4Good Consultoria</td><td class="num">234</td><td class="num">R$ 342.108,00</td><td class="num" style="color:${TOK.teal}">8h20</td></tr>
<tr><td>Mercado Vila Verde ME</td><td class="num">187</td><td class="num">R$ 142.380,50</td><td class="num" style="color:${TOK.teal}">6h15</td></tr>
<tr><td>Clínica Viva Saúde</td><td class="num">156</td><td class="num">R$ 198.720,00</td><td class="num" style="color:${TOK.teal}">5h40</td></tr>
<tr><td>Padaria do Zé Ltda</td><td class="num">142</td><td class="num">R$ 87.200,00</td><td class="num" style="color:${TOK.teal}">4h55</td></tr>
<tr><td>Café da Praça SP Ltda</td><td class="num">128</td><td class="num">R$ 76.340,00</td><td class="num" style="color:${TOK.teal}">4h20</td></tr>
</tbody>
</table>
</div>
</div>
`,
  },
  {
    slug: "09-auditoria",
    title: "Auditoria",
    active: "auditoria",
    blurb: "Trilha append-only — CRC compliance, quem fez o quê e quando.",
    content: `
<div class="topbar"><h1>Auditoria</h1><div class="actions"><button class="btn btn-secondary">Filtrar</button><button class="btn btn-secondary">Exportar CRC</button></div></div>
<div class="content">
<div class="flex gap8" style="margin-bottom:16px">
<input style="flex:1;max-width:320px;padding:8px 12px;border-radius:6px;background:${TOK.surface};border:1px solid ${TOK.border};color:${TOK.text};font-size:13px" placeholder="Buscar por ator, cliente, ação…">
<button class="btn btn-secondary">Últimos 7 dias ▾</button>
<button class="btn btn-secondary">Todos os atores ▾</button>
</div>
<div class="card">
<table>
<thead><tr><th>Quando</th><th>Ator</th><th>Ação</th><th>Entidade</th><th>Cliente afetado</th><th>IP</th></tr></thead>
<tbody>
<tr><td class="mono">15/04/2026 11:02:47</td><td><div class="flex gap8"><div class="avatar">AI</div><span>Contaflow IA</span></div></td><td>Categorizou NFe #00042</td><td>Documento</td><td>Mercado Vila Verde ME</td><td class="mono" style="color:${TOK.textDim}">—</td></tr>
<tr><td class="mono">15/04/2026 10:58:12</td><td><div class="flex gap8"><div class="avatar">VG</div><span>Vinicius G.</span></div></td><td>Aprovou categorização em lote (23)</td><td>Documento</td><td>Tech4Good Consultoria</td><td class="mono" style="color:${TOK.textDim}">201.87.43.12</td></tr>
<tr><td class="mono">15/04/2026 10:47:03</td><td><div class="flex gap8"><div class="avatar">VG</div><span>Vinicius G.</span></div></td><td>Editou cadastro</td><td>Cliente</td><td>Dra. Mariana Oliveira</td><td class="mono" style="color:${TOK.textDim}">201.87.43.12</td></tr>
<tr><td class="mono">15/04/2026 09:30:00</td><td><div class="flex gap8"><div class="avatar">AI</div><span>Contaflow IA</span></div></td><td>Disparou lembrete DAS (automático)</td><td>WhatsApp</td><td>3 clientes (lote)</td><td class="mono" style="color:${TOK.textDim}">—</td></tr>
<tr><td class="mono">14/04/2026 17:22:55</td><td><div class="flex gap8"><div class="avatar" style="background:${TOK.amber}30;color:${TOK.amber}">PS</div><span>Paula Silva</span></div></td><td>Criou novo cliente</td><td>Cliente</td><td>Estúdio Moldura &amp; Arte</td><td class="mono" style="color:${TOK.textDim}">189.12.7.88</td></tr>
<tr><td class="mono">14/04/2026 16:10:34</td><td><div class="flex gap8"><div class="avatar">VG</div><span>Vinicius G.</span></div></td><td>Rejeitou sugestão IA</td><td>Documento</td><td>Oficina Pedro Motos</td><td class="mono" style="color:${TOK.textDim}">201.87.43.12</td></tr>
<tr><td class="mono">14/04/2026 15:42:11</td><td><div class="flex gap8"><div class="avatar">AI</div><span>Contaflow IA</span></div></td><td>Extraiu dados de boleto</td><td>Documento</td><td>Oficina Pedro Motos</td><td class="mono" style="color:${TOK.textDim}">—</td></tr>
<tr><td class="mono">14/04/2026 14:15:02</td><td><div class="flex gap8"><div class="avatar" style="background:${TOK.amber}30;color:${TOK.amber}">PS</div><span>Paula Silva</span></div></td><td>Aprovou cadastro de usuário</td><td>Sistema</td><td>—</td><td class="mono" style="color:${TOK.textDim}">189.12.7.88</td></tr>
</tbody>
</table>
</div>
<div style="margin-top:16px;padding:12px 16px;background:${TOK.surface};border:1px solid ${TOK.border};border-radius:8px;display:flex;align-items:center;gap:10px">
<span style="color:${TOK.teal};font-size:18px">🛡️</span>
<div style="font-size:12px;color:${TOK.textMuted}"><strong style="color:${TOK.text}">Trilha imutável</strong> · Registros não podem ser editados ou deletados · Exportação em formato CRC/CFC</div>
</div>
</div>
`,
  },
  {
    slug: "10-settings",
    title: "Configurações",
    active: "settings",
    blurb: "Sua conta, sócios, integrações e faturamento do escritório.",
    content: `
<div class="topbar"><h1>Configurações</h1></div>
<div class="content">
<div class="grid2">
<div>
<div class="card" style="margin-bottom:16px">
<div class="card-hd"><h3>Escritório</h3></div>
<div style="padding:18px;font-size:13px;line-height:1.8">
<div><span style="color:${TOK.textMuted}">Razão social:</span> Silva & Associados Assessoria Contábil</div>
<div><span style="color:${TOK.textMuted}">CRC:</span> SP-123456/O-4</div>
<div><span style="color:${TOK.textMuted}">Endereço:</span> Av. Rebouças, 1240 · Conj. 81 · Pinheiros · SP</div>
<div><span style="color:${TOK.textMuted}">Plano:</span> Contaflow Essencial · R$ 697/mês</div>
<div style="margin-top:12px"><button class="btn btn-secondary">Editar</button></div>
</div>
</div>
<div class="card">
<div class="card-hd"><h3>Integrações</h3><span class="hint">3 conectadas · 2 disponíveis</span></div>
<div style="padding:4px 0">
<div style="padding:14px 18px;border-bottom:1px solid ${TOK.borderSoft};display:flex;justify-content:space-between;align-items:center"><div><strong style="font-size:13px">Domínio Contábil</strong><div style="font-size:11px;color:${TOK.textMuted}">Importação automática de cadastros e lançamentos</div></div><span class="badge badge-ok">Conectado</span></div>
<div style="padding:14px 18px;border-bottom:1px solid ${TOK.borderSoft};display:flex;justify-content:space-between;align-items:center"><div><strong style="font-size:13px">Focus NFe</strong><div style="font-size:11px;color:${TOK.textMuted}">Emissão e consulta de NFes</div></div><span class="badge badge-ok">Conectado</span></div>
<div style="padding:14px 18px;border-bottom:1px solid ${TOK.borderSoft};display:flex;justify-content:space-between;align-items:center"><div><strong style="font-size:13px">WhatsApp Business</strong><div style="font-size:11px;color:${TOK.textMuted}">Canal principal de comunicação</div></div><span class="badge badge-ok">Conectado</span></div>
<div style="padding:14px 18px;border-bottom:1px solid ${TOK.borderSoft};display:flex;justify-content:space-between;align-items:center"><div><strong style="font-size:13px">Omie</strong><div style="font-size:11px;color:${TOK.textMuted}">Sincronização de clientes</div></div><button class="btn btn-secondary">Conectar</button></div>
<div style="padding:14px 18px;display:flex;justify-content:space-between;align-items:center"><div><strong style="font-size:13px">SERPRO Datavalid</strong><div style="font-size:11px;color:${TOK.textMuted}">Validação de CPF/CNPJ em tempo real</div></div><button class="btn btn-secondary">Conectar</button></div>
</div>
</div>
</div>
<div>
<div class="card" style="margin-bottom:16px">
<div class="card-hd"><h3>Time</h3><span class="hint">3 usuários</span></div>
<div style="padding:4px 0">
<div style="padding:14px 18px;border-bottom:1px solid ${TOK.borderSoft};display:flex;gap:12px;align-items:center"><div class="avatar">VG</div><div style="flex:1"><div style="font-size:13px;font-weight:600">Vinicius Gasparello <span class="pill" style="margin-left:6px">Proprietário</span></div><div style="font-size:11px;color:${TOK.textMuted}">vinicius@silvacontabil.com.br</div></div></div>
<div style="padding:14px 18px;border-bottom:1px solid ${TOK.borderSoft};display:flex;gap:12px;align-items:center"><div class="avatar" style="background:${TOK.amber}30;color:${TOK.amber}">PS</div><div style="flex:1"><div style="font-size:13px;font-weight:600">Paula Silva <span class="pill" style="margin-left:6px">Sócio</span></div><div style="font-size:11px;color:${TOK.textMuted}">paula@silvacontabil.com.br</div></div></div>
<div style="padding:14px 18px;display:flex;gap:12px;align-items:center"><div class="avatar" style="background:${TOK.textDim}30;color:${TOK.textDim}">RL</div><div style="flex:1"><div style="font-size:13px;font-weight:600">Rafael Lima <span class="pill" style="margin-left:6px">Assistente</span></div><div style="font-size:11px;color:${TOK.textMuted}">rafael@silvacontabil.com.br</div></div></div>
</div>
<div style="padding:14px 18px;border-top:1px solid ${TOK.border}"><button class="btn btn-primary">+ Convidar usuário</button></div>
</div>
<div class="card">
<div class="card-hd"><h3>Faturamento Contaflow</h3></div>
<div style="padding:18px;font-size:13px;line-height:1.8">
<div><span style="color:${TOK.textMuted}">Próxima cobrança:</span> 15/05/2026</div>
<div><span style="color:${TOK.textMuted}">Valor:</span> R$ 697,00 (Essencial)</div>
<div><span style="color:${TOK.textMuted}">Método:</span> Asaas — Pix recorrente</div>
<div style="margin-top:12px;display:flex;gap:8px"><button class="btn btn-secondary">Ver histórico</button><button class="btn btn-secondary">Atualizar pagamento</button></div>
</div>
</div>
</div>
</div>
</div>
`,
  },
];

// Write HTML + render PNG
const browser = await chromium.launch();
const results = [];
for (const s of screens) {
  const html = shell({ title: s.title, active: s.active, content: s.content });
  const htmlPath = path.join(OUT, `${s.slug}.html`);
  await fs.writeFile(htmlPath, html, "utf8");

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("file://" + htmlPath, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(OUT, `${s.slug}.png`), fullPage: false });
  await ctx.close();
  console.log(`  ok  ${s.slug}`);
  results.push({ slug: s.slug, title: s.title, blurb: s.blurb });
}
await browser.close();

// Manifest consumido pela LP
await fs.writeFile(
  path.join(OUT, "manifest.json"),
  JSON.stringify(results, null, 2)
);
console.log(`\n✔ ${results.length} telas em ${OUT}`);
