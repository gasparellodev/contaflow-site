# Cash Sprint Contaflow — Plano de Disparo 16/04/2026

**Data do disparo:** quinta-feira, 16 de abril de 2026
**Founder:** Vinicius Gasparello (solo)
**Meta:** 3 demos agendadas até 18h · 1 Sprint Express R$ 997 fechado até sexta
**Stack pronta:** LP `contaflow.gasplab.com.br` + Evolution API em `evo.gasplab.com.br` + 3 payment links Asaas sandbox + 11 criativos aprovados + video demo + 10 screenshots do produto

---

## 1. Posicionamento final (o que você diz nos primeiros 30s)

> Contaflow é automação contábil com IA que **devolve 5 a 10 horas por semana** ao contador: categoriza NFs em 30 segundos, envia lembretes fiscais por cliente via WhatsApp e responde dúvidas com chatbot. Você implanta em **48 horas**, não em 3 meses. Produto **da GaspLab** (meu laboratório de IA), em beta fechado com 2 escritórios parceiros.

Três pontos de ancoragem que NÃO podem faltar em qualquer conversa:
- **Dor validada:** "Seu fim de mês é categorizar NFs e correr atrás de documento, ou você já resolveu isso?"
- **Prova:** vídeo demo de 45s (link direto) + screenshots reais de 10 telas do sistema
- **Caminho curto:** Sprint Express R$ 997 em 48h → Diagnóstico R$ 1.497 em 5d → Contaflow R$ 697/mês

---

## 2. Público-alvo do dia (ICP reforçado)

- **Quem:** contador(a) **proprietário(a)** ou sócio(a) de escritório contábil
- **Tamanho:** entre 5 e 50 clientes ativos (não startup, não Big 4)
- **Região:** capitais RJ/SP/MG e grande SP (Alphaville, Campinas, Santos)
- **Sinais verdes:** escritório com site, post de cliente recente no LinkedIn, CRC ativo (cfc.org.br/consulta)
- **Sinais vermelhos (desqualifica):** contador assalariado (não decide), escritório Big 4, ramo exclusivo internacional

---

## 3. Stack operacional — o que já está pronto e no ar

| Item | Estado | Link / onde |
|---|---|---|
| LP principal | LIVE | https://contaflow.gasplab.com.br |
| LP GaspLab institucional | LIVE | https://gasplab.com.br |
| Seção "Veja o sistema" (LP) | LIVE após sprint | — |
| Página `/produto` gallery 10 telas | LIVE após sprint | https://contaflow.gasplab.com.br/produto |
| Video demo 45s com voice-over | LIVE após sprint | https://contaflow.gasplab.com.br/demo.mp4 |
| Pagamento Sprint R$ 997 | LIVE | https://sandbox.asaas.com/c/aht15kd7eyewvenu |
| Pagamento Diagnóstico R$ 1.497 | LIVE | https://sandbox.asaas.com/c/qlzccj7ltm7m2lgl |
| Pagamento Contaflow Setup R$ 1.997 | LIVE | https://sandbox.asaas.com/c/x64po3akrkoz7h6n |
| Evolution API WhatsApp | LIVE | https://evo.gasplab.com.br |
| Scripts WhatsApp 3 versões | PRONTOS | `output/cash_sprint_2026-04-15/whatsapp/` |
| Emails Day0/2/5 | PRONTOS | `output/cash_sprint_2026-04-15/email/` |
| Posts LinkedIn 5 | PRONTOS | `output/cash_sprint_2026-04-15/linkedin/` |
| 5 banners JPEG | PRONTOS | `output/cash_sprint_2026-04-15/banner/` |
| Workflow outbound Python | PRONTO | `workflows/outbound_contador.py` (rate-limited + opt-out) |

**Pendência crítica:** Asaas **sandbox** continua. Depois do primeiro cliente confirmar interesse, **migrar para conta produção** (mesma API, trocar base URL para `api.asaas.com/v3`).

---

## 4. Cronograma hora-a-hora — QUINTA 16/04

### 🌅 08:00–09:00 · Preparação

- ☕ Revisão mental da oferta + abrir abas: Notion/Planilha CRM, LP, WhatsApp Business Web, Evolution API health
- Comando de health check:
  ```bash
  curl -H "apikey: $EVO_KEY" https://evo.gasplab.com.br/instance/connectionState/contaflow-outbound
  # Esperado: {"instance":{"state":"open"}}
  ```
- Se instância não estiver conectada, reconectar via QR code (ver `docs/outbound/evolution-setup.md`)
- Abrir o vídeo demo da LP uma vez para lembrar do fluxo narrativo

### ⚙️ 09:00–10:00 · Levantamento de leads (30-40 contadores)

