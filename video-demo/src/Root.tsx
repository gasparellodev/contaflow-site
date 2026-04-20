import React from "react";
import {
  Composition,
  AbsoluteFill,
  Sequence,
  Audio,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from "remotion";

const FPS = 30;
const DUR = 30 * FPS; // 30 segundos

// Tokens
const C = {
  bg: "#0A1520",
  bg2: "#0F1B2A",
  teal: "#4ECDC4",
  amber: "#FFB627",
  white: "#F8FAFC",
  muted: "#94A3B8",
  border: "rgba(255,255,255,0.08)",
};

// ═══════════════ SCENE 1: Logo intro (0–3s) ═══════════════
const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });
  const wmProgress = interpolate(frame, [10, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [70, 85], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      {/* glow behind */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          background: `radial-gradient(circle, ${C.teal}33 0%, transparent 60%)`,
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          transform: `scale(${scale})`,
        }}
      >
        <div
          style={{
            width: 110,
            height: 110,
            background: C.teal,
            borderRadius: 24,
            display: "grid",
            placeItems: "center",
            color: C.bg,
            fontWeight: 900,
            fontSize: 72,
            fontFamily: "sans-serif",
            boxShadow: `0 20px 60px ${C.teal}40`,
          }}
        >
          G
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            fontFamily: "sans-serif",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <span style={{ color: C.white }}>Conta</span>
          <span
            style={{
              color: C.teal,
              clipPath: `inset(0 ${100 - wmProgress * 100}% 0 0)`,
              transition: "clip-path 0.3s",
            }}
          >
            flow
          </span>
        </div>
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 24,
          color: C.muted,
          fontFamily: "sans-serif",
          letterSpacing: "0.12em",
          opacity: interpolate(frame, [45, 65], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        AUTOMAÇÃO CONTÁBIL COM IA
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════ SCENE 2: WhatsApp typing + files arriving (3–9s) ═══════════════
const SceneWhatsApp: React.FC<{ local: number }> = ({ local }) => {
  const frame = local;
  const { fps } = useVideoConfig();
  const contentIn = spring({ frame, fps, config: { damping: 12 } });
  const headline = "Seu cliente envia NFs no WhatsApp.";
  const headlineChars = Math.floor(
    interpolate(frame, [0, 40], [0, headline.length], {
      extrapolateRight: "clamp",
    })
  );
  // Bubbles: one after another
  const b1 = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const b2 = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const b3 = interpolate(frame, [75, 90], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const attach = interpolate(frame, [110, 140], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const opacity = interpolate(frame, [0, 12, 160, 180], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: C.bg, opacity }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "100%",
          height: "100%",
          padding: "80px 100px",
          alignItems: "center",
          gap: 80,
        }}
      >
        {/* Esquerda: headline */}
        <div style={{ transform: `translateY(${(1 - contentIn) * 20}px)` }}>
          <div
            style={{
              fontSize: 18,
              color: C.teal,
              fontWeight: 700,
              letterSpacing: "0.18em",
              fontFamily: "sans-serif",
              marginBottom: 20,
            }}
          >
            ETAPA 01
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              color: C.white,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontFamily: "sans-serif",
              minHeight: 180,
            }}
          >
            {headline.slice(0, headlineChars)}
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 54,
                background: C.teal,
                marginLeft: 4,
                verticalAlign: "middle",
                opacity: frame % 20 < 10 ? 1 : 0,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 22,
              color: C.muted,
              marginTop: 20,
              fontFamily: "sans-serif",
              opacity: interpolate(frame, [55, 75], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            Sem planilha no meio. Sem e-mail perdido.
          </div>
        </div>

        {/* Direita: mockup WhatsApp */}
        <div
          style={{
            background: C.bg2,
            borderRadius: 22,
            border: `1px solid ${C.border}`,
            padding: "24px 20px",
            boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7)",
            transform: `translateY(${(1 - contentIn) * 40}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingBottom: 16,
              borderBottom: `1px solid ${C.border}`,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: `${C.amber}40`,
                color: C.amber,
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
                fontFamily: "sans-serif",
              }}
            >
              MV
            </div>
            <div>
              <div style={{ color: C.white, fontWeight: 600, fontSize: 16, fontFamily: "sans-serif" }}>
                Maria — Vila Verde
              </div>
              <div style={{ color: C.teal, fontSize: 12, fontFamily: "sans-serif" }}>
                online
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Bubble side="left" opacity={b1}>
              Oi Vinicius, mandei as NFs da semana 🙏
            </Bubble>
            <Bubble side="left" opacity={b2}>
              São 5 entradas, 2 saídas e 1 boleto pago.
            </Bubble>
            {/* Attachments */}
            <div
              style={{
                display: "flex",
                gap: 8,
                alignSelf: "flex-start",
                opacity: attach,
                transform: `translateY(${(1 - attach) * 14}px)`,
              }}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 54,
                    height: 70,
                    background: C.bg,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    display: "grid",
                    placeItems: "center",
                    color: C.teal,
                    fontFamily: "sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  📄
                </div>
              ))}
            </div>
            <Bubble side="right" opacity={b3}>
              Recebi! Vou categorizar.
            </Bubble>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Bubble: React.FC<{
  side: "left" | "right";
  opacity: number;
  children: React.ReactNode;
}> = ({ side, opacity, children }) => (
  <div
    style={{
      alignSelf: side === "right" ? "flex-end" : "flex-start",
      background: side === "right" ? C.teal : C.bg,
      color: side === "right" ? C.bg : C.white,
      padding: "12px 16px",
      borderRadius: 14,
      borderTopLeftRadius: side === "left" ? 4 : 14,
      borderTopRightRadius: side === "right" ? 4 : 14,
      fontSize: 16,
      fontFamily: "sans-serif",
      maxWidth: "85%",
      opacity,
      transform: `translateY(${(1 - opacity) * 10}px)`,
    }}
  >
    {children}
  </div>
);

// ═══════════════ SCENE 3: AI categorizing (9–17s) ═══════════════
const SceneAI: React.FC<{ local: number }> = ({ local }) => {
  const frame = local;
  const headlineOp = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 12, 210, 240], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  // 4 documentos, cada um com progress IA
  const docs = [
    { name: "NFe #00042 · Alpha Distribuidora", label: "Custo mercadoria", start: 10 },
    { name: "NFe #04712 · Moinho Primavera", label: "Matéria-prima", start: 40 },
    { name: "Boleto · Sicredi R$ 12.480", label: "Financiamento", start: 70 },
    { name: "Extrato Itaú · 34 lançamentos", label: "Reconciliação", start: 100 },
  ];

  return (
    <AbsoluteFill style={{ background: C.bg, opacity }}>
      <div style={{ padding: "72px 100px" }}>
        <div
          style={{
            fontSize: 18,
            color: C.teal,
            fontWeight: 700,
            letterSpacing: "0.18em",
            fontFamily: "sans-serif",
            marginBottom: 16,
            opacity: headlineOp,
          }}
        >
          ETAPA 02
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: C.white,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            fontFamily: "sans-serif",
            maxWidth: 1100,
            opacity: headlineOp,
            transform: `translateY(${(1 - headlineOp) * 20}px)`,
          }}
        >
          A IA categoriza em <span style={{ color: C.teal }}>30 segundos</span>.
        </div>

        <div
          style={{
            marginTop: 50,
            display: "grid",
            gap: 16,
            maxWidth: 1300,
          }}
        >
          {docs.map((d, i) => {
            const appear = interpolate(frame, [d.start, d.start + 20], [0, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            });
            const scan = interpolate(frame, [d.start + 15, d.start + 60], [0, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            });
            const confidenceValue = Math.round(80 + (i % 3) * 5 + scan * 10);
            const displayConf = Math.round(scan * confidenceValue);
            return (
              <div
                key={i}
                style={{
                  background: C.bg2,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: "20px 26px",
                  display: "grid",
                  gridTemplateColumns: "1.6fr 1.2fr 200px 120px",
                  alignItems: "center",
                  gap: 24,
                  opacity: appear,
                  transform: `translateX(${(1 - appear) * 40}px)`,
                }}
              >
                <div
                  style={{
                    color: C.white,
                    fontSize: 22,
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {d.name}
                </div>
                <div
                  style={{
                    color: scan > 0.4 ? C.teal : C.muted,
                    fontSize: 18,
                    fontFamily: "sans-serif",
                    transition: "color 0.3s",
                  }}
                >
                  {scan > 0.4 ? `→ ${d.label}` : "analisando…"}
                </div>
                <div
                  style={{
                    height: 8,
                    background: C.border,
                    borderRadius: 4,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: `${scan * 100}%`,
                      background: `linear-gradient(90deg, ${C.teal}, ${C.amber})`,
                      borderRadius: 4,
                    }}
                  />
                </div>
                <div
                  style={{
                    color: scan >= 1 ? C.teal : C.amber,
                    fontSize: 26,
                    fontFamily: "sans-serif",
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                    textAlign: "right",
                  }}
                >
                  {displayConf}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════ SCENE 4: Notification calendário (17–23s) ═══════════════
const SceneCalendar: React.FC<{ local: number }> = ({ local }) => {
  const frame = local;
  const headlineOp = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const notif1 = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const notif2 = interpolate(frame, [75, 100], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const notif3 = interpolate(frame, [110, 135], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const opacity = interpolate(frame, [0, 12, 160, 180], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: C.bg, opacity }}>
      <div style={{ padding: "72px 100px", height: "100%" }}>
        <div
          style={{
            fontSize: 18,
            color: C.teal,
            fontWeight: 700,
            letterSpacing: "0.18em",
            fontFamily: "sans-serif",
            marginBottom: 16,
            opacity: headlineOp,
          }}
        >
          ETAPA 03
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: C.white,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            fontFamily: "sans-serif",
            maxWidth: 1100,
            opacity: headlineOp,
            transform: `translateY(${(1 - headlineOp) * 20}px)`,
          }}
        >
          Lembretes fiscais disparam <span style={{ color: C.teal }}>sozinhos</span>.
        </div>

        {/* Calendar grid + notifications stack */}
        <div
          style={{
            marginTop: 50,
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: 60,
            alignItems: "start",
          }}
        >
          {/* Mini calendário */}
          <div
            style={{
              background: C.bg2,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              padding: 24,
              opacity: headlineOp,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 8,
              }}
            >
              {Array.from({ length: 35 }).map((_, i) => {
                const highlight = [19, 21, 23, 29].includes(i);
                const today = i === 19;
                const pulse = highlight
                  ? 0.6 + 0.4 * Math.sin((frame + i * 5) / 12)
                  : 1;
                return (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "1",
                      borderRadius: 8,
                      background: today
                        ? C.teal
                        : highlight
                        ? `${C.amber}30`
                        : C.bg,
                      border: `1px solid ${highlight ? C.amber + "60" : C.border}`,
                      display: "grid",
                      placeItems: "center",
                      color: today ? C.bg : highlight ? C.amber : C.muted,
                      fontFamily: "sans-serif",
                      fontSize: 18,
                      fontWeight: today ? 800 : 500,
                      opacity: pulse,
                    }}
                  >
                    {i - 1 > 0 && i - 1 <= 30 ? i - 1 : ""}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stack de notificações */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { t: "DAS Simples · Mercado Vila Verde ME", d: "vence em 3 dias", op: notif1 },
              { t: "DCTF · Padaria do Zé Ltda", d: "vence em 5 dias", op: notif2 },
              { t: "SPED · Tech4Good Consultoria", d: "vence em 8 dias", op: notif3 },
            ].map((n, i) => (
              <div
                key={i}
                style={{
                  background: C.bg2,
                  border: `1px solid ${C.teal}40`,
                  borderRadius: 14,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: n.op,
                  transform: `translateX(${(1 - n.op) * 40}px)`,
                  boxShadow: `0 10px 30px -10px ${C.teal}30`,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `${C.teal}20`,
                    color: C.teal,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 22,
                  }}
                >
                  📨
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      color: C.white,
                      fontWeight: 600,
                      fontSize: 16,
                      fontFamily: "sans-serif",
                    }}
                  >
                    {n.t}
                  </div>
                  <div
                    style={{
                      color: C.amber,
                      fontSize: 13,
                      fontFamily: "sans-serif",
                      marginTop: 2,
                    }}
                  >
                    WhatsApp enviado · {n.d}
                  </div>
                </div>
                <div
                  style={{
                    color: C.teal,
                    fontSize: 12,
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                  }}
                >
                  ✓✓
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════ SCENE 5: Counter resultado (23–27s) ═══════════════
const SceneResult: React.FC<{ local: number }> = ({ local }) => {
  const frame = local;
  const headlineOp = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const counterValue = Math.round(
    interpolate(frame, [20, 80], [0, 47], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );
  const barProgress = interpolate(frame, [30, 90], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const opacity = interpolate(frame, [0, 12, 100, 120], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        opacity,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 1100 }}>
        <div
          style={{
            fontSize: 18,
            color: C.teal,
            fontWeight: 700,
            letterSpacing: "0.18em",
            fontFamily: "sans-serif",
            marginBottom: 18,
            opacity: headlineOp,
          }}
        >
          ETAPA 04 · RESULTADO
        </div>
        <div
          style={{
            fontSize: 44,
            color: C.white,
            fontFamily: "sans-serif",
            fontWeight: 500,
            opacity: headlineOp,
          }}
        >
          Seu escritório economiza
        </div>
        <div
          style={{
            fontSize: 220,
            fontWeight: 800,
            letterSpacing: "-0.05em",
            fontFamily: "sans-serif",
            color: C.teal,
            lineHeight: 1,
            marginTop: 14,
            fontVariantNumeric: "tabular-nums",
            textShadow: `0 20px 60px ${C.teal}40`,
          }}
        >
          {counterValue}h
        </div>
        <div
          style={{
            fontSize: 28,
            color: C.muted,
            fontFamily: "sans-serif",
            marginTop: 6,
            opacity: headlineOp,
          }}
        >
          por semana · ≈ 6 dias úteis no mês
        </div>
        {/* Bar */}
        <div
          style={{
            marginTop: 48,
            width: 720,
            marginLeft: "auto",
            marginRight: "auto",
            height: 14,
            background: C.bg2,
            borderRadius: 7,
            overflow: "hidden",
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${barProgress * 100}%`,
              background: `linear-gradient(90deg, ${C.teal}, ${C.amber})`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════ SCENE 6: CTA final (27–30s) ═══════════════
const SceneCTA: React.FC<{ local: number }> = ({ local }) => {
  const frame = local;
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 10 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          background: `radial-gradient(circle, ${C.amber}20 0%, transparent 60%)`,
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 40,
          transform: `scale(${0.8 + scale * 0.2})`,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            background: C.teal,
            borderRadius: 14,
            display: "grid",
            placeItems: "center",
            color: C.bg,
            fontWeight: 900,
            fontSize: 40,
            fontFamily: "sans-serif",
          }}
        >
          G
        </div>
        <div
          style={{
            fontSize: 54,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontFamily: "sans-serif",
            color: C.white,
          }}
        >
          Conta<span style={{ color: C.teal }}>flow</span>
        </div>
      </div>
      <div
        style={{
          fontSize: 20,
          color: C.teal,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 700,
          fontFamily: "sans-serif",
          marginBottom: 14,
        }}
      >
        Diagnóstico Express 48h
      </div>
      <div
        style={{
          fontSize: 110,
          fontWeight: 800,
          color: C.white,
          letterSpacing: "-0.04em",
          fontFamily: "sans-serif",
          lineHeight: 1,
        }}
      >
        R$ 997
      </div>
      <div
        style={{
          marginTop: 36,
          padding: "20px 48px",
          background: C.amber,
          color: C.bg,
          borderRadius: 12,
          fontWeight: 700,
          fontSize: 28,
          fontFamily: "sans-serif",
          boxShadow: `0 20px 50px -10px ${C.amber}50`,
        }}
      >
        contaflow.gasplab.com.br
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════ Composição principal ═══════════════
export const ContaflowDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {/* Cena 1: 0-3s (frames 0-90) */}
      <Sequence from={0} durationInFrames={3 * FPS}>
        <SceneIntro />
      </Sequence>
      {/* Cena 2: 3-9s (frames 90-270) */}
      <Sequence from={3 * FPS} durationInFrames={6 * FPS}>
        <SceneWhatsApp local={useCurrentFrame() - 3 * FPS} />
      </Sequence>
      {/* Cena 3: 9-17s (frames 270-510) */}
      <Sequence from={9 * FPS} durationInFrames={8 * FPS}>
        <SceneAI local={useCurrentFrame() - 9 * FPS} />
      </Sequence>
      {/* Cena 4: 17-23s (frames 510-690) */}
      <Sequence from={17 * FPS} durationInFrames={6 * FPS}>
        <SceneCalendar local={useCurrentFrame() - 17 * FPS} />
      </Sequence>
      {/* Cena 5: 23-27s (frames 690-810) */}
      <Sequence from={23 * FPS} durationInFrames={4 * FPS}>
        <SceneResult local={useCurrentFrame() - 23 * FPS} />
      </Sequence>
      {/* Cena 6: 27-30s (frames 810-900) */}
      <Sequence from={27 * FPS} durationInFrames={3 * FPS}>
        <SceneCTA local={useCurrentFrame() - 27 * FPS} />
      </Sequence>
      <Audio src={staticFile("music.mp3")} />
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ContaflowDemo"
      component={ContaflowDemo}
      durationInFrames={DUR}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
