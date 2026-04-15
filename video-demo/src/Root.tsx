import React from "react";
import { Composition, Audio, Img, AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

// Cenas — cada uma tem seu screenshot + overlay de copy + duração
const FPS = 30;
const TOTAL_FRAMES = 45 * FPS; // 45s

type Scene = {
  screenshot: string;
  bigText: string;
  subText: string;
  from: number;
  duration: number;
};

const scenes: Scene[] = [
  {
    screenshot: "screens/05-conversas.png",
    bigText: "Seu cliente manda NF no WhatsApp.",
    subText: "Sem planilha, sem e-mail perdido.",
    from: 3 * FPS,
    duration: 8 * FPS,
  },
  {
    screenshot: "screens/04-documentos.png",
    bigText: "A IA categoriza em 30 segundos.",
    subText: "Você revisa um clique — não digita nota por nota.",
    from: 11 * FPS,
    duration: 10 * FPS,
  },
  {
    screenshot: "screens/06-calendario.png",
    bigText: "Lembretes fiscais disparam sozinhos.",
    subText: "Seu cliente recebe WhatsApp no prazo — você não corre atrás.",
    from: 21 * FPS,
    duration: 10 * FPS,
  },
  {
    screenshot: "screens/08-dashboard.png",
    bigText: "Você devolve 5 a 10 horas por semana.",
    subText: "Sprint Express R$ 997 · implantação em 48h.",
    from: 31 * FPS,
    duration: 12 * FPS,
  },
];

const Intro: React.FC<{ frame: number; durationInFrames: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [0, 20, 70, 90], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 20], [0.94, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#0A1520", justifyContent: "center", alignItems: "center", opacity }}>
      <div style={{ transform: `scale(${scale})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, background: "#4ECDC4", borderRadius: 14, display: "grid", placeItems: "center", color: "#0A1520", fontWeight: 900, fontSize: 38, fontFamily: "sans-serif" }}>G</div>
          <div style={{ fontSize: 54, fontWeight: 700, letterSpacing: "-0.02em", color: "#F8FAFC", fontFamily: "sans-serif" }}>
            Conta<span style={{ color: "#4ECDC4" }}>flow</span>
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#94A3B8", fontFamily: "sans-serif" }}>Automação contábil com IA</div>
      </div>
    </AbsoluteFill>
  );
};

const SceneBlock: React.FC<{ scene: Scene; localFrame: number }> = ({ scene, localFrame }) => {
  const { fps } = useVideoConfig();
  const fadeIn = interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(localFrame, [scene.duration - 20, scene.duration], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);
  const slide = spring({ frame: localFrame, fps, config: { damping: 14 } });
  const ty = interpolate(slide, [0, 1], [24, 0]);
  return (
    <AbsoluteFill style={{ background: "#0A1520", opacity }}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "48px 72px", boxSizing: "border-box" }}>
        <div style={{ transform: `translateY(${ty}px)` }}>
          <div style={{ fontSize: 46, fontWeight: 700, color: "#F8FAFC", letterSpacing: "-0.02em", lineHeight: 1.1, fontFamily: "sans-serif", maxWidth: 1100 }}>
            {scene.bigText}
          </div>
          <div style={{ fontSize: 22, color: "#94A3B8", marginTop: 14, fontFamily: "sans-serif", maxWidth: 900 }}>
            {scene.subText}
          </div>
        </div>
        <div style={{ flex: 1, marginTop: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6)", maxHeight: "100%", maxWidth: "100%" }}>
            <Img src={staticFile(scene.screenshot)} style={{ display: "block", maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [0, 15, 60], [0, 1, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#0A1520", justifyContent: "center", alignItems: "center", opacity }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ fontSize: 24, color: "#4ECDC4", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, fontFamily: "sans-serif" }}>
          Sprint Express 48h
        </div>
        <div style={{ fontSize: 80, fontWeight: 800, color: "#F8FAFC", letterSpacing: "-0.03em", fontFamily: "sans-serif" }}>R$ 997</div>
        <div style={{ marginTop: 16, padding: "16px 36px", background: "#FFB627", color: "#0A1520", borderRadius: 10, fontWeight: 700, fontSize: 22, fontFamily: "sans-serif" }}>
          contaflow.gasplab.com.br
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ContaflowDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Intro: 0–3s
  // Cenas: 3–43s
  // Outro: 43–45s

  return (
    <AbsoluteFill style={{ background: "#0A1520" }}>
      <Sequence from={0} durationInFrames={3 * FPS}>
        <Intro frame={frame} durationInFrames={3 * FPS} />
      </Sequence>
      {scenes.map((scene, i) => (
        <Sequence key={i} from={scene.from} durationInFrames={scene.duration}>
          <SceneBlock scene={scene} localFrame={frame - scene.from} />
        </Sequence>
      ))}
      <Sequence from={43 * FPS} durationInFrames={2 * FPS}>
        <Outro frame={frame - 43 * FPS} />
      </Sequence>
      <Audio src={staticFile("voiceover.mp3")} />
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ContaflowDemo"
        component={ContaflowDemo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