**Passo 1 — LinkedIn Sales Navigator (ou busca normal):**
Abra uma dessas queries, colete 15–20 nomes com telefone/LinkedIn ativo:

- `Geography = "São Paulo" · Title contains "contador" OR "sócio contábil"`
- `Geography = "Rio de Janeiro" · Title contains "contador"`
- `Geography = "Belo Horizonte" · Title contains "contador"`

**Passo 2 — Google Maps (copie nome + telefone):**
- https://www.google.com/maps/search/escrit%C3%B3rio+contabilidade+Pinheiros+S%C3%A3o+Paulo
- https://www.google.com/maps/search/escrit%C3%B3rio+contabilidade+Alphaville
- https://www.google.com/maps/search/escrit%C3%B3rio+contabilidade+Copacabana
- https://www.google.com/maps/search/escrit%C3%B3rio+contabilidade+Savassi+Belo+Horizonte

**Passo 3 — preencher `leads.csv`** com colunas do template em `docs/outbound/crm-template.csv`:
`id,nome,escritorio,cnpj,cidade,uf,telefone,linkedin,email,status,ultima_acao,notas`

Target ao final das 10h: **30–40 leads qualificados** no CSV, todos com `status=lead_novo`.

### 🚀 10:00–12:00 · Disparo cold (rate 5/h aquecimento)

**Hora 1 (10h–11h): 5 mensagens**, uma a cada ~12 min.

Comando:
```bash
cd /Users/gasparellodev/projects/gaspLabSquad
source .venv/bin/activate
python -m workflows.outbound_contador --rate 5 leads.csv
```

Script já renderiza `wa-01-cold-primeiro-contato.md` com placeholders `[NOME]` e `[ESCRITORIO]` do CSV, injeta opt-out LGPD ("PARE"), varia saudação para não virar fingerprint de automação.

**Hora 2 (11h–12h): escala para 10/h.** Aumente `--rate 10`.

**Durante o disparo:** abra WhatsApp Web e monitore respostas em tempo real. Toda resposta positiva é tratada MANUALMENTE — automação é só o primeiro toque.

### 🍽️ 12:00–13:00 · Pausa + triagem das respostas da manhã

- Classifique cada resposta recebida em 3 baldes:
  - **Interesse alto** → envie vídeo demo + link Sprint Express em até 10 min
  - **Curioso/dúvida** → responda com voz Sage (factual, sem hype) + pergunta aberta
  - **"Não é para mim"** → agradeça, marque `status=perdido`, não insista
- Qualquer "PARE/SAIR" → script já marca `status=opted_out` automaticamente

### 📞 13:00–14:30 · Demos agendadas + follow-up de quem viu e não respondeu

**Template WhatsApp warm (para quem respondeu positivo):**
Use `output/cash_sprint_2026-04-15/whatsapp/wa-02-warm-pos-resposta.md` — já inclui LGPD e oferta R$ 997.

**Envie o link da LP com âncora para `/produto`:**
```
https://contaflow.gasplab.com.br/produto
```
Inclui os 10 screenshots + vídeo demo. É a prova mais forte que temos.

### 📨 14:30–16:00 · Disparo de emails (20–30)

Para leads que têm email no CSV:
- **Email cold Day 0** (`email-01-day0-cold.md`) — subject curto, merge fields, link Sprint Express + vídeo
- Envie via Gmail/teu cliente — **não use ferramenta de email marketing** para B2B 1-a-1 (cai em spam)

### 📢 16:00–17:00 · LinkedIn (presença orgânica)

- Poste `linkedin/li-01-dor-categorizacao.md` com o banner `banner-01-linkedin-hero.jpeg`
- Comente em 5–10 posts recentes de contadores na sua rede (valor antes de pitch)
- Mande InMail para 3–5 contadores "sonho" (escritórios maiores) com o video link

### 📞 17:00–18:30 · Reuniões agendadas

Para cada demo agendada:
- **Roteiro de 15 min** em `/Users/gasparellodev/projects/contaflow/docs/demo-script-contador.md`
- **Se a pessoa topar:** gere o link Asaas personalizado (Sprint Express ou Diagnóstico) e envie pelo WhatsApp imediatamente
- **Se pedir tempo para pensar:** envie o video demo + resumo em PDF (ver seção 8) + follow-up agendado em 48h

### 🌙 18:30–19:30 · Limpeza + prep sexta

- Atualizar CSV com status de cada lead (contato_enviado / qualificado / proposta_enviada / fechado / perdido)
- Listar leads para follow-up dia seguinte (Day2 email automático ou manual)
- Revisar Asaas — se houve fechamento, migrar link para produção

---

## 5. Templates prontos para copiar (referências)

### WhatsApp cold (primeiro contato)
`/Users/gasparellodev/projects/gaspLabSquad/output/cash_sprint_2026-04-15/whatsapp/wa-01-cold-primeiro-contato.md`

### WhatsApp warm (resposta positiva)
`wa-02-warm-pos-resposta.md` — já inclui link Asaas + LGPD

### WhatsApp follow-up 24h
`wa-03-followup-24h.md` — com opt-out explícito

### Email Day 0 / Day 2 / Day 5
`email/email-01-day0-cold.md` / `email-02-day2-valor.md` / `email-03-day5-urgencia.md`

### LinkedIn posts + banners
`linkedin/li-*.md` + `banner/banner-*.jpeg`

---

## 6. Como responder objeções (script)

| Objeção | Resposta |
|---|---|
| "Quanto custa?" | "Três portas: Sprint Express R$ 997 em 48h pra testar, Diagnóstico R$ 1.497 com PoC no seu cliente, e Contaflow R$ 697/mês com setup R$ 1.997. A Sprint devolve 50% se não fizer sentido em 7 dias." |
| "Tenho meu sistema" | "Ótimo — a IA não substitui, ela pluga. Rodamos em paralelo com Domínio/Alterdata até você ver o ganho. Quer que eu mostre o vídeo de 45s?" |
| "IA entende contabilidade BR?" | "Por isso a Sprint existe. Em 48h você vê funcionando com dados reais de um cliente seu, não prometo nada no vazio." |
| "Preciso pensar" | "Pensar o quê especificamente — preço, risco, timing? Tem 7 dias de reembolso na Sprint." |
| "LGPD?" | "Dados tratados dentro do Brasil, multi-tenant isolado, contrato de processamento padrão incluso. Disclaimer na LP." |
| "Onde vocês estão?" | "GaspLab é SP (Alphaville), 100% remoto com o escritório do cliente. Implantação via videochamada + WhatsApp." |

---

## 7. Metas mensuráveis — definição de sucesso 16/04

| Métrica | Piso | Alvo | Stretch |
|---|---|---|---|
| Leads disparados WhatsApp | 20 | 35 | 50 |
| Respostas recebidas | 2 | 5 | 10 |
| Demos agendadas | 1 | 3 | 5 |
| Propostas enviadas (link Asaas) | 1 | 3 | 5 |
| Fechamentos no dia | 0 | 1 | 2 |
| Posts LinkedIn publicados | 1 | 2 | 3 |
| Emails cold enviados | 10 | 25 | 40 |

---

## 8. Entregáveis extras construídos HOJE (15/04)

- Video demo 45s com voice-over pt-BR (Luciana) — autoplay muted na LP + MP4 baixável
- Seção "Veja o sistema" — abaixo do hero, antes de "O que sugamos"
- Página `/produto` — gallery com 10 telas + descrição curta cada
- 10 screenshots mockados das telas do produto (dados BR realistas)
- PDF one-page resumo com pricing (ainda TODO: gerar pós-sprint)

---

## 9. Checklist de last-mile antes de disparar amanhã 09h00

- [ ] LP `contaflow.gasplab.com.br` carrega em aba anônima sem cache
- [ ] Video demo toca sem erro
- [ ] Link `/produto` mostra 10 telas
- [ ] 3 links Asaas abrem checkout funcional
- [ ] `EVOLUTION_API_KEY` no `.env` do gaspLabSquad
- [ ] `EVOLUTION_INSTANCE_NAME=contaflow-outbound` conectado (estado=open)
- [ ] `leads.csv` com 30-40 leads preenchidos
- [ ] `--dry` roda sem erro antes de disparo real
- [ ] Monitor WhatsApp Web aberto em aba dedicada
- [ ] Notion/Planilha CRM aberto em outra aba

---

## 10. Comandos de emergência

**Parar o disparo outbound imediatamente:**
```bash
# Ctrl+C no script + marca TODOS os leads restantes como pending no CSV manualmente
```

**Desconectar Evolution se virar ban:**
```bash
curl -X DELETE -H "apikey: $EVO_KEY" https://evo.gasplab.com.br/instance/logout/contaflow-outbound
```

**Rollback da LP se algo quebrar:**
```bash
ssh root@212.85.23.251 "mv /var/www/contaflow /var/www/contaflow.broken && cp -r /var/www/contaflow.backup /var/www/contaflow && systemctl reload nginx"
```
(antes do disparo, faça `cp -r /var/www/contaflow /var/www/contaflow.backup` na VPS)

---

**Pronto. Dorme cedo. 8h em ponto na segunda-feira... digo, quinta-feira.**
